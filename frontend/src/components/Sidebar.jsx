// Updated by Blackbox — Netflix UI revamp — Collapsible sidebar with navigation items
// Includes profile section, navigation menu, and responsive behavior

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaBook,
  FaShoppingCart,
  FaChartBar,
  FaUsers,
  FaCog,
  FaPlus,
  FaUser
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Dashboard', description: 'Overview & stats' },
    { path: '/books', icon: FaBook, label: 'Inventory', description: 'Manage books' },
    { path: '/orders', icon: FaShoppingCart, label: 'Orders', description: 'Order management' },
    { path: '/analytics', icon: FaChartBar, label: 'Analytics', description: 'Reports & insights' },
    { path: '/staff', icon: FaUsers, label: 'Staff', description: 'Team management' },
    { path: '/settings', icon: FaCog, label: 'Settings', description: 'App configuration' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-80 bg-netflix-surface/95 backdrop-blur-md border-r border-netflix-text-secondary/10 z-40 overflow-y-auto"
      >
        <div className="p-6">
          {/* Profile Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-netflix-red rounded-full flex items-center justify-center">
                <FaUser className="w-6 h-6 text-netflix-text-primary" />
              </div>
              <div>
                <h3 className="text-netflix-text-primary font-semibold">Admin User</h3>
                <p className="text-netflix-text-secondary text-sm">Administrator</p>
              </div>
            </div>

            {/* Quick Actions */}
            <Link
              to="/books/create"
              className="w-full bg-netflix-red hover:bg-netflix-red/80 text-netflix-text-primary font-semibold py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <FaPlus className="w-4 h-4" />
              <span>Quick Add Book</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`group flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-netflix-red text-netflix-text-primary shadow-netflix-glow'
                      : 'text-netflix-text-secondary hover:text-netflix-text-primary hover:bg-netflix-surface'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-netflix-text-primary' : 'text-netflix-text-secondary group-hover:text-netflix-text-primary'}`} />
                  <div className="flex-1">
                    <div className={`font-medium ${active ? 'text-netflix-text-primary' : 'text-netflix-text-primary group-hover:text-netflix-text-primary'}`}>
                      {item.label}
                    </div>
                    <div className="text-xs text-netflix-text-secondary group-hover:text-netflix-text-secondary">
                      {item.description}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-netflix-text-secondary/10">
            <div className="text-xs text-netflix-text-secondary text-center">
              BookStore v1.0
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
