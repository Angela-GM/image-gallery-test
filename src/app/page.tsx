import { Gallery } from "@/components/organisms/gallery";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl text-black font-bold text-center mb-8">
        Prueba Técnica EY - Frontend Next - Angela Garcia
      </h1>

      <Gallery />
    </main>
  );
}
