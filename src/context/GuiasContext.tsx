import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface GuiaState {
  steps: boolean[];
  evidencia: string;
  preguntas: string[];
}

interface GuiasContextValue {
  getState: (id: string, stepsCount: number, preguntasCount: number) => GuiaState;
  updateState: (id: string, partial: Partial<GuiaState>) => void;
}

const STORAGE_KEY = "biosig:guias-state";

const GuiasContext = createContext<GuiasContextValue | null>(null);

export const GuiasProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Record<string, GuiaState>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignore */
    }
  }, [data]);

  const getState = (id: string, stepsCount: number, preguntasCount: number): GuiaState => {
    const existing = data[id];
    if (existing && existing.steps.length === stepsCount && existing.preguntas.length === preguntasCount) {
      return existing;
    }
    return {
      steps: existing?.steps?.length === stepsCount ? existing.steps : Array(stepsCount).fill(false),
      evidencia: existing?.evidencia ?? "",
      preguntas: existing?.preguntas?.length === preguntasCount ? existing.preguntas : Array(preguntasCount).fill(""),
    };
  };

  const updateState = (id: string, partial: Partial<GuiaState>) => {
    setData((prev) => ({
      ...prev,
      [id]: { ...prev[id], ...partial } as GuiaState,
    }));
  };

  return <GuiasContext.Provider value={{ getState, updateState }}>{children}</GuiasContext.Provider>;
};

export const useGuias = () => {
  const ctx = useContext(GuiasContext);
  if (!ctx) throw new Error("useGuias must be used inside GuiasProvider");
  return ctx;
};
