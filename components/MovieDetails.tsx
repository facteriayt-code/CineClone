
import React, { useEffect, useState } from 'react';
import { X, Play, Plus, Star, Calendar, Clock, Share2, Sparkles } from 'lucide-react';
import { Movie } from '../types';
import { geminiService } from '../services/geminiService';

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, onClose }) => {
  const [aiHook, setAiHook] = useState<string | null>(null);

  useEffect(() => {
    const fetchHook = async () => {
      const hook = await geminiService.generateDescription(movie.title);
      setAiHook(hook);
    };
    fetchHook();
  }, [movie]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      <div 
        className="absolute inset-0 bg-[#08090a]/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-5xl bg-[#121417] rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-all border border-white/10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="relative aspect-video">
          <img 
            src={movie.backdropUrl} 
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/30 to-transparent" />
        </div>

        <div className="p-8 sm:p-12 -mt-20 relative z-10 flex flex-col md:flex-row gap-8">
          <div className="w-48 lg:w-64 shrink-0 hidden md:block">
            <img 
              src={movie.imageUrl} 
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover rounded-xl shadow-2xl border-4 border-white/5"
            />
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-white font-bold">{movie.rating}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{movie.duration}</span>
              </div>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
              {movie.title}
            </h2>

            <div className="flex flex-wrap gap-2">
              {movie.genre.map(g => (
                <span key={g} className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-xs font-bold border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                  {g}
                </span>
              ))}
            </div>

            {aiHook && (
               <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex gap-3 items-start animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <Sparkles className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
                  <p className="text-indigo-200 italic leading-relaxed">
                    {aiHook}
                  </p>
               </div>
            )}

            <p className="text-lg text-gray-300 leading-relaxed">
              {movie.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Cast</h4>
              <p className="text-gray-400">{movie.cast.join(', ')}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-6">
              <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all flex-1 md:flex-none justify-center">
                <Play className="w-5 h-5 fill-current" />
                Watch Now
              </button>
              <button className="flex items-center gap-3 bg-white/5 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all border border-white/10 flex-1 md:flex-none justify-center">
                <Plus className="w-5 h-5" />
                Add List
              </button>
              <button className="p-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all border border-white/10">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
