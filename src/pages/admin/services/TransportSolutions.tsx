import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { Plus, Trash2 } from 'lucide-react';

interface ServiceItem {
  serviceText: string;
}

const ServicesTransportSolutions = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sectionImage: '',
    services: [] as ServiceItem[]
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Fetch existing transport solutions content
  const fetchTransportSolutionsContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/service-content/services-transport-solutions', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ`,
          'lang': 'en',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Transport solutions content fetched:', result);
        
        const content = result.section?.contentEn || result.data?.section?.contentEn || {};
        setFormData({
          title: content.title || '',
          description: content.description || '',
          sectionImage: content.sectionImage || '',
          services: content.services || []
        });
      } else {
        console.log('No existing transport solutions content found');
      }
    } catch (error) {
      console.error('Error fetching transport solutions content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportSolutionsContent();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, serviceText: value } : service
      )
    }));
  };

  const addService = () => {
    const newService: ServiceItem = {
      serviceText: ''
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      
      // Add content data
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('services', JSON.stringify(formData.services));
      
      // Add uploaded file if exists
      if (uploadedFile) {
        formDataToSend.append('sectionImage', uploadedFile);
      }

      const response = await fetch('http://localhost:3000/api/admin/service-content/transport-solutions', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ`,
          'lang': 'en',
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Transport solutions updated successfully:', result);
        alert('Transport Solutions section updated successfully!');
        // Refresh data
        await fetchTransportSolutionsContent();
      } else {
        const errorData = await response.json();
        console.error('Error updating transport solutions:', errorData);
        alert('Error updating transport solutions: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving transport solutions:', error);
      alert('Error saving transport solutions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services - Transport Solutions</h1>
        <p className="text-gray-600 mt-2">Manage the transport solutions section content</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter section title"
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
              rows={3}
            />
          </div>

          <ImageUpload
            label="Section Image"
            value={formData.sectionImage}
            onChange={(file) => {
              setUploadedFile(file);
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setFormData(prev => ({...prev, sectionImage: e.target?.result as string}));
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Services</h3>
              <Button onClick={addService} variant="outline">
                Add Service
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.services.map((service, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Input
                    value={service.serviceText}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    placeholder="Enter service item"
                    className="flex-1"
                    disabled={loading}
                  />
                  <Button 
                    onClick={() => removeService(index)} 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
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

export default ServicesTransportSolutions;
