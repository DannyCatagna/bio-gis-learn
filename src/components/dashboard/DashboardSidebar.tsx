import { Link, useLocation } from "react-router-dom";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Compass,
  LayoutDashboard,
  Map as MapIcon,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Panel", path: "/", icon: LayoutDashboard },
  { label: "Introducción SIG", path: "/introduccion", icon: Compass },
  { label: "Guías Didácticas", path: "/guias", icon: BookOpen },
  { label: "Mapa Interactivo", path: "/mapa", icon: MapIcon },
  { label: "Áreas Protegidas", path: "/areas-protegidas", icon: Trees },
  { label: "Evaluación", path: "/evaluacion", icon: ClipboardCheck },
];

interface Props {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: Props) => {
  const { pathname } = useLocation();
  const progreso = 62;

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col shrink-0 border-r bg-surface-raised transition-[width] duration-300 ease-out",
        collapsed ? "w-[76px]" : "w-64",
      )}
    >
      {/* Perfil */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl bg-jungle text-jungle-foreground grid place-items-center font-semibold">
            BS
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Estudiante UNACH</p>
              <p className="text-xs text-muted-foreground truncate">Biodiversidad del Ecuador</p>
            </div>
          )}
        </div>

        <div className={cn("mt-4", collapsed && "mt-3")}>
          {!collapsed && (
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-muted-foreground">Nivel 3 · Cartógrafo</span>
              <span className="font-semibold text-jungle">{progreso}%</span>
            </div>
          )}
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-jungle transition-all duration-700"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-2 space-y-1">
        {links.map((l) => {
          const active = pathname === l.path;
          return (
            <Link
              key={l.path}
              to={l.path}
              title={l.label}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 min-h-[44px] text-sm font-medium transition-all duration-200",
                active
                  ? "bg-jungle/10 text-jungle shadow-[inset_3px_0_0_0_hsl(var(--jungle))]"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-0",
              )}
            >
              <l.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="truncate">{l.label}</span>}
            </Link>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="m-3 rounded-xl border border-paramo/30 bg-paramo/10 p-3">
          <div className="flex items-center gap-2 text-paramo-foreground">
            <Trophy className="h-4 w-4 text-paramo" />
            <span className="text-xs font-semibold">3 insignias obtenidas</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Completa la misión de conflicto territorial para la siguiente.
          </p>
        </div>
      )}

      <button
        onClick={onToggle}
        className="m-2 flex items-center justify-center gap-2 rounded-lg border min-h-[44px] text-sm text-muted-foreground hover:bg-muted transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        {!collapsed && "Colapsar"}
      </button>
    </aside>
  );
};

export default DashboardSidebar;
