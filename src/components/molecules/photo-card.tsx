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
  const handleRemove = () => {
    onRemove(photo.id);
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
      className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 hover:scale-105 bg-gray-100 aspect-square"
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
      {/* <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/20 transition-colors duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-red-600 px-3 py-1 rounded-full text-sm shadow-lg transform scale-95 group-hover:scale-100 transition-all">
          Eliminar
        </span>
      </div> */}
    </article>
  );
};

export const PhotoCard = memo(PhotoCardComponent)
