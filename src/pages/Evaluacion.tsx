import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

const Evaluacion = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container py-24 text-center max-w-md mx-auto animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-3">¡Proyecto Enviado!</h2>
        <p className="text-muted-foreground mb-8">Tu evaluación ha sido registrada exitosamente.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Enviar otro proyecto</Button>
      </div>
    );
  }

  return (
    <div className="container py-16 md:py-24 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">Evaluación</h1>
      <p className="text-muted-foreground text-lg mb-12 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Sube los resultados de tu análisis geoespacial para completar la evaluación del curso.
      </p>

      <form onSubmit={handleSubmit} className="bg-card rounded-xl p-8 card-shadow space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre completo</Label>
          <Input id="nombre" placeholder="Ingresa tu nombre" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="enlace">Enlace del mapa generado</Label>
          <Input id="enlace" type="url" placeholder="https://earth.google.com/..." required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="conclusiones">Conclusiones</Label>
          <Textarea id="conclusiones" placeholder="Describe tus hallazgos principales y conclusiones del análisis..." rows={6} required />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Enviar Proyecto
        </Button>
      </form>
    </div>
  );
};

export default Evaluacion;
