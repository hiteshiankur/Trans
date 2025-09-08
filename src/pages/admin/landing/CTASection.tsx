import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

interface CTAData {
  ctaTitle: string;
  description: string;
  buttonText: string;
  truckImage?: string;
}

const CTASection = () => {
  const [ctaData, setCTAData] = useState<CTAData>({
    ctaTitle: "",
    description: "",
    buttonText: "",
    truckImage: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Fetch existing CTA content
  const fetchCTAContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/content/cta', {
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
        
        setCTAData({
          ctaTitle: content.ctaTitle || "",
          description: content.description || "",
          buttonText: content.buttonText || "",
          truckImage: content.truckImage || ""
        });
      } else {
        console.log('API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching CTA content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCTAContent();
  }, []);

  const handleFileUpload = (file: File | null) => {
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add content data
      formData.append('contentEn[ctaTitle]', ctaData.ctaTitle);
      formData.append('contentEn[description]', ctaData.description);
      formData.append('contentEn[buttonText]', ctaData.buttonText);
      
      // Add uploaded file
      if (uploadedFile) {
        formData.append('ctaBackgroundImage', uploadedFile);
      }

      const response = await fetch('http://localhost:3000/api/admin/content/cta', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('CTA updated successfully:', result);
        alert('CTA section updated successfully!');
        // Refresh data
        await fetchCTAContent();
      } else {
        const errorData = await response.json();
        console.error('Error updating CTA:', errorData);
        alert('Error updating CTA: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving CTA:', error);
      alert('Error saving CTA. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">CTA Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the call-to-action section of your landing page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>CTA Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CTA Title
            </label>
            <Input
              value={ctaData.ctaTitle}
              onChange={(e) => setCTAData({...ctaData, ctaTitle: e.target.value})}
              placeholder="CTA title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={ctaData.description}
              onChange={(e) => setCTAData({...ctaData, description: e.target.value})}
              placeholder="CTA description"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <Input
              value={ctaData.buttonText}
              onChange={(e) => setCTAData({...ctaData, buttonText: e.target.value})}
              placeholder="Button text"
            />
          </div>

          <div>
            <ImageUpload
              label="Truck Image"
              value={ctaData.truckImage || ""}
              onChange={(file) => handleFileUpload(file)}
            />
            
          </div>

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

export default CTASection;
