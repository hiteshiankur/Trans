import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;