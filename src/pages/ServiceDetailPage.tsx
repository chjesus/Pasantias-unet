import { Container, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

// Mock data - Reemplazar con datos reales de tu API
const mockServiceData = {
  id: '1',
  title: 'Instalación y Mantenimiento de Climatización',
  description: 'Servicio profesional de instalación y mantenimiento de sistemas de climatización. Incluye diagnóstico, reparación y optimización de equipos de aire acondicionado. Nuestros técnicos certificados garantizan un trabajo de calidad y eficiencia energética para su hogar o negocio.',
  price: 108000,
  provider: {
    name: 'ClimaFix Solutions',
    rating: 4.8,
    reviews: 156,
    image: '/path/to/provider-image.jpg',
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
  coverage: 'Todo Santiago y alrededores (Consulta el mapa de cobertura)',
  availability: 'Lunes a Domingo, 8:00 - 20:00 hrs',
  gallery: [
    '/path/to/image1.jpg',
    '/path/to/image2.jpg',
    '/path/to/image3.jpg',
    '/path/to/image4.jpg',
  ],
  reviews: [
    {
      userName: 'Ana García',
      rating: 5,
      comment: 'Excelente servicio, muy profesionales y puntuales. El técnico explicó todo el proceso detalladamente.',
      avatar: '/path/to/avatar1.jpg'
    },
    {
      userName: 'Carlos Mendoza',
      rating: 4.5,
      comment: 'Buen trabajo en la instalación del aire acondicionado. El equipo quedó funcionando perfectamente.',
      avatar: '/path/to/avatar2.jpg'
    },
    {
      userName: 'María Rodríguez',
      rating: 5,
      comment: 'Super recomendados. Resolvieron el problema de mi aire acondicionado rápidamente.',
      avatar: '/path/to/avatar3.jpg'
    }
  ],
};

const ServiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // Aquí deberías hacer la llamada a tu API usando el id
  // const { data, loading, error } = useQuery(GET_SERVICE, { variables: { id } });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <h1>HOla</h1>
    </Container>
  );
};

export default ServiceDetailPage;