import React, { useState, useEffect } from 'react';
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

  // Contact content state
  const [contactData, setContactData] = useState({
    hero: {
      mainTitle: 'Contact Us',
      subtitle: 'Any question or remarks? Just write us a message!'
    },
    information: {
      sectionTitle: 'Contact Information',
      sectionSubtitle: 'Say something to start a live chat!',
      phoneNumber: '+96 65697 90065',
      emailAddress: 'clientservices@trans.com.co',
      addressLine1: 'Level 7 Almurjanah Tower',
      addressLine2: 'Prince Sultan St.',
      addressLine3: 'Ar Rawdah,Jeddah , KSA'
    }
  });

  const [loading, setLoading] = useState(true);

  // Fetch contact content from backend
  useEffect(() => {
    const fetchContactContent = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/contact-content', {
          headers: {
            'Content-Type': 'application/json',
            'lang': 'en'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Contact content fetched:', data);
          console.log('Full API response structure:', JSON.stringify(data, null, 2));
          
          // Check if data has the expected structure
          let sections;
          if (data.success && data.data) {
            sections = data.data;
          } else if (data['contact-hero'] || data['contact-information']) {
            // Direct structure without success wrapper
            sections = data;
          } else {
            console.error('Unexpected API response structure:', data);
            return;
          }
          
          console.log('Extracted sections:', sections);
          console.log('Contact hero data:', sections['contact-hero']);
          console.log('Contact information data:', sections['contact-information']);
          
          // Update contact data with fetched content
          const newContactData = {
            hero: {
              mainTitle: sections['contact-hero']?.mainTitle || 'Contact Us',
              subtitle: sections['contact-hero']?.subtitle || 'Any question or remarks? Just write us a message!'
            },
            information: {
              sectionTitle: sections['contact-information']?.sectionTitle || 'Contact Information',
              sectionSubtitle: sections['contact-information']?.sectionSubtitle || 'Say something to start a live chat!',
              phoneNumber: sections['contact-information']?.phoneNumber || '+96 65697 90065',
              emailAddress: sections['contact-information']?.emailAddress || 'clientservices@trans.com.co',
              addressLine1: sections['contact-information']?.addressLine1 || 'Level 7 Almurjanah Tower',
              addressLine2: sections['contact-information']?.addressLine2 || 'Prince Sultan St.',
              addressLine3: sections['contact-information']?.addressLine3 || 'Ar Rawdah,Jeddah , KSA'
            }
          };
          
          console.log('Setting new contact data:', newContactData);
          setContactData(newContactData);
        } else {
          console.error('Failed to fetch contact content:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching contact content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactContent();
  }, []);

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

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-gray-600">Loading...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6" style={{color: '#3479EA'}}>
            {contactData.hero.mainTitle}
          </h1>
          <p className="text-[#717171] text-lg font-medium max-w-2xl mx-auto">
            {contactData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl overflow-hidden" style={{boxShadow: '0px 0px 60px 30px #00000008'}}>
            <div className="grid grid-cols-1 lg:grid-cols-10 p-4">
              {/* Contact Information */}
              <div className="lg:col-span-4 p-8 lg:p-12 text-white relative overflow-hidden rounded-xl" style={{background: 'linear-gradient(135deg, #4F7DF3 0%, #3B82F6 50%, #2563EB 100%)'}}>
                <div className="relative z-10">
                  <h2 className="text-3xl font-semibold mb-4">{contactData.information.sectionTitle}</h2>
                  <p className="mb-16 text-lg" style={{color: '#C9C9C9'}}>{contactData.information.sectionSubtitle}</p>

                  <div className="space-y-12 mt-28">
                    <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 flex-shrink-0">
                        <img 
                          src="/src/assets/images/phone.svg" 
                          alt="Phone" 
                          className="w-6 h-6"
                        />
                      </div>
                      <span className="text-base">{contactData.information.phoneNumber}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-6 h-6 flex-shrink-0">
                        <img 
                          src="/src/assets/images/email.svg" 
                          alt="Email" 
                          className="w-6 h-6"
                        />
                      </div>
                      <span className="text-base">{contactData.information.emailAddress}</span>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-6 h-6 flex-shrink-0 mt-1">
                        <img 
                          src="/src/assets/images/map.svg" 
                          alt="Address" 
                          className="w-6 h-6"
                        />
                      </div>
                      <div className="text-base leading-relaxed">
                        <div>{contactData.information.addressLine1}</div>
                        <div>{contactData.information.addressLine2}</div>
                        <div>{contactData.information.addressLine3}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full transform translate-x-20 translate-y-20"></div>
                <div className="absolute bottom-20 right-24 w-28 h-28 bg-white bg-opacity-15 rounded-full"></div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-6 p-8 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-xs font-medium text-gray-700 mb-2" style={{fontSize: '14px', fontWeight: '400'}}>
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '16px'}}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-2 text-xs font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '16px'}}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2 text-xs font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '16px'}}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-gray-700 mb-2 text-xs font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent"
                        style={{fontSize: '16px'}}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base text-black font-semibold mb-4">
                      Select Subject?
                    </label>
                    <div className="flex flex-wrap gap-4">
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
                          <span className="text-gray-700 text-xs font-medium">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 mb-2 text-xs font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={1}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-0 py-3 border-0 border-b border-gray-300 focus:border-blue-500 focus:ring-0 focus:outline-none bg-transparent resize-none"
                      placeholder="Write your message..."
                      style={{fontSize: '14px'}}
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col items-end space-y-4 !mb-24">
                    <button
                      type="submit"
                      className="px-8 py-3 text-white text-base font-medium rounded hover:opacity-90 transition-opacity"
                      style={{backgroundColor: '#3479EA'}}
                    >
                      Send Message
                    </button>
                    
                    <div className="w-full relative">
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
