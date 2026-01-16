
import React from 'react';
import { Search, PlusCircle, RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react';
import { Rental, Movie, Customer } from '../types';

interface RentalsProps {
  rentals: Rental[];
  movies: Movie[];
  customers: Customer[];
}

const Rentals: React.FC<RentalsProps> = ({ rentals, movies, customers }) => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Gestión de Préstamos</h2>
          <p className="text-slate-400">Controla las salidas y entradas de películas.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20">
          <PlusCircle className="w-5 h-5" />
          Nuevo Alquiler
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-lg flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">En curso</p>
            <p className="text-2xl font-bold">{rentals.filter(r => r.status === 'ongoing').length}</p>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-red-500/20 text-red-500 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Retrasos</p>
            <p className="text-2xl font-bold">{rentals.filter(r => r.status === 'overdue').length}</p>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-400 text-sm">Cerrados hoy</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Película</th>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Fecha Préstamo</th>
                <th className="px-6 py-4 font-semibold">Vencimiento</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {rentals.map((rental) => {
                const movie = movies.find(m => m.id === rental.movieId);
                const customer = customers.find(c => c.id === rental.customerId);
                return (
                  <tr key={rental.id} className="hover:bg-slate-700/20 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={movie?.coverUrl} className="w-10 h-14 object-cover rounded shadow" alt="" />
                        <span className="font-semibold">{movie?.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300">{customer?.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-400 text-sm">{rental.loanDate}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${rental.status === 'overdue' ? 'text-red-500' : 'text-slate-400'}`}>
                        {rental.dueDate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        rental.status === 'returned' ? 'bg-green-500/10 text-green-500' : 
                        rental.status === 'overdue' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                      }`}>
                        {rental.status === 'returned' && <CheckCircle className="w-3 h-3" />}
                        {rental.status === 'overdue' && <AlertTriangle className="w-3 h-3" />}
                        {rental.status === 'ongoing' && <RotateCcw className="w-3 h-3" />}
                        {rental.status === 'returned' ? 'Devuelto' : rental.status === 'overdue' ? 'Retrasado' : 'Activo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {rental.status !== 'returned' && (
                        <button className="text-amber-500 hover:text-amber-400 text-sm font-bold flex items-center gap-1 ml-auto">
                          Procesar Devolución
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rentals;
