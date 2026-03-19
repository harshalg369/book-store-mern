// Updated by Blackbox — Netflix UI revamp — Real-time search component with voice support
// Implements debounced search, dropdown results, keyboard navigation, and voice search UI

import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useDebounce, LRUCache, useVoiceSearch } from '../utils/searchUtils';

const searchCache = new LRUCache();

const Search = ({ onResultSelect, placeholder = "Search books..." }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const { isListening, transcript, startListening } = useVoiceSearch();

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (transcript) {
      setQuery(transcript);
      inputRef.current?.focus();
    }
  }, [transcript]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchQuery) => {
    // Check cache first
    const cached = searchCache.get(searchQuery);
    if (cached) {
      setResults(cached);
      setIsOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      // Try server-side search first
      const response = await axios.get(`http://localhost:5555/books?search=${encodeURIComponent(searchQuery)}`);
      const data = response.data.data || [];
      setResults(data);
      searchCache.set(searchQuery, data);
      setIsOpen(true);
    } catch (error) {
      // Fallback to client-side search if server doesn't support search param
      try {
        const response = await axios.get('http://localhost:5555/books');
        const allBooks = response.data.data || [];
        const filtered = allBooks.filter(book =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);
        setIsOpen(true);
      } catch (fallbackError) {
        console.error('Search failed:', fallbackError);
        setResults([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSelect = (book) => {
    setQuery(book.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    onResultSelect?.(book);
  };

  const handleVoiceSearch = () => {
    startListening();
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-netflix-surface/80 backdrop-blur-sm border border-netflix-text-secondary/20 rounded-full px-4 py-2 pl-10 pr-12 text-netflix-text-primary placeholder-netflix-text-secondary focus:outline-none focus:border-netflix-red focus:ring-1 focus:ring-netflix-red"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-netflix-text-secondary" />
        <button
          onClick={handleVoiceSearch}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full transition-colors ${
            isListening ? 'text-netflix-red' : 'text-netflix-text-secondary hover:text-netflix-text-primary'
          }`}
          title={('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) ? 'Voice search' : 'Voice search not supported'}
        >
          <FaMicrophone className={isListening ? 'animate-pulse' : ''} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-netflix-surface/95 backdrop-blur-md border border-netflix-text-secondary/20 rounded-lg shadow-netflix-glow z-50 max-h-80 overflow-y-auto"
            role="listbox"
          >
            {isLoading ? (
              <div className="px-4 py-3 text-netflix-text-secondary text-center">
                Searching...
              </div>
            ) : results.length > 0 ? (
              results.map((book, index) => (
                <div
                  key={book._id}
                  onClick={() => handleSelect(book)}
                  className={`px-4 py-3 cursor-pointer border-b border-netflix-text-secondary/10 last:border-b-0 hover:bg-netflix-red/10 transition-colors ${
                    index === selectedIndex ? 'bg-netflix-red/20' : ''
                  }`}
                  role="option"
                  aria-selected={index === selectedIndex}
                >
                  <div className="font-semibold text-netflix-text-primary">{book.title}</div>
                  <div className="text-sm text-netflix-text-secondary">by {book.author} • {book.publishYear}</div>
                </div>
              ))
            ) : query ? (
              <div className="px-4 py-3 text-netflix-text-secondary text-center">
                No results found
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
