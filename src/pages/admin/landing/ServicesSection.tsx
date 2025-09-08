import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ui/ImageUpload';

interface Service {
  serviceTitle: string;
  serviceDescription: string;
  serviceIcon?: string;
}

interface ServicesData {
  sectionTitle: string;
  sectionDescription: string;
  services: Service[];
}

const ServicesSection = () => {
  const [servicesData, setServicesData] = useState<ServicesData>({
    sectionTitle: "",
    sectionDescription: "",
    services: [
      { serviceTitle: "", serviceDescription: "", serviceIcon: "" },
      { serviceTitle: "", serviceDescription: "", serviceIcon: "" },
      { serviceTitle: "", serviceDescription: "", serviceIcon: "" },
      { serviceTitle: "", serviceDescription: "", serviceIcon: "" }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // Fetch existing services content
  const fetchServicesContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/content/services', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Full API response:', result);
        
        // Handle different response structures
        let content: any = {};
        if (result.data?.section?.contentEn) {
          content = result.data.section.contentEn;
        } else if (result.data?.contentEn) {
          content = result.data.contentEn;
        } else if (result.section?.contentEn) {
          content = result.section.contentEn;
        } else if (result.contentEn) {
          content = result.contentEn;
        } else if (result.data) {
          content = result.data;
        }
        
        console.log('Parsed content:', content);
        
        setServicesData({
          sectionTitle: content.sectionTitle || "",
          sectionDescription: content.sectionDescription || "",
          services: content.services || [
            { serviceTitle: "", serviceDescription: "", serviceIcon: "" },
            { serviceTitle: "", serviceDescription: "", serviceIcon: "" },
            { serviceTitle: "", serviceDescription: "", serviceIcon: "" },
            { serviceTitle: "", serviceDescription: "", serviceIcon: "" }
          ]
        });
      } else {
        console.log('API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching services content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServicesContent();
  }, []);

  const handleServiceUpdate = (index: number, field: keyof Service, value: string) => {
    setServicesData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const handleFileUpload = (index: number, file: File | null) => {
    if (file) {
      const newFiles = [...uploadedFiles];
      newFiles[index] = file;
      setUploadedFiles(newFiles);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add content data
      formData.append('contentEn[sectionTitle]', servicesData.sectionTitle);
      formData.append('contentEn[sectionDescription]', servicesData.sectionDescription);
      
      // Add services data
      servicesData.services.forEach((service, index) => {
        formData.append(`contentEn[services][${index}][serviceTitle]`, service.serviceTitle);
        formData.append(`contentEn[services][${index}][serviceDescription]`, service.serviceDescription);
      });
      
      // Add uploaded files
      uploadedFiles.forEach((file) => {
        if (file) {
          formData.append('serviceIcon', file);
        }
      });

      const response = await fetch('http://localhost:3000/api/admin/content/services', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Services updated successfully:', result);
        alert('Services section updated successfully!');
        // Refresh data
        await fetchServicesContent();
      } else {
        const errorData = await response.json();
        console.error('Error updating services:', errorData);
        alert('Error updating services: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving services:', error);
      alert('Error saving services. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Our Services Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the services section of your landing page</p>
      </div>

      <div className="space-y-6">
        {/* Section Header */}
        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <Input
                value={servicesData.sectionTitle}
                onChange={(e) => setServicesData({...servicesData, sectionTitle: e.target.value})}
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <Textarea
                value={servicesData.sectionDescription}
                onChange={(e) => setServicesData({...servicesData, sectionDescription: e.target.value})}
                placeholder="Section description"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services ({servicesData.services.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesData.services.map((service, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-lg">Service {index + 1}</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Title
                    </label>
                    <Input
                      value={service.serviceTitle}
                      onChange={(e) => handleServiceUpdate(index, 'serviceTitle', e.target.value)}
                      placeholder="Service title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Description
                    </label>
                    <Textarea
                      value={service.serviceDescription}
                      onChange={(e) => handleServiceUpdate(index, 'serviceDescription', e.target.value)}
                      placeholder="Service description"
                      rows={3}
                    />
                  </div>
                  <ImageUpload
                    label="Service Icon"
                    value={service.serviceIcon || ""}
                    onChange={(file) => handleFileUpload(index, file)}
                  />
                  
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
