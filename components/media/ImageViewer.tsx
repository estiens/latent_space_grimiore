import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { BBSHeader } from '@/components/shared/BBSHeader';
import { ASCIIButton } from '@/components/shared/ASCIIButton';

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

interface ImageViewerProps {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  zoomable?: boolean;
  gallery?: GalleryImage[];
  crtOverlay?: boolean;
  className?: string;
}

// Get filename from path
const getFilename = (src: string): string => {
  const parts = src.split('/');
  return parts[parts.length - 1]?.toUpperCase() || 'IMAGE.PNG';
};

// Thumbnail component
interface ImageThumbnailProps {
  src: string;
  alt: string;
  onClick: () => void;
  className?: string;
}

export const ImageThumbnail = ({ src, alt, onClick, className }: ImageThumbnailProps) => (
  <motion.button
    onClick={onClick}
    className={cn(
      'relative overflow-hidden border border-[var(--muted)] hover:border-[var(--primary)]',
      'transition-all cursor-pointer group',
      className
    )}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover media-image-preview"
      loading="lazy"
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--overlay-medium)]">
      <span className="text-[var(--primary)] text-2xl">[+]</span>
    </div>
    {/* CRT overlay on hover */}
    <div className="absolute inset-0 crt-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
  </motion.button>
);

export const ImageViewer = ({
  src,
  alt,
  title,
  caption,
  zoomable = true,
  gallery,
  crtOverlay = true,
  className
}: ImageViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // If gallery provided, use gallery images
  const images = gallery || [{ src, alt, title, caption }];
  const currentImage = images[currentIndex];
  const displayTitle = currentImage.title || getFilename(currentImage.src);

  // Navigation
  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
    setIsLoading(true);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    setIsLoading(true);
  }, [images.length]);

  const handleClose = () => {
    setIsOpen(false);
    setIsZoomed(false);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case 'ArrowLeft':
          goToPrev();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case '+':
        case '=':
          if (zoomable) setIsZoomed(true);
          break;
        case '-':
          setIsZoomed(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, goToPrev, goToNext, zoomable]);

  // Lightbox content
  const lightboxContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col bg-[var(--background)]/95"
        >
          {/* Header */}
          <BBSHeader
            title={`IMAGE_VIEWER.SYS // ${displayTitle}`}
            status="ACTIVE"
            actions={
              <button
                onClick={handleClose}
                className="hover:text-[var(--chart-1)] transition-colors"
              >
                [X]
              </button>
            }
          />

          {/* Main content area */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-[var(--primary)] text-4xl hover:text-[var(--chart-1)] transition-colors"
                  aria-label="Previous image"
                >
                  [◄]
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-[var(--primary)] text-4xl hover:text-[var(--chart-1)] transition-colors"
                  aria-label="Next image"
                >
                  [►]
                </button>
              </>
            )}

            {/* Image container */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                'relative max-w-full max-h-full',
                isZoomed && 'cursor-zoom-out',
                !isZoomed && zoomable && 'cursor-zoom-in'
              )}
              onClick={() => zoomable && setIsZoomed(!isZoomed)}
            >
              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[var(--chart-1)] animate-pulse">
                    LOADING<span className="dot-loader" />
                  </span>
                </div>
              )}

              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className={cn(
                  'max-w-full max-h-[70vh] object-contain transition-transform duration-300',
                  isZoomed && 'scale-150'
                )}
                onLoad={() => setIsLoading(false)}
              />

              {/* CRT overlay */}
              {crtOverlay && <div className="crt-overlay rounded-none" />}
            </motion.div>
          </div>

          {/* Footer with controls and info */}
          <div className="border-t border-[var(--primary)] p-4 bg-[var(--overlay-medium)]">
            <div className="flex items-center justify-between">
              {/* Image info */}
              <div className="text-sm">
                {currentImage.caption && (
                  <p className="text-[var(--foreground)]">{currentImage.caption}</p>
                )}
                {images.length > 1 && (
                  <p className="text-[var(--muted-foreground)] text-xs mt-1">
                    IMAGE {currentIndex + 1} / {images.length}
                  </p>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {zoomable && (
                  <>
                    <ASCIIButton
                      label="+"
                      onClick={() => setIsZoomed(true)}
                      disabled={isZoomed}
                      variant="ghost"
                    />
                    <ASCIIButton
                      label="-"
                      onClick={() => setIsZoomed(false)}
                      disabled={!isZoomed}
                      variant="ghost"
                    />
                    <ASCIIButton
                      label="FIT"
                      onClick={() => setIsZoomed(false)}
                      variant="ghost"
                    />
                  </>
                )}
                <ASCIIButton label="CLOSE" onClick={handleClose} variant="primary" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Thumbnail that opens lightbox */}
      <ImageThumbnail
        src={src}
        alt={alt}
        onClick={() => {
          setCurrentIndex(gallery ? 0 : 0);
          setIsOpen(true);
          setIsLoading(true);
        }}
        className={className}
      />

      {/* Lightbox portal */}
      {typeof document !== 'undefined' && createPortal(lightboxContent, document.body)}
    </>
  );
};

// Gallery grid component
interface ImageGalleryProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export const ImageGallery = ({ images, columns = 3, className }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const colClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
  };

  return (
    <>
      <div className={cn('grid gap-2', colClasses[columns], className)}>
        {images.map((image, index) => (
          <ImageThumbnail
            key={index}
            src={image.src}
            alt={image.alt}
            onClick={() => setSelectedIndex(index)}
            className="aspect-square"
          />
        ))}
      </div>

      {/* Lightbox for gallery */}
      {selectedIndex !== null && (
        <ImageViewer
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          title={images[selectedIndex].title}
          caption={images[selectedIndex].caption}
          gallery={images}
        />
      )}
    </>
  );
};

export default ImageViewer;
