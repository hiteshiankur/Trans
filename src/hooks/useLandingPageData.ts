import { useState, useEffect } from 'react';
import { LandingPageData, ApiResponse } from '@/types/landingPage';

// Mock data for development - replace with actual API calls
const mockLandingPageData: LandingPageData = {
  hero: {
    title: "Our Promise Delivered to Every Client Every Time",
    subtitle: "Expert transport management for fleets and logistics",
    primaryButtonText: "Get a Free Quote",
    secondaryButtonText: "Learn More",
    backgroundImage: "/src/assets/images/delivery-worker.svg"
  },
  services: {
    title: "Our Services",
    description: "TRANS plans, designs, and monitor transport systems of all types and sizes from corporate-scale to one-off signature projects. Above all, we work with complete transparency to optimize the cost and fulfill our client needs.",
    services: [
      {
        id: '1',
        title: 'Transport solutions',
        description: 'Stay updated on your cargo\'s exact location with instant tracking notifications',
        icon: 'transport'
      },
      {
        id: '2',
        title: 'Data analysis',
        description: 'Cut costs and time by letting our AI-driven system optimize delivery routes.',
        icon: 'analytics'
      },
      {
        id: '3',
        title: 'Hardware logistics',
        description: 'Make data-driven decisions with comprehensive logistics reports at your fingertips.',
        icon: 'hardware'
      },
      {
        id: '4',
        title: 'Fleet management',
        description: 'Make data-driven decisions with comprehensive logistics reports at your fingertips.',
        icon: 'fleet'
      }
    ]
  },
  safety: {
    title: "Your Fleet's Safety, Our Top Priority",
    description: "Regular safety checks and maintenance are part of our commitment to keeping your fleet in top condition. Our app schedules and tracks inspections, ensuring that every vehicle meets stringent safety standards",
    buttonText: "Get a Free Quote",
    vanImage: "/src/assets/images/VAN 1.svg",
    quoteIcon: "/src/assets/images/double-quotes.svg"
  },
  stats: {
    stats: [
      {
        id: '1',
        value: '10,000+',
        label: 'Deliveries Managed'
      },
      {
        id: '2',
        value: '2,500+',
        label: 'Active Clients'
      },
      {
        id: '3',
        value: '98%',
        label: 'On-Time Delivery Rate'
      },
      {
        id: '4',
        value: '200+',
        label: 'Industry Awards'
      }
    ]
  },
  cta: {
    title: "We would like to hear from you",
    description: "Join countless other businesses that have streamlined their logistics with our cutting-edge solutions",
    buttonText: "Get a Free Quote",
    truckImage: "/src/assets/images/truck.svg"
  }
};

export const useLandingPageData = () => {
  const [data, setData] = useState<LandingPageData>(mockLandingPageData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call - replace with actual API integration
  const fetchLandingPageData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/landing-page');
      // const result: ApiResponse<LandingPageData> = await response.json();
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setData(mockLandingPageData);
    } catch (err) {
      setError('Failed to fetch landing page data');
      console.error('Error fetching landing page data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSection = async (section: keyof LandingPageData, sectionData: any) => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/landing-page/${section}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sectionData)
      // });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setData(prev => ({
        ...prev,
        [section]: sectionData
      }));
      
      return { success: true, message: 'Section updated successfully' };
    } catch (err) {
      setError('Failed to update section');
      console.error('Error updating section:', err);
      return { success: false, message: 'Failed to update section' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLandingPageData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchLandingPageData,
    updateSection
  };
};
