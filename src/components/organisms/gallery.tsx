"use client";

import { usePhotos } from "@/hooks/usePhotos";
import { ErrorMessage } from "../atoms/error-message";
import { PhotoGrid } from "./photo-grid";
import { useEffect, useRef } from "react";
import { Spinner } from "../atoms/spinner";

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
      { rootMargin: "0px 0px 400px 0px", threshold: 0 },
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
    <div 
    className="flex flex-col min-h-screen" 
    style={{ overflowAnchor: 'none' } as React.CSSProperties}
  >
    <div className="flex-1">
      {photos.length > 0 && <PhotoGrid onRemove={removePhoto} photos={photos} />}
    </div>

    <div ref={observerTarget} className="h-40 w-full flex items-center justify-center">
      {/* {isLoading && <Loader text="Cargando más fotos..." />} */}
      {isLoading && <Spinner />}
    </div>

      {!hasMore && (
        <div className="p-8 text-center text-gray-500">Fin de la galería</div>
      )}
    </div>
  );
};
