import Image from 'next/image'
import { Photo } from '@/types/photo'

interface PhotoCardProps {
    photo: Photo;
    onRemove: (id: number) => void;
}

export const PhotoCard = ({ photo, onRemove }: PhotoCardProps) => {
  return (
    <article>
      <Image
          src={photo.url}
          alt={photo.title}
          width={600}
          height={600}
          unoptimized
          className="object-cover w-full aspect-square"
          // onError={() => setImageError(true)}
        />
        
    </article>
  )
}
