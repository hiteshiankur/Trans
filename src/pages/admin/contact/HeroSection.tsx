import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactHeroSection = () => {
  const [formData, setFormData] = useState({
    mainTitle: '',
    subtitle: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch existing data on component mount
  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    setLoading(true);
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ';
      const response = await fetch('http://localhost:3000/api/admin/contact-content/contact-hero', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'lang': 'en'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Full API Response:', result);
        
        // Handle different possible response structures
        let content = null;
        
        if (result.data && result.data.content) {
          content = result.data.content;
        } else if (result.data) {
          content = result.data;
        } else if (result.content) {
          content = result.content;
        } else {
          content = result;
        }
        
        console.log('Extracted content:', content);
        
        if (content && (content.mainTitle || content.subtitle)) {
          const newFormData = {
            mainTitle: content.mainTitle || '',
            subtitle: content.subtitle || ''
          };
          console.log('Setting form data:', newFormData);
          setFormData(newFormData);
        } else {
          console.log('No valid content found in response');
        }
      } else {
        console.error('API Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ';
      const response = await fetch('http://localhost:3000/api/admin/contact-content/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'en'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Contact Us Hero Section saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Us - Hero Section</h1>
        <p className="text-gray-600 mt-2">Manage the hero section content for the Contact Us page</p>
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
              disabled={loading || saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <Textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="Enter subtitle"
              rows={2}
              disabled={loading || saving}
            />
          </div>

          {loading && (
            <div className="flex justify-center py-4">
              <div className="text-gray-600">Loading...</div>
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading || saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactHeroSection;
