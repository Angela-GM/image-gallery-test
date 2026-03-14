import { Gallery } from "@/components/organisms/gallery";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-900 flex flex-col items-center">
      <h1 className="text-4xl text-white font-bold text-center mb-8">
        Galería de imágenes
      </h1>

      <Gallery />
    </main>
  );
}
