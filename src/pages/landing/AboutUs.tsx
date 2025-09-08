import React, { useState, useEffect } from 'react';
import Layout from '../../components/landing/Layout';
import { aboutContentApi } from '../../lib/api';

const AboutUs = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await aboutContentApi.getAboutContent();
      console.log('API Response:', response); // Debug log
      
      // The API returns data under 'aboutPage' key
      if (response.aboutPage) {
        setAboutData(response.aboutPage);
      } else {
        console.error('No aboutPage data found in response:', response);
        setAboutData(null);
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      setAboutData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!aboutData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load About Us content</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Handle both API response structures
  const heroData = aboutData['about-hero'] || aboutData.find?.((section: any) => section.sectionType === 'about-hero')?.contentEn || {};
  const featuresData = aboutData['about-features'] || aboutData.find?.((section: any) => section.sectionType === 'about-features')?.contentEn || {};
  const missionData = aboutData['about-mission'] || aboutData.find?.((section: any) => section.sectionType === 'about-mission')?.contentEn || {};
  const visionData = aboutData['about-vision'] || aboutData.find?.((section: any) => section.sectionType === 'about-vision')?.contentEn || {};
  const objectivesData = aboutData['about-objectives'] || aboutData.find?.((section: any) => section.sectionType === 'about-objectives')?.contentEn || {};

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="space-y-6 lg:col-span-2">
              <div className="text-lg font-semibold text-gray-900 uppercase tracking-[0.40em]">
                {heroData.subtitle || 'A BIT'}
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight" style={{color: '#3479EA'}}>
                {heroData.mainTitle || 'About Us'}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {heroData.description || 'With more than 14 years of knowledge in transport planning and managing city transportation and fleet manpower for mega-project in the KSA. You can rely on TRANS to deliver world-class transport management and consultancy. We offer a comprehensive suite of services, all tailored to your exact needs'}
              </p>
              <button className="px-8 py-3 text-sm text-white font-normal rounded hover:bg-blue-700 transition-colors" style={{backgroundColor: '#3479EA'}}>
                {heroData.buttonText || 'Explore Now'}
              </button>
            </div>
            <div className="relative flex justify-center lg:col-span-3">
              <img 
                src={heroData.heroBackgroundImage || "/src/assets/images/group.svg"}
                alt="Transport Management Team"
                className="w-[90%] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white">
        <div className="mx-auto pr-28">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
            {/* Left Column - Image */}
            <div className="relative lg:col-span-3">
              <img 
                src={featuresData.sectionImage || "/src/assets/images/parcelboy.svg"}
                alt="Delivery Professional"
                className="w-auto h-auto object-contain"
              />
            </div>

            {/* Right Column - Features */}
            <div className="space-y-8 lg:col-span-2 flex flex-col gap-8 ">
              {featuresData.features && featuresData.features.length > 0 ? (
                featuresData.features.map((feature: any, index: number) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src={feature.featureIcon || "/src/assets/images/bespoke.svg"}
                        alt={feature.featureTitle}
                        className="w-[52px] h-[52px]"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-[#1C1F35] mb-2">{feature.featureTitle}</h3>
                      <p className="text-[#666C89] text-base">
                        {feature.featureDescription}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback content
                <>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <img 
                        src="/src/assets/images/bespoke.svg"
                        alt="Bespoke Solutions"
                        className="w-[52px] h-[52px]"
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-[#1C1F35] mb-2">Bespoke Solutions Every Time</h3>
                      <p className="text-[#666C89] text-base">
                        We've never had a templated approach. Instead, we collaborate closely with our partners to devise unique project plans that optimize our clients' capabilities and match their working methods.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="pb-8 pt-12 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #4F7DF3 0%, #3B82F6 100%)',
        clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-64 items-center">
            <div className="space-y-6 px-7">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                {missionData.missionTitle || 'Our Mission'}
              </h2>
              <p className="text-lg text-white opacity-90">
                {missionData.missionDescription || 'To build a premium standard values with each step of our Deliverables to our clients.'}
              </p>
            </div>
            <div className="flex justify-center relative">
              <img 
                src={missionData.missionIcon || "/src/assets/images/mission.svg"}
                alt="Our Mission"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-4 right-16 w-16 h-16 bg-yellow-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-16 left-16 w-8 h-8 bg-blue-300 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-0 bg-white relative overflow-hidden">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 items-center">
            <div className="flex justify-center order-2 lg:order-1 relative top-5">
              <img 
                src={visionData.visionIcon || "/src/assets/images/vision.svg"}
                alt="Our Vision"
                className="w-64 h-64 object-contain"
              />
            </div>
            <div className="space-y-6 order-1 lg:order-2 pl-52 pr-5">
              <h2 className="text-3xl lg:text-4xl font-bold" style={{color: '#3479EA'}}>
                {visionData.visionTitle || 'Our Vision'}
              </h2>
              <p className="text-lg text-gray-700">
                {visionData.visionDescription || 'To be the industry trailblazer who delivers innovative services and solutions in the With this trend in line with the vision of the Kingdom.'}
              </p>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-8 left-56 w-12 h-12 bg-blue-200 rounded-full opacity-40"></div>
          <div className="absolute bottom-8 left-[65vh] w-8 h-8 bg-blue-300 rounded-full opacity-50"></div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="pt-12 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #4F7DF3 0%, #3B82F6 100%)',
        clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 100%)'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-96 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                {objectivesData.objectivesTitle || 'Our Objectives'}
              </h2>
              <div className="pl-4">
                {objectivesData.objectives && objectivesData.objectives.length > 0 ? (
                  objectivesData.objectives.map((objective: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white opacity-90 text-lg">
                        {objective.objectiveText}
                      </p>
                    </div>
                  ))
                ) : (
                  // Fallback content
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white opacity-90 text-lg">
                        To be the most sought-after transportation partner thanks to our capabilities and ethics.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white opacity-90 text-lg">
                        To be the most idol and iconic model of services in transport with our clients.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-white opacity-90 text-lg">
                        To work with our clients with integrity, in a spirit of genuine partnership.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex justify-center relative">
              <img 
                src={objectivesData.objectivesIcon || "/src/assets/images/objectives.svg"}
                alt="Our Objectives"
                className="w-64 h-64 object-contain"
              />
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-4 right-8 w-16 h-16 bg-green-400 rounded-full opacity-80"></div>
          <div className="absolute bottom-8 right-[45vh] w-8 h-8 bg-blue-300 rounded-full opacity-60"></div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
