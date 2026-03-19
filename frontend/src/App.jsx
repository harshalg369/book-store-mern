import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import CreateBooks from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-netflix-gradient'>
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className='pt-16'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Home />} />
          <Route path='/books/create' element={<CreateBooks />} />
          <Route path='/books/details/:id' element={<ShowBook />} />
          <Route path='/books/edit/:id' element={<EditBook />} />
          <Route path='/books/delete/:id' element={<DeleteBook />} />

          <Route path='/orders' element={<div className="p-8 text-netflix-text-primary">Orders - Coming Soon</div>} />
          <Route path='/analytics' element={<div className="p-8 text-netflix-text-primary">Analytics - Coming Soon</div>} />
          <Route path='/staff' element={<div className="p-8 text-netflix-text-primary">Staff Management - Coming Soon</div>} />
          <Route path='/settings' element={<div className="p-8 text-netflix-text-primary">Settings - Coming Soon</div>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;