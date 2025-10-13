import React, { useState } from 'react'
import { Box, Typography, IconButton } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import styles from './ServiceGallery.module.scss'

interface ServiceGalleryProps {
  images: string[]
  title?: string
}

const ServiceGallery: React.FC<ServiceGalleryProps> = ({ 
  images, 
  title = "Galería del Servicio" 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <Box className={styles['service-gallery']}>
        <Typography
          component="h3"
          className={styles['service-gallery__title']}
        >
          {title}
        </Typography>
        <Box className={styles['service-gallery__no-images']}>
          <Typography variant="body2" color="text.secondary">
            No hay imágenes disponibles
          </Typography>
        </Box>
      </Box>
    )
  }

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    )
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <Box className={styles['service-gallery']}>
      <Typography
        component="h3"
        className={styles['service-gallery__title']}
      >
        {title}
      </Typography>
      
      <Box className={styles['service-gallery__container']}>
        {/* Main Image Display */}
        <Box className={styles['service-gallery__main-container']}>
          <img
            src={images[currentImageIndex]}
            alt={`Imagen del servicio ${currentImageIndex + 1}`}
            className={styles['service-gallery__main-image']}
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <IconButton
                className={styles['service-gallery__nav-button']}
                onClick={handlePrevious}
                sx={{ 
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
                }}
              >
                <ArrowBackIosIcon />
              </IconButton>
              
              <IconButton
                className={styles['service-gallery__nav-button']}
                onClick={handleNext}
                sx={{ 
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <Box className={styles['service-gallery__counter']}>
              {currentImageIndex + 1} / {images.length}
            </Box>
          )}
        </Box>

        {/* Thumbnails */}
        {images.length > 1 && (
          <Box className={styles['service-gallery__thumbnails']}>
            {images.map((image, index) => (
              <Box
                key={index}
                className={`${styles['service-gallery__thumbnail']} ${
                  index === currentImageIndex 
                    ? styles['service-gallery__thumbnail--active'] 
                    : ''
                }`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img
                  src={image}
                  alt={`Miniatura ${index + 1}`}
                  className={styles['service-gallery__thumbnail-image']}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ServiceGallery