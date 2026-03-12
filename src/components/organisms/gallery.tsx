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
      { threshold: 0.5 },
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
    <div>
      {photos.length > 0 && <PhotoGrid onRemove={removePhoto} photos={photos} />}

      <div ref={observerTarget}></div>

      {isLoading && <Loader text="Cargando fotos..." />}

      {!hasMore && photos.length > 0 && (
        <ErrorMessage message="No se encontraron más fotos" />
      )}
    </div>
  );
};
