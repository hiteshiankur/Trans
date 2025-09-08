import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { aboutContentApi } from '@/lib/api';
import { toast } from 'sonner';

const AboutHeroSection = () => {
  const [formData, setFormData] = useState({
    subtitle: '',
    mainTitle: '',
    description: '',
    buttonText: '',
    heroBackgroundImage: null as File | null
  });
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const response = await aboutContentApi.getSectionContent('about-hero');
        console.log('Hero API Response:', response);
        if (response.section) {
          const content = response.section.contentEn || response.section;
          console.log('Hero Content:', content);
          setFormData({
            subtitle: content.subtitle || '',
            mainTitle: content.mainTitle || '',
            description: content.description || '',
            buttonText: content.buttonText || '',
            heroBackgroundImage: null
          });
          if (content.heroBackgroundImage) {
            setHeroImagePreview(content.heroBackgroundImage);
          }
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
        toast.error('Failed to load hero section data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (file: File | null, preview: string) => {
    setFormData(prev => ({
      ...prev,
      heroBackgroundImage: file
    }));
    setHeroImagePreview(preview);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        subtitle: formData.subtitle,
        mainTitle: formData.mainTitle,
        description: formData.description,
        buttonText: formData.buttonText,
        ...(formData.heroBackgroundImage && { heroBackgroundImage: formData.heroBackgroundImage })
      };

      await aboutContentApi.updateHeroSection(updateData);
      toast.success('Hero section updated successfully!');
    } catch (error: any) {
      console.error('Error updating hero section:', error);
      toast.error(error.message || 'Failed to update hero section');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">About Us - Hero Section</h1>
          <p className="text-gray-600 mt-2">Manage the hero section content for the About Us page</p>
        </div>
        <Card className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
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
        <h1 className="text-2xl font-bold text-gray-900">About Us - Hero Section</h1>
        <p className="text-gray-600 mt-2">Manage the hero section content for the About Us page</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <Input
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              placeholder="Enter subtitle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <Input
              name="mainTitle"
              value={formData.mainTitle}
              onChange={handleInputChange}
              placeholder="Enter main title"
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Button Text
            </label>
            <Input
              name="buttonText"
              value={formData.buttonText}
              onChange={handleInputChange}
              placeholder="Enter button text"
            />
          </div>

          <ImageUpload
            label="Background Image"
            value={heroImagePreview}
            onChange={handleImageChange}
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

export default AboutHeroSection;
