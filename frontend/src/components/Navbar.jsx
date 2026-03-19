import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import { FaBars, FaBook, FaSearch } from 'react-icons/fa';

const Navbar = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSelect = (book) => {
    if (book && book._id) {
      window.location.href = `/books/details/${book._id}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-netflix-surface/95 backdrop-blur-md border-b border-netflix-text-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaBook className="w-8 h-8 text-netflix-red" />
            <span className="text-2xl font-bold bg-gradient-to-r from-netflix-red via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              BookStore
            </span>
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <Search 
              onResultSelect={handleSearchSelect} 
              placeholder="Search books, authors..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <Search 
                onResultSelect={handleSearchSelect}
                placeholder="Search..."
              />
            </div>
            <button
              onClick={onMenuClick}
              className="p-2 hover:bg-netflix-surface rounded-lg transition-colors md:hidden"
              aria-label="Open menu"
            >
              <FaBars className="w-6 h-6 text-netflix-text-primary" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
