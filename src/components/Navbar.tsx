import React from 'react';
import { Terminal } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 bg-black bg-opacity-90 border-b border-green-500/30 shadow-lg z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <Terminal className="h-6 w-6 text-green-400 transform group-hover:scale-110 transition-all duration-300" />
            <span className="text-green-400 text-lg font-bold group-hover:text-green-300 transition-colors duration-300">DorkGen</span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/'
                  ? 'text-green-400 bg-black/50'
                  : 'text-gray-300 hover:text-green-400 hover:bg-black/30'
              }`}
            >
              Home
            </Link>
            <Link
              to="/contact"
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                location.pathname === '/contact'
                  ? 'text-green-400 bg-black/50'
                  : 'text-gray-300 hover:text-green-400 hover:bg-black/30'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;