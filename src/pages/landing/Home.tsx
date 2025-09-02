import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/landing/Layout';

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-x-hidden min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[90vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/src/assets/images/delivery-worker.svg"
            alt="Delivery Worker with Van and Boxes"
            className="w-full h-full object-contain object-right md:object-center-right max-w-none"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/60 md:via-white/90 md:to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-[90vh]">
            <div className="max-w-full md:max-w-2xl w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-center md:text-left" style={{color: '#3479EA'}}>
                Our Promise Delivered<br className="hidden sm:block" />
                to Every Client Every<br className="hidden sm:block" />
                Time
              </h1>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-800 font-medium text-center md:text-left">
                Expert transport management for fleets and logistics
              </p>
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-3 sm:gap-4">
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded px-4 sm:px-6 md:px-8 py-3 text-sm sm:text-base font-semibold text-white hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-w-[140px] sm:min-w-[160px]" style={{backgroundColor: '#3479EA', outlineColor: '#3479EA'}}>
                  Get a Free Quote
                </button>
                <button className="w-full sm:w-auto inline-flex items-center justify-center rounded px-4 sm:px-6 md:px-8 py-3 text-sm sm:text-base font-semibold border-2 min-w-[140px] sm:min-w-[160px]" style={{borderColor: '#3479EA', color: '#3479EA'}} onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#EFF9FF'} onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'}>
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4" style={{color: '#3479EA'}}>
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              TRANS plans, designs, and monitor transport systems of all types and sizes from corporate-scale to one-off signature projects. Above all, we work with complete transparency to optimize the cost and fulfill our client needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 px-2 sm:px-4 mx-auto max-w-6xl">
            {/* Transport Solutions */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 hover:shadow-lg transition-all duration-300 group py-6 sm:py-8 md:py-10" 
                 style={{borderColor: '#C5ECFF', boxShadow: '3.12px 9.37px 21.85px 0px #0000000F'}}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#EFF9FF'}}>
                  <img src="/src/assets/images/transport-solutions.svg" alt="Transport Solutions" className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color: '#3479EA'}}>Transport solutions</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full sm:w-[85%] md:w-[70%]">
                Stay updated on your cargo's exact location with instant tracking notifications
              </p>
            </div>

            {/* Data Analysis */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 hover:shadow-lg transition-all duration-300 group py-6 sm:py-8 md:py-10" 
                 style={{borderColor: '#C5ECFF', boxShadow: '3.12px 9.37px 21.85px 0px #0000000F'}}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#EFF9FF'}}>
                  <img src="/src/assets/images/data-analysis.svg" alt="Data Analysis" className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color: '#3479EA'}}>Data analysis</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full sm:w-[85%] md:w-[70%]">
                Cut costs and time by letting our AI-driven system optimize delivery routes.
              </p>
            </div>

            {/* Hardware Logistics */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 hover:shadow-lg transition-all duration-300 group py-6 sm:py-8 md:py-10" 
                 style={{borderColor: '#C5ECFF', boxShadow: '3.12px 9.37px 21.85px 0px #0000000F'}}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#EFF9FF'}}>
                  <img src="/src/assets/images/hardware-logistics.svg" alt="Hardware Logistics" className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color: '#3479EA'}}>Hardware logistics</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full sm:w-[85%] md:w-[70%]">
                Make data-driven decisions with comprehensive logistics reports at your fingertips.
              </p>
            </div>

            {/* Fleet Management */}
            <div className="relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 hover:shadow-lg transition-all duration-300 group py-6 sm:py-8 md:py-10" 
                 style={{borderColor: '#C5ECFF', boxShadow: '3.12px 9.37px 21.85px 0px #0000000F'}}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{backgroundColor: '#EFF9FF'}}>
                  <img src="/src/assets/images/fleet-management.svg" alt="Fleet Management" className="w-6 h-6" />
                </div>
                <div className="flex items-center justify-center">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3" style={{color: '#3479EA'}}>Fleet management</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed w-full sm:w-[85%] md:w-[70%]">
                Make data-driven decisions with comprehensive logistics reports at your fingertips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Priority Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8 lg:p-12 relative">
            <div className="max-w-full sm:max-w-[23rem]">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Your Fleet's Safety, Our Top Priority
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed mt-4 sm:mt-6">
                Regular safety checks and maintenance are part of our commitment to keeping your fleet in top condition. Our app schedules and tracks inspections, ensuring that every vehicle meets stringent safety standards
              </p>
              <div className="flex items-center space-x-4 text-gray-400 mt-4 sm:mt-6">
                <img 
                  src="/src/assets/images/double-quotes.svg"
                  alt="Quote"
                  className="w-12 h-12 sm:w-16 sm:h-16 opacity-30"
                />
              </div>
            </div>
          </div>
          
          {/* Truck positioned absolutely - hidden on mobile */}
          <div className="hidden md:block absolute -right-8 top-[162px] transform -translate-y-1/2 lg:-right-24">
            <img 
              src="/src/assets/images/VAN 1.svg"
              alt="Delivery Van"
              className="w-64 h-48 lg:w-80 lg:h-64 xl:w-[30rem] object-contain"
            />
          </div>
          
          {/* Button positioned absolutely - responsive */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-12 lg:-right-8">
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-600 transition-colors shadow-sm" 
                    style={{backgroundColor: '#4285F4'}}>
              Get a Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-10 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            <div className="space-y-2 sm:space-y-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{
                background: 'linear-gradient(100.83deg, #0179B4 21%, #88D8FF 93.51%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>10,000+</div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm">Deliveries Managed</div>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{
                background: 'linear-gradient(100.83deg, #0179B4 21%, #88D8FF 93.51%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>2,500+</div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm">Active Clients</div>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{
                background: 'linear-gradient(100.83deg, #0179B4 21%, #88D8FF 93.51%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>98%</div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm">On-Time Delivery Rate</div>
            </div>
            <div className="space-y-2 sm:space-y-4">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold" style={{
                background: 'linear-gradient(100.83deg, #0179B4 21%, #88D8FF 93.51%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>200+</div>
              <div className="text-gray-600 font-medium text-xs sm:text-sm">Industry Awards</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 sm:py-8 md:py-10 bg-blue-50 mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-40 rounded-xl sm:rounded-2xl mb-16 sm:mb-20 md:mb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 lg:col-span-3">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{color: '#3479EA'}}>
                We would like to hear from you
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Join countless other businesses that have streamlined their logistics with our cutting-edge solutions
              </p>
              <button className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Get a Free Quote
              </button>
            </div>
            <div className="relative flex justify-center lg:justify-end lg:col-span-2 mt-6 lg:mt-0">
              <img 
                src="/src/assets/images/truck.svg"
                alt="Delivery Truck"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
