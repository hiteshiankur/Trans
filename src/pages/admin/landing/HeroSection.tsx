import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: "",
    subtitle: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    backgroundImage: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Fetch existing hero content
  const fetchHeroContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/content/hero', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        // Check if data has section property directly
        if (data && data.section && data.section.contentEn) {
          const content = data.section.contentEn;
          console.log('Content data:', content);
          
          // Force state update with callback to ensure it works
          console.log('Setting hero data with values:', {
            title: content.mainTitle,
            subtitle: content.subtitle,
            primaryButtonText: content.primaryButtonText,
            secondaryButtonText: content.secondaryButtonText,
            backgroundImage: content.backgroundImage
          });
          
          setHeroData(prevState => {
            const newState = {
              title: content.mainTitle || "",
              subtitle: content.subtitle || "",
              primaryButtonText: content.primaryButtonText || "",
              secondaryButtonText: content.secondaryButtonText || "",
              backgroundImage: content.backgroundImage || ""
            };
            console.log('State update - Previous:', prevState, 'New:', newState);
            return newState;
          });
        } else {
          console.log('No section data found');
        }
      } else {
        console.log('API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add content data
      formData.append('contentEn[mainTitle]', heroData.title);
      formData.append('contentEn[subtitle]', heroData.subtitle);
      formData.append('contentEn[primaryButtonText]', heroData.primaryButtonText);
      formData.append('contentEn[secondaryButtonText]', heroData.secondaryButtonText);

      // Add image if uploaded
      if (uploadedFile) {
        formData.append('heroBackgroundImage', uploadedFile);
      }

      const response = await fetch('http://localhost:3000/api/admin/content/hero', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Hero section updated successfully!');
        fetchHeroContent(); // Refresh data
      } else {
        alert('Error: ' + (data.message || 'Failed to update hero content'));
      }
    } catch (error) {
      console.error('Error updating hero content:', error);
      alert('Error updating hero content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Component mounted, fetching hero content...');
    fetchHeroContent();
  }, []);

  // Debug: Log whenever heroData changes
  useEffect(() => {
    console.log('heroData state changed:', heroData);
  }, [heroData]);

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hero Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the main hero section of your landing page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          {/* Debug: Show current state */}
          <div className="text-xs text-gray-500 mt-2">
            Debug - Title: "{heroData.title}" | Subtitle: "{heroData.subtitle}"
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <Textarea
              value={heroData.title}
              onChange={(e) => setHeroData({...heroData, title: e.target.value})}
              placeholder="Enter main title"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <Input
              value={heroData.subtitle}
              onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
              placeholder="Enter subtitle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Button Text
              </label>
              <Input
                value={heroData.primaryButtonText}
                onChange={(e) => setHeroData({...heroData, primaryButtonText: e.target.value})}
                placeholder="Primary button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Button Text
              </label>
              <Input
                value={heroData.secondaryButtonText}
                onChange={(e) => setHeroData({...heroData, secondaryButtonText: e.target.value})}
                placeholder="Secondary button text"
              />
            </div>
          </div>

          <ImageUpload
            label="Background Image"
            value={heroData.backgroundImage}
            onChange={(file, preview) => {
              setUploadedFile(file);
              setHeroData({...heroData, backgroundImage: preview});
            }}
          />

          <div className="flex justify-end space-x-4">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroSection;
