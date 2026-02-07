
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MovieRow from './components/MovieRow';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import { MOCK_MOVIES, GENRES } from './constants';
import { Movie, GeminiRecommendation } from './types';
import { geminiService } from './services/geminiService';
import { Sparkles, Loader2, X } from 'lucide-react';

const App: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeGenre, setActiveGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<GeminiRecommendation[]>([]);
  const [aiQueryText, setAiQueryText] = useState('');

  const trendingMovies = useMemo(() => MOCK_MOVIES.filter(m => m.trending), []);
  const otherMovies = useMemo(() => MOCK_MOVIES.filter(m => !m.trending), []);
  
  const filteredMovies = useMemo(() => {
    let list = MOCK_MOVIES;
    if (activeGenre !== 'All') {
      list = list.filter(m => m.genre.includes(activeGenre));
    }
    if (searchQuery) {
      list = list.filter(m => 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    return list;
  }, [activeGenre, searchQuery]);

  const aiRecommendedMovies = useMemo(() => {
    if (aiRecommendations.length === 0) return [];
    return aiRecommendations
      .map(rec => ({
        movie: MOCK_MOVIES.find(m => m.id === rec.id),
        reason: rec.reason
      }))
      .filter(item => item.movie !== undefined) as { movie: Movie; reason: string }[];
  }, [aiRecommendations]);

  const handleAiSearch = async (query: string) => {
    if (!query.trim()) return;
    setAiLoading(true);
    setAiQueryText(query);
    const recs = await geminiService.getRecommendations(query, MOCK_MOVIES);
    setAiRecommendations(recs);
    setAiLoading(false);
  };

  const clearAiSearch = () => {
    setAiRecommendations([]);
    setAiQueryText('');
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-white">
      <Navbar 
        onSearch={setSearchQuery} 
        onAiSearch={handleAiSearch}
      />
      
      <main className="pb-20">
        {!searchQuery && aiRecommendations.length === 0 && (
          <Hero movie={MOCK_MOVIES[0]} onSelect={setSelectedMovie} />
        )}

        <div className="relative z-20">
          {/* Genre Filters */}
          <div className="px-6 sm:px-12 py-8 flex items-center gap-3 overflow-x-auto hide-scrollbar">
            {GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border whitespace-nowrap ${
                  activeGenre === genre 
                    ? 'bg-white text-black border-white' 
                    : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* AI Search Results */}
          {aiLoading && (
            <div className="px-6 sm:px-12 py-12 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
              <p className="text-gray-400 italic">Gemini is curating your perfect lineup...</p>
            </div>
          )}

          {aiRecommendations.length > 0 && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="px-6 sm:px-12 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-bold text-lg">AI Picks for "{aiQueryText}"</span>
                </div>
                <button 
                  onClick={clearAiSearch}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <MovieRow 
                title="" 
                movies={aiRecommendedMovies.map(i => i.movie)} 
                onSelect={setSelectedMovie}
                aiReasons={aiRecommendedMovies.reduce((acc, curr) => ({ ...acc, [curr.movie.id]: curr.reason }), {})}
              />
              <div className="h-px bg-white/5 mx-6 sm:px-12 mb-8" />
            </div>
          )}

          {/* Standard Rows */}
          {activeGenre === 'All' && !searchQuery && aiRecommendations.length === 0 && (
            <>
              <MovieRow 
                title="Trending Movies" 
                movies={trendingMovies} 
                onSelect={setSelectedMovie} 
              />
              <MovieRow 
                title="New Releases" 
                movies={otherMovies} 
                onSelect={setSelectedMovie} 
              />
            </>
          )}

          {(activeGenre !== 'All' || searchQuery) && aiRecommendations.length === 0 && (
            <div className="px-6 sm:px-12">
              <h2 className="text-2xl font-bold mb-8 uppercase italic tracking-tighter">
                {searchQuery ? `Search Results for "${searchQuery}"` : `${activeGenre} Movies`}
              </h2>
              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {filteredMovies.map(movie => (
                    // Fix: MovieCard is now imported
                    <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-gray-500 text-lg">No movies found matching your criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Detail Overlay */}
      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={() => setSelectedMovie(null)} 
        />
      )}

      {/* Footer Decoration */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-xs font-medium tracking-widest uppercase">
        &copy; 2024 CineClone &bull; Powered by Gemini AI
      </footer>
    </div>
  );
};

export default App;
