import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-44 pt-12 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-48">
          {/* Logo */}
          <div className="flex justify-start items-start">
            <Link to="/" className="flex items-center">
              <img 
                src="/src/assets/images/trans-logo.svg" 
                alt="TRANS" 
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-gray-900 mb-2 text-base font-semibold">Company</h3>
            <div className="space-y-2">
              <Link to="/" onClick={scrollToTop} className="block text-gray-600 hover:text-blue-600 text-base">
                Home
              </Link>
              <Link to="/about" onClick={scrollToTop} className="block text-gray-600 hover:text-blue-600 text-base">
                About Us
              </Link>
              <Link to="/services" onClick={scrollToTop} className="block text-gray-600 hover:text-blue-600 text-base">
                Our Services
              </Link>
              <Link to="/contact" onClick={scrollToTop} className="block text-gray-600 hover:text-blue-600 text-base">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gray-900 mb-2 ext-base font-semibold">Contact Us</h3>
            <div className="space-y-4 text-base text-gray-600">
              <div className="flex items-center space-x-3">
                <img 
                  src="/src/assets/images/phone.svg" 
                  alt="Phone" 
                  className="w-5 h-5"
                  style={{filter: 'brightness(0) saturate(100%)'}}
                />
                <span>+96 65697 90065</span>
              </div>
              <div className="flex items-center space-x-3">
                <img 
                  src="/src/assets/images/email.svg" 
                  alt="Email" 
                  className="w-5 h-5"
                  style={{filter: 'brightness(0) saturate(100%)'}}
                />
                <span>clientservices@trans.com.co</span>
              </div>
              <div className="flex items-start space-x-3">
                <img 
                  src="/src/assets/images/map.svg" 
                  alt="Address" 
                  className="w-5 h-5 mt-0.5"
                  style={{filter: 'brightness(0) saturate(100%)'}}
                />
                <div>
                  <div>Level 7 Almurjanah Tower</div>
                  <div>Prince Sultan St.</div>
                  <div>Ar Rawdah,Jeddah , KSA</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="mt-16">
          <div className="flex space-x-4">
            <a href="#" className="hover:opacity-70">
              <img 
                src="/src/assets/images/twitter.svg" 
                alt="Twitter" 
                className="w-4 h-4"
                style={{filter: 'brightness(0) saturate(100%) opacity(0.6)'}}
              />
            </a>
            <a href="#" className="hover:opacity-70">
              <img 
                src="/src/assets/images/slack.svg" 
                alt="Slack" 
                className="w-4 h-4"
                style={{filter: 'brightness(0) saturate(100%) opacity(0.6)'}}
              />
            </a>
            <a href="#" className="hover:opacity-70">
              <img 
                src="/src/assets/images/github.svg" 
                alt="GitHub" 
                className="w-4 h-4"
                style={{filter: 'brightness(0) saturate(100%) opacity(0.6)'}}
              />
            </a>
            <a href="#" className="hover:opacity-70">
              <img 
                src="/src/assets/images/youtube.svg" 
                alt="YouTube" 
                className="w-4 h-4"
                style={{filter: 'brightness(0) saturate(100%) opacity(0.6)'}}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
