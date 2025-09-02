import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Mail, FileText, X, User, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  href?: string;
  icon: any;
  children?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { user } = useAuth();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Home Management']);

  const sidebarItems: MenuItem[] = [
    {
      label: 'Dashboard',
      href: '/home',
      icon: Home,
    },
    {
      label: 'Invitations',
      href: '/invitations',
      icon: Mail,
    },
    {
      label: 'Contracts',
      href: '/contracts',
      icon: FileText,
    },
    {
      label: 'Home Management',
      icon: Home,
      children: [
        {
          label: 'Hero Section',
          href: '/admin/landing/hero',
          icon: Home,
        },
        {
          label: 'Our Services Section',
          href: '/admin/landing/services',
          icon: Home,
        },
        {
          label: 'Safety Priority Section',
          href: '/admin/landing/safety',
          icon: Home,
        },
        {
          label: 'Stats Section',
          href: '/admin/landing/stats',
          icon: Home,
        },
        {
          label: 'CTA Section',
          href: '/admin/landing/cta',
          icon: Home,
        },
      ],
    },
    {
      label: 'About Us Management',
      icon: Home,
      children: [
        {
          label: 'Hero Section',
          href: '/admin/about/hero',
          icon: Home,
        },
        {
          label: 'Features Section',
          href: '/admin/about/features',
          icon: Home,
        },
        {
          label: 'Mission Section',
          href: '/admin/about/mission',
          icon: Home,
        },
        {
          label: 'Vision Section',
          href: '/admin/about/vision',
          icon: Home,
        },
        {
          label: 'Objectives Section',
          href: '/admin/about/objectives',
          icon: Home,
        },
      ],
    },
    {
      label: 'Services Management',
      icon: Home,
      children: [
        {
          label: 'Hero Section',
          href: '/admin/services/hero',
          icon: Home,
        },
        {
          label: 'Transport Solutions',
          href: '/admin/services/transport-solutions',
          icon: Home,
        },
        {
          label: 'Data Analysis',
          href: '/admin/services/data-analysis',
          icon: Home,
        },
        {
          label: 'Hardware Logistics',
          href: '/admin/services/hardware-logistics',
          icon: Home,
        },
        {
          label: 'Fleet Management',
          href: '/admin/services/fleet-management',
          icon: Home,
        },
      ],
    },
    {
      label: 'Contact Us Management',
      icon: Home,
      children: [
        {
          label: 'Hero Section',
          href: '/admin/contact/hero',
          icon: Home,
        },
        {
          label: 'Contact Information',
          href: '/admin/contact/info',
          icon: Home,
        },
      ],
    },
  ];

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  if (!user) return null;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static w-64 overflow-hidden`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Navigation */}
          <nav className="h-full p-4 overflow-auto">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.href && location.pathname === item.href;
                const isExpanded = expandedItems.includes(item.label);
                
                if (item.children) {
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => toggleExpanded(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200"
                      >
                        <span>{item.label}</span>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="ml-3 mt-2 space-y-1">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;
                            const isChildActive = child.href && location.pathname === child.href;
                            
                            return (
                              <Link
                                key={child.href}
                                to={child.href!}
                                onClick={onClose}
                                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  isChildActive
                                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                              >
                                <span>{child.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.href}
                    to={item.href!}
                    onClick={onClose}
                    className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
