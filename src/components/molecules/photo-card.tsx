"use client";

import Image from "next/image";
import { Photo } from "@/types/photo";
import { memo, useState } from "react";

interface PhotoCardProps {
  photo: Photo;
  onRemove: (id: number) => void;
}

const PhotoCardComponent = ({ photo, onRemove }: PhotoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRemove = () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setTimeout(() => {
      onRemove(photo.id);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRemove();
    }
  };

  return (
    <article
      onClick={handleRemove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Eliminar imagen ${photo.title}`}
      className={`group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 bg-gray-100 aspect-square transition-all duration-500 transform ${
        isDeleting
          ? "scale-0 opacity-0"
          : "scale-100 opacity-100 hover:scale-105"
      }`}
    >
      <Image
        src={photo.url}
        alt={photo.title}
        onLoad={() => setIsLoaded(true)}
        width={600}
        height={600}
        className={`object-cover w-full h-full transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`} // onError={() => setImageError(true)}
      />
    </article>
  );
};

export const PhotoCard = memo(PhotoCardComponent);
