
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import AIAssistant from './components/AIAssistant';
import { ViewType, Movie, Customer, Rental } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesData, customersData, rentalsData] = await Promise.all([
          api.getMovies(),
          api.getCustomers(),
          api.getRentals()
        ]);
        setMovies(moviesData);
        setCustomers(customersData);
        setRentals(rentalsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard movies={movies} customers={customers} rentals={rentals} />;
      case 'inventory':
        return <Inventory movies={movies} />;
      case 'customers':
        return <Customers customers={customers} />;
      case 'rentals':
        return <Rentals rentals={rentals} movies={movies} customers={customers} />;
      case 'ai-assistant':
        return <AIAssistant inventory={movies} />;
      default:
        return <Dashboard movies={movies} customers={customers} rentals={rentals} />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />

      <main className="flex-1 ml-64 p-8 lg:p-12 transition-all">
        <div className="max-w-7xl mx-auto pb-12">
          {renderView()}
        </div>
      </main>

      {/* Persistent Call to Action for Quick Rent - Floating Action Button for Mobile experience */}
      <button className="fixed bottom-8 right-8 bg-amber-500 hover:bg-amber-600 text-slate-900 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/40 lg:hidden transition-transform hover:scale-110 active:scale-95 z-50">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" /></svg>
      </button>
    </div>
  );
};

export default App;
