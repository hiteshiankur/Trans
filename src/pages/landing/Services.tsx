import React from 'react';
import Layout from '../../components/landing/Layout';

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl md:max-w-none lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{color: '#3479EA'}}>
            What We Do
          </h1>
          <p className="text-gray-600 mx-auto text-base sm:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>
            TRANS plans, designs, and monitor transport systems of all types and sizes from corporate-scale to one-off signature projects. Above all, we work with complete transparency to optimize the cost and fulfill our client needs.
          </p>
        </div>
      </section>

      {/* Transport Solutions Section */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl md:max-w-none lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  Transport solutions
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>
                  We supply and manage distinguished solutions to suit our clients' needs with significant experience.
                </p>
                <ul className="space-y-1 text-left">
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Shuttle bus service.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Electrical appliances.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Autonomous solutions.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Pool buggy transport.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Executive transport services.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Traffic management.</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center mt-6 lg:mt-0">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <img 
                    src="/src/assets/images/transportSolutions.svg"
                    alt="Transport Solutions"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Analysis Section */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl md:max-w-none lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <img 
                    src="/src/assets/images/dataAnalysis.svg"
                    alt="Data Analysis"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  Data analysis
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>
                  We engage at every stage of transport planning and design. Your project can benefit from our strengths in capacity analysis, traffic management, and intelligent transport systems. And at ground level, we incorporate the best in wayfinding systems.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Commercial and sales advice</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>
                    If your company is looking for a project of any size, we can help you build a winning proposal. Our consultants will help ensure that your submission satisfies the highest levels of scrutiny and evaluation, both for commercial and civilian projects.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Logistics Section */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl md:max-w-none lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  Hardware logistics
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>
                  Our clients can benefit from our logistic support by supplying, installing, servicing and more.
                </p>
                <ul className="space-y-1 text-left">
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Bus stations.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Electrical and lighting ITS server stations.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Design and Install Signage.</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Closed-circuit television (CCTV).</span>
                  </li>
                  <li className="flex items-center space-x-3 justify-center lg:justify-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                    <span className="text-black text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>Traffic support material traffic cones, police barriers and water barriers.</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center mt-6 lg:mt-0">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <img 
                    src="/src/assets/images/hardwareLogistics.svg"
                    alt="Hardware Logistics"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Management Section */}
      <section className="py-4 mb-12 sm:mb-16 lg:mb-20 bg-white">
        <div className="max-w-7xl md:max-w-none lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden">
                  <img 
                    src="/src/assets/images/fleetManagement.svg"
                    alt="Fleet Management"
                    className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  Fleet management
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>
                  TRANS control and operate fleets by using technology intelligent transport systems (ITS) and Artificial Intelligence (AI) to track and monitor, dispatch, and manage mobility and safety. For your business, we can provide you with reconciliation.
                </p>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg" style={{fontSize: '18px', fontWeight: '400'}}>
                  Also, our ground GPS system can supervise and audit by key process indicator (KPI) to make sure that the service compliance as per the client needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
