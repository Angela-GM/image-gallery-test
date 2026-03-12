import { Photo } from '@/types/photo'
import { PhotoCard } from '../molecules/photo-card';

interface PhotoGridProps {
    photos: Photo[];
}

export const PhotoGrid = ({ photos }: PhotoGridProps) => {
  
  return (
    <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full'>
        {photos.map((photo) => (
            <PhotoCard
                key={photo.id}
                photo={photo}
                onRemove={(id) => console.log('Eliminar foto', id)}
            />
        ))}
        
    </section>
  )
}
