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

  const handleRemove = (byKeyboard = false) => {
    if (isDeleting) return;

    setIsDeleting(true);
    onRemove(photo.id);

    if (byKeyboard) {
      const currentCard = document.getElementById(`card-${photo.id}`);
      const motionWrapper = currentCard?.parentElement;
      const nextWrapper = motionWrapper?.nextElementSibling as HTMLElement;
      const prevWrapper = motionWrapper?.previousElementSibling as HTMLElement;

      setTimeout(() => {
        const nextTarget =
          nextWrapper?.querySelector<HTMLElement>("[role='button']") ||
          prevWrapper?.querySelector<HTMLElement>("[role='button']");

        if (nextTarget) {
          nextTarget.focus();
        } else {
          document.getElementById("gallery-container")?.focus();
        }
      }, 150);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRemove(true);
    }
  };

  return (
    <article
      id={`card-${photo.id}`}
      onClick={(e) => {
        e.stopPropagation();
        handleRemove();
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Eliminar imagen ${photo.title}`}
      className={`group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-600 focus:border-3 bg-gray-200 aspect-square transition-all duration-500 transform ${
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
        loading="lazy"
        className={`object-cover w-full h-full transition-opacity duration-500 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </article>
  );
};

export const PhotoCard = memo(PhotoCardComponent);
