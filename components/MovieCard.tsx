
import React from 'react';
import { Star, Play, Plus, Sparkles } from 'lucide-react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  aiReason?: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect, aiReason }) => {
  return (
    <div 
      onClick={() => onSelect(movie)}
      className="relative aspect-[2/3] group cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#121417]"
    >
      <img 
        src={movie.imageUrl} 
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-3 h-3 fill-current" />
            <span className="text-xs font-bold text-white">{movie.rating}</span>
          </div>
          <span className="text-[10px] text-gray-400 font-medium px-1.5 py-0.5 border border-white/10 rounded uppercase">
            {movie.year}
          </span>
        </div>

        <h3 className="text-lg font-bold text-white leading-tight mb-3 line-clamp-1 uppercase italic tracking-tighter">
          {movie.title}
        </h3>

        {aiReason && (
          <div className="mb-4 p-2 bg-indigo-600/30 backdrop-blur-sm rounded border border-indigo-500/30 flex items-start gap-2">
            <Sparkles className="w-3 h-3 text-indigo-400 mt-0.5 shrink-0" />
            <p className="text-[10px] text-indigo-100 line-clamp-2 leading-tight italic">
              {aiReason}
            </p>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button className="flex-1 bg-white text-black py-2 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
            <Play className="w-4 h-4 fill-current" />
          </button>
          <button className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {movie.trending && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase italic tracking-tighter z-10">
          Hot
        </div>
      )}
    </div>
  );
};

export default MovieCard;
