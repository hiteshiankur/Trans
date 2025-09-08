import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { aboutContentApi } from '@/lib/api';
import { toast } from 'sonner';

const AboutMissionSection = () => {
  const [formData, setFormData] = useState({
    missionTitle: '',
    missionDescription: '',
    missionIcon: null as File | null
  });
  const [iconPreview, setIconPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const response = await aboutContentApi.getSectionContent('about-mission');
        console.log('Mission API Response:', response);
        if (response.section) {
          const content = response.section.contentEn || response.section;
          console.log('Mission Content:', content);
          setFormData({
            missionTitle: content.missionTitle || '',
            missionDescription: content.missionDescription || '',
            missionIcon: null
          });
          if (content.missionIcon) {
            setIconPreview(content.missionIcon);
          }
        }
      } catch (error) {
        console.error('Error fetching mission data:', error);
        toast.error('Failed to load mission section data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchMissionData();
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
      missionIcon: file
    }));
    setIconPreview(preview);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const updateData = {
        missionTitle: formData.missionTitle,
        missionDescription: formData.missionDescription,
        ...(formData.missionIcon && { missionIcon: formData.missionIcon })
      };

      await aboutContentApi.updateMissionSection(updateData);
      toast.success('Mission section updated successfully!');
    } catch (error: any) {
      console.error('Error updating mission section:', error);
      toast.error(error.message || 'Failed to update mission section');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">About Us - Mission Section</h1>
          <p className="text-gray-600 mt-2">Manage the mission section content for the About Us page</p>
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
        <h1 className="text-2xl font-bold text-gray-900">About Us - Mission Section</h1>
        <p className="text-gray-600 mt-2">Manage the mission section content for the About Us page</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mission Title
            </label>
            <Input
              name="missionTitle"
              value={formData.missionTitle}
              onChange={handleInputChange}
              placeholder="Enter mission title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mission Description
            </label>
            <Textarea
              name="missionDescription"
              value={formData.missionDescription}
              onChange={handleInputChange}
              placeholder="Enter mission description"
              rows={4}
            />
          </div>

          <ImageUpload
            label="Mission Icon"
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

export default AboutMissionSection;
