import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle, Lightbulb, Loader2, Send, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface GradingResult {
  puntajeGlobal: number;
  precisionEspacial: number;
  argumentacionBiologica: number;
  puntosFuertes: string;
  areasMejora: string;
  recomendacion: string;
}

const ScoreCircle = ({ score }: { score: number }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "hsl(var(--primary))" : score >= 50 ? "hsl(40 80% 50%)" : "hsl(0 70% 50%)";

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
        <circle
          cx="60" cy="60" r={radius} fill="none"
          stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{score}</span>
        <span className="text-xs text-muted-foreground">/100</span>
      </div>
    </div>
  );
};

const Evaluacion = () => {
  const [nombre, setNombre] = useState("");
  const [enlace, setEnlace] = useState("");
  const [justificacion, setJustificacion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradingResult | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("biosig:evaluacion-prefill");
      if (raw) {
        const { justificacion: j, guiaTitulo } = JSON.parse(raw);
        if (j) setJustificacion(j);
        if (guiaTitulo) {
          toast({
            title: "Guía cargada",
            description: `Respuestas de "${guiaTitulo}" listas para evaluar.`,
          });
        }
        sessionStorage.removeItem("biosig:evaluacion-prefill");
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke("evaluate-project", {
        body: { nombre, enlace, justificacion },
      });

      if (error) {
        throw new Error(error.message || "Error al evaluar el proyecto");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setResult(data as GradingResult);
    } catch (err: any) {
      console.error("Error evaluating:", err);
      toast({
        title: "Error en la evaluación",
        description: err.message || "No se pudo completar la evaluación. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setNombre("");
    setEnlace("");
    setJustificacion("");
  };

  if (loading) {
    return (
      <div className="container py-24 text-center max-w-md mx-auto animate-fade-in">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-6" />
        <h2 className="text-xl font-bold mb-2">La IA está analizando tu proyecto espacial...</h2>
        <p className="text-muted-foreground text-sm">Evaluando precisión cartográfica y argumentación biológica</p>
      </div>
    );
  }

  if (result) {
    return (
      <div className="container py-16 md:py-24 max-w-3xl animate-fade-in space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Resultado de Evaluación</h1>
          <p className="text-muted-foreground">Análisis generado por el Sistema de Calificación con IA</p>
        </div>

        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">Puntaje Global</CardTitle>
          </CardHeader>
          <CardContent>
            <ScoreCircle score={result.puntajeGlobal} />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Criterio 1: Precisión Espacial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Uso de herramientas SIG</span>
                <span className="font-semibold">{result.precisionEspacial}/100</span>
              </div>
              <Progress value={result.precisionEspacial} className="h-3" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Criterio 2: Argumentación Biológica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Calidad del análisis</span>
                <span className="font-semibold">{result.argumentacionBiologica}/100</span>
              </div>
              <Progress value={result.argumentacionBiologica} className="h-3" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Puntos Fuertes</h3>
                  <p className="text-sm text-muted-foreground">{result.puntosFuertes}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/20 bg-yellow-50/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Áreas de Mejora</h3>
                  <p className="text-sm text-muted-foreground">{result.areasMejora}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-500/20 bg-blue-50/50">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Lightbulb className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Recomendación del Sistema</h3>
                  <p className="text-sm text-muted-foreground">{result.recomendacion}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Evaluar otro proyecto
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Evaluación</h1>
      <p className="text-muted-foreground text-lg mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Sube los resultados de tu análisis geoespacial. El sistema de IA evaluará tu proyecto automáticamente.
      </p>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 card-shadow space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input id="nombre" placeholder="Ingresa tu nombre" required value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="enlace">Enlace del mapa generado</Label>
          <Input id="enlace" type="url" placeholder="https://earth.google.com/..." required value={enlace} onChange={(e) => setEnlace(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="justificacion">Justificación Analítica</Label>
          <Textarea id="justificacion" placeholder="Describe tus hallazgos principales, metodología utilizada y conclusiones del análisis espacial..." rows={6} required value={justificacion} onChange={(e) => setJustificacion(e.target.value)} />
        </div>
        <Button type="submit" size="lg" className="w-full gap-2">
          <Send className="h-4 w-4" />
          Enviar y Evaluar con IA
        </Button>
      </form>
    </div>
  );
};

export default Evaluacion;
