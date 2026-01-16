
export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: string;
  stock: number;
  available: number;
  description: string;
  coverUrl: string;
  category: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  memberSince: string;
  totalLoans: number;
  status: 'active' | 'suspended';
}

export interface Rental {
  id: string;
  customerId: string;
  movieId: string;
  loanDate: string;
  dueDate: string;
  returnDate?: string;
  fee: number;
  lateFee: number;
  status: 'ongoing' | 'returned' | 'overdue';
}

export type ViewType = 'dashboard' | 'inventory' | 'customers' | 'rentals' | 'ai-assistant';
