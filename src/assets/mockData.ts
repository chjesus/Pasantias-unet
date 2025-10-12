export interface Service {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
}

export interface ServiceCategory {
  id: string
  title: string
  icon: string
  services: SimpleService[]
}

export interface SimpleService {
  id: string
  title: string
  provider: string
  rating: number
  price: number
  image: string
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'plumbing',
    title: 'Servicios de Plomería',
    icon: 'plumbing',
    services: [
      {
        id: 'p1',
        title: 'Reparación de Fugas',
        provider: 'AquaFix',
        rating: 4.0,
        price: 60000,
        image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'p2',
        title: 'Instalación de Calentadores',
        provider: 'HydroSol',
        rating: 5.0,
        price: 150000,
        image: 'https://images.unsplash.com/photo-1585670149967-0b0d2d62e596?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'p3',
        title: 'Mantenimiento de Sanitarios',
        provider: 'Sanitarios Pro',
        rating: 4.0,
        price: 50000,
        image: 'https://images.unsplash.com/photo-1632826107059-9a6e4dc24140?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'p4',
        title: 'Desatasco de Tuberías',
        provider: 'RapidoDren',
        rating: 4.0,
        price: 70000,
        image: 'https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=2960&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'electrical',
    title: 'Servicios Eléctricos',
    icon: 'electric',
    services: [
      {
        id: 'e1',
        title: 'Instalación de Luces LED',
        provider: 'EcoLight',
        rating: 4.5,
        price: 80000,
        image: 'https://images.unsplash.com/photo-1565843708714-52ecf69ab81f?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'e2',
        title: 'Revisión de Instalación',
        provider: 'ElectroCheck',
        rating: 4.8,
        price: 120000,
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'e3',
        title: 'Instalación de Paneles Solares',
        provider: 'SolarTech',
        rating: 4.7,
        price: 450000,
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'e4',
        title: 'Mantenimiento Eléctrico',
        provider: 'ElectroMant',
        rating: 4.2,
        price: 90000,
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2960&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'carpentry',
    title: 'Carpintería',
    icon: 'carpenter',
    services: [
      {
        id: 'c1',
        title: 'Restauración de Muebles',
        provider: 'WoodMaster',
        rating: 4.9,
        price: 180000,
        image: 'https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'c2',
        title: 'Instalación de Pisos',
        provider: 'FloorPro',
        rating: 4.6,
        price: 200000,
        image: 'https://images.unsplash.com/photo-1513467655676-561b7d489a88?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'c3',
        title: 'Fabricación de Closets',
        provider: 'ClosetCraft',
        rating: 4.8,
        price: 350000,
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'c4',
        title: 'Reparación de Puertas',
        provider: 'DoorFix',
        rating: 4.3,
        price: 85000,
        image: 'https://images.unsplash.com/photo-1517646331032-9e8563c520a1?q=80&w=2960&auto=format&fit=crop',
      }
    ]
  },
  {
    id: 'locksmith',
    title: 'Cerrajería',
    icon: 'lock',
    services: [
      {
        id: 'l1',
        title: 'Apertura de Cerraduras',
        provider: 'LockPro',
        rating: 4.8,
        price: 65000,
        image: 'https://images.unsplash.com/photo-1583744513233-0ea667c4ab4c?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'l2',
        title: 'Instalación de Cerraduras Biométricas',
        provider: 'SmartLock',
        rating: 4.9,
        price: 250000,
        image: 'https://images.unsplash.com/photo-1587613864521-9ef8dfe617cc?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'l3',
        title: 'Duplicado de Llaves',
        provider: 'KeyMaster',
        rating: 4.7,
        price: 25000,
        image: 'https://images.unsplash.com/photo-1581385339821-5b358673a883?q=80&w=2960&auto=format&fit=crop',
      },
      {
        id: 'l4',
        title: 'Cambio de Combinación de Cajas Fuertes',
        provider: 'SafeGuard',
        rating: 4.9,
        price: 180000,
        image: 'https://images.unsplash.com/photo-1582130107203-4dc445599795?q=80&w=2960&auto=format&fit=crop',
      }
    ]
  }
];

export const featuredServices: Service[] = [
  {
    id: '1',
    title: 'Instalación de Grifos Modernos',
    description: 'Servicio de fontanería de alta calidad.',
    price: 75000,
    originalPrice: 90000,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1584570845859-599527425b67?q=80&w=2960&auto=format&fit=crop',
  },
  {
    id: '2', 
    title: 'Instalación de Cámaras de Seguridad',
    description: 'Protege tu hogar con nuestros expertos.',
    price: 180000,
    image: 'https://images.unsplash.com/photo-1557317605-3d20b528258d?q=80&w=2960&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Diseño y Creación de Libreros a medida',
    description: 'Muebles personalizados para tu espacio.',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1588279102459-631a4a544c17?q=80&w=2960&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Actualización a Cerraduras Inteligentes', 
    description: 'Máxima seguridad y comodidad.',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2960&auto=format&fit=crop',
  }
];
