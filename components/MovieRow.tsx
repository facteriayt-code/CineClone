
import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  aiReasons?: Record<string, string>;
}

const MovieRow: React.FC<MovieRowProps> = ({ title, movies, onSelect, aiReasons }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' 
        ? scrollLeft - clientWidth * 0.8 
        : scrollLeft + clientWidth * 0.8;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <div className="py-8 relative group">
      <h2 className="text-2xl font-bold text-white mb-6 px-6 sm:px-12 flex items-center gap-3">
        {title}
        {aiReasons && <span className="text-xs font-normal bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded border border-indigo-500/30">Gemini Curated</span>}
      </h2>

      <button 
        onClick={() => scroll('left')}
        className="absolute left-4 top-[50%] -translate-y-[50%] z-40 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div 
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto hide-scrollbar px-6 sm:px-12 scroll-smooth"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="min-w-[200px] md:min-w-[240px] lg:min-w-[280px]">
            <MovieCard 
              movie={movie} 
              onSelect={onSelect} 
              aiReason={aiReasons ? aiReasons[movie.id] : undefined}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-4 top-[50%] -translate-y-[50%] z-40 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MovieRow;
