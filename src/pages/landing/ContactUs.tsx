import React, { useState } from 'react';
import Layout from '../../components/landing/Layout';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white py-8 md:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:w-full lg:max-w-7xl">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6" style={{color: '#3479EA'}}>
            Contact Us
          </h1>
          <p className="text-[#717171] text-base md:text-lg font-medium max-w-2xl mx-auto">
            Any question or remarks? Just write us a message!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-12 md:pb-16 lg:pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:w-full lg:max-w-7xl">
          <div className="bg-white rounded-xl overflow-hidden" style={{boxShadow: '0px 0px 60px 30px #00000008'}}>
            <div className="grid grid-cols-1 lg:grid-cols-10 p-2 md:p-4">
              {/* Contact Information */}
              <div className="lg:col-span-4 p-6 md:p-8 lg:p-12 text-white relative overflow-hidden rounded-xl" style={{background: 'linear-gradient(135deg, #4F7DF3 0%, #3B82F6 50%, #2563EB 100%)'}}>
                <div className="relative z-10">
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-4">Contact Information</h2>
                  <p className="mb-8 md:mb-12 lg:mb-16 text-sm md:text-base lg:text-lg" style={{color: '#C9C9C9'}}>Say something to start a live chat!</p>

                  <div className="space-y-6 md:space-y-8 lg:space-y-12 mt-8 md:mt-16 lg:mt-28">
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
                        <img 
                          src="/src/assets/images/phone.svg" 
                          alt="Phone" 
                          className="w-5 h-5 md:w-6 md:h-6"
                        />
                      </div>
                      <span className="text-sm md:text-base">+96 65697 90065</span>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0">
                        <img 
                          src="/src/assets/images/email.svg" 
                          alt="Email" 
                          className="w-5 h-5 md:w-6 md:h-6"
                        />
                      </div>
                      <span className="text-sm md:text-base break-all">clientservices@trans.com.co</span>
                    </div>

                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 mt-1">
                        <img 
                          src="/src/assets/images/map.svg" 
                          alt="Address" 
                          className="w-5 h-5 md:w-6 md:h-6"
                        />
                      </div>
                      <div className="text-sm md:text-base leading-relaxed">
                        <div>Level 7 Almurjanah Tower</div>
                        <div>Prince Sultan St.</div>
                        <div>Ar Rawdah,Jeddah , KSA</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 bg-white bg-opacity-10 rounded-full transform translate-x-10 translate-y-10 md:translate-x-16 md:translate-y-16 lg:translate-x-20 lg:translate-y-20"></div>
                <div className="absolute bottom-10 right-12 w-16 h-16 md:bottom-16 md:right-18 md:w-20 md:h-20 lg:bottom-20 lg:right-24 lg:w-28 lg:h-28 bg-white bg-opacity-15 rounded-full"></div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-6 p-6 md:p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-2" style={{fontSize: '12px', fontWeight: '400'}}>
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-0 py-2 md:py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '14px'}}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-2 text-xs font-medium" style={{fontSize: '12px', fontWeight: '400'}}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-0 py-2 md:py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '14px'}}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 text-xs font-medium" style={{fontSize: '12px', fontWeight: '400'}}>
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-0 py-2 md:py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '14px'}}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-gray-700 mb-2 text-xs font-medium" style={{fontSize: '12px', fontWeight: '400'}}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-0 py-2 md:py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '14px'}}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm md:text-base text-black font-semibold mb-3 md:mb-4">
                      Select Subject?
                    </label>
                    <div className="flex flex-wrap gap-3 md:gap-4">
                      {['General Inquiry', 'Support', 'Partnership', 'Other'].map((option, index) => (
                        <label key={index} className="flex items-center space-x-2 cursor-pointer">
                          <div className="relative">
                            <input
                              type="radio"
                              name="subject"
                              value={option}
                              checked={formData.subject === option}
                              onChange={handleInputChange}
                              className="sr-only"
                            />
                            <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              formData.subject === option 
                                ? 'border-black bg-black' 
                                : 'border-gray-300 bg-white hover:border-gray-400'
                            }`}>
                              {formData.subject === option && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-gray-700 text-xs md:text-sm font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 text-xs font-medium" style={{fontSize: '12px', fontWeight: '400'}}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={1}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-0 py-2 md:py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent resize-none"
                      placeholder="Write your message..."
                      style={{fontSize: '12px'}}
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col items-end space-y-3 md:space-y-4 !mb-12 md:!mb-16 lg:!mb-24">
                    <button
                      type="submit"
                      className="px-6 md:px-8 py-2 md:py-3 text-white text-sm md:text-base font-medium rounded hover:opacity-90 transition-opacity"
                      style={{backgroundColor: '#3479EA'}}
                    >
                      Send Message
                    </button>
                    
                    <div className="w-full relative hidden lg:block">
                      <img 
                        src="/src/assets/images/letter_send.svg"
                        alt="Letter Send"
                        className="w-full h-64 absolute -right-20 -top-12"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactUs;
