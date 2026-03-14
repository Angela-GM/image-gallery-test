import { Photo } from "@/types/photo";
import { PhotoCard } from "../molecules/photo-card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useEffect } from "react";

interface PhotoGridProps {
  photos: Photo[];
  onRemove: (id: number) => void;
}

export const PhotoGrid = ({ photos, onRemove }: PhotoGridProps) => {
  const [parent, enable] = useAutoAnimate({
    duration: 200,
    easing: "ease-out",
  });

  useEffect(() => {
    enable(false);

    const timeout = setTimeout(() => {
      enable(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [enable]);

  return (
    <section
      ref={parent}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full"
    >
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onRemove={onRemove} />
      ))}
    </section>
  );
};
