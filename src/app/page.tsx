import { PhotoGrid } from "@/components/organisms/photo-grid";
import { Photo } from "@/types/photo";

export default function Home() {
  // 1. Creamos unos datos "mock" temporales solo para probar la cuadrícula
  const dummyPhotos: Photo[] = [
    {
      albumId: 1,
      id: 1,
      title: "Foto 1",
      url: "https://placehold.co/600/92c952/FFF",
      thumbnailUrl: "",
    },
    {
      albumId: 1,
      id: 2,
      title: "Foto 2",
      url: "https://placehold.co/600/771796/FFF",
      thumbnailUrl: "",
    },
    {
      albumId: 1,
      id: 3,
      title: "Foto 3",
      url: "https://placehold.co/600/24f355/FFF",
      thumbnailUrl: "",
    },
    {
      albumId: 1,
      id: 4,
      title: "Foto 4",
      url: "https://placehold.co/600/d32776/FFF",
      thumbnailUrl: "",
    },
    {
      albumId: 1,
      id: 5,
      title: "Foto 5",
      url: "https://placehold.co/600/f66b97/FFF",
      thumbnailUrl: "",
    },
  ];
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50 flex flex-col items-center">
      <h1 className="text-3xl text-black font-bold text-center mb-8">
        Prueba Técnica EY - Ángela
      </h1>

      <PhotoGrid photos={dummyPhotos} />
    </main>
  );
}
