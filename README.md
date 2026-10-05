# GeoConservación Guides

Act as an expert React and Tailwind CSS developer. Build a modern, responsive, and clean educational web platform designed to host didactic guides for a university thesis. The platform teaches Biology students how to use Geographic Information Systems (GIS) for biodiversity conservation.

Design System & UI:

Style: Minimalist, academic, highly intuitive, and professional. Zero clutter.

Color Palette: Earthy and ecological tones. Primary: Deep Forest Green (#2D6A4F). Secondary: Sage Green (#95D5B2). Background: Off-white/Light gray (#F8F9FA) for high readability. Text: Dark Slate (#1B4332).

Components: Use modern UI elements (cards with soft shadows, rounded corners, clean sans-serif typography like Inter or Roboto).

Layout & Navigation: Include a persistent top Navbar with the following links: Inicio, Introducción SIG, Guías Didácticas, Evaluación.

Core Views to Generate:

Home Page (Inicio):

A Hero Section with a clear title: "Plataforma Didáctica SIG - Conservación de la Biodiversidad".

A subtitle: "Guías interactivas para el análisis espacial de áreas protegidas en Ecuador."

A primary Call-to-Action (CTA) button: "Explorar Guías".

A brief 3-column feature section below the hero: "1. Análisis Espacial", "2. Datos Satelitales", "3. Resolución de Casos".

Guides Grid (Guías Didácticas):

A grid displaying 4 interactive cards.

Each card represents a workshop: "Taller 1: Distribución Endémica", "Taller 2: Amenazas y Deforestación", "Taller 3: Límites del SNAP", "Taller 4: Análisis de Superposición".

Each card needs a placeholder icon, a short description, and a "Comenzar Taller" button.

Guide Detail Template (Vista del Taller):

This is the most important screen. Use a split-screen or dashboard layout.

Left Sidebar (30% width): Scrollable instructions panel containing headers for: "Ficha Técnica", "Reto Geoespacial", "Ruta de Navegación (Pasos 1, 2, 3)", and "Cierre Analítico".

Main Content Area (70% width): A large, prominent placeholder box (styled as a mock iframe) with the text "Visor SIG Interactivo (Google Earth / MAATE)".

Evaluation Page (Evaluación):

A clean form layout placeholder where students will upload their results, with fields for "Nombre", "Enlace del mapa generado", and a text area for "Conclusiones". Include a "Enviar Proyecto" submit button.

Make the application fully functional for navigation between these views using React Router simulation or state rendering. Ensure mobile responsiveness.

ENTREGAME LA PAGINA WE EN ESPAÑOL

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://bio-gis-learn.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/fc6c8568-cb89-49e6-9adf-bd88dfce251c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
