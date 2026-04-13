import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres un evaluador académico experto en Sistemas de Información Geográfica (SIG) aplicados a la conservación de la biodiversidad en Ecuador. Tu rol es evaluar proyectos estudiantiles universitarios según una rúbrica académica rigurosa.

RÚBRICA DE EVALUACIÓN:

CRITERIO 1 - Precisión Espacial (0-100):
Evalúa el uso correcto de herramientas SIG, capas vectoriales/ráster, sistemas de coordenadas, delimitación de áreas protegidas del SNAP, uso de Google Earth Engine o plataformas del MAATE. Un enlace válido a earth.google.com o maate.gob.ec indica uso de herramientas apropiadas. Evalúa si el estudiante demuestra competencia técnica cartográfica.

CRITERIO 2 - Argumentación Biológica (0-100):
Evalúa la calidad del análisis de biodiversidad y conservación: identificación de especies endémicas, análisis de amenazas (deforestación, fragmentación de hábitat), uso de datos cuantitativos, comprensión de patrones de distribución, y propuestas de conservación fundamentadas.

PUNTAJE GLOBAL (0-100):
Promedio ponderado: 40% Precisión Espacial + 60% Argumentación Biológica.

Responde ÚNICAMENTE con un JSON válido (sin markdown, sin backticks) con esta estructura exacta:
{
  "puntajeGlobal": <number 0-100>,
  "precisionEspacial": <number 0-100>,
  "argumentacionBiologica": <number 0-100>,
  "puntosFuertes": "<string con 2-3 oraciones sobre fortalezas específicas del proyecto>",
  "areasMejora": "<string con 2-3 oraciones sobre áreas concretas de mejora>",
  "recomendacion": "<string con 2-3 oraciones con recomendaciones académicas específicas>"
}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nombre, enlace, justificacion } = await req.json();

    if (!nombre || !enlace || !justificacion) {
      return new Response(
        JSON.stringify({ error: "Todos los campos son requeridos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const userPrompt = `Evalúa el siguiente proyecto estudiantil de SIG:

ESTUDIANTE: ${nombre}
ENLACE DEL MAPA: ${enlace}
JUSTIFICACIÓN ANALÍTICA:
${justificacion}

Analiza el enlace proporcionado y la calidad de la justificación. Devuelve tu evaluación en el formato JSON especificado.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "submit_evaluation",
              description: "Submit the structured evaluation result for a student GIS project",
              parameters: {
                type: "object",
                properties: {
                  puntajeGlobal: { type: "number", description: "Overall score 0-100" },
                  precisionEspacial: { type: "number", description: "Spatial precision score 0-100" },
                  argumentacionBiologica: { type: "number", description: "Biological argumentation score 0-100" },
                  puntosFuertes: { type: "string", description: "2-3 sentences about project strengths" },
                  areasMejora: { type: "string", description: "2-3 sentences about areas for improvement" },
                  recomendacion: { type: "string", description: "2-3 sentences with specific academic recommendations" },
                },
                required: ["puntajeGlobal", "precisionEspacial", "argumentacionBiologica", "puntosFuertes", "areasMejora", "recomendacion"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "submit_evaluation" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Límite de solicitudes excedido. Intenta de nuevo en unos minutos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos de IA agotados. Contacta al administrador." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      // Fallback: try parsing content directly
      const content = data.choices?.[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content);
        return new Response(JSON.stringify(parsed), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("No evaluation result from AI");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("evaluate-project error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
