// Datos centralizados de servicios para toda la aplicación
export interface ServiceProvider {
  id: string
  name: string
  image: string
  rating: number
  reviews: number
  experience: string
}

export interface ServiceMaterial {
  id: string
  label: string
  category?: string
}

export interface ServicePricing {
  price: number
  originalPrice: number
  currency: string
  unit: string
  estimatedDuration: string
  urgentService: boolean
  promotions: string[]
}

export interface ServiceDetails {
  incluye: string[]
  noIncluye: string[]
}

export interface ServiceReview {
  userName: string
  rating: number
  comment: string
  date: string
  avatar: string
}

export interface ServiceMetrics {
  responseRate: { title: string; percentage: number; description: string }
  completionRate: { title: string; percentage: number; description: string }
}

export interface ServiceAdditionalInfo {
  warranty: { title: string; description: string }
  paymentMethods: { title: string; description: string }
  clientTypes: { title: string; description: string }
}

export interface Service {
  id: string
  title: string
  description: string
  detailedDescription?: string[]
  category: string
  image: string
  gallery: string[]
  provider: ServiceProvider
  pricing: ServicePricing
  details: ServiceDetails
  materials: ServiceMaterial[]
  reviews: ServiceReview[]
  metrics: ServiceMetrics
  additionalInfo: ServiceAdditionalInfo
  rating: number
  reviewCount: number
  isAvailable: boolean
  location?: string
}

export const UNIFIED_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Instalación y Mantenimiento de Sistemas de Climatización',
    description:
      'Expertos en soluciones de aire acondicionado y calefacción para hogares y empresas. Garantizamos un ambiente óptimo con eficiencia energética y confort duradero.',
    detailedDescription: [
      'En ClimaPro Solutions, somos especialistas en la instalación y mantenimiento de todo tipo de sistemas de climatización, desde equipos residenciales hasta soluciones industriales. Nos comprometemos a ofrecer un servicio de máxima calidad, garantizando la eficiencia energética y el confort en sus espacios.',
      'Nuestro equipo técnico está altamente cualificado y cuenta con las certificaciones más recientes del sector. Utilizamos solo materiales de primera calidad y las últimas tecnologías para asegurar la durabilidad y el rendimiento óptimo de su sistema.',
      'Ofrecemos soluciones personalizadas adaptadas a sus necesidades, incluyendo la instalación de sistemas split, multisplit, conductos, aerotermia y suelo radiante. Realizamos diagnósticos precisos, reparaciones eficientes y mantenimientos preventivos que prolongan la vida útil de sus equipos.',
    ],
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-1',
      name: 'ClimaPro Solutions',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 3.8,
      reviews: 387,
      experience: '12 años de experiencia',
    },
    pricing: {
      price: 108000,
      originalPrice: 135000,
      currency: 'COP',
      unit: 'por servicio',
      estimatedDuration: '4-6 horas',
      urgentService: true,
      promotions: [
        '20% descuento en mantenimiento anual',
        'Garantía extendida por 2 años',
        'Revisión gratuita a los 6 meses',
      ],
    },
    details: {
      incluye: [
        'Diagnóstico completo del sistema de climatización',
        'Instalación profesional certificada',
        'Mantenimiento preventivo y correctivo',
        'Reparación de fugas y sistemas de refrigeración',
        'Optimización del rendimiento y eficiencia',
        'Limpieza y sanitización de conductos',
        'Calibración de termostatos',
      ],
      noIncluye: [
        'Repuestos o piezas de reemplazo',
        'Instalación de ductos nuevos',
        'Modificaciones estructurales',
        'Servicios fuera del horario establecido',
      ],
    },
    materials: [
      { id: 'mat-1', label: 'Refrigerante R-410A', category: 'Químicos' },
      { id: 'mat-2', label: 'Filtros de aire HEPA', category: 'Filtración' },
      { id: 'mat-3', label: 'Tubería de cobre', category: 'Instalación' },
      { id: 'mat-4', label: 'Aislamiento térmico', category: 'Materiales' },
    ],
    reviews: [
      {
        userName: 'María González',
        rating: 5,
        comment:
          'Excelente servicio, muy profesionales y puntuales. Mi sistema de AC funciona perfectamente.',
        date: '2024-01-15',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
      {
        userName: 'Carlos Rodríguez',
        rating: 4,
        comment:
          'Buen trabajo, aunque tardaron un poco más de lo esperado. El resultado final es excelente.',
        date: '2024-01-10',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 98,
        description: 'Responde dentro de 1 hora',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 95,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Servicio',
        description:
          'Garantía de 2 años en instalación y 6 meses en reparaciones',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas de crédito/débito',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial e industrial',
      },
    },
    rating: 4.9,
    reviewCount: 387,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '2',
    title: 'Instalación de Grifo de Cocina Premium',
    description:
      'Servicio especializado en instalación de grifos de alta calidad. Trabajo garantizado con materiales premium y técnicas profesionales.',
    detailedDescription: [
      'Nuestros técnicos especializados en fontanería ofrecen un servicio completo de instalación de grifos de cocina con los más altos estándares de calidad. Trabajamos con las mejores marcas del mercado y garantizamos un acabado perfecto que combina funcionalidad y estética.',
      'Cada instalación incluye una evaluación previa de la instalación existente, preparación de conexiones, sellado profesional y pruebas de funcionamiento. Utilizamos herramientas especializadas y técnicas avanzadas para asegurar que no haya fugas ni problemas futuros.',
      'Ofrecemos asesoramiento personalizado para elegir el grifo que mejor se adapte a sus necesidades, considerando el diseño de su cocina, la presión del agua y sus preferencias de uso. Nuestro servicio incluye garantía completa y soporte post-instalación.',
    ],
    category: 'Plomería',
    image:
      'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-2',
      name: 'Maestro Fontanero Juan',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 3.5,
      reviews: 156,
      experience: '8 años de experiencia',
    },
    pricing: {
      price: 75000,
      originalPrice: 90000,
      currency: 'COP',
      unit: 'por instalación',
      estimatedDuration: '2-3 horas',
      urgentService: false,
      promotions: [
        '15% descuento en instalaciones múltiples',
        'Revisión gratuita a los 3 meses',
      ],
    },
    details: {
      incluye: [
        'Instalación completa del grifo',
        'Conexiones de agua caliente y fría',
        'Sellado e impermeabilización',
        'Pruebas de funcionamiento',
        'Limpieza del área de trabajo',
      ],
      noIncluye: [
        'Grifo (debe ser proporcionado por el cliente)',
        'Modificación de tuberías existentes',
        'Reparación de daños previos',
      ],
    },
    materials: [
      { id: 'mat-5', label: 'Teflón profesional', category: 'Sellado' },
      { id: 'mat-6', label: 'Conectores flexibles', category: 'Conexión' },
      { id: 'mat-7', label: 'Válvulas de paso', category: 'Control' },
    ],
    reviews: [
      {
        userName: 'Ana Martínez',
        rating: 5,
        comment:
          'Juan es muy profesional, el grifo quedó perfecto y sin goteras.',
        date: '2024-01-12',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 92,
        description: 'Responde dentro de 2 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 96,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Instalación',
        description: '1 año en mano de obra, 6 meses en sellados',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia bancaria',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial y comercial pequeño',
      },
    },
    rating: 4.7,
    reviewCount: 156,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '3',
    title: 'Instalación Eléctrica Residencial Completa',
    description:
      'Servicio integral de instalaciones eléctricas para viviendas. Cumplimos con todas las normas de seguridad y código eléctrico nacional.',
    detailedDescription: [
      'Especialistas en instalaciones eléctricas residenciales con más de 15 años de experiencia. Ofrecemos soluciones completas que van desde cableado básico hasta sistemas domóticos avanzados, siempre cumpliendo con las normativas RETIE y códigos de seguridad vigentes.',
      'Nuestro equipo de electricistas certificados realiza diagnósticos detallados, diseño de circuitos optimizados, instalación de tableros de distribución y sistemas de protección. Trabajamos con materiales de primera calidad y equipos de última tecnología para garantizar instalaciones seguras y duraderas.',
      'Cada proyecto incluye pruebas exhaustivas de funcionamiento, certificación de la instalación y documentación técnica completa. Ofrecemos mantenimiento preventivo, actualización de sistemas antiguos y soporte técnico especializado para cualquier eventualidad futura.',
    ],
    category: 'Electricidad',
    image:
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1596841961839-c082a8665a8d?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-3',
      name: 'ElectroSeguro Pro',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 3.2,
      reviews: 298,
      experience: '15 años de experiencia',
    },
    pricing: {
      price: 250000,
      originalPrice: 300000,
      currency: 'COP',
      unit: 'por punto eléctrico',
      estimatedDuration: '1-2 días',
      urgentService: true,
      promotions: [
        '10% descuento en instalaciones de más de 10 puntos',
        'Certificación RETIE incluida',
        'Mantenimiento gratuito por 1 año',
      ],
    },
    details: {
      incluye: [
        'Diseño del sistema eléctrico',
        'Instalación de cableado y puntos',
        'Conexión del tablero eléctrico',
        'Instalación de tomas y switches',
        'Pruebas de seguridad',
        'Certificación RETIE',
      ],
      noIncluye: [
        'Materiales eléctricos (cables, switches, etc.)',
        'Adecuaciones arquitectónicas',
        'Conexión del medidor (debe ser realizada por la empresa de energía)',
      ],
    },
    materials: [
      { id: 'mat-8', label: 'Cable THHN 12 AWG', category: 'Cableado' },
      { id: 'mat-9', label: 'Breakers 20A', category: 'Protección' },
      { id: 'mat-10', label: 'Tomas eléctricas', category: 'Accesorios' },
      { id: 'mat-11', label: 'Switches simples', category: 'Control' },
    ],
    reviews: [
      {
        userName: 'Roberto Silva',
        rating: 5,
        comment:
          'Excelente trabajo, muy profesionales y cumplieron con todos los estándares de seguridad.',
        date: '2024-01-08',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
      {
        userName: 'Lucía Fernández',
        rating: 4,
        comment: 'Buen servicio, solo tardaron un poco más de lo estimado.',
        date: '2024-01-05',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 94,
        description: 'Responde dentro de 3 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 97,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía Completa',
        description: '3 años en instalación, 1 año en mano de obra',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas, financiamiento',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial e industrial',
      },
    },
    rating: 4.8,
    reviewCount: 298,
    isAvailable: true,
    location: 'Cali, Colombia',
  },
  {
    id: '4',
    title: 'Carpintería y Muebles a Medida',
    description:
      'Creación de muebles personalizados y trabajos de carpintería fina. Utilizamos maderas de alta calidad y técnicas tradicionales.',
    category: 'Carpintería',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-4',
      name: 'Maestro Carpintero Luis',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 5,
      reviews: 201,
      experience: '20 años de experiencia',
    },
    pricing: {
      price: 180000,
      originalPrice: 220000,
      currency: 'COP',
      unit: 'por metro lineal',
      estimatedDuration: '3-5 días',
      urgentService: false,
      promotions: [
        '15% descuento en proyectos grandes',
        'Diseño 3D gratuito',
        'Instalación incluida',
      ],
    },
    details: {
      incluye: [
        'Diseño personalizado del mueble',
        'Medición precisa del espacio',
        'Corte y ensamblaje de la madera',
        'Acabados y pulimento',
        'Instalación en el lugar',
        'Ajustes finales',
      ],
      noIncluye: [
        'Materiales de madera (cotización aparte)',
        'Modificaciones estructurales',
        'Transporte de materiales pesados',
      ],
    },
    materials: [
      { id: 'mat-12', label: 'Madera de roble', category: 'Maderas nobles' },
      { id: 'mat-13', label: 'MDF de alta densidad', category: 'Tableros' },
      { id: 'mat-14', label: 'Herrajes premium', category: 'Accesorios' },
      { id: 'mat-15', label: 'Barniz poliuretano', category: 'Acabados' },
    ],
    reviews: [
      {
        userName: 'Patricia López',
        rating: 5,
        comment:
          'Quedé encantada con mi closet a medida. La calidad es excepcional.',
        date: '2024-01-14',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 88,
        description: 'Responde dentro de 4 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 99,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Calidad',
        description: '2 años en estructura, 1 año en acabados',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, 50% anticipo',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial y comercial',
      },
    },
    rating: 4.9,
    reviewCount: 201,
    isAvailable: true,
    location: 'Bucaramanga, Colombia',
  },
  {
    id: '5',
    title: 'Pintura Interior y Exterior Profesional',
    description:
      'Servicio completo de pintura para interiores y exteriores. Utilizamos pinturas de alta calidad y técnicas profesionales para acabados duraderos.',
    category: 'Pintura',
    image:
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-5',
      name: 'Pintores Expertos SAS',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.6,
      reviews: 324,
      experience: '10 años de experiencia',
    },
    pricing: {
      price: 15000,
      originalPrice: 18000,
      currency: 'COP',
      unit: 'por metro cuadrado',
      estimatedDuration: '2-4 días',
      urgentService: true,
      promotions: [
        '10% descuento en áreas mayores a 100m²',
        'Segunda mano gratuita',
        'Imprimante incluido',
      ],
    },
    details: {
      incluye: [
        'Preparación de superficies',
        'Aplicación de imprimante',
        'Dos manos de pintura',
        'Protección de muebles y pisos',
        'Limpieza final del área',
        'Retoques finales',
      ],
      noIncluye: [
        'Pintura (debe ser proporcionada por el cliente)',
        'Reparación de grietas mayores',
        'Trabajos en alturas superiores a 4 metros',
      ],
    },
    materials: [
      { id: 'mat-16', label: 'Pintura vinílica premium', category: 'Pinturas' },
      { id: 'mat-17', label: 'Imprimante sellador', category: 'Preparación' },
      {
        id: 'mat-18',
        label: 'Rodillos profesionales',
        category: 'Herramientas',
      },
      { id: 'mat-19', label: 'Cintas de enmascarar', category: 'Protección' },
    ],
    reviews: [
      {
        userName: 'Fernando Castro',
        rating: 4,
        comment: 'Buen trabajo, aunque tardaron un día más de lo acordado.',
        date: '2024-01-11',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 85,
        description: 'Responde dentro de 6 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 91,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Pintura',
        description: '1 año en exteriores, 6 meses en interiores',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y oficinas',
      },
    },
    rating: 4.6,
    reviewCount: 324,
    isAvailable: true,
    location: 'Cartagena, Colombia',
  },
  {
    id: '6',
    title: 'Jardinería y Paisajismo Profesional',
    description:
      'Diseño, instalación y mantenimiento de jardines. Creamos espacios verdes únicos que transforman su ambiente exterior.',
    category: 'Jardinería',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-6',
      name: 'Verde Natura Jardines',
      image:
        'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 189,
      experience: '7 años de experiencia',
    },
    pricing: {
      price: 45000,
      originalPrice: 55000,
      currency: 'COP',
      unit: 'por metro cuadrado',
      estimatedDuration: '1-3 días',
      urgentService: false,
      promotions: [
        '20% descuento en mantenimiento anual',
        'Diseño paisajístico gratuito',
        'Primera poda incluida',
      ],
    },
    details: {
      incluye: [
        'Diseño paisajístico personalizado',
        'Preparación y nivelación del terreno',
        'Siembra de plantas y césped',
        'Sistema de riego básico',
        'Fertilización inicial',
        'Asesoría en mantenimiento',
      ],
      noIncluye: [
        'Plantas y semillas (cotización aparte)',
        'Sistema de riego automatizado',
        'Iluminación de jardín',
      ],
    },
    materials: [
      { id: 'mat-20', label: 'Césped en rollo', category: 'Plantas' },
      { id: 'mat-21', label: 'Tierra negra preparada', category: 'Sustratos' },
      { id: 'mat-22', label: 'Fertilizante orgánico', category: 'Nutrientes' },
      { id: 'mat-23', label: 'Sistema de goteo', category: 'Riego' },
    ],
    reviews: [
      {
        userName: 'Elena Vargas',
        rating: 5,
        comment:
          'Mi jardín quedó hermoso, superó mis expectativas completamente.',
        date: '2024-01-13',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 90,
        description: 'Responde dentro de 5 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 93,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía Verde',
        description: '3 meses en plantas, 6 meses en césped',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, 40% anticipo',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial y espacios comerciales',
      },
    },
    rating: 4.7,
    reviewCount: 189,
    isAvailable: true,
    location: 'Pereira, Colombia',
  },
  {
    id: '7',
    title: 'Limpieza Profunda y Mantenimiento del Hogar',
    description:
      'Servicio integral de limpieza para hogares y oficinas. Utilizamos productos ecológicos y técnicas profesionales para una limpieza impecable.',
    category: 'Limpieza',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-7',
      name: 'LimpiezaTotal Pro',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 412,
      experience: '5 años de experiencia',
    },
    pricing: {
      price: 25000,
      originalPrice: 30000,
      currency: 'COP',
      unit: 'por hora',
      estimatedDuration: '3-5 horas',
      urgentService: true,
      promotions: [
        '15% descuento en servicios recurrentes',
        'Primera limpieza con 20% descuento',
        'Productos de limpieza incluidos',
      ],
    },
    details: {
      incluye: [
        'Limpieza profunda de todas las habitaciones',
        'Aspirado y trapeado de pisos',
        'Limpieza de baños completa',
        'Limpieza de cocina y electrodomésticos',
        'Limpieza de ventanas interiores',
        'Organización básica de espacios',
      ],
      noIncluye: [
        'Limpieza de ventanas exteriores',
        'Limpieza de alfombras especiales',
        'Organización profunda de closets',
      ],
    },
    materials: [
      { id: 'mat-24', label: 'Productos ecológicos', category: 'Limpieza' },
      {
        id: 'mat-25',
        label: 'Microfiber profesional',
        category: 'Herramientas',
      },
      { id: 'mat-26', label: 'Desinfectantes', category: 'Sanitización' },
      { id: 'mat-27', label: 'Aspiradora industrial', category: 'Equipos' },
    ],
    reviews: [
      {
        userName: 'Carmen Jiménez',
        rating: 5,
        comment:
          'Excelente servicio, mi casa quedó impecable y el personal muy profesional.',
        date: '2024-01-16',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
      {
        userName: 'Diego Herrera',
        rating: 4,
        comment: 'Muy buen trabajo, solo sugiero mejorar la puntualidad.',
        date: '2024-01-09',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 96,
        description: 'Responde dentro de 30 minutos',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 98,
        description: 'Completa trabajos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Satisfacción',
        description: 'Re-limpieza gratuita si no queda satisfecho',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, oficinas y comercial',
      },
    },
    rating: 4.8,
    reviewCount: 412,
    isAvailable: true,
    location: 'Barranquilla, Colombia',
  },
  {
    id: '8',
    title: 'Reparación y Mantenimiento de Electrodomésticos',
    description:
      'Servicio técnico especializado en reparación de electrodomésticos. Atendemos neveras, lavadoras, hornos microondas y más.',
    category: 'Electrodomésticos',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-8',
      name: 'TecnoReparaciones Express',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.5,
      reviews: 267,
      experience: '12 años de experiencia',
    },
    pricing: {
      price: 80000,
      originalPrice: 100000,
      currency: 'COP',
      unit: 'por reparación',
      estimatedDuration: '2-4 horas',
      urgentService: true,
      promotions: [
        'Diagnóstico gratuito',
        '10% descuento en repuestos originales',
        'Mantenimiento preventivo incluido',
      ],
    },
    details: {
      incluye: [
        'Diagnóstico completo del electrodoméstico',
        'Reparación del problema identificado',
        'Pruebas de funcionamiento',
        'Limpieza interna del equipo',
        'Recomendaciones de mantenimiento',
        'Garantía en la reparación',
      ],
      noIncluye: [
        'Repuestos (cotización aparte)',
        'Reparaciones de equipos obsoletos',
        'Traslado del electrodoméstico',
      ],
    },
    materials: [
      { id: 'mat-28', label: 'Repuestos originales', category: 'Componentes' },
      {
        id: 'mat-29',
        label: 'Lubricantes especializados',
        category: 'Mantenimiento',
      },
      { id: 'mat-30', label: 'Herramientas de precisión', category: 'Equipos' },
      { id: 'mat-31', label: 'Multímetro digital', category: 'Diagnóstico' },
    ],
    reviews: [
      {
        userName: 'Sandra Morales',
        rating: 4,
        comment: 'Arreglaron mi nevera rápidamente, buen precio y servicio.',
        date: '2024-01-07',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 87,
        description: 'Responde dentro de 4 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 92,
        description: 'Completa reparaciones exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Reparación',
        description: '6 meses en reparación, 3 meses en repuestos',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial y pequeños comercios',
      },
    },
    rating: 4.5,
    reviewCount: 267,
    isAvailable: true,
    location: 'Manizales, Colombia',
  },
  {
    id: '9',
    title: 'Cerrajería y Seguridad Residencial',
    description:
      'Servicio de cerrajería 24/7 y sistemas de seguridad. Instalación, reparación y apertura de cerraduras con técnicas no destructivas.',
    category: 'Seguridad',
    image:
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-9',
      name: 'Cerrajero Seguro 24H',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.6,
      reviews: 156,
      experience: '18 años de experiencia',
    },
    pricing: {
      price: 120000,
      originalPrice: 150000,
      currency: 'COP',
      unit: 'por servicio',
      estimatedDuration: '1-2 horas',
      urgentService: true,
      promotions: [
        'Servicio 24/7 disponible',
        '15% descuento en instalaciones múltiples',
        'Evaluación de seguridad gratuita',
      ],
    },
    details: {
      incluye: [
        'Apertura no destructiva de cerraduras',
        'Instalación de nuevas cerraduras',
        'Duplicado de llaves especializadas',
        'Cambio de combinaciones',
        'Asesoría en seguridad del hogar',
        'Servicio de emergencia',
      ],
      noIncluye: [
        'Cerraduras nuevas (cotización aparte)',
        'Sistemas electrónicos avanzados',
        'Instalación de cámaras de seguridad',
      ],
    },
    materials: [
      { id: 'mat-32', label: 'Cerraduras multipunto', category: 'Seguridad' },
      { id: 'mat-33', label: 'Llaves de seguridad', category: 'Acceso' },
      { id: 'mat-34', label: 'Cilindros europeos', category: 'Mecanismos' },
      { id: 'mat-35', label: 'Herrajes reforzados', category: 'Instalación' },
    ],
    reviews: [
      {
        userName: 'Miguel Ángel Torres',
        rating: 5,
        comment:
          'Servicio rápido y profesional, me ayudaron en plena madrugada.',
        date: '2024-01-06',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 99,
        description: 'Responde inmediatamente (24/7)',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 97,
        description: 'Resuelve emergencias exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Servicio',
        description: '1 año en cerraduras, 6 meses en reparaciones',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas, emergencias',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y emergencias',
      },
    },
    rating: 4.6,
    reviewCount: 156,
    isAvailable: true,
    location: 'Santa Marta, Colombia',
  },

  {
    id: '10',
    title: 'Reparación de Goteras y Filtraciones en Techos',
    description:
      'Solución profesional para problemas de humedad y filtraciones en techos. Utilizamos técnicas avanzadas de impermeabilización.',
    detailedDescription: [
      'Especialistas en identificar y reparar todo tipo de filtraciones en techos planos, inclinados y azoteas. Realizamos diagnóstico con equipos de humedad y ofrecemos soluciones definitivas.',
      'Aplicamos sistemas de impermeabilización con membranas líquidas y asfálticas, garantizando la estanqueidad total de su techo por años.',
      'Nuestro servicio incluye reparación de grietas, tratamiento de juntas y aplicación de productos de alta resistencia a la intemperie.',
    ],
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-10',
      name: 'Impermeabilizaciones Total',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 223,
      experience: '9 años de experiencia',
    },
    pricing: {
      price: 185000,
      originalPrice: 220000,
      currency: 'COP',
      unit: 'por metro cuadrado',
      estimatedDuration: '1-2 días',
      urgentService: true,
      promotions: [
        '10% descuento en áreas mayores a 50m²',
        'Garantía extendida por 5 años',
        'Mantenimiento preventivo incluido',
      ],
    },
    details: {
      incluye: [
        'Diagnóstico de humedad con equipos especializados',
        'Preparación y limpieza de superficies',
        'Aplicación de capa impermeabilizante',
        'Tratamiento de grietas y fisuras',
        'Pruebas de estanqueidad',
        'Limpieza final del área',
      ],
      noIncluye: [
        'Reparaciones estructurales mayores',
        'Cambio de tejas o láminas',
        'Andamios para alturas superiores a 6 metros',
      ],
    },
    materials: [
      {
        id: 'mat-36',
        label: 'Membrana líquida polyurea',
        category: 'Impermeabilización',
      },
      { id: 'mat-37', label: 'Malla de refuerzo', category: 'Refuerzo' },
      { id: 'mat-38', label: 'Primer adherente', category: 'Preparación' },
    ],
    reviews: [
      {
        userName: 'Ricardo Mendoza',
        rating: 5,
        comment:
          'Excelente trabajo, solucionaron filtraciones que tenía hace años. Muy profesionales.',
        date: '2024-01-18',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 91,
        description: 'Responde dentro de 2 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 94,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Impermeabilización',
        description: '5 años en membranas, 2 años en mano de obra',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, 30% anticipo',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial e industrial',
      },
    },
    rating: 4.7,
    reviewCount: 223,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '11',
    title: 'Instalación de Sistema de Riego Automatizado',
    description:
      'Diseño e instalación de sistemas de riego eficientes para jardines residenciales y comerciales.',
    category: 'Jardinería',
    image:
      'https://images.unsplash.com/photo-1573140247632-f2fd2b5d18c9?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1573140247632-f2fd2b5d18c9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-11',
      name: 'Riego Inteligente SAS',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 178,
      experience: '6 años de experiencia',
    },
    pricing: {
      price: 320000,
      originalPrice: 380000,
      currency: 'COP',
      unit: 'por sistema completo',
      estimatedDuration: '2-3 días',
      urgentService: false,
      promotions: [
        'Programador digital incluido',
        'Mantenimiento gratuito por 6 meses',
        'Asesoría en eficiencia hídrica',
      ],
    },
    details: {
      incluye: [
        'Diseño personalizado del sistema',
        'Instalación de tuberías y aspersores',
        'Conexión eléctrica del programador',
        'Pruebas de presión y caudal',
        'Capacitación en el uso del sistema',
        'Mapa de irrigación del jardín',
      ],
      noIncluye: [
        'Excavaciones profundas (>50cm)',
        'Conexión a fuente de agua principal',
        'Permisos municipales requeridos',
      ],
    },
    materials: [
      { id: 'mat-39', label: 'Tubería PVC 1/2"', category: 'Conducción' },
      { id: 'mat-40', label: 'Aspersores pop-up', category: 'Distribución' },
      { id: 'mat-41', label: 'Programador digital', category: 'Control' },
      { id: 'mat-42', label: 'Válvulas solenoides', category: 'Automación' },
    ],
    reviews: [
      {
        userName: 'Isabel Cortés',
        rating: 5,
        comment:
          'Increíble el ahorro de agua, mi jardín nunca se había visto mejor.',
        date: '2024-01-17',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 89,
        description: 'Responde dentro de 4 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 96,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía del Sistema',
        description: '2 años en componentes, 1 año en electrónica',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, financiamiento a 3 meses',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, condominios y campos deportivos',
      },
    },
    rating: 4.8,
    reviewCount: 178,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '12',
    title: 'Montaje y Instalación de Muebles',
    description:
      'Servicio profesional de montaje de muebles modulares, oficinas y dormitorios. Garantizamos instalación perfecta.',
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-12',
      name: 'Montajes Express',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.6,
      reviews: 312,
      experience: '4 años de experiencia',
    },
    pricing: {
      price: 45000,
      originalPrice: 55000,
      currency: 'COP',
      unit: 'por mueble',
      estimatedDuration: '1-2 horas por mueble',
      urgentService: true,
      promotions: [
        '20% descuento en 3 o más muebles',
        'Desmontaje gratuito de muebles antiguos',
        'Ajustes gratuitos por 30 días',
      ],
    },
    details: {
      incluye: [
        'Interpretación de instrucciones de montaje',
        'Ensamblaje completo del mueble',
        'Nivelación y ajuste preciso',
        'Colocación en ubicación final',
        'Pruebas de estabilidad',
        'Limpieza del área de trabajo',
      ],
      noIncluye: [
        'Reparación de piezas defectuosas',
        'Modificaciones al diseño original',
        'Transporte de muebles pesados entre pisos',
      ],
    },
    materials: [
      {
        id: 'mat-43',
        label: 'Kit de herramientas profesionales',
        category: 'Herramientas',
      },
      { id: 'mat-44', label: 'Nivel láser', category: 'Precisión' },
      { id: 'mat-45', label: 'Pegamento para madera', category: 'Adhesivos' },
    ],
    reviews: [
      {
        userName: 'Gabriel Rojas',
        rating: 4,
        comment:
          'Rápidos y eficientes, montaron mi oficina completa en pocas horas.',
        date: '2024-01-16',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 95,
        description: 'Responde dentro de 1 hora',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 98,
        description: 'Completa montajes exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Montaje',
        description: '6 meses en estabilidad y ajustes',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, oficinas y locales comerciales',
      },
    },
    rating: 4.6,
    reviewCount: 312,
    isAvailable: true,
    location: 'Cali, Colombia',
  },
  {
    id: '13',
    title: 'Instalación de Paneles Solares Residenciales',
    description:
      'Sistemas de energía solar para hogares. Reduzca su factura eléctrica con energía limpia y renovable.',
    category: 'Electricidad',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-13',
      name: 'Energía Solar Colombia',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.9,
      reviews: 145,
      experience: '8 años de experiencia',
    },
    pricing: {
      price: 8500000,
      originalPrice: 9500000,
      currency: 'COP',
      unit: 'por sistema básico',
      estimatedDuration: '3-5 días',
      urgentService: false,
      promotions: [
        'Financiamiento a 60 meses',
        'Mantenimiento anual incluido por 2 años',
        'Monitor de consumo energético gratuito',
      ],
    },
    details: {
      incluye: [
        'Estudio de viabilidad solar',
        'Instalación de paneles solares',
        'Inversor y sistema de conversión',
        'Conexión a la red eléctrica',
        'Sistema de monitoreo en tiempo real',
        'Capacitación en el uso del sistema',
      ],
      noIncluye: [
        'Baterías de respaldo (opcional)',
        'Permisos de conexión con la empresa de energía',
        'Estructuras especiales para techos frágiles',
      ],
    },
    materials: [
      { id: 'mat-46', label: 'Paneles solares 450W', category: 'Generación' },
      { id: 'mat-47', label: 'Inversor grid-tie', category: 'Conversión' },
      { id: 'mat-48', label: 'Estructuras aluminio', category: 'Soporte' },
      {
        id: 'mat-49',
        label: 'Cableado solar especial',
        category: 'Conducción',
      },
    ],
    reviews: [
      {
        userName: 'Laura Díaz',
        rating: 5,
        comment: 'Increíble ahorro en la factura de luz, excelente inversión.',
        date: '2024-01-15',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 87,
        description: 'Responde dentro de 6 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 93,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía Extendida',
        description: '25 años en paneles, 10 años en inversor',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Financiamiento, crédito, efectivo, transferencia',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial e industrial',
      },
    },
    rating: 4.9,
    reviewCount: 145,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '14',
    title: 'Limpieza y Desinfección de Tanques de Agua',
    description:
      'Servicio especializado en limpieza y desinfección de tanques elevados y subterráneos. Garantizamos agua limpia y segura.',
    category: 'Limpieza',
    image:
      'https://images.unsplash.com/photo-1545324412-8189d8d89fd2?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1545324412-8189d8d89fd2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-14',
      name: 'AquaLimp Pro',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 267,
      experience: '7 años de experiencia',
    },
    pricing: {
      price: 180000,
      originalPrice: 210000,
      currency: 'COP',
      unit: 'por tanque',
      estimatedDuration: '3-4 horas',
      urgentService: true,
      promotions: [
        '15% descuento en condominios',
        'Análisis bacteriológico gratuito',
        'Desinfección UV incluida',
      ],
    },
    details: {
      incluye: [
        'Vaciado controlado del tanque',
        'Limpieza mecánica de paredes y fondo',
        'Desinfección con productos certificados',
        'Lavado con agua a presión',
        'Análisis de calidad del agua',
        'Certificado de limpieza y desinfección',
      ],
      noIncluye: [
        'Reparación de fisuras o fugas',
        'Cambio de componentes del tanque',
        'Tratamiento de agua para consumo',
      ],
    },
    materials: [
      {
        id: 'mat-50',
        label: 'Desinfectante certificado',
        category: 'Desinfección',
      },
      {
        id: 'mat-51',
        label: 'Equipos de presión profesional',
        category: 'Limpieza',
      },
      {
        id: 'mat-52',
        label: 'Kit de análisis bacteriológico',
        category: 'Calidad',
      },
    ],
    reviews: [
      {
        userName: 'Oscar Ramírez',
        rating: 5,
        comment:
          'Servicio muy profesional, el agua quedó cristalina y sin olores.',
        date: '2024-01-14',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 94,
        description: 'Responde dentro de 2 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 97,
        description: 'Completa limpiezas exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Calidad',
        description: '3 meses en limpieza, 1 mes en análisis bacteriológico',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, facturación',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial, condominios e industrial',
      },
    },
    rating: 4.8,
    reviewCount: 267,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '15',
    title: 'Reparación de Lavadoras y Secadoras',
    description:
      'Servicio técnico especializado en reparación de lavadoras y secadoras de todas las marcas.',
    category: 'Electrodomésticos',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-15',
      name: 'TecnoLavados Express',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.5,
      reviews: 198,
      experience: '10 años de experiencia',
    },
    pricing: {
      price: 75000,
      originalPrice: 90000,
      currency: 'COP',
      unit: 'por reparación',
      estimatedDuration: '1-2 horas',
      urgentService: true,
      promotions: [
        'Diagnóstico gratuito',
        'Limpieza interna incluida',
        'Garantía de 90 días en repuestos',
      ],
    },
    details: {
      incluye: [
        'Diagnóstico completo del equipo',
        'Reparación o cambio de piezas defectuosas',
        'Limpieza de filtros y conductos',
        'Pruebas de funcionamiento completas',
        'Ajuste de programas y configuraciones',
        'Asesoría en mantenimiento preventivo',
      ],
      noIncluye: [
        'Repuestos de alta gama',
        'Tarjetas electrónicas completas',
        'Transporte del equipo al taller',
      ],
    },
    materials: [
      { id: 'mat-53', label: 'Repuestos originales', category: 'Componentes' },
      {
        id: 'mat-54',
        label: 'Kit de herramientas especializadas',
        category: 'Herramientas',
      },
      {
        id: 'mat-55',
        label: 'Productos de limpieza interna',
        category: 'Mantenimiento',
      },
    ],
    reviews: [
      {
        userName: 'Sofia Mendoza',
        rating: 4,
        comment: 'Rápidos y eficientes, repararon mi lavadora el mismo día.',
        date: '2024-01-13',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 92,
        description: 'Responde dentro de 3 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 95,
        description: 'Completa reparaciones exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Reparación',
        description: '90 días en mano de obra y repuestos',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial y lavanderías comerciales',
      },
    },
    rating: 4.5,
    reviewCount: 198,
    isAvailable: true,
    location: 'Barranquilla, Colombia',
  },
  {
    id: '16',
    title: 'Instalación de Persianas y Cortinas',
    description:
      'Servicio completo de instalación de persianas, cortinas y toldos. Medición precisa e instalación profesional.',
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1581848724236-ccaa2a49d8e7?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1581848724236-ccaa2a49d8e7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-16',
      name: 'Decoración Lumínica',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 176,
      experience: '5 años de experiencia',
    },
    pricing: {
      price: 65000,
      originalPrice: 80000,
      currency: 'COP',
      unit: 'por ventana',
      estimatedDuration: '1-2 horas por ventana',
      urgentService: false,
      promotions: [
        '10% descuento en toda la casa',
        'Medición gratuita',
        'Ajustes gratuitos por 30 días',
      ],
    },
    details: {
      incluye: [
        'Medición precisa de ventanas',
        'Instalación de soportes',
        'Colocación de persianas/cortinas',
        'Ajuste y nivelación',
        'Pruebas de funcionamiento',
        'Limpieza final',
      ],
      noIncluye: [
        'Persianas o cortinas (cotización aparte)',
        'Modificaciones en muros',
        'Instalación en alturas extremas',
      ],
    },
    materials: [
      { id: 'mat-56', label: 'Soportes reforzados', category: 'Instalación' },
      {
        id: 'mat-57',
        label: 'Tornillería especializada',
        category: 'Fijación',
      },
      { id: 'mat-58', label: 'Nivel láser', category: 'Precisión' },
    ],
    reviews: [
      {
        userName: 'Catalina Ríos',
        rating: 5,
        comment:
          'Quedaron perfectas las persianas, muy buena atención y puntualidad.',
        date: '2024-01-12',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 88,
        description: 'Responde dentro de 4 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 96,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Instalación',
        description: '1 año en soportes, 6 meses en ajustes',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, oficinas y locales comerciales',
      },
    },
    rating: 4.7,
    reviewCount: 176,
    isAvailable: true,
    location: 'Cartagena, Colombia',
  },
  {
    id: '17',
    title: 'Reparación de Tuberías y Desagües',
    description:
      'Solucionamos problemas de tuberías obstruidas, fugas y desagües lentos. Técnicas modernas sin necesidad de romper.',
    category: 'Plomería',
    image:
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1585128792020-803d29415281?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-17',
      name: 'Tuberías Limpias SAS',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.6,
      reviews: 289,
      experience: '11 años de experiencia',
    },
    pricing: {
      price: 95000,
      originalPrice: 115000,
      currency: 'COP',
      unit: 'por servicio',
      estimatedDuration: '2-3 horas',
      urgentService: true,
      promotions: [
        '20% descuento en destapados recurrentes',
        'Inspección con cámara incluida',
        'Garantía de 6 meses en reparaciones',
      ],
    },
    details: {
      incluye: [
        'Inspección con cámara de video',
        'Destapado con máquina de presión',
        'Limpieza de sedimentos',
        'Reparación de fugas menores',
        'Pruebas de flujo y estanqueidad',
        'Informe técnico del estado de tuberías',
      ],
      noIncluye: [
        'Cambio de tuberías principales',
        'Reparación de colapsos totales',
        'Trabajos de excavación profunda',
      ],
    },
    materials: [
      { id: 'mat-59', label: 'Cámara de inspección', category: 'Diagnóstico' },
      { id: 'mat-60', label: 'Máquina de destapar', category: 'Limpieza' },
      { id: 'mat-61', label: 'Juntas de reparación', category: 'Reparación' },
    ],
    reviews: [
      {
        userName: 'Andrés López',
        rating: 4,
        comment:
          'Solucionaron el problema rápido, aunque el precio fue un poco alto.',
        date: '2024-01-11',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 96,
        description: 'Responde dentro de 1 hora',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 94,
        description: 'Completa reparaciones exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Servicio',
        description: '6 meses en destapados, 3 meses en reparaciones',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial e industrial',
      },
    },
    rating: 4.6,
    reviewCount: 289,
    isAvailable: true,
    location: 'Cali, Colombia',
  },
  {
    id: '18',
    title: 'Instalación de Sistema de Cámaras de Seguridad',
    description:
      'Sistemas completos de videovigilancia para hogares y negocios. Grabación en la nube y monitoreo remoto.',
    category: 'Seguridad',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-18',
      name: 'Vigilancia Tech Pro',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 224,
      experience: '6 años de experiencia',
    },
    pricing: {
      price: 580000,
      originalPrice: 650000,
      currency: 'COP',
      unit: 'por sistema básico 4 cámaras',
      estimatedDuration: '1 día',
      urgentService: true,
      promotions: [
        '1 mes de almacenamiento en la nube gratuito',
        'App móvil incluida',
        'Mantenimiento preventivo por 1 año',
      ],
    },
    details: {
      incluye: [
        'Diseño del sistema de cámaras',
        'Instalación de cámaras y DVR/NVR',
        'Configuración de red y app móvil',
        'Pruebas de visión nocturna',
        'Capacitación en el uso del sistema',
        'Certificado de instalación',
      ],
      noIncluye: [
        'Cámaras especializadas (térmicas, PTZ)',
        'Sistema de respaldo de energía',
        'Monitoreo profesional 24/7',
      ],
    },
    materials: [
      { id: 'mat-62', label: 'Cámaras IP 4MP', category: 'Video' },
      { id: 'mat-63', label: 'DVR/NVR 8 canales', category: 'Grabación' },
      { id: 'mat-64', label: 'Cableado UTP', category: 'Conectividad' },
      { id: 'mat-65', label: 'Fuentes de poder', category: 'Alimentación' },
    ],
    reviews: [
      {
        userName: 'Daniela Castro',
        rating: 5,
        comment:
          'Excelente sistema, puedo monitorear mi negocio desde el celular.',
        date: '2024-01-10',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 93,
        description: 'Responde dentro de 2 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 97,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía del Sistema',
        description: '2 años en equipos, 1 año en mano de obra',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, crédito a 12 meses',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial e industrial',
      },
    },
    rating: 4.8,
    reviewCount: 224,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '19',
    title: 'Poda y Tala de Árboles Controlada',
    description:
      'Servicio profesional de poda y tala de árboles con técnicas de seguridad y cuidado ambiental.',
    category: 'Jardinería',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1573140247632-f2fd2b5d18c9?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-19',
      name: 'Arboristas Profesionales',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 156,
      experience: '9 años de experiencia',
    },
    pricing: {
      price: 120000,
      originalPrice: 150000,
      currency: 'COP',
      unit: 'por árbol',
      estimatedDuration: '2-4 horas por árbol',
      urgentService: true,
      promotions: [
        '15% descuento en 3 o más árboles',
        'Retiro de troncos incluido',
        'Asesoría en cuidado arbóreo gratuita',
      ],
    },
    details: {
      incluye: [
        'Evaluación del estado del árbol',
        'Poda de formación y saneamiento',
        'Tala controlada con cuerdas',
        'Retiro de ramas y troncos',
        'Limpieza del área de trabajo',
        'Disposición ecológica de residuos',
      ],
      noIncluye: [
        'Permisos ambientales requeridos',
        'Tala de árboles patrimoniales',
        'Eliminación de tocones (raíces)',
      ],
    },
    materials: [
      { id: 'mat-66', label: 'Motorsierra profesional', category: 'Corte' },
      { id: 'mat-67', label: 'Equipos de seguridad', category: 'Protección' },
      { id: 'mat-68', label: 'Cuerdas de arborista', category: 'Seguridad' },
    ],
    reviews: [
      {
        userName: 'Roberto Núñez',
        rating: 5,
        comment: 'Muy profesionales, podaron mis árboles sin dañar el jardín.',
        date: '2024-01-09',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 85,
        description: 'Responde dentro de 6 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 92,
        description: 'Completa trabajos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Servicio',
        description: '1 año en podas de formación',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, facturación',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, condominios y empresas',
      },
    },
    rating: 4.7,
    reviewCount: 156,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },

  {
    id: '20',
    title: 'Instalación de Pisos Laminados y Porcelanatos',
    description:
      'Instalación profesional de pisos laminados, porcelanatos y cerámicos. Acabados perfectos y garantía en la instalación.',
    detailedDescription: [
      'Especialistas en la instalación de todo tipo de pisos: laminados, vinílicos, porcelanatos y cerámicos. Realizamos preparación de superficies, nivelación y colocación con técnicas profesionales.',
      'Utilizamos herramientas de precisión para cortes perfectos y alineación exacta. Garantizamos uniones herméticas y acabados que realzan la belleza de su espacio.',
      'Ofrecemos asesoría en la selección de materiales según el tráfico, humedad y estilo de cada ambiente. Incluimos sellado y tratamiento de juntas para mayor durabilidad.',
    ],
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-20',
      name: 'Pisos Perfectos SAS',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 234,
      experience: '8 años de experiencia',
    },
    pricing: {
      price: 45000,
      originalPrice: 55000,
      currency: 'COP',
      unit: 'por metro cuadrado',
      estimatedDuration: '2-3 días',
      urgentService: false,
      promotions: [
        '10% descuento en áreas mayores a 50m²',
        'Material de instalación incluido',
        'Garantía extendida por 3 años',
      ],
    },
    details: {
      incluye: [
        'Preparación y nivelación del piso',
        'Instalación profesional del material',
        'Cortes precisos alrededor de obstáculos',
        'Sellado de juntas y bordes',
        'Limpieza profunda post-instalación',
        'Ajuste de puertas si es necesario',
      ],
      noIncluye: [
        'Piso laminado o porcelanato',
        'Demolición de piso existente',
        'Nivelación mayor a 2cm',
      ],
    },
    materials: [
      {
        id: 'mat-69',
        label: 'Pegamento para porcelanato',
        category: 'Adhesivos',
      },
      { id: 'mat-70', label: 'Sellador siliconado', category: 'Acabados' },
      { id: 'mat-71', label: 'Nivelador de suelos', category: 'Preparación' },
    ],
    reviews: [
      {
        userName: 'Carolina Mejía',
        rating: 5,
        comment:
          'Quedó espectacular el piso, muy profesionales y cuidadosos con el trabajo.',
        date: '2024-01-20',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 91,
        description: 'Responde dentro de 3 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 96,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Instalación',
        description: '3 años en instalación, 1 año en acabados',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas, 40% anticipo',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y oficinas',
      },
    },
    rating: 4.8,
    reviewCount: 234,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '21',
    title: 'Reparación de Computadores y Laptops',
    description:
      'Servicio técnico especializado en reparación de computadores, laptops y equipos de oficina. Diagnóstico gratuito.',
    category: 'Electrodomésticos',
    image:
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-21',
      name: 'TecnoFix Computación',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.6,
      reviews: 189,
      experience: '7 años de experiencia',
    },
    pricing: {
      price: 65000,
      originalPrice: 80000,
      currency: 'COP',
      unit: 'por reparación',
      estimatedDuration: '1-2 días',
      urgentService: true,
      promotions: [
        'Diagnóstico gratuito',
        'Limpieza interna incluida',
        'Instalación de antivirus gratuita',
      ],
    },
    details: {
      incluye: [
        'Diagnóstico completo del equipo',
        'Limpieza interna de componentes',
        'Reparación de hardware',
        'Eliminación de virus y malware',
        'Optimización del sistema operativo',
        'Pruebas de funcionamiento',
      ],
      noIncluye: [
        'Componentes de reemplazo',
        'Licencias de software comercial',
        'Recuperación de datos compleja',
      ],
    },
    materials: [
      {
        id: 'mat-72',
        label: 'Pasta térmica premium',
        category: 'Refrigeración',
      },
      {
        id: 'mat-73',
        label: 'Kit de herramientas de precisión',
        category: 'Herramientas',
      },
      {
        id: 'mat-74',
        label: 'Software de diagnóstico',
        category: 'Diagnóstico',
      },
    ],
    reviews: [
      {
        userName: 'Javier Romero',
        rating: 4,
        comment:
          'Buen servicio, repararon mi laptop rápidamente y a buen precio.',
        date: '2024-01-19',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 94,
        description: 'Responde dentro de 2 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 92,
        description: 'Completa reparaciones exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Reparación',
        description: '3 meses en reparaciones, 1 mes en software',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, estudiantes y pequeñas empresas',
      },
    },
    rating: 4.6,
    reviewCount: 189,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '22',
    title: 'Instalación de Muebles de Cocina a Medida',
    description:
      'Diseño e instalación de cocinas modulares y a medida. Maximizamos espacios con diseños funcionales y estéticos.',
    category: 'Carpintería',
    image:
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-22',
      name: 'Cocinas Diseño Perfecto',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.9,
      reviews: 278,
      experience: '12 años de experiencia',
    },
    pricing: {
      price: 320000,
      originalPrice: 380000,
      currency: 'COP',
      unit: 'por metro lineal',
      estimatedDuration: '5-7 días',
      urgentService: false,
      promotions: [
        'Diseño 3D gratuito',
        'Topes de granito incluidos',
        'Instalación de grifería incluida',
      ],
    },
    details: {
      incluye: [
        'Diseño personalizado de la cocina',
        'Fabricación de muebles a medida',
        'Instalación de gabinetes y alacenas',
        'Colocación de topes y mesones',
        'Instalación de herrajes y accesorios',
        'Ajustes y nivelación final',
      ],
      noIncluye: [
        'Electrodomésticos',
        'Grifería y lavatrastos',
        'Pisos y enchapes',
      ],
    },
    materials: [
      { id: 'mat-75', label: 'Melamina 18mm', category: 'Muebles' },
      { id: 'mat-76', label: 'Granito natural', category: 'Topes' },
      { id: 'mat-77', label: 'Herrajes Blum', category: 'Accesorios' },
    ],
    reviews: [
      {
        userName: 'Marcela Fernández',
        rating: 5,
        comment:
          'Mi cocina quedó soñada, el diseño superó todas mis expectativas.',
        date: '2024-01-18',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 88,
        description: 'Responde dentro de 4 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 95,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía Completa',
        description: '5 años en estructura, 2 años en herrajes',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, crédito a 12 meses',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial y proyectos comerciales',
      },
    },
    rating: 4.9,
    reviewCount: 278,
    isAvailable: true,
    location: 'Cali, Colombia',
  },
  {
    id: '23',
    title: 'Pintura Artística y Murales Decorativos',
    description:
      'Creación de murales artísticos y pintura decorativa para interiores. Transformamos espacios con arte personalizado.',
    category: 'Pintura',
    image:
      'https://images.unsplash.com/photo-1578301978893-2d264c28b29e?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1578301978893-2d264c28b29e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-23',
      name: 'Arte en Paredes Studio',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 145,
      experience: '6 años de experiencia',
    },
    pricing: {
      price: 120000,
      originalPrice: 150000,
      currency: 'COP',
      unit: 'por metro cuadrado',
      estimatedDuration: '2-4 días',
      urgentService: false,
      promotions: [
        'Diseño preliminar gratuito',
        'Pintura acrílica premium incluida',
        'Barniz protector incluido',
      ],
    },
    details: {
      incluye: [
        'Diseño personalizado del mural',
        'Preparación de la superficie',
        'Pintura artística a mano',
        'Aplicación de barniz protector',
        'Retoques y acabados finales',
        'Limpieza del área de trabajo',
      ],
      noIncluye: [
        'Pintura para fondos extensos',
        'Andamios para alturas mayores a 3m',
        'Derechos de autor de diseños comerciales',
      ],
    },
    materials: [
      {
        id: 'mat-78',
        label: 'Pintura acrílica artistica',
        category: 'Pinturas',
      },
      { id: 'mat-79', label: 'Barniz mate protector', category: 'Protección' },
      {
        id: 'mat-80',
        label: 'Pinceles profesionales',
        category: 'Herramientas',
      },
    ],
    reviews: [
      {
        userName: 'Andrea López',
        rating: 5,
        comment:
          'El mural en la habitación de mi hijo quedó increíble, es un artista.',
        date: '2024-01-17',
        avatar:
          'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 85,
        description: 'Responde dentro de 6 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 90,
        description: 'Completa proyectos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Color',
        description: '2 años contra decoloración, 1 año en acabados',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, 50% anticipo',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y espacios públicos',
      },
    },
    rating: 4.7,
    reviewCount: 145,
    isAvailable: true,
    location: 'Bucaramanga, Colombia',
  },
  {
    id: '24',
    title: 'Instalación de Sistema de Alarma Residencial',
    description:
      'Sistemas completos de alarma con sensores, sirenas y monitoreo 24/7. Protección integral para su hogar.',
    category: 'Seguridad',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-24',
      name: 'Alarmas Seguras Pro',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 198,
      experience: '10 años de experiencia',
    },
    pricing: {
      price: 680000,
      originalPrice: 750000,
      currency: 'COP',
      unit: 'por sistema básico',
      estimatedDuration: '1 día',
      urgentService: true,
      promotions: [
        '1 mes de monitoreo gratuito',
        'App de control incluida',
        'Mantenimiento anual gratuito',
      ],
    },
    details: {
      incluye: [
        'Evaluación de seguridad del inmueble',
        'Instalación de panel central',
        'Colocación de sensores de movimiento',
        'Instalación de contactos magnéticos',
        'Configuración y programación',
        'Capacitación en el uso del sistema',
      ],
      noIncluye: [
        'Monitoreo mensual posterior',
        'Sensores adicionales especializados',
        'Sistema de respaldo de energía',
      ],
    },
    materials: [
      { id: 'mat-81', label: 'Panel de control digital', category: 'Control' },
      { id: 'mat-82', label: 'Sensores PIR', category: 'Detección' },
      { id: 'mat-83', label: 'Sirena interior/exterior', category: 'Alerta' },
    ],
    reviews: [
      {
        userName: 'Ricardo Silva',
        rating: 4,
        comment:
          'Buen sistema, la instalación fue rápida y el técnico muy profesional.',
        date: '2024-01-16',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 96,
        description: 'Responde dentro de 1 hora',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 98,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía del Sistema',
        description: '3 años en equipos, 1 año en instalación',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, crédito a 6 meses',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y oficinas',
      },
    },
    rating: 4.8,
    reviewCount: 198,
    isAvailable: true,
    location: 'Barranquilla, Colombia',
  },
  {
    id: '25',
    title: 'Mantenimiento de Piscinas y Jacuzzis',
    description:
      'Servicio completo de mantenimiento, limpieza y reparación de piscinas y jacuzzis. Agua cristalina todo el año.',
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1545324412-8189d8d89fd2?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-25',
      name: 'Piscinas Cristalinas SAS',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 167,
      experience: '8 años de experiencia',
    },
    pricing: {
      price: 150000,
      originalPrice: 180000,
      currency: 'COP',
      unit: 'por mantenimiento mensual',
      estimatedDuration: '2-3 horas',
      urgentService: true,
      promotions: [
        'Primer mantenimiento gratuito',
        'Análisis de agua incluido',
        'Productos de limpieza incluidos',
      ],
    },
    details: {
      incluye: [
        'Limpieza de fondos y paredes',
        'Aspirado y filtrado del agua',
        'Ajuste de niveles químicos',
        'Limpieza de skimmers y cestas',
        'Revisión de equipo de filtrado',
        'Informe de estado de la piscina',
      ],
      noIncluye: [
        'Reparación de equipos de filtrado',
        'Productos químicos de consumo',
        'Reparación de fugas estructurales',
      ],
    },
    materials: [
      { id: 'mat-84', label: 'Kit de análisis de agua', category: 'Control' },
      { id: 'mat-85', label: 'Aspiradora para piscinas', category: 'Limpieza' },
      {
        id: 'mat-86',
        label: 'Productos químicos balanceados',
        category: 'Tratamiento',
      },
    ],
    reviews: [
      {
        userName: 'Gloria Estrada',
        rating: 5,
        comment:
          'Mi piscina nunca había estado tan limpia, servicio muy profesional.',
        date: '2024-01-15',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 89,
        description: 'Responde dentro de 4 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 95,
        description: 'Completa mantenimientos a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Servicio',
        description: 'Satisfacción garantizada o re-limpieza gratuita',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, mensualidad',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, condominios y clubes',
      },
    },
    rating: 4.7,
    reviewCount: 167,
    isAvailable: true,
    location: 'Cartagena, Colombia',
  },
  {
    id: '26',
    title: 'Instalación de Ventanas y Puertas de PVC',
    description:
      'Instalación profesional de ventanas y puertas de PVC. Mayor aislamiento térmico y acústico para su hogar.',
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581848724236-ccaa2a49d8e7?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-26',
      name: 'Ventanas Premium Colombia',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 213,
      experience: '9 años de experiencia',
    },
    pricing: {
      price: 280000,
      originalPrice: 320000,
      currency: 'COP',
      unit: 'por ventana estándar',
      estimatedDuration: '1-2 días',
      urgentService: false,
      promotions: [
        '15% descuento en instalación completa',
        'Vidrio doble acristalamiento incluido',
        'Garantía extendida por 5 años',
      ],
    },
    details: {
      incluye: [
        'Desmontaje de ventanas existentes',
        'Preparación del marco',
        'Instalación de ventana de PVC',
        'Sellado perimetral profesional',
        'Ajuste de herrajes y mecanismos',
        'Limpieza final y pruebas',
      ],
      noIncluye: [
        'Ventana de PVC (cotización aparte)',
        'Modificaciones estructurales',
        'Permisos de construcción',
      ],
    },
    materials: [
      { id: 'mat-87', label: 'Sellante poliuretánico', category: 'Sellado' },
      { id: 'mat-88', label: 'Anclajes químicos', category: 'Fijación' },
      { id: 'mat-89', label: 'Espuma expansiva', category: 'Aislamiento' },
    ],
    reviews: [
      {
        userName: 'Fernando Castro',
        rating: 5,
        comment:
          'Excelente aislamiento, ya no entra el ruido de la calle. Muy recomendado.',
        date: '2024-01-14',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 87,
        description: 'Responde dentro de 5 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 94,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía Completa',
        description: '5 años en perfiles, 2 años en herrajes',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, financiamiento',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y proyectos',
      },
    },
    rating: 4.8,
    reviewCount: 213,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '27',
    title: 'Reparación de Celulares y Tablets',
    description:
      'Servicio técnico especializado en reparación de celulares, tablets y dispositivos móviles. Reparaciones rápidas y garantizadas.',
    category: 'Electrodomésticos',
    image:
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-27',
      name: 'CellFix Express',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.5,
      reviews: 276,
      experience: '5 años de experiencia',
    },
    pricing: {
      price: 55000,
      originalPrice: 70000,
      currency: 'COP',
      unit: 'por reparación básica',
      estimatedDuration: '1-3 horas',
      urgentService: true,
      promotions: [
        'Diagnóstico gratuito',
        'Garantía de 90 días en pantallas',
        'Limpieza interna incluida',
      ],
    },
    details: {
      incluye: [
        'Diagnóstico completo del dispositivo',
        'Cambio de pantalla o display',
        'Reparación de conectores de carga',
        'Limpieza de componentes internos',
        'Pruebas de funcionamiento',
        'Calibración de sensores',
      ],
      noIncluye: [
        'Repuestos de alta gama',
        'Recuperación de datos de dispositivos muertos',
        'Reparación de placas madre quemadas',
      ],
    },
    materials: [
      { id: 'mat-90', label: 'Pantallas originales', category: 'Componentes' },
      {
        id: 'mat-91',
        label: 'Herramientas de precisión',
        category: 'Herramientas',
      },
      { id: 'mat-92', label: 'Adhesivo profesional', category: 'Pegantes' },
    ],
    reviews: [
      {
        userName: 'David Mendoza',
        rating: 4,
        comment:
          'Rápido y económico, repararon la pantalla de mi celular en 2 horas.',
        date: '2024-01-13',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 98,
        description: 'Responde dentro de 30 minutos',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 93,
        description: 'Completa reparaciones exitosamente',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Reparación',
        description: '90 días en pantallas, 60 días en otras reparaciones',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas, Nequi',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Estudiantes, profesionales y empresas',
      },
    },
    rating: 4.5,
    reviewCount: 276,
    isAvailable: true,
    location: 'Cali, Colombia',
  },
  {
    id: '28',
    title: 'Instalación de Iluminación LED y Domótica',
    description:
      'Sistemas de iluminación LED inteligente y soluciones domóticas para hogares modernos. Ahorro energético y control total.',
    category: 'Electricidad',
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-28',
      name: 'Luz Inteligente SAS',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 3.7,
      reviews: 154,
      experience: '6 años de experiencia',
    },
    pricing: {
      price: 180000,
      originalPrice: 220000,
      currency: 'COP',
      unit: 'por sistema básico',
      estimatedDuration: '1-2 días',
      urgentService: false,
      promotions: [
        'App de control gratuita',
        'Asesoría en ahorro energético',
        'Mantenimiento por 1 año incluido',
      ],
    },
    details: {
      incluye: [
        'Diseño del sistema de iluminación',
        'Instalación de focos y tiras LED',
        'Configuración de controladores',
        'Programación de escenas y horarios',
        'Integración con app móvil',
        'Capacitación en el uso del sistema',
      ],
      noIncluye: [
        'Lámparas y focos LED',
        'Sistemas de voz (Alexa, Google)',
        'Integración con otros sistemas domóticos',
      ],
    },
    materials: [
      { id: 'mat-93', label: 'Controlador Wi-Fi', category: 'Control' },
      {
        id: 'mat-94',
        label: 'Sensores de movimiento',
        category: 'Automatización',
      },
      {
        id: 'mat-95',
        label: 'Interruptores inteligentes',
        category: 'Control',
      },
    ],
    reviews: [
      {
        userName: 'Sandra Morales',
        rating: 5,
        comment:
          'Increíble poder controlar toda la iluminación desde mi celular, gran ahorro de energía.',
        date: '2024-01-12',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 90,
        description: 'Responde dentro de 3 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 96,
        description: 'Completa instalaciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía del Sistema',
        description: '2 años en electrónica, 1 año en programación',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, tarjetas',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y proyectos de construcción',
      },
    },
    rating: 4.7,
    reviewCount: 154,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '29',
    title: 'Construcción de Muros en Drywall',
    description:
      'Construcción y reparación de muros, divisiones y cielos rasos en drywall. Soluciones rápidas y limpias.',
    category: 'Hogar',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-29',
      name: 'Drywall Express Colombia',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 3.1,
      reviews: 198,
      experience: '7 años de experiencia',
    },
    pricing: {
      price: 85000,
      originalPrice: 100000,
      currency: 'COP',
      unit: 'por metro cuadrado',
      estimatedDuration: '2-4 días',
      urgentService: false,
      promotions: [
        '10% descuento en proyectos grandes',
        'Pintura inicial incluida',
        'Diseño de distribución gratuito',
      ],
    },
    details: {
      incluye: [
        'Diseño de la distribución',
        'Instalación de estructura metálica',
        'Colocación de placas de drywall',
        'Masillado y lijado de juntas',
        'Instalación de aislamiento acústico',
        'Preparación para pintura',
      ],
      noIncluye: [
        'Pintura final',
        'Instalación eléctrica dentro del muro',
        'Puertas y ventanas',
      ],
    },
    materials: [
      { id: 'mat-96', label: 'Placas de drywall', category: 'Materiales' },
      { id: 'mat-97', label: 'Perfiles metálicos', category: 'Estructura' },
      { id: 'mat-98', label: 'Cinta de refuerzo', category: 'Acabados' },
    ],
    reviews: [
      {
        userName: 'Carlos Andrade',
        rating: 4,
        comment: 'Buen trabajo, dividieron mi apartamento eficientemente.',
        date: '2024-01-11',
        avatar:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=50',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 86,
        description: 'Responde dentro de 5 horas',
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 92,
        description: 'Completa construcciones a tiempo',
      },
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Construcción',
        description: '2 años en estructura, 1 año en acabados',
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, transferencia, 40% anticipo',
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Residencial, comercial y oficinas',
      },
    },
    rating: 4.6,
    reviewCount: 198,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  // Servicios adicionales para completar 4 por categoría
  {
    id: '36',
    title: 'Reparación de Grifos y Llaves',
    description: 'Reparamos todo tipo de grifos, llaves y válvulas con garantía. Solución rápida para goteos y problemas de presión.',
    detailedDescription: [
      'Servicio especializado en la reparación y mantenimiento de grifería doméstica y comercial. Contamos con repuestos originales y herramientas especializadas.',
      'Atendemos problemas de goteo, baja presión, válvulas defectuosas y cambio de cartuchos. Trabajo garantizado con materiales de calidad.',
    ],
    category: 'Plomería',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-36',
      name: 'Plomería Rápida',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      rating: 4.5,
      reviews: 156,
      experience: '8 años de experiencia',
    },
    pricing: {
      price: 45000,
      originalPrice: 55000,
      currency: 'COP',
      unit: 'servicio',
      estimatedDuration: '1-2 horas',
      urgentService: true,
      promotions: ['Descuento 18%'],
    },
    details: {
      incluye: ['Diagnóstico', 'Mano de obra', 'Limpieza del área'],
      noIncluye: ['Repuestos', 'Cartuchos nuevos'],
    },
    materials: [
      { id: 'mat-36-1', label: 'Cartucho estándar' },
      { id: 'mat-36-2', label: 'Empaque de goma' },
    ],
    reviews: [
      {
        userName: 'Ana García',
        rating: 5,
        comment: 'Excelente trabajo, muy rápido y eficiente.',
        date: '2024-01-15',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 95, description: 'Respuesta en menos de 2 horas' },
      completionRate: { title: 'Trabajos Completados', percentage: 98, description: 'Trabajos finalizados exitosamente' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '30 días en mano de obra' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' },
    },
    rating: 4.5,
    reviewCount: 156,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '37',
    title: 'Instalación de Sistemas de Filtrado de Agua',
    description: 'Instalamos sistemas de purificación y filtrado de agua para mejorar la calidad del agua en tu hogar.',
    detailedDescription: [
      'Especialistas en la instalación de sistemas de filtrado y purificación de agua residencial. Mejoramos la calidad del agua eliminando cloro, sedimentos y otros contaminantes.',
      'Ofrecemos diferentes tipos de filtros según las necesidades: filtros de carbón activado, ósmosis inversa, y sistemas UV. Incluye asesoría técnica personalizada.',
    ],
    category: 'Plomería',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-37',
      name: 'AguaPura Instalaciones',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 89,
      experience: '6 años de experiencia',
    },
    pricing: {
      price: 280000,
      originalPrice: 320000,
      currency: 'COP',
      unit: 'instalación',
      estimatedDuration: '2-3 horas',
      urgentService: false,
      promotions: ['Descuento 12%'],
    },
    details: {
      incluye: ['Sistema de filtrado', 'Instalación completa', 'Pruebas de calidad'],
      noIncluye: ['Mantenimiento posterior', 'Cambio de filtros'],
    },
    materials: [
      { id: 'mat-37-1', label: 'Filtro de carbón activado' },
      { id: 'mat-37-2', label: 'Válvulas y conexiones' },
    ],
    reviews: [
      {
        userName: 'Carlos Mendoza',
        rating: 5,
        comment: 'Excelente instalación, el agua sabe mucho mejor ahora.',
        date: '2024-01-10',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 92, description: 'Respuesta en menos de 4 horas' },
      completionRate: { title: 'Trabajos Completados', percentage: 96, description: 'Trabajos finalizados exitosamente' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '1 año en instalación' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, tarjeta, financiación' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial' },
    },
    rating: 4.7,
    reviewCount: 89,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '38',
    title: 'Fabricación de Muebles a Medida',
    description: 'Diseñamos y fabricamos muebles personalizados para tu hogar u oficina con maderas de alta calidad.',
    detailedDescription: [
      'Taller especializado en la fabricación de muebles a medida con más de 10 años de experiencia. Trabajamos con maderas nobles y materiales de primera calidad.',
      'Ofrecemos servicio completo desde el diseño hasta la instalación. Especialistas en closets, cocinas integrales, bibliotecas y mobiliario de oficina.',
    ],
    category: 'Carpintería',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-38',
      name: 'Maderas Artesanales',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.8,
      reviews: 234,
      experience: '10 años de experiencia',
    },
    pricing: {
      price: 850000,
      originalPrice: 950000,
      currency: 'COP',
      unit: 'proyecto',
      estimatedDuration: '5-10 días',
      urgentService: false,
      promotions: ['Descuento 10%'],
    },
    details: {
      incluye: ['Diseño personalizado', 'Fabricación', 'Instalación', 'Acabados'],
      noIncluye: ['Transporte fuera de la ciudad', 'Modificaciones posteriores'],
    },
    materials: [
      { id: 'mat-38-1', label: 'Madera de roble' },
      { id: 'mat-38-2', label: 'Herrajes de calidad' },
    ],
    reviews: [
      {
        userName: 'Sofia Rivera',
        rating: 5,
        comment: 'Muebles hermosos y de excelente calidad, muy recomendado.',
        date: '2024-01-08',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 88, description: 'Respuesta en menos de 1 día' },
      completionRate: { title: 'Trabajos Completados', percentage: 95, description: 'Proyectos finalizados exitosamente' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '2 años en estructura' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia, 50% anticipo' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' },
    },
    rating: 4.8,
    reviewCount: 234,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '39',
    title: 'Restauración de Muebles Antiguos',
    description: 'Devolvemos la vida a tus muebles antiguos con técnicas tradicionales y materiales de calidad.',
    detailedDescription: [
      'Servicio especializado en restauración de muebles antiguos y vintage. Utilizamos técnicas tradicionales de ebanistería para preservar el valor histórico y estético.',
      'Trabajamos con todo tipo de maderas y estilos. Incluye limpieza profunda, reparación de daños, re-barnizado y tapicería si es necesario.',
    ],
    category: 'Carpintería',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1549497538-303791108f95?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-39',
      name: 'Restauraciones Clásicas',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.6,
      reviews: 167,
      experience: '15 años de experiencia',
    },
    pricing: {
      price: 320000,
      originalPrice: 380000,
      currency: 'COP',
      unit: 'pieza',
      estimatedDuration: '3-7 días',
      urgentService: false,
      promotions: ['Descuento 16%'],
    },
    details: {
      incluye: ['Evaluación inicial', 'Limpieza profunda', 'Reparaciones menores', 'Acabado final'],
      noIncluye: ['Tapicería nueva', 'Herrajes nuevos', 'Transporte'],
    },
    materials: [
      { id: 'mat-39-1', label: 'Barnices especiales' },
      { id: 'mat-39-2', label: 'Ceras naturales' },
    ],
    reviews: [
      {
        userName: 'Roberto Castillo',
        rating: 5,
        comment: 'Dejaron mi mesa del comedor como nueva, trabajo impecable.',
        date: '2024-01-05',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 85, description: 'Respuesta en menos de 1 día' },
      completionRate: { title: 'Trabajos Completados', percentage: 94, description: 'Restauraciones exitosas' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '6 meses en acabados' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y coleccionistas' },
    },
    rating: 4.6,
    reviewCount: 167,
    isAvailable: true,
    location: 'Cali, Colombia',
  },
  {
    id: '40',
    title: 'Pintura de Fachadas Exteriores',
    description: 'Renovamos y protegemos las fachadas de tu hogar con pinturas especiales resistentes al clima.',
    detailedDescription: [
      'Servicio especializado en pintura de fachadas exteriores con pinturas de alta resistencia. Protegemos tu inversión contra los efectos del clima.',
      'Incluye preparación de superficies, aplicación de selladores, y pinturas especiales anti-humedad. Utilizamos equipos profesionales y técnicas avanzadas.',
    ],
    category: 'Pintura',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-40',
      name: 'Fachadas Profesionales',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.5,
      reviews: 198,
      experience: '8 años de experiencia',
    },
    pricing: {
      price: 18000,
      originalPrice: 22000,
      currency: 'COP',
      unit: 'metro cuadrado',
      estimatedDuration: '2-4 días',
      urgentService: false,
      promotions: ['Descuento 18%'],
    },
    details: {
      incluye: ['Preparación de superficie', 'Sellador', 'Pintura exterior', 'Limpieza final'],
      noIncluye: ['Reparaciones mayores', 'Andamios especiales'],
    },
    materials: [
      { id: 'mat-40-1', label: 'Pintura exterior premium' },
      { id: 'mat-40-2', label: 'Selladores anti-humedad' },
    ],
    reviews: [
      {
        userName: 'Lucia Morales',
        rating: 5,
        comment: 'Excelente trabajo, la fachada quedó perfecta y muy bien protegida.',
        date: '2024-01-03',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 90, description: 'Respuesta en menos de 6 horas' },
      completionRate: { title: 'Trabajos Completados', percentage: 96, description: 'Proyectos finalizados exitosamente' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '2 años contra defectos' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia, 40% anticipo' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' },
    },
    rating: 4.5,
    reviewCount: 198,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '41',
    title: 'Pintura Decorativa y Técnicas Especiales',
    description: 'Aplicamos técnicas decorativas como esponjado, pátinas y texturas para darle un toque único a tus espacios.',
    detailedDescription: [
      'Especialistas en técnicas decorativas de pintura que transforman completamente tus espacios. Aplicamos esponjado, estarcido, pátinas y texturas especiales.',
      'Creamos ambientes únicos con acabados personalizados. Perfecto para habitaciones temáticas, espacios comerciales y proyectos de interiorismo.',
    ],
    category: 'Pintura',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-41',
      name: 'Arte en Paredes',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.7,
      reviews: 143,
      experience: '12 años de experiencia',
    },
    pricing: {
      price: 35000,
      originalPrice: 45000,
      currency: 'COP',
      unit: 'metro cuadrado',
      estimatedDuration: '1-3 días',
      urgentService: false,
      promotions: ['Descuento 22%'],
    },
    details: {
      incluye: ['Diseño personalizado', 'Preparación', 'Técnica decorativa', 'Acabado protector'],
      noIncluye: ['Pintura base', 'Reparaciones de superficie'],
    },
    materials: [
      { id: 'mat-41-1', label: 'Pinturas especiales' },
      { id: 'mat-41-2', label: 'Herramientas de textura' },
    ],
    reviews: [
      {
        userName: 'Patricia Vega',
        rating: 5,
        comment: 'Transformaron completamente mi sala, el trabajo artístico es increíble.',
        date: '2024-01-01',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 87, description: 'Respuesta en menos de 8 horas' },
      completionRate: { title: 'Trabajos Completados', percentage: 93, description: 'Proyectos artísticos exitosos' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '1 año en acabados decorativos' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' },
    },
    rating: 4.7,
    reviewCount: 143,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
  {
    id: '42',
    title: 'Instalación de Paneles Solares Residenciales',
    description: 'Instalamos sistemas de energía solar para reducir tu consumo eléctrico y contribuir al medio ambiente.',
    detailedDescription: [
      'Especialistas en instalación de sistemas fotovoltaicos residenciales. Ayudamos a reducir tu factura eléctrica hasta en un 80% con energía limpia y renovable.',
      'Incluye estudio de viabilidad, diseño del sistema, instalación completa y tramitología. Sistemas conectados a red con medición bidireccional.',
    ],
    category: 'Electricidad',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-42',
      name: 'SolarTech Colombia',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: 4.9,
      reviews: 312,
      experience: '7 años de experiencia',
    },
    pricing: {
      price: 4800000,
      originalPrice: 5500000,
      currency: 'COP',
      unit: 'sistema básico',
      estimatedDuration: '1-2 días',
      urgentService: false,
      promotions: ['Descuento 13%'],
    },
    details: {
      incluye: ['Paneles solares', 'Inversor', 'Instalación completa', 'Tramitología', 'Garantía'],
      noIncluye: ['Modificaciones eléctricas mayores', 'Estructuras especiales'],
    },
    materials: [
      { id: 'mat-42-1', label: 'Paneles monocristalinos' },
      { id: 'mat-42-2', label: 'Inversor de red' },
    ],
    reviews: [
      {
        userName: 'Fernando López',
        rating: 5,
        comment: 'Excelente inversión, ya estoy viendo el ahorro en la factura.',
        date: '2023-12-28',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 95, description: 'Respuesta en menos de 4 horas' },
      completionRate: { title: 'Trabajos Completados', percentage: 98, description: 'Instalaciones exitosas' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '20 años en paneles, 5 años en inversor' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, financiación, leasing' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' },
    },
    rating: 4.9,
    reviewCount: 312,
    isAvailable: true,
    location: 'Medellín, Colombia',
  },
  {
    id: '43',
    title: 'Diseño y Mantenimiento de Jardines Verticales',
    description: 'Creamos y mantenemos jardines verticales para maximizar el verde en espacios reducidos.',
    detailedDescription: [
      'Especialistas en jardines verticales y muros verdes. Diseñamos soluciones sostenibles que mejoran la calidad del aire y el aspecto estético de tu espacio.',
      'Utilizamos sistemas de riego automatizado y plantas adaptadas al clima local. Incluye diseño, instalación y programa de mantenimiento.',
    ],
    category: 'Jardinería',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=400',
    gallery: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=800',
    ],
    provider: {
      id: 'provider-43',
      name: 'Jardines Verticales Pro',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: 4.6,
      reviews: 187,
      experience: '5 años de experiencia',
    },
    pricing: {
      price: 180000,
      originalPrice: 220000,
      currency: 'COP',
      unit: 'metro cuadrado',
      estimatedDuration: '1-2 días',
      urgentService: false,
      promotions: ['Descuento 18%'],
    },
    details: {
      incluye: ['Diseño personalizado', 'Sistema de riego', 'Plantas incluidas', 'Instalación completa'],
      noIncluye: ['Mantenimiento mensual', 'Reemplazo de plantas'],
    },
    materials: [
      { id: 'mat-43-1', label: 'Estructura modular' },
      { id: 'mat-43-2', label: 'Sistema de riego por goteo' },
    ],
    reviews: [
      {
        userName: 'Marina Jiménez',
        rating: 5,
        comment: 'Mi jardín vertical es hermoso, muy profesional el trabajo.',
        date: '2023-12-25',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=100',
      },
    ],
    metrics: {
      responseRate: { title: 'Tiempo de Respuesta', percentage: 88, description: 'Respuesta en menos de 6 horas' },
      completionRate: { title: 'Trabajos Completados', percentage: 92, description: 'Proyectos finalizados exitosamente' },
    },
    additionalInfo: {
      warranty: { title: 'Garantía', description: '6 meses en plantas, 2 años en sistema' },
      paymentMethods: { title: 'Formas de Pago', description: 'Efectivo, transferencia' },
      clientTypes: { title: 'Tipo de Clientes', description: 'Residencial y comercial' },
    },
    rating: 4.6,
    reviewCount: 187,
    isAvailable: true,
    location: 'Bogotá, Colombia',
  },
]

// Función helper para obtener un servicio por ID
export const getServiceById = (id: string): Service | undefined => {
  return UNIFIED_SERVICES.find((service) => service.id === id)
}

// Función helper para obtener servicios por categoría
export const getServicesByCategory = (category: string): Service[] => {
  return UNIFIED_SERVICES.filter((service) => service.category === category)
}

// Función helper para buscar servicios
export const searchServices = (query: string): Service[] => {
  const searchTerm = query.toLowerCase()
  return UNIFIED_SERVICES.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm) ||
      service.provider.name.toLowerCase().includes(searchTerm)
  )
}

// Exportar las categorías disponibles
export const AVAILABLE_CATEGORIES = [
  'Hogar',
  'Plomería',
  'Electricidad',
  'Carpintería',
  'Pintura',
  'Jardinería',
  'Limpieza',
  'Electrodomésticos',
  'Seguridad',
]
