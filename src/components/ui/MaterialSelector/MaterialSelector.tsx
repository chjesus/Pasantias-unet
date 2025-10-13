import React, { useState } from 'react'
import {
  Box,
  Chip,
  Typography,
  Divider
} from '@mui/material'
import styles from './MaterialSelector.module.scss'

export interface Material {
  id: string
  label: string
  category?: string
}

export interface MaterialSelectorProps {
  availableMaterials: Material[]
  onSelectionChange?: (selectedMaterials: Material[]) => void
  title?: string
  maxSelections?: number
}

const MaterialSelector: React.FC<MaterialSelectorProps> = ({
  availableMaterials,
  onSelectionChange,
  title = 'Materiales',
  maxSelections
}) => {
  const [selectedMaterials, setSelectedMaterials] = useState<Material[]>([])

  const handleMaterialClick = (material: Material, isSelected: boolean) => {
    let newSelectedMaterials: Material[]

    if (isSelected) {
      // Remover de seleccionados
      newSelectedMaterials = selectedMaterials.filter(m => m.id !== material.id)
    } else {
      // Agregar a seleccionados (verificar límite)
      if (maxSelections && selectedMaterials.length >= maxSelections) {
        return // No agregar si se alcanzó el límite
      }
      newSelectedMaterials = [...selectedMaterials, material]
    }

    setSelectedMaterials(newSelectedMaterials)
    onSelectionChange?.(newSelectedMaterials)
  }

  const isSelected = (materialId: string) => {
    return selectedMaterials.some(m => m.id === materialId)
  }

  const availableToShow = availableMaterials.filter(material => 
    !isSelected(material.id)
  )

  return (
    <Box className={styles['material-selector']}>
      <Typography className={styles['material-selector__title']}>
        {title}
      </Typography>

      {/* Materiales Disponibles */}
      <Box className={styles['material-selector__section']}>
        <Typography className={styles['material-selector__section-title']}>
          Disponibles
        </Typography>
        
        <Box className={styles['material-selector__chips']}>
          {availableToShow.length > 0 ? (
            availableToShow.map((material) => (
              <Chip
                key={material.id}
                label={material.label}
                onClick={() => handleMaterialClick(material, false)}
                variant="outlined"
                color="primary"
                clickable
                size="medium"
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.50',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  },
                  transition: 'all 0.3s ease',
                }}
              />
            ))
          ) : (
            <Typography className={styles['material-selector__empty']}>
              No hay materiales disponibles
            </Typography>
          )}
        </Box>
      </Box>

      <Divider className={styles['material-selector__divider']} />

      {/* Materiales Seleccionados */}
      <Box className={styles['material-selector__section']}>
        <Typography className={styles['material-selector__section-title']}>
          Seleccionados
          {maxSelections && (
            <span className={styles['material-selector__counter']}>
              ({selectedMaterials.length}/{maxSelections})
            </span>
          )}
        </Typography>
        
        <Box className={styles['material-selector__chips']}>
          {selectedMaterials.length > 0 ? (
            selectedMaterials.map((material) => (
              <Chip
                key={material.id}
                label={material.label}
                onClick={() => handleMaterialClick(material, true)}
                variant="filled"
                color="primary"
                clickable
                size="medium"
                onDelete={() => handleMaterialClick(material, true)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  },
                  '& .MuiChip-deleteIcon': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      color: 'white',
                    },
                  },
                  transition: 'all 0.3s ease',
                }}
              />
            ))
          ) : (
            <Typography className={styles['material-selector__empty']}>
              No hay materiales seleccionados
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default MaterialSelector