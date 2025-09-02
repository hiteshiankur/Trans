import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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

          {/* Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
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
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-blue-600 p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMobileMenu}
          ></div>
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <img 
                  src="/src/assets/images/trans-logo.svg" 
                  alt="TRANS" 
                  className="h-8 w-auto"
                />
                <button 
                  onClick={closeMobileMenu}
                  className="text-gray-700 hover:text-blue-600 p-2"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6">
                <nav className="space-y-4">
                  <Link
                    to="/"
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive('/')
                        ? 'text-blue-600 bg-blue-50 font-bold'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive('/about')
                        ? 'text-blue-600 bg-blue-50 font-bold'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/services"
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive('/services')
                        ? 'text-blue-600 bg-blue-50 font-bold'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    Services
                  </Link>
                  <Link
                    to="/contact"
                    onClick={closeMobileMenu}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      isActive('/contact')
                        ? 'text-blue-600 bg-blue-50 font-bold'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 font-medium'
                    }`}
                  >
                    Contact Us
                  </Link>
                </nav>
              </div>
              
              {/* Auth Buttons */}
              <div className="px-4 pb-6 space-y-3">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block w-full text-center py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
