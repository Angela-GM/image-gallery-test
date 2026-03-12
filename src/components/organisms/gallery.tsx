'use client';

import { usePhotos } from "@/hooks/usePhotos";
import { Loader } from "../atoms/loader";
import { ErrorMessage } from "../atoms/error-message";
import { PhotoGrid } from "./photo-grid";

export const Gallery = () => {
    const {photos, isLoading, error} = usePhotos();

    if (isLoading) return <Loader text="Cargando fotos..." />
    if (error) return <ErrorMessage message={error} />
    if (photos.length === 0) return <ErrorMessage message="No se encontraron fotos" />

  return (
    <PhotoGrid photos={photos} />
  )
}
