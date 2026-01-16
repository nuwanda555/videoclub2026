
import { Movie, Customer, Rental } from './types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Pulp Fiction',
    genre: 'Crimen, Drama',
    year: 1994,
    rating: 'R',
    stock: 5,
    available: 3,
    description: 'Las vidas de dos sicarios, un boxeador, la esposa de un gánster y dos bandidos se entrelazan en cuatro historias de violencia y redención.',
    coverUrl: 'https://picsum.photos/seed/pulp/400/600',
    category: 'Clásicos'
  },
  {
    id: 'm2',
    title: 'Interstellar',
    genre: 'Sci-Fi, Drama',
    year: 2014,
    rating: 'PG-13',
    stock: 3,
    available: 1,
    description: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',
    coverUrl: 'https://picsum.photos/seed/inter/400/600',
    category: 'Sci-Fi'
  },
  {
    id: 'm3',
    title: 'El Padrino',
    genre: 'Crimen, Drama',
    year: 1972,
    rating: 'R',
    stock: 4,
    available: 4,
    description: 'El patriarca de una organización criminal transfiere el control de su imperio clandestino a su hijo reacio.',
    coverUrl: 'https://picsum.photos/seed/godfather/400/600',
    category: 'Clásicos'
  },
  {
    id: 'm4',
    title: 'Parasite',
    genre: 'Thriller, Comedia',
    year: 2019,
    rating: 'R',
    stock: 6,
    available: 2,
    description: 'La codicia y la discriminación de clase amenazan la relación recién formada entre la adinerada familia Park y el clan Kim, que vive en la pobreza.',
    coverUrl: 'https://picsum.photos/seed/parasite/400/600',
    category: 'Cine Coreano'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Juan Pérez',
    email: 'juan@example.com',
    phone: '555-0101',
    memberSince: '2023-01-15',
    totalLoans: 12,
    status: 'active'
  },
  {
    id: 'c2',
    name: 'María García',
    email: 'maria@example.com',
    phone: '555-0102',
    memberSince: '2023-05-20',
    totalLoans: 8,
    status: 'active'
  },
  {
    id: 'c3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    phone: '555-0103',
    memberSince: '2022-11-10',
    totalLoans: 25,
    status: 'suspended'
  }
];

export const INITIAL_RENTALS: Rental[] = [
  {
    id: 'r1',
    customerId: 'c1',
    movieId: 'm1',
    loanDate: '2024-05-10',
    dueDate: '2024-05-13',
    fee: 3.50,
    lateFee: 0,
    status: 'ongoing'
  },
  {
    id: 'r2',
    customerId: 'c2',
    movieId: 'm4',
    loanDate: '2024-05-01',
    dueDate: '2024-05-04',
    returnDate: '2024-05-04',
    fee: 3.50,
    lateFee: 0,
    status: 'returned'
  }
];

export const GENRES = [
  'Acción', 'Comedia', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Documental', 'Animación', 'Crimen', 'Fantasía'
];

export const CATEGORIES = [
  'Novedades', 'Clásicos', 'Acción', 'Cine Coreano', 'Familiar', 'Independiente'
];
