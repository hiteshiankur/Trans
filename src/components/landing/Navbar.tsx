import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center" style={{height: '109px'}}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/src/assets/images/trans-logo.svg" 
                alt="TRANS" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 transition-colors ${
                  isActive('/')
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-blue-600 font-medium'
                }`}
                style={{fontSize: '16px'}}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 transition-colors ${
                  isActive('/about')
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-blue-600 font-medium'
                }`}
                style={{fontSize: '16px'}}
              >
                About Us
              </Link>
              <Link
                to="/services"
                className={`px-3 py-2 transition-colors ${
                  isActive('/services')
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-blue-600 font-medium'
                }`}
                style={{fontSize: '16px'}}
              >
                Services
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 transition-colors ${
                  isActive('/contact')
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-blue-600 font-medium'
                }`}
                style={{fontSize: '16px'}}
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors flex items-center justify-center"
              style={{width: '115px', height: '47px'}}
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors flex items-center justify-center"
              style={{width: '115px', height: '47px'}}
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-blue-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
