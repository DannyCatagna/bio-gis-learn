# Panel pedagógico BIOSIG con tres pestañas

## Objetivo
Convertir la página principal en un panel teórico y didáctico limpio, retirando por completo el visor Leaflet y organizando todo el contenido solicitado en tres pestañas accesibles.

## Implementación
- Mantener la navegación lateral existente para conservar el acceso al resto de BIOSIG.
- Reemplazar el contenido de `Index.tsx` por un encabezado breve y un control de tres pestañas adaptable a móvil y escritorio.
- Crear la pestaña **Unidad 2: Ecuador, País Megadiverso** con cuatro tarjetas amplias, numeradas y acentuadas en Verde Selva.
- Crear la pestaña **Unidad 3: Conservación de la Biodiversidad en el Ecuador** sobre una superficie gris muy suave, con cuatro tarjetas amplias acentuadas en Azul Océano.
- Crear la pestaña **Guías Didácticas (Hojas de Trabajo SIG)** como entorno de retos constructivistas, con cuatro hojas interactivas acentuadas en Amarillo/Naranja Páramo.
- Incluir literalmente todos los títulos y contenidos proporcionados, sin texto de relleno ni secciones inventadas.
- Añadir interacción local a las hojas de trabajo para marcar cada misión como pendiente o completada.

## Detalles técnicos
- Usar el componente Tabs existente basado en Radix para navegación por teclado y estados accesibles.
- Usar los componentes Card y Button existentes y los tokens semánticos `jungle`, `ocean` y `paramo`.
- Eliminar de `Index.tsx` todas las importaciones, datos y renderizado relacionados con Leaflet y gráficos.
- Verificar la página en escritorio y móvil, incluyendo cambio de pestañas y marcado de misiones.
