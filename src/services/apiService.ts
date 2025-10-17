// Servicio para consumir APIs externos
import type { Service, ServiceMaterial, ServiceReview, ServiceMetrics, ServiceAdditionalInfo } from '../assets/unifiedServices'

const API_BASE_URL = 'https://duub8e3vnc.execute-api.us-east-1.amazonaws.com/default/getServicesKrixx'

// Interfaz para los servicios que vienen del API
export interface ApiServiceResponse extends Omit<Service, 'id' | 'gallery' | 'materials' | 'reviews' | 'metrics' | 'additionalInfo' | 'reviewCount' | 'isAvailable' | 'location'> {
  id?: string
  gallery?: string[]
  materials?: ServiceMaterial[]
  reviews?: ServiceReview[]
  metrics?: ServiceMetrics
  additionalInfo?: ServiceAdditionalInfo
  reviewCount?: number
  isAvailable?: boolean
  location?: string
}

/**
 * Obtiene servicios del API por categoría
 * @param category - Categoría de servicios (ej: 'pintura', 'plomeria', etc.)
 * @returns Promise con array de servicios
 */
export const getServicesByCategory = async (category: string): Promise<Service[]> => {
  try {
    // Convertir categoría a formato del API (lowercase, sin espacios, sin acentos)
    const categoryFormatted = category
      .toLowerCase()
      .replace(/í/g, 'i')
      .replace(/é/g, 'e')
      .replace(/á/g, 'a')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/\s+/g, '')

    const response = await fetch(`${API_BASE_URL}/${categoryFormatted}`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()
    
    // Extraer los servicios del wrapper del API
    let apiServices: ApiServiceResponse[] = []
    
    if (responseData && responseData.data && Array.isArray(responseData.data)) {
      apiServices = responseData.data
    } else if (Array.isArray(responseData)) {
      apiServices = responseData
    } else if (responseData && typeof responseData === 'object') {
      apiServices = [responseData]
    }
    
    // Filtrar servicios válidos (que tengan las propiedades requeridas)
    const validServices = apiServices.filter(service => 
      service && 
      typeof service === 'object' && 
      service.title && 
      service.category
    )
    
    // Transformar los servicios del API para que coincidan con la interfaz Service
    const transformedServices: Service[] = validServices.map((apiService, index) => ({
      id: apiService.id || `api-${categoryFormatted}-${index + 1}`,
      title: apiService.title,
      description: apiService.description,
      detailedDescription: apiService.detailedDescription || [apiService.description],
      category: apiService.category,
      image: apiService.image,
      gallery: apiService.gallery || [apiService.image],
      provider: apiService.provider,
      pricing: apiService.pricing,
      details: apiService.details,
      materials: apiService.materials || [],
      reviews: apiService.reviews || [],
      metrics: apiService.metrics || {
        responseRate: { title: 'Tiempo de Respuesta', percentage: 95, description: 'Respuesta rápida garantizada' },
        completionRate: { title: 'Trabajos Completados', percentage: 98, description: 'Alta tasa de finalización' }
      },
      additionalInfo: apiService.additionalInfo || {
        warranty: { title: 'Garantía', description: '30 días de garantía' },
        paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia' },
        clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' }
      },
      rating: apiService.rating,
      reviewCount: apiService.reviewCount || 0,
      isAvailable: apiService.isAvailable !== undefined ? apiService.isAvailable : true,
      location: apiService.location || 'Colombia'
    }))

    return transformedServices
  } catch (error) {
    console.error('Error fetching services from API:', error)
    return []
  }
}

/**
 * Obtiene servicios de múltiples categorías
 * @param categories - Array de categorías
 * @returns Promise con array combinado de servicios
 */
export const getServicesForCategories = async (categories: string[]): Promise<Service[]> => {
  try {
    const promises = categories.map(category => getServicesByCategory(category))
    const results = await Promise.all(promises)
    
    // Combinar todos los resultados en un solo array
    return results.flat()
  } catch (error) {
    console.error('Error fetching services for multiple categories:', error)
    return []
  }
}

/**
 * Obtiene todos los servicios disponibles del API (sin categoría específica)
 * @returns Promise con array de todos los servicios disponibles
 */
export const getAllApiServices = async (): Promise<Service[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/`)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseData = await response.json()
    
    // Extraer los servicios del wrapper del API
    let apiServices: ApiServiceResponse[] = []
    
    if (responseData && responseData.data && Array.isArray(responseData.data)) {
      apiServices = responseData.data
    } else if (Array.isArray(responseData)) {
      apiServices = responseData
    } else if (responseData && typeof responseData === 'object') {
      apiServices = [responseData]
    }
    
    // Filtrar servicios válidos
    const validServices = apiServices.filter(service => 
      service && 
      typeof service === 'object' && 
      service.title && 
      service.category
    )
    
    // Transformar los servicios del API
    const transformedServices: Service[] = validServices.map((apiService, index) => ({
      id: apiService.id || `api-all-${index + 1}`,
      title: apiService.title,
      description: apiService.description,
      detailedDescription: apiService.detailedDescription || [apiService.description],
      category: apiService.category,
      image: apiService.image,
      gallery: apiService.gallery || [apiService.image],
      provider: apiService.provider,
      pricing: apiService.pricing,
      details: apiService.details,
      materials: apiService.materials || [],
      reviews: apiService.reviews || [],
      metrics: apiService.metrics || {
        responseRate: { title: 'Tiempo de Respuesta', percentage: 95, description: 'Respuesta rápida garantizada' },
        completionRate: { title: 'Trabajos Completados', percentage: 98, description: 'Alta tasa de finalización' }
      },
      additionalInfo: apiService.additionalInfo || {
        warranty: { title: 'Garantía', description: '30 días de garantía' },
        paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia' },
        clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' }
      },
      rating: apiService.rating,
      reviewCount: apiService.reviewCount || 0,
      isAvailable: apiService.isAvailable !== undefined ? apiService.isAvailable : true,
      location: apiService.location || 'Colombia'
    }))

    return transformedServices
  } catch (error) {
    console.error('Error fetching all services from API:', error)
    return []
  }
}
export const CATEGORY_API_MAPPING: Record<string, string> = {
  'Pintura': 'pintura',
  'Plomería': 'plomeria', 
  'Electricidad': 'electricidad',
  'Carpintería': 'carpinteria',
  'Jardinería': 'jardineria',
  'Limpieza': 'limpieza',
  'Electrodomésticos': 'electrodomesticos',
  'Seguridad': 'seguridad',
  'Hogar': 'hogar'
}