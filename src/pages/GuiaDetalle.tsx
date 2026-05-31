import { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb, FileText, Brain, Send, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getGuia } from "@/data/guias";
import { useGuias } from "@/context/GuiasContext";
import { cn } from "@/lib/utils";

const GuiaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const guia = id ? getGuia(id) : undefined;
  const { getState, updateState } = useGuias();

  if (!guia) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground">Guía no encontrada.</p>
        <Link to="/guias" className="mt-4 inline-block">
          <Button variant="outline">Volver a Guías</Button>
        </Link>
      </div>
    );
  }

  const state = getState(guia.id, guia.pasos.length, guia.preguntas.length);

  const { progress, completed, total } = useMemo(() => {
    const stepsDone = state.steps.filter(Boolean).length;
    const evidenciaDone = state.evidencia.trim().length > 0 ? 1 : 0;
    const preguntasDone = state.preguntas.filter((p) => p.trim().length > 0).length;
    const completedCount = stepsDone + evidenciaDone + preguntasDone;
    const totalCount = guia.pasos.length + 1 + guia.preguntas.length;
    return {
      progress: Math.round((completedCount / totalCount) * 100),
      completed: completedCount,
      total: totalCount,
    };
  }, [state, guia]);

  const isComplete = progress === 100;

  const toggleStep = (i: number) => {
    const next = [...state.steps];
    next[i] = !next[i];
    updateState(guia.id, { steps: next });
  };

  const handleEvidencia = (v: string) => updateState(guia.id, { evidencia: v });
  const handlePregunta = (i: number, v: string) => {
    const next = [...state.preguntas];
    next[i] = v;
    updateState(guia.id, { preguntas: next });
  };

  const handleSubmit = () => {
    const justificacion = [
      `GUÍA ${guia.numero}: ${guia.titulo}`,
      `${guia.unidad}`,
      ``,
      `EVIDENCIA DE CAMPO:`,
      state.evidencia,
      ``,
      `ANÁLISIS CRÍTICO:`,
      ...guia.preguntas.map((p, i) => `${i + 1}. ${p}\nR: ${state.preguntas[i]}`),
    ].join("\n");

    sessionStorage.setItem(
      "biosig:evaluacion-prefill",
      JSON.stringify({ justificacion, guiaTitulo: guia.titulo }),
    );
    navigate("/evaluacion");
  };

  return (
    <div className="container max-w-3xl py-8 md:py-12 px-4">
      <Link
        to="/guias"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Guías
      </Link>

      {/* Encabezado Académico */}
      <header className="bg-card border rounded-2xl p-6 md:p-8 card-shadow mb-8">
        <div className="flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-wider mb-3">
          <BookOpen className="h-3.5 w-3.5" />
          {guia.unidad}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-4">
          Guía {guia.numero}: {guia.titulo}
        </h1>

        <div className="flex items-start gap-2 mb-6 p-4 bg-secondary/20 rounded-lg">
          <Target className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-primary mb-1">Objetivo de Aprendizaje</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{guia.objetivo}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Progreso de la bitácora
            </span>
            <span className="text-xs font-semibold tabular-nums">
              {completed}/{total} · {progress}%
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </header>

      {/* Fundamento Teórico */}
      <section className="mb-8">
        <Accordion type="single" collapsible defaultValue="fundamento" className="bg-card border rounded-2xl px-6 card-shadow">
          <AccordionItem value="fundamento" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-5">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold">Fundamento Teórico</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6">
              <p className="text-sm md:text-base text-muted-foreground leading-[1.8] pl-8">
                {guia.fundamento}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Checklist Procedimental */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4 px-1">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Procedimiento SIG</h2>
        </div>
        <ol className="space-y-3">
          {guia.pasos.map((paso, i) => {
            const checked = state.steps[i];
            return (
              <li
                key={i}
                className={cn(
                  "bg-card border rounded-xl p-4 transition-all duration-300",
                  checked && "bg-secondary/20 border-primary/40",
                )}
              >
                <label className="flex items-start gap-4 cursor-pointer min-h-[44px]">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={() => toggleStep(i)}
                    className="mt-1 h-5 w-5 shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-primary tabular-nums mt-0.5">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p
                        className={cn(
                          "text-sm md:text-base leading-relaxed transition-all",
                          checked && "line-through text-muted-foreground",
                        )}
                      >
                        {paso.text}
                      </p>
                    </div>
                    {paso.tip && (
                      <div className="flex items-start gap-2 text-xs text-muted-foreground bg-muted/40 rounded-md p-2.5 ml-6">
                        <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        <span className="leading-relaxed">
                          <strong className="text-foreground">Tip SIG:</strong> {paso.tip}
                        </span>
                      </div>
                    )}
                  </div>
                </label>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Bloque de Evidencia */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4 px-1">
          <FileText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Bitácora de Evidencia</h2>
        </div>
        <div className="bg-card border rounded-2xl p-5 card-shadow">
          <Label htmlFor="evidencia" className="text-sm font-medium mb-2 block">
            Registro de campo
          </Label>
          <Textarea
            id="evidencia"
            value={state.evidencia}
            onChange={(e) => handleEvidencia(e.target.value)}
            placeholder={guia.evidenciaPlaceholder}
            className="min-h-[140px] text-base leading-relaxed resize-y"
          />
        </div>
      </section>

      {/* Cuestionario de Análisis Crítico */}
      <section className="mb-8">
        <div className="flex items-center gap-3 mb-4 px-1">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Análisis Crítico</h2>
        </div>
        <div className="space-y-4">
          {guia.preguntas.map((pregunta, i) => (
            <div key={i} className="bg-card border rounded-2xl p-5 card-shadow">
              <Label htmlFor={`pregunta-${i}`} className="text-sm font-medium mb-3 block leading-relaxed">
                <span className="text-primary font-bold mr-1.5">P{i + 1}.</span>
                {pregunta}
              </Label>
              <Textarea
                id={`pregunta-${i}`}
                value={state.preguntas[i]}
                onChange={(e) => handlePregunta(i, e.target.value)}
                placeholder="Desarrolla tu respuesta argumentativa..."
                className="min-h-[110px] text-base leading-relaxed resize-y"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Submit */}
      <div className="sticky bottom-4 z-10">
        <Button
          onClick={handleSubmit}
          disabled={!isComplete}
          size="lg"
          className="w-full h-14 text-base font-semibold shadow-lg"
        >
          <Send className="h-5 w-5 mr-2" />
          {isComplete
            ? "Enviar Respuestas a Evaluación por IA"
            : `Completa la guía (${progress}%) para enviar`}
        </Button>
      </div>
    </div>
  );
};

export default GuiaDetalle;
