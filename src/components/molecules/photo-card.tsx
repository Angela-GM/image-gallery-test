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
      className={`group relative rounded-2xl overflow-hidden cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-500 transition-all duration-700 ease-in-out bg-white/40 backdrop-blur-md border border-white/40 shadow-2xl hover:shadow-xl aspect-square transform ${
        isDeleting
          ? "scale-0 opacity-0 rotate-12"
          : "scale-100 opacity-100 hover:-translate-y-2 hover:scale-[1.02] focus:-translate-y-2 focus:scale-[1.02]"
      }`}
    >
      <div className="absolute inset-0 z-10 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-4 group-hover:translate-y-0 group-focus-within:translate-y-0 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-500 ease-out">
        <p className="text-white text-[10px] md:text-xs font-semibold uppercase drop-shadow-md">
          {photo.title}
        </p>
      </div>

      <Image
        src={photo.url}
        alt={photo.title}
        onLoad={() => setIsLoaded(true)}
        width={600}
        height={600}
        loading="lazy"
        className={`object-cover w-full h-full transition-all duration-1000 ease-in-out group-hover:scale-110 group-focus-within:scale-110 ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}
      />
    </article>
  );
};

export const PhotoCard = memo(PhotoCardComponent);
