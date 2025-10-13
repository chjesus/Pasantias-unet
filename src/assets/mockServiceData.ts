export const mockServicesData = {
  '1': {
    id: '1',
    title: 'Instalación y Mantenimiento de Sistemas de Climatización',
    description: 'Expertos en soluciones de aire acondicionado y calefacción para hogares y empresas. Garantizamos un ambiente óptimo con eficiencia energética y confort duradero.',
    price: 108000,
    provider: {
      name: 'ClimaPro Solutions',
      rating: 4.9,
      reviews: 387,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
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
      ]
    },
    pricing: {
      price: 108000,
      originalPrice: 110000,
      currency: 'COP',
      unit: '/hora',
      estimatedDuration: '2-4 Horas por unidad',
      promotions: [
        '10% de descuento en la primera contratación (código PRIMERACITA)',
        'Mantenimiento preventivo anual con tarifa reducida'
      ],
      urgentService: true
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Servicio',
        description: 'Todos nuestros trabajos tienen 1 año de garantía.'
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Aceptamos efectivo, tarjeta de crédito/débito y transferencia bancaria.'
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Servicios residenciales y comerciales.'
      }
    },
    coverage: 'Todo Santiago y alrededores (Consulta el mapa de cobertura)',
    availability: 'Lunes a Domingo, 8:00 - 20:00 hrs',
    gallery: [
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2960&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2960&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1588279102459-631a4a544c17?q=80&w=2960&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581385339821-5b358673a883?q=80&w=2960&auto=format&fit=crop',
    ],
    reviews: [
      {
        userName: 'Ana Gómez',
        rating: 5,
        date: '15/03/2024',
        comment: 'Excelente servicio de instalación de aire acondicionado. Muy profesionales y rápidos. ¡Recomendados al 100%!',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&q=80&w=100'
      },
      {
        userName: 'Sofía López',
        rating: 5,
        date: '01/01/2024',
        comment: 'Necesitaba una reparación urgente y respondieron de inmediato. Resolvieron el problema eficazmente. ¡Gracias ClimaPro!',
        // Sin avatar para probar el icono
      },
      {
        userName: 'Pedro Martínez',
        rating: 4,
        date: '28/11/2023',
        comment: 'Buena atención y explicación del servicio. El precio fue justo por el trabajo realizado. Satisfecho con el resultado.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
      },
      {
        userName: 'Carmen Rodríguez',
        rating: 5,
        date: '10/10/2023',
        comment: 'Servicio impecable. Llegaron puntuales y terminaron antes de lo previsto. El aire funciona perfectamente.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100'
      },
      {
        userName: 'Roberto Silva',
        rating: 4.5,
        date: '05/09/2023',
        comment: 'Muy profesionales y explicaron todo el proceso. Precio competitivo y garantía de calidad.',
      },
      {
        userName: 'Laura Fernández',
        rating: 5,
        date: '22/08/2023',
        comment: 'Recomiendo totalmente ClimaPro. Solucionaron un problema complejo que otros técnicos no pudieron resolver.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      },
      {
        userName: 'Miguel Torres',
        rating: 4,
        date: '15/07/2023',
        comment: 'Buen servicio de mantenimiento. Detectaron problemas que no sabía que tenía. Trabajo eficiente.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
      },
      {
        userName: 'Patricia González',
        rating: 5,
        date: '03/06/2023',
        comment: 'Excelente atención al cliente y seguimiento post-servicio. El equipo quedó como nuevo.',
      },
      {
        userName: 'David Morales',
        rating: 4.5,
        date: '18/05/2023',
        comment: 'Muy satisfecho con la instalación. Personal capacitado y materiales de calidad.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100'
      }
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 95,
        description: 'Responde rápidamente a todas las solicitudes de servicio y consultas de los clientes.'
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 98,
        description: 'Completa exitosamente casi todos los servicios contratados con alta satisfacción.'
      }
    },
    materials: [
      { id: '1', label: 'Cobre', category: 'metal' },
      { id: '2', label: 'Aislamiento', category: 'thermal' },
      { id: '3', label: 'Soportes', category: 'structure' },
      { id: '4', label: 'Refrigerante', category: 'fluid' },
      { id: '5', label: 'Conductos', category: 'ventilation' },
      { id: '6', label: 'Filtros', category: 'maintenance' },
      { id: '7', label: 'Válvulas', category: 'control' },
      { id: '8', label: 'Termostatos', category: 'control' }
    ]
  },
  '2': {
    id: '2',
    title: 'Instalación de Sistemas Eléctricos Residenciales',
    description: 'Servicios especializados en instalación y mantenimiento de sistemas eléctricos para hogares. Garantizamos instalaciones seguras y eficientes con materiales certificados.',
    price: 95000,
    provider: {
      name: 'ElectroTech Pro',
      rating: 4.8,
      reviews: 254,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    },
    details: {
      incluye: [
        'Diagnóstico del sistema eléctrico existente',
        'Instalación de nuevos circuitos',
        'Conexión de electrodomésticos',
        'Instalación de tableros eléctricos',
        'Pruebas de seguridad y funcionamiento',
        'Certificación de instalación',
      ],
      noIncluye: [
        'Materiales eléctricos especializados',
        'Excavación para tendido subterráneo',
        'Permisos municipales',
        'Trabajo en horarios nocturnos',
      ]
    },
    pricing: {
      price: 95000,
      originalPrice: 98000,
      currency: 'COP',
      unit: '/punto',
      estimatedDuration: '3-5 Horas por instalación',
      promotions: [
        '15% de descuento en la segunda instalación',
        'Revisión gratuita al mes de la instalación'
      ],
      urgentService: false
    },
    additionalInfo: {
      warranty: {
        title: 'Garantía de Servicio',
        description: 'Garantía de 2 años en todas las instalaciones.'
      },
      paymentMethods: {
        title: 'Métodos de Pago',
        description: 'Efectivo, tarjeta de crédito/débito, transferencia bancaria y financiamiento.'
      },
      clientTypes: {
        title: 'Tipo de Clientes',
        description: 'Servicios residenciales y comerciales pequeños.'
      }
    },
    coverage: 'Bogotá y municipios aledaños',
    availability: 'Lunes a Viernes, 7:00 - 18:00 hrs',
    gallery: [
      'https://images.unsplash.com/photo-1621905252011-b8b374b7bb5c?q=80&w=2960&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2960&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=2960&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2960&auto=format&fit=crop',
    ],
    reviews: [
      {
        userName: 'Carlos Mendoza',
        rating: 5,
        date: '20/03/2024',
        comment: 'Excelente trabajo eléctrico. Muy profesionales y cumplieron con los tiempos acordados.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
      },
      {
        userName: 'María Jiménez',
        rating: 4.5,
        date: '10/02/2024',
        comment: 'Muy buen servicio, instalaron todo correctamente y explicaron el mantenimiento.',
      },
    ],
    metrics: {
      responseRate: {
        title: 'Tasa de Respuesta',
        percentage: 92,
        description: 'Respuesta rápida a consultas sobre instalaciones eléctricas.'
      },
      completionRate: {
        title: 'Tasa de Finalización',
        percentage: 96,
        description: 'Alto índice de satisfacción en servicios eléctricos.'
      }
    },
    materials: [
      { id: '1', label: 'Cable THHN', category: 'electrical' },
      { id: '2', label: 'Conduit', category: 'protection' },
      { id: '3', label: 'Breakers', category: 'safety' },
      { id: '4', label: 'Tomas', category: 'outlets' },
      { id: '5', label: 'Interruptores', category: 'switches' },
    ]
  }
}

export type ServiceData = typeof mockServicesData['1']

// Función helper para obtener servicio por ID
export const getServiceById = (id: string): ServiceData | null => {
  return mockServicesData[id as keyof typeof mockServicesData] || null
}