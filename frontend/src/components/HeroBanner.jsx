import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from './Spinner';

const HeroBanner = ({ books, loading }) => {
  if (loading) {
    return (
      <div className="relative h-96 bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900 overflow-hidden">
        <Spinner />
      </div>
    );
  }

  const featuredBooks = books.slice(0, 4);

  return (
    <div className="relative h-96 bg-gradient-to-br from-gray-900 via-purple-900/30 to-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-8 flex items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-netflix-text-primary to-white bg-clip-text text-transparent drop-shadow-2xl">
            Your Book Collection
          </h1>
          <p className="text-xl md:text-2xl text-netflix-text-secondary max-w-lg leading-relaxed">
            Discover, organize, and manage your personal library with ease.
            Track reading progress and find your next great read.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/books/create"
              className="bg-netflix-red hover:bg-netflix-red/90 text-white font-semibold py-4 px-8 rounded-lg flex items-center gap-3 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 max-w-xs justify-center"
            >
              <MdOutlineAddBox className="w-6 h-6" />
              Add Your First Book
            </Link>
            <Link
              to="/books"
              className="border-2 border-netflix-text-secondary/50 hover:border-white text-netflix-text-primary hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-white/10 max-w-xs justify-center"
            >
              Browse Collection
            </Link>
          </div>
        </div>

        {/* Featured Books Preview */}
        <div className="hidden lg:block flex-1 ml-16">
          <div className="grid grid-cols-2 gap-4 h-64">
            {featuredBooks.map((book, index) => (
              <div
                key={book._id || index}
                className="group relative bg-netflix-surface/80 backdrop-blur-sm rounded-2xl p-6 border border-netflix-text-secondary/20 hover:border-netflix-red/50 transition-all duration-500 hover:scale-105 hover:shadow-netflix-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-netflix-red/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="font-bold text-white text-lg mb-2 relative z-10">{book.title}</h3>
                <p className="text-netflix-text-secondary text-sm relative z-10">by {book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
