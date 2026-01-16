
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Movie, Customer, Rental } from '../types';

interface DashboardProps {
  movies: Movie[];
  customers: Customer[];
  rentals: Rental[];
}

const Dashboard: React.FC<DashboardProps> = ({ movies, customers, rentals }) => {
  const activeRentals = rentals.filter(r => r.status === 'ongoing').length;
  const overdueRentals = rentals.filter(r => r.status === 'overdue').length;
  const totalAvailable = movies.reduce((acc, m) => acc + m.available, 0);

  const stats = [
    { label: 'Préstamos Activos', value: activeRentals, icon: TicketIcon, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Retrasos Pendientes', value: overdueRentals, icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { label: 'Películas Disponibles', value: totalAvailable, icon: FilmIcon, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Clientes Totales', value: customers.length, icon: UsersIcon, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  const chartData = [
    { name: 'Lun', rentals: 4 },
    { name: 'Mar', rentals: 7 },
    { name: 'Mie', rentals: 12 },
    { name: 'Jue', rentals: 9 },
    { name: 'Vie', rentals: 18 },
    { name: 'Sab', rentals: 25 },
    { name: 'Dom', rentals: 14 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-3xl font-bold">Bienvenido de nuevo, Administrador</h2>
        <p className="text-slate-400">Aquí tienes un resumen de la actividad de hoy en el videoclub.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-amber-500" />
            Tendencia de Préstamos Semanal
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="rentals" stroke="#f59e0b" strokeWidth={3} dot={{ r: 6, fill: '#f59e0b' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Clock className="text-amber-500" />
            Acciones Recientes
          </h3>
          <div className="space-y-4">
            {rentals.slice(0, 4).map((rental, idx) => {
              const customer = customers.find(c => c.id === rental.customerId);
              const movie = movies.find(m => m.id === rental.movieId);
              return (
                <div key={idx} className="flex items-center gap-4 p-3 hover:bg-slate-700/30 rounded-lg transition-colors border border-transparent hover:border-slate-600">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${rental.status === 'returned' ? 'bg-green-500/20 text-green-500' : 'bg-blue-500/20 text-blue-500'}`}>
                    {rental.status === 'returned' ? <CheckCircle2 className="w-5 h-5" /> : <TicketIcon className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{customer?.name}</p>
                    <p className="text-xs text-slate-400 truncate">{rental.status === 'returned' ? 'Devolvió' : 'Alquiló'} {movie?.title}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">{rental.loanDate}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple icon helpers because of scope
const TicketIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v2"/><path d="M13 17v2"/><path d="M13 11v2"/></svg>
);
const FilmIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M17 3v18"/><path d="M3 7h4"/><path d="M3 12h4"/><path d="M3 17h4"/><path d="M17 7h4"/><path d="M17 12h4"/><path d="M17 17h4"/></svg>
);
const UsersIcon = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

export default Dashboard;
