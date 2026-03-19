import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import HeroBanner from '../components/HeroBanner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksCard from '../components/home/BooksCard';
import BooksTable from '../components/home/BooksTable';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('card');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='min-h-screen'>
      {/* Hero Banner */}
      <HeroBanner books={books.slice(0, 5)} />

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-8 py-12'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-4xl font-bold text-netflix-text-primary'>
            My Book Collection
          </h1>
          <Link
            to='/books/create'
            className='bg-netflix-red hover:bg-netflix-red/80 text-netflix-text-primary font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors shadow-netflix-glow'
          >
            <MdOutlineAddBox className='text-xl' />
            Add Book
          </Link>
        </div>

        <div className='flex justify-center mb-8'>
          <div className='bg-netflix-surface/50 rounded-full p-1 backdrop-blur-sm border border-netflix-text-secondary/20'>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                showType === 'card'
                  ? 'bg-netflix-red text-netflix-text-primary shadow-netflix-glow'
                  : 'text-netflix-text-secondary hover:text-netflix-text-primary'
              }`}
              onClick={() => setShowType('card')}
            >
              Card View
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                showType === 'table'
                  ? 'bg-netflix-red text-netflix-text-primary shadow-netflix-glow'
                  : 'text-netflix-text-secondary hover:text-netflix-text-primary'
              }`}
              onClick={() => setShowType('table')}
            >
              Table View
            </button>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : showType === 'table' ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )}
      </div>
    </div>
  );
};

export default Home;