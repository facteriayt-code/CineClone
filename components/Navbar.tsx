
import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Clapperboard, Sparkles } from 'lucide-react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onAiSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onAiSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAiMode) {
      onAiSearch(searchValue);
    } else {
      onSearch(searchValue);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 flex items-center justify-between ${
      isScrolled ? 'bg-[#08090a]/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer">
          <Clapperboard className="w-8 h-8 text-indigo-500 group-hover:text-indigo-400 transition-colors" />
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">Cine<span className="text-indigo-500">Clone</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Movies</a>
          <a href="#" className="hover:text-white transition-colors">Series</a>
          <a href="#" className="hover:text-white transition-colors">New</a>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
          <div className="flex items-center">
            <input 
              type="text"
              placeholder={isAiMode ? "Ask Gemini (e.g. 'Mind-bending thrillers')" : "Search titles..."}
              className={`bg-white/5 border ${isAiMode ? 'border-indigo-500/50 focus:border-indigo-500' : 'border-white/10 focus:border-white/20'} rounded-full py-2 pl-10 pr-4 outline-none transition-all w-64 md:w-80 text-sm`}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button 
              type="button"
              onClick={() => setIsAiMode(!isAiMode)}
              className={`absolute right-3 p-1 rounded-full transition-all ${isAiMode ? 'bg-indigo-500 text-white' : 'text-gray-500 hover:text-white'}`}
              title="Toggle AI Search"
            >
              <Sparkles className="w-4 h-4" />
            </button>
            <Search className="absolute left-3 w-4 h-4 text-gray-500" />
          </div>
        </form>

        <div className="flex items-center gap-4 text-gray-400">
          <Bell className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white cursor-pointer border border-white/10 hover:scale-105 transition-transform">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
