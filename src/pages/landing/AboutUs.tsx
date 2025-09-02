import React from 'react';
import Layout from '../../components/landing/Layout';

const AboutUs = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="space-y-6 lg:col-span-2">
              <div className="text-lg font-semibold text-gray-900 uppercase tracking-[0.40em]">
                A BIT
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#3479EA'}}>
                About Us
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                With more than 14 years of knowledge in transport planning and managing city transportation and fleet manpower for mega-project in the KSA. You can rely on TRANS to deliver world-class transport management and consultancy. We offer a comprehensive suite of services, all tailored to your exact needs
              </p>
              <button className="px-8 py-3 text-sm text-white font-normal rounded hover:bg-blue-700 transition-colors" style={{backgroundColor: '#3479EA'}}>
                Explore Now
              </button>
            </div>
            <div className="relative flex justify-center lg:col-span-3">
              <img 
                src="/src/assets/images/group.svg"
                alt="Transport Management Team"
                className="w-[90%] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white">
        <div className="mx-auto pr-0 lg:pr-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative lg:col-span-3 flex justify-center md:justify-start">
              <img 
                src="/src/assets/images/parcelboy.svg"
                alt="Delivery Professional"
                className="w-auto h-auto object-contain max-w-full"
              />
            </div>

            {/* Right Column - Features */}
            <div className="space-y-6 md:space-y-8 lg:col-span-2 flex flex-col gap-6 md:gap-8 px-4 md:px-8 lg:px-0">
              {/* Bespoke Solutions */}
              <div className="flex items-start space-x-3 md:space-x-4 text-center md:text-left">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src="/src/assets/images/bespoke.svg"
                    alt="Bespoke Solutions"
                    className="w-[40px] h-[40px] md:w-[52px] md:h-[52px]"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-medium text-[#1C1F35] mb-2">Bespoke Solutions Every Time</h3>
                  <p className="text-[#666C89] text-sm md:text-base">
                    We've never had a templated approach. Instead, we collaborate closely with our partners to devise unique project plans that optimize our clients' capabilities and match their working methods.
                  </p>
                </div>
              </div>

              {/* Single-Provider Efficiencies */}
              <div className="flex items-start space-x-3 md:space-x-4 text-center md:text-left">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src="/src/assets/images/single-provider.svg"
                    alt="Single Provider"
                    className="w-[40px] h-[40px] md:w-[52px] md:h-[52px]"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-medium text-[#1C1F35] mb-2">Single-Provider Efficiencies</h3>
                  <p className="text-[#666C89] text-sm md:text-base">
                    It takes time and money to commission, brief and manage multiple suppliers. We relieve that burden, offering you radically reduced administrative and operational overhead.
                  </p>
                </div>
              </div>

              {/* World Class Technology */}
              <div className="flex items-start space-x-3 md:space-x-4 text-center md:text-left">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src="/src/assets/images/technology.svg"
                    alt="Technology"
                    className="w-[40px] h-[40px] md:w-[52px] md:h-[52px]"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-medium text-[#1C1F35] mb-2">World Class Technology</h3>
                  <p className="text-[#666C89] text-sm md:text-base">
                    Because we work uniquely, we keep working with the most advanced solutions to achieve the intended outcomes.
                  </p>
                </div>
              </div>

              {/* Ethics */}
              <div className="flex items-start space-x-3 md:space-x-4 text-center md:text-left">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img 
                    src="/src/assets/images/ethics.svg"
                    alt="Ethics"
                    className="w-[40px] h-[40px] md:w-[52px] md:h-[52px]"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-2xl font-medium text-[#1C1F35] mb-2">It's a matter of ethics</h3>
                  <p className="text-[#666C89] text-sm md:text-base">
                    Good business relies on trust, openness, and transparency - and our hiring policies reflect this. We choose our team members based on their creativity, disciplinary and achievements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-6 md:pb-8 pt-8 md:pt-12 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #4F7DF3 0%, #3B82F6 100%)',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative md:w-full lg:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-64 items-center">
            <div className="space-y-4 md:space-y-6 px-4 md:px-7 text-center md:text-left relative lg:bg-none" style={{
              backgroundImage: 'url(/src/assets/images/mission.svg)',
              backgroundSize: '80px 80px',
              backgroundPosition: 'center top 20px',
              backgroundRepeat: 'no-repeat',
              paddingTop: '120px'
            }}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white md:pt-0 lg:pt-0">
                Our Mission
              </h2>
              <p className="text-base md:text-lg text-white opacity-90">
                To build a premium standard values with each step of our Deliverables to our clients.
              </p>
            </div>
            <div className="flex justify-center relative hidden lg:block">
              <img 
                src="/src/assets/images/mission.svg"
                alt="Our Mission"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-2 md:-top-4 right-8 md:right-16 w-8 h-8 md:w-16 md:h-16 bg-yellow-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-8 md:bottom-16 left-8 md:left-16 w-4 h-4 md:w-8 md:h-8 bg-blue-300 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-6 md:py-8 lg:py-0 bg-white relative overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative md:w-full lg:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-28 items-center">
            <div className="flex justify-center order-2 lg:order-1 relative md:top-0 lg:top-5 hidden lg:block">
              <img 
                src="/src/assets/images/vision.svg"
                alt="Our Vision"
                className="w-64 h-64 object-contain"
              />
            </div>
            <div className="space-y-4 md:space-y-6 order-1 lg:order-2 px-4 md:px-8 lg:pl-52 lg:pr-5 text-center md:text-left relative lg:bg-none" style={{
              backgroundImage: 'url(/src/assets/images/vision.svg)',
              backgroundSize: '80px 80px',
              backgroundPosition: 'center top 20px',
              backgroundRepeat: 'no-repeat',
              paddingTop: '120px'
            }}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold md:pt-0 lg:pt-0" style={{color: '#3479EA'}}>
                Our Vision
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                To be the industry trailblazer who delivers innovative services and solutions in the With this trend in line with the vision of the Kingdom.
              </p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-4 md:top-8 left-28 md:left-56 w-6 h-6 md:w-12 md:h-12 bg-blue-200 rounded-full opacity-40"></div>
          <div className="absolute bottom-4 md:bottom-8 left-[50%] md:left-[65vh] w-4 h-4 md:w-8 md:h-8 bg-blue-300 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="pt-8 md:pt-12 pb-6 md:pb-8 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #4F7DF3 0%, #3B82F6 100%)',
        clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative md:w-full lg:max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 lg:gap-96 items-center">
            <div className="space-y-4 md:space-y-6 px-4 md:px-0 text-center md:text-left relative lg:bg-none" style={{
              backgroundImage: 'url(/src/assets/images/objectives.svg)',
              backgroundSize: '80px 80px',
              backgroundPosition: 'center top 20px',
              backgroundRepeat: 'no-repeat',
              paddingTop: '120px'
            }}>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white md:pt-0 lg:pt-0">
                Our Objectives
              </h2>
              <div className="pl-0 md:pl-4">
                <div className="flex items-start space-x-3 justify-center md:justify-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white opacity-90 text-sm md:text-base lg:text-lg">
                    To be the most sought-after transportation partner thanks to our capabilities and ethics.
                  </p>
                </div>
                <div className="flex items-start space-x-3 justify-center md:justify-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white opacity-90 text-sm md:text-base lg:text-lg">
                    To be the most idol and iconic model of services in transport with our clients.
                  </p>
                </div>
                <div className="flex items-start space-x-3 justify-center md:justify-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-white opacity-90 text-sm md:text-base lg:text-lg">
                    To work with our clients with integrity, in a spirit of genuine partnership.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center relative hidden lg:block">
              <img 
                src="/src/assets/images/objectives.svg"
                alt="Our Objectives"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-2 md:top-4 right-4 md:right-8 w-8 h-8 md:w-16 md:h-16 bg-green-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-4 md:bottom-8 right-[40%] md:right-[45vh] w-4 h-4 md:w-8 md:h-8 bg-blue-300 rounded-full opacity-60"></div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
