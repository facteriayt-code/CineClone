
import React from 'react';
import { Play, Info, Star } from 'lucide-react';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onSelect }) => {
  return (
    <section className="relative h-[80vh] w-full flex items-end pb-20 px-6 sm:px-12">
      <div className="absolute inset-0">
        <img 
          src={movie.backdropUrl} 
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08090a] via-[#08090a]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08090a] via-[#08090a]/20 to-transparent" />
      </div>

      <div className="relative z-10 max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-sm uppercase tracking-widest">Featured</span>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-bold text-white">{movie.rating}</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase italic">
          {movie.title}
        </h1>
        
        <p className="text-lg text-gray-300 line-clamp-3 leading-relaxed max-w-xl">
          {movie.description}
        </p>

        <div className="flex items-center gap-4 pt-4">
          <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95">
            <Play className="w-5 h-5 fill-current" />
            Play Now
          </button>
          <button 
            onClick={() => onSelect(movie)}
            className="flex items-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold hover:bg-white/20 transition-all border border-white/10"
          >
            <Info className="w-5 h-5" />
            More Info
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
