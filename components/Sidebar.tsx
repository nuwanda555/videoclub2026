
import React from 'react';
import { LayoutDashboard, Film, Users, Ticket, Sparkles, LogOut } from 'lucide-react';
import { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventario', icon: Film },
    { id: 'customers', label: 'Clientes', icon: Users },
    { id: 'rentals', label: 'Préstamos', icon: Ticket },
    { id: 'ai-assistant', label: 'Asistente IA', icon: Sparkles },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-amber-500 flex items-center gap-2">
          <Film className="w-8 h-8" />
          CineMaster
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2 py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive 
                  ? 'bg-amber-500/10 text-amber-500' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
