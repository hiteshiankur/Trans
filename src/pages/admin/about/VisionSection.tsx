import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { aboutContentApi } from '@/lib/api';
import { toast } from 'sonner';

const AboutVisionSection = () => {
  const [formData, setFormData] = useState({
    visionTitle: '',
    visionDescription: '',
    visionIcon: null as File | null
  });
  const [iconPreview, setIconPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        const response = await aboutContentApi.getSectionContent('about-vision');
        console.log('Vision API Response:', response);
        if (response.section) {
          const content = response.section.contentEn || response.section;
          console.log('Vision Content:', content);
          setFormData({
            visionTitle: content.visionTitle || '',
            visionDescription: content.visionDescription || '',
            visionIcon: null
          });
          if (content.visionIcon) {
            setIconPreview(content.visionIcon);
          }
        }
      } catch (error) {
        console.error('Error fetching vision data:', error);
        toast.error('Failed to load vision section data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchVisionData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIconChange = (file: File | null, preview: string) => {
    setFormData(prev => ({
      ...prev,
      visionIcon: file
    }));
    setIconPreview(preview);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        visionTitle: formData.visionTitle,
        visionDescription: formData.visionDescription,
        ...(formData.visionIcon && { visionIcon: formData.visionIcon })
      };

      await aboutContentApi.updateVisionSection(updateData);
      toast.success('Vision section updated successfully!');
    } catch (error: any) {
      console.error('Error updating vision section:', error);
      toast.error(error.message || 'Failed to update vision section');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">About Us - Vision Section</h1>
          <p className="text-gray-600 mt-2">Manage the vision section content for the About Us page</p>
        </div>
        <Card className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Us - Vision Section</h1>
        <p className="text-gray-600 mt-2">Manage the vision section content for the About Us page</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vision Title
            </label>
            <Input
              name="visionTitle"
              value={formData.visionTitle}
              onChange={handleInputChange}
              placeholder="Enter vision title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vision Description
            </label>
            <Textarea
              name="visionDescription"
              value={formData.visionDescription}
              onChange={handleInputChange}
              placeholder="Enter vision description"
              rows={4}
            />
          </div>

          <ImageUpload
            label="Vision Icon"
            value={iconPreview}
            onChange={handleIconChange}
          />


          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutVisionSection;
