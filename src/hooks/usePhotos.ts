import { Photo } from "@/types/photo";
import { useEffect, useState } from "react";

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/photos?_limit=20",
        );

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data: Photo[] = await response.json();
        console.log(data);

        const fixedData = data.map((photo) => ({
          ...photo,
          url:
            photo.url.replace("via.placeholder.com", "placehold.co") +
            "/FFF.png",
          thumbnailUrl:
            photo.thumbnailUrl.replace("via.placeholder.com", "placehold.co") +
            "/FFF.png",
        }));
        setPhotos(fixedData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error desconocido al cargar las fotos",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return {
    photos,
    isLoading,
    error,
  };
};
