import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ServicesHeroSection = () => {
  const [formData, setFormData] = useState({
    mainTitle: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);

  // Fetch existing hero content
  const fetchHeroContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/service-content/services-hero', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ`,
          'lang': 'en',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Hero content fetched:', result);
        
        // Handle the actual API response structure
        const content = result.section?.contentEn || result.data?.section?.contentEn || {};
        setFormData({
          mainTitle: content.mainTitle || '',
          description: content.description || ''
        });
      } else {
        console.log('No existing hero content found');
      }
    } catch (error) {
      console.error('Error fetching hero content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroContent();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/service-content/hero', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ`,
          'Content-Type': 'application/json',
          'lang': 'en',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Hero section updated successfully:', result);
        alert('Services Hero Section updated successfully!');
        // Refresh data
        await fetchHeroContent();
      } else {
        const errorData = await response.json();
        console.error('Error updating hero section:', errorData);
        alert('Error updating hero section: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving hero section:', error);
      alert('Error saving hero section. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services - Hero Section</h1>
        <p className="text-gray-600 mt-2">Manage the hero section content for the Services page</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <Input
              name="mainTitle"
              value={formData.mainTitle}
              onChange={handleInputChange}
              placeholder="Enter main title"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows={4}
              disabled={loading}
            />
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServicesHeroSection;
