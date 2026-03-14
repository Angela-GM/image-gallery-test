"use client";

import { usePhotos } from "@/hooks/usePhotos";
import { Loader } from "../atoms/loader";
import { ErrorMessage } from "../atoms/error-message";
import { PhotoGrid } from "./photo-grid";
import { useEffect, useRef } from "react";

export const Gallery = () => {
  const { photos, isLoading, error, removePhoto, loadMore, hasMore } =
    usePhotos();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { rootMargin: "600px", threshold: 0.5 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadMore, hasMore, isLoading]);

  if (error && photos.length === 0) return <ErrorMessage message={error} />;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Usamos un contenedor con altura mínima para que el footer no suba de golpe */}
      <div className="flex-1">
        {photos.length > 0 && (
          <PhotoGrid onRemove={removePhoto} photos={photos} />
        )}
      </div>

      {/* El sensor debe estar SIEMPRE en el DOM, no condicionado por el loading */}
      <div
        ref={observerTarget}
        className="h-20 w-full flex items-center justify-center my-4"
      >
        {isLoading && <Loader text="Cargando..." />}
      </div>

      {!hasMore && (
        <div className="p-8 text-center text-gray-500">Fin de la galería</div>
      )}
    </div>
  );
};
