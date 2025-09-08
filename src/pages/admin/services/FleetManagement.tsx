import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const ServicesFleetManagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    firstDescription: '',
    secondDescription: '',
    sectionImage: ''
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchFleetManagementContent();
  }, []);

  const fetchFleetManagementContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/admin/service-content/services-fleet-management', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.section) {
          const content = data.section.contentEn || {};
          setFormData({
            title: content.title || '',
            firstDescription: content.firstDescription || '',
            secondDescription: content.secondDescription || '',
            sectionImage: content.sectionImage || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching fleet management content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('firstDescription', formData.firstDescription);
      formDataToSend.append('secondDescription', formData.secondDescription);
      
      if (uploadedFile) {
        formDataToSend.append('sectionImage', uploadedFile);
      }
      
      const response = await fetch('http://localhost:3000/api/admin/service-content/fleet-management', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en'
        },
        body: formDataToSend
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Fleet Management section updated successfully!');
          fetchFleetManagementContent(); // Refresh data
        } else {
          alert('Error updating section: ' + (data.message || 'Unknown error'));
        }
      } else {
        alert('Error updating section');
      }
    } catch (error) {
      console.error('Error saving fleet management content:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services - Fleet Management</h1>
        <p className="text-gray-600 mt-2">Manage the fleet management section content</p>
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
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Description
            </label>
            <Textarea
              name="firstDescription"
              value={formData.firstDescription}
              onChange={handleInputChange}
              placeholder="Enter first description"
              rows={4}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second Description
            </label>
            <Textarea
              name="secondDescription"
              value={formData.secondDescription}
              onChange={handleInputChange}
              placeholder="Enter second description"
              rows={3}
              disabled={loading}
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

export default ServicesFleetManagement;
