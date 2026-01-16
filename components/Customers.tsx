
import React from 'react';
import { Search, UserPlus, Mail, Phone, Calendar, MoreVertical } from 'lucide-react';
import { Customer } from '../types';

interface CustomersProps {
  customers: Customer[];
}

const Customers: React.FC<CustomersProps> = ({ customers }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Base de Clientes</h2>
          <p className="text-slate-400">Gestiona las membresías y datos de contacto.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20">
          <UserPlus className="w-5 h-5" />
          Registrar Cliente
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-700">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, email o ID..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-12 pr-4 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Cliente</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold">Desde</th>
                <th className="px-6 py-4 font-semibold text-center">Alquileres</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-amber-500">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{customer.name}</p>
                        <p className="text-xs text-slate-500">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Mail className="w-3 h-3" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Phone className="w-3 h-3" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Calendar className="w-4 h-4 text-slate-500" />
                      {customer.memberSince}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-slate-200">{customer.totalLoans}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      customer.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {customer.status === 'active' ? 'Activo' : 'Suspendido'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Customers;
