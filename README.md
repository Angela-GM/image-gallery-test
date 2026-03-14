# Galería de Fotos - Challenge EY 🚀

Este proyecto es una aplicación de galería de fotos con scroll infinito, desarrollada como parte de una prueba técnica para EY. Se ha puesto especial énfasis en la **Clean Architecture**, el rendimiento del DOM y una experiencia de usuario (UX) fluida y accesible.

## 🛠️ Stack Tecnológico & Justificación

- **Next.js 16.1.6 (App Router):** Elegido por su manejo eficiente de _Server Components_, optimización nativa de imágenes y un sistema de enrutamiento robusto que facilita la escalabilidad.
- **React 19.2.3:** Uso de las últimas capacidades de la librería para una gestión de estado más eficiente y una mejor integración con componentes asíncronos.
- **TypeScript 5:** Fundamental para garantizar la integridad de los datos, facilitar el mantenimiento y reducir errores en tiempo de ejecución mediante un tipado estricto.
- **Tailwind CSS 4:** Utilizado para un desarrollo de UI ágil y consistente, permitiendo un diseño responsivo sin generar archivos CSS pesados.
- **Framer Motion 12:** Seleccionada por su capacidad de manejar animaciones complejas (como el reordenamiento de layouts) mediante aceleración por hardware, garantizando 60 FPS.
- **Jest 30 + React Testing Library 16:** El estándar de la industria para asegurar que la lógica de negocio y la interacción del usuario funcionen según lo previsto.

---

## 🏗️ Arquitectura: Atomic Design

El proyecto sigue los principios de **Atomic Design** para organizar la interfaz de usuario de manera jerárquica y modular, facilitando la reutilización de componentes:

- **Atoms:** Componentes mínimos (`Spinner`, `ButtonPrimary`).
- **Molecules:** Combinación de átomos (`PhotoCard`, `ErrorMessage`).
- **Organisms:** Secciones complejas (`PhotoGrid`, `Gallery`).
- **Hooks:** Extracción de lógica de negocio (`usePhotos`) para facilitar el mantenimiento y testing.

## 🚀 Decisiones de Arquitectura y Rendimiento

### 1. Gestión del DOM y Scroll Infinito

Para manejar grandes volúmenes de datos sin degradar el rendimiento del navegador:

- **Intersection Observer:** Implementado para detectar el final de la página y cargar datos de forma proactiva. Se utiliza un `rootMargin` de 400px para anticipar la carga antes de que el usuario llegue al fondo.
- **Scroll Anchoring:** Uso de la propiedad CSS `overflow-anchor: none` para estabilizar el viewport y evitar saltos bruscos ("rebotes") cuando se inyectan nuevos elementos.
- **Estabilidad de Layout:** Las tarjetas de fotos utilizan contenedores con ratio de aspecto fijo (`aspect-square`) para reservar el espacio antes de que la imagen se descargue, eliminando el _Cumulative Layout Shift_ (CLS).

### 2. Optimizaciones de Renderizado

- **Memoización:** Uso estratégico de `React.memo` en los componentes de tarjeta y `useCallback` en los manejadores de eventos para evitar re-renderizados innecesarios de elementos existentes al cargar nuevas páginas.
- **Gestión de Imágenes:** Uso del componente `Image` de Next.js para implementar **Lazy Loading nativo**, asegurando que solo las imágenes visibles consuman memoria y ancho de banda.
- **Estrategia de Reintento (Retry):** Implementación de una lógica de reintento en el hook `usePhotos` que permite recargar específicamente la página que falló sin duplicar datos ni saltar páginas.

### 3. Animaciones con Framer Motion

Se optó por **Framer Motion** para gestionar las transiciones de la cuadrícula. La propiedad `layout` permite que los elementos restantes se reorganicen suavemente al eliminar una foto, utilizando aceleración por hardware para mantener una tasa constante de 60 FPS.

---


## 🛠️ Cómo arrancar el proyecto

Sigue estos pasos para ejecutar la aplicación en tu entorno local:

### 🚀 Opción Recomendada (Un solo paso)
Para instalar dependencias, construir y arrancar el proyecto de una sola vez:
```bash
npm run start:full
```

### 🛠️ Otras opciones
1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`

3. **Ejecutar en modo producción:**
   ```bash
   npm run build
   npm run start
   ```
   La aplicación estará disponible en `http://localhost:3000`



## 🧪 Testing (Unitarios e Integración)

Se han implementado pruebas para cubrir tanto la lógica individual como el flujo de datos:

- **Tests Unitarios (`photo-card.test.tsx`):** Verificación del renderizado correcto de props, accesibilidad (alt text) y ejecución de eventos de borrado.
- **Tests de Integración (`gallery.test.tsx`):** Validación de la orquestación entre el Custom Hook (`usePhotos`) y la UI, comprobando la transición entre estados de carga (Spinner) y la visualización de resultados.

**Para ejecutar la suite de pruebas:**

```bash
npm run test        # Ejecutar tests
npm run test:watch  # Modo observación
```

## ♿ Accesibilidad (a11y)

- **Navegación:** Soporte completo para navegación por teclado (`Tab`, `Space`, `Enter`).
- **Gestión Inteligente del Foco:** Al eliminar una imagen mediante el teclado, la aplicación detecta la posición del elemento y desplaza automáticamente el foco a la siguiente tarjeta (o a la anterior si es la última). Además, el estado de foco es **visualmente idéntico al hover**, activando el escalado, la elevación y el panel de información para una experiencia navegable y coherente.
- **Semántica:** Uso de etiquetas HTML5 semánticas (`article`, `section`, `button`).
- **Lectores de Pantalla:** Atributos `aria-label` descriptivos para acciones dinámicas y `aria-live` para estados de carga.

---

## 🤖 Uso de Inteligencia Artificial (IA)

De acuerdo con los requisitos de la prueba, este proyecto ha contado con el apoyo de herramientas de IA, integradas en el flujo de trabajo de la siguiente manera:

- **GitHub Copilot:** Utilizado en el IDE principalmente para la predicción de texto y autocompletado de código repetitivo, agilizando el desarrollo mecánico.
- **Chat Gemini como Consultor Senior:** Se ha empleado una IA generativa como consejera para organizar la arquitectura del proyecto, plantear la estructura de la prueba de la mejor forma posible y resolver bloqueos técnicos complejos además de ayudarme a redactar el README.

**Responsabilidad y Supervisión:**
Es importante destacar que **todo el código y las soluciones propuestas han sido revisados, probados y validados por mí**. La IA ha servido como apoyo estratégico, pero la comprensión profunda de la lógica implementada, la corrección de errores de renderizado y la validación de los tests han sido ejecutadas bajo mi supervisión directa, asegurando que cada línea de código cumple con los estándares requeridos.

**Aportaciones clave:**

1. **Arquitectura:** Organización de la lógica mediante Custom Hooks y patrones de diseño limpios.
2. **Debugging de Layout:** Resolución de problemas de _Reflow_ y parpadeos visuales durante el scroll infinito masivo.
3. **Testing:** Configuración del entorno de Jest y creación de mocks para APIs del navegador (como `IntersectionObserver`).
4. **Optimización:** Implementación de estrategias de reconciliación del Virtual DOM para mejorar la fluidez.



