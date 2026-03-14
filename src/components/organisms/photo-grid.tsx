import { Photo } from "@/types/photo";
import { PhotoCard } from "../molecules/photo-card";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoGridProps {
  photos: Photo[];
  onRemove: (id: number) => void;
}

export const PhotoGrid = ({ photos, onRemove }: PhotoGridProps) => {
  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-10 py-6 md:py-10 w-full">
      <AnimatePresence mode="popLayout">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <PhotoCard photo={photo} onRemove={onRemove} />
          </motion.div>
        ))}
      </AnimatePresence>
    </section>
  );
};
