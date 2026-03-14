import { Photo } from "@/types/photo";
import { useCallback, useEffect, useState } from "react";

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPhotos = async (currentPage: number) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=20`,
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: Photo[] = await response.json();

      if (data.length === 0) {
        setHasMore(false);
        return;
      } else {
        const fixedData = data.map((photo) => ({
          ...photo,
          url:
            photo.url.replace("via.placeholder.com", "placehold.co") +
            "/FFF.png",
          thumbnailUrl:
            photo.thumbnailUrl.replace(
              "via.placeholder.com",
              "placehold.co",
            ) + "/FFF.png",
        }));
        setPhotos((currentPhotos) => [...currentPhotos, ...fixedData]);
      }
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

  useEffect(() => {
    if (hasMore) {
      fetchPhotos(page);
    }
  }, [page]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  const removePhoto = useCallback((id: number) => {
    setPhotos((currentPhotos) => currentPhotos.filter((photo) => photo.id !== id));
  }, []);

  return { photos, isLoading, error, removePhoto, loadMore, hasMore };
};