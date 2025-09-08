import React, { useState, useEffect } from 'react';
import Layout from '../../components/landing/Layout';

const Services = () => {
  const [servicesData, setServicesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServicesContent();
  }, []);

  const fetchServicesContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/service-content', {
        headers: {
          'lang': 'en'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setServicesData(data.servicesPage);
      }
    } catch (error) {
      console.error('Error fetching services content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="lg:text-5xl font-bold mb-6" style={{color: '#3479EA'}}>
            {servicesData?.['services-hero']?.mainTitle || 'What We Do'}
          </h1>
          <p className="text-gray-600 mx-auto" style={{fontSize: '18px', fontWeight: '400'}}>
            {servicesData?.['services-hero']?.description || 'TRANS plans, designs, and monitor transport systems of all types and sizes from corporate-scale to one-off signature projects. Above all, we work with complete transparency to optimize the cost and fulfill our client needs.'}
          </p>
        </div>
      </section>

      {/* Transport Solutions Section */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  {servicesData?.['services-transport-solutions']?.title || 'Transport solutions'}
                </h2>
                <p className="text-gray-600 leading-relaxed" style={{fontSize: '18px', fontWeight: '400'}}>
                  {servicesData?.['services-transport-solutions']?.description || 'We supply and manage distinguished solutions to suit our clients\' needs with significant experience.'}
                </p>
                <ul className="space-y-1">
                  {servicesData?.['services-transport-solutions']?.services?.map((service: any, index: number) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      <span className="text-black" style={{fontSize: '18px', fontWeight: '400'}}>{service.serviceText}</span>
                    </li>
                  )) || [
                    <li key="default-1" className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      <span className="text-black" style={{fontSize: '18px', fontWeight: '400'}}>Shuttle bus service.</span>
                    </li>,
                    <li key="default-2" className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      <span className="text-black" style={{fontSize: '18px', fontWeight: '400'}}>Electrical appliances.</span>
                    </li>
                  ]}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={servicesData?.['services-transport-solutions']?.sectionImage || '/src/assets/images/transportSolutions.svg'}
                    alt="Transport Solutions"
                    className="w-full max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Analysis Section */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={servicesData?.['services-data-analysis']?.sectionImage || '/src/assets/images/dataAnalysis.svg'}
                    alt="Data Analysis"
                    className="w-full max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  {servicesData?.['services-data-analysis']?.title || 'Data analysis'}
                </h2>
                <p className="text-gray-600 leading-relaxed" style={{fontSize: '18px', fontWeight: '400'}}>
                  {servicesData?.['services-data-analysis']?.mainDescription || 'We engage at every stage of transport planning and design. Your project can benefit from our strengths in capacity analysis, traffic management, and intelligent transport systems. And at ground level, we incorporate the best in wayfinding systems.'}
                </p>
                <div className="space-y-0">
                  <h3 className="text-lg font-semibold text-gray-900">{servicesData?.['services-data-analysis']?.subsectionTitle || 'Commercial and sales advice'}</h3>
                  <p className="text-gray-600 leading-relaxed" style={{fontSize: '18px', fontWeight: '400'}}>
                    {servicesData?.['services-data-analysis']?.subsectionDescription || 'If your company is looking for a project of any size, we can help you build a winning proposal. Our consultants will help ensure that your submission satisfies the highest levels of scrutiny and evaluation, both for commercial and civilian projects.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hardware Logistics Section */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  {servicesData?.['services-hardware-logistics']?.title || 'Hardware logistics'}
                </h2>
                <p className="text-gray-600 leading-relaxed" style={{fontSize: '18px', fontWeight: '400'}}>
                  {servicesData?.['services-hardware-logistics']?.description || 'Our clients can benefit from our logistic support by supplying, installing, servicing and more.'}
                </p>
                <ul className="space-y-1">
                  {servicesData?.['services-hardware-logistics']?.logisticsItems?.map((item: any, index: number) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      <span className="text-black" style={{fontSize: '18px', fontWeight: '400'}}>{item.itemText}</span>
                    </li>
                  )) || [
                    <li key="default-1" className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      <span className="text-black" style={{fontSize: '18px', fontWeight: '400'}}>Bus stations.</span>
                    </li>,
                    <li key="default-2" className="flex items-center space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                      <span className="text-black" style={{fontSize: '18px', fontWeight: '400'}}>Electrical and lighting ITS server stations.</span>
                    </li>
                  ]}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={servicesData?.['services-hardware-logistics']?.sectionImage || '/src/assets/images/hardwareLogistics.svg'}
                    alt="Hardware Logistics"
                    className="w-full max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Management Section */}
      <section className="py-4 mb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-8 lg:p-12" style={{backgroundColor: '#F6F6F6'}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src={servicesData?.['services-fleet-management']?.sectionImage || '/src/assets/images/fleetManagement.svg'}
                    alt="Fleet Management"
                    className="w-full max-w-lg h-auto object-cover"
                  />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2">
                <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#3479EA'}}>
                  {servicesData?.['services-fleet-management']?.title || 'Fleet management'}
                </h2>
                <p className="text-gray-600 leading-relaxed" style={{fontSize: '18px', fontWeight: '400'}}>
                  {servicesData?.['services-fleet-management']?.firstDescription || 'TRANS control and operate fleets by using technology intelligent transport systems (ITS) and Artificial Intelligence (AI) to track and monitor, dispatch, and manage mobility and safety. For your business, we can provide you with reconciliation.'}
                </p>
                <p className="text-gray-600 leading-relaxed" style={{fontSize: '18px', fontWeight: '400'}}>
                  {servicesData?.['services-fleet-management']?.secondDescription || 'Also, our ground GPS system can supervise and audit by key process indicator (KPI) to make sure that the service compliance as per the client needs.'}
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
