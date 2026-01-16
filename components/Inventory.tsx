
import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, Box } from 'lucide-react';
import { Movie } from '../types';
// Fix: Import GENRES and CATEGORIES from constants.ts where they are defined
import { GENRES, CATEGORIES } from '../constants';

interface InventoryProps {
  movies: Movie[];
}

const Inventory: React.FC<InventoryProps> = ({ movies }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('Todos');

  const filteredMovies = movies.filter(movie => 
    (searchTerm === '' || movie.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedGenre === 'Todos' || movie.genre.includes(selectedGenre))
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Catálogo de Películas</h2>
          <p className="text-slate-400">Gestiona las existencias y detalles de los títulos.</p>
        </div>
        <button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20">
          <Plus className="w-5 h-5" />
          Nueva Película
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por título..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          <select 
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 min-w-[150px]"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option>Todos</option>
            {GENRES.map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="group bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all">
            <div className="aspect-[2/3] relative overflow-hidden">
              <img 
                src={movie.coverUrl} 
                alt={movie.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-500 border border-amber-500/30">
                {movie.category}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="bg-amber-500 text-slate-900 px-2 py-0.5 rounded font-bold text-xs">
                  {movie.year}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-slate-900/80 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-slate-900/80 hover:bg-red-500/80 rounded-lg transition-colors border border-slate-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-5">
              <h4 className="text-lg font-bold truncate">{movie.title}</h4>
              <p className="text-slate-400 text-sm mb-4 truncate">{movie.genre}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm">
                  <Box className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-400">Stock:</span>
                  <span className={`font-bold ${movie.available === 0 ? 'text-red-500' : 'text-slate-200'}`}>
                    {movie.available}/{movie.stock}
                  </span>
                </div>
                <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                  movie.available > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  {movie.available > 0 ? 'Disponible' : 'Agotado'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
