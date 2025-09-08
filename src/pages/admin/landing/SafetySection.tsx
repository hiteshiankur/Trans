import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

interface SafetyData {
  sectionTitle: string;
  description: string;
  buttonText: string;
  mainImage?: string;
  quoteIcon?: string;
}

const SafetySection = () => {
  const [safetyData, setSafetyData] = useState<SafetyData>({
    sectionTitle: "",
    description: "",
    buttonText: "",
    mainImage: "",
    quoteIcon: ""
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{safetyImage?: File, safetyVanImage?: File}>({});

  // Fetch existing safety content
  const fetchSafetyContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/content/safety', {
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
        
        setSafetyData({
          sectionTitle: content.sectionTitle || "",
          description: content.description || "",
          buttonText: content.buttonText || "",
          mainImage: content.mainImage || "",
          quoteIcon: content.quoteIcon || ""
        });
      } else {
        console.log('API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching safety content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSafetyContent();
  }, []);

  const handleFileUpload = (type: 'safetyImage' | 'safetyVanImage', file: File | null) => {
    if (file) {
      setUploadedFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add content data
      formData.append('contentEn[sectionTitle]', safetyData.sectionTitle);
      formData.append('contentEn[description]', safetyData.description);
      formData.append('contentEn[buttonText]', safetyData.buttonText);
      
      // Add uploaded files
      if (uploadedFiles.safetyImage) {
        formData.append('safetyImage', uploadedFiles.safetyImage);
      }
      if (uploadedFiles.safetyVanImage) {
        formData.append('safetyVanImage', uploadedFiles.safetyVanImage);
      }

      const response = await fetch('http://localhost:3000/api/admin/content/safety', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Safety updated successfully:', result);
        alert('Safety section updated successfully!');
        // Refresh data
        await fetchSafetyContent();
      } else {
        const errorData = await response.json();
        console.error('Error updating safety:', errorData);
        alert('Error updating safety: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving safety:', error);
      alert('Error saving safety. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Safety Priority Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the safety priority section of your landing page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Safety Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <Input
              value={safetyData.sectionTitle}
              onChange={(e) => setSafetyData({...safetyData, sectionTitle: e.target.value})}
              placeholder="Section title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={safetyData.description}
              onChange={(e) => setSafetyData({...safetyData, description: e.target.value})}
              placeholder="Section description"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <Input
              value={safetyData.buttonText}
              onChange={(e) => setSafetyData({...safetyData, buttonText: e.target.value})}
              placeholder="Button text"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <ImageUpload
                label="Main Safety Image"
                value={safetyData.mainImage || ""}
                onChange={(file) => handleFileUpload('safetyImage', file)}
              />
              {safetyData.mainImage && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Main Image
                  </label>
                  <img
                    src={safetyData.mainImage}
                    alt="Current main safety image"
                    className="w-32 h-20 object-cover rounded border"
                    onError={(e) => {
                      console.log('Image failed to load:', safetyData.mainImage);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <ImageUpload
                label="Quote Icon"
                value={safetyData.quoteIcon || ""}
                onChange={(file) => handleFileUpload('safetyVanImage', file)}
              />
              {safetyData.quoteIcon && (
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Quote Icon
                  </label>
                  <img
                    src={safetyData.quoteIcon}
                    alt="Current quote icon"
                    className="w-16 h-16 object-cover rounded border"
                    onError={(e) => {
                      console.log('Image failed to load:', safetyData.quoteIcon);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
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

export default SafetySection;
