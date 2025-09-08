import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { Plus, Trash2 } from 'lucide-react';
import { aboutContentApi } from '@/lib/api';
import { toast } from 'sonner';

interface Feature {
  featureTitle: string;
  featureDescription: string;
  featureIcon?: File | null;
}

const AboutFeaturesSection = () => {
  const [formData, setFormData] = useState({
    sectionImage: null as File | null,
    features: [] as Feature[]
  });
  const [sectionImagePreview, setSectionImagePreview] = useState<string>('');
  const [featureIconPreviews, setFeatureIconPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch existing data on component mount
  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const response = await aboutContentApi.getSectionContent('about-features');
        console.log('Features API Response:', response);
        if (response.section) {
          const content = response.section.contentEn || response.section;
          console.log('Features Content:', content);
          
          setFormData({
            sectionImage: null,
            features: content.features || []
          });
          
          if (content.sectionImage) {
            setSectionImagePreview(content.sectionImage);
          }
          
          // Set feature icon previews
          if (content.features) {
            const iconPreviews = content.features.map((feature: any) => feature.featureIcon || '');
            setFeatureIconPreviews(iconPreviews);
          }
        }
      } catch (error) {
        console.error('Error fetching features data:', error);
        toast.error('Failed to load features section data');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchFeaturesData();
  }, []);

  const handleSectionImageChange = (file: File | null, preview: string) => {
    setFormData(prev => ({
      ...prev,
      sectionImage: file
    }));
    setSectionImagePreview(preview);
  };

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const handleFeatureIconChange = (index: number, file: File | null, preview: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, featureIcon: file } : feature
      )
    }));
    
    setFeatureIconPreviews(prev => {
      const newPreviews = [...prev];
      newPreviews[index] = preview;
      return newPreviews;
    });
  };

  const addFeature = () => {
    if (formData.features.length >= 4) {
      toast.error('Maximum 4 features allowed');
      return;
    }
    
    const newFeature: Feature = {
      featureTitle: '',
      featureDescription: '',
      featureIcon: null
    };
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }));
    setFeatureIconPreviews(prev => [...prev, '']);
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
    setFeatureIconPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const featureIcons = formData.features
        .map(feature => feature.featureIcon)
        .filter(icon => icon !== null) as File[];
      
      const updateData = {
        features: formData.features.map(feature => ({
          featureTitle: feature.featureTitle,
          featureDescription: feature.featureDescription
        })),
        ...(formData.sectionImage && { sectionImage: formData.sectionImage }),
        ...(featureIcons.length > 0 && { featureIcons })
      };

      await aboutContentApi.updateFeaturesSection(updateData);
      toast.success('Features section updated successfully!');
    } catch (error: any) {
      console.error('Error updating features section:', error);
      toast.error(error.message || 'Failed to update features section');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">About Us - Features Section</h1>
          <p className="text-gray-600 mt-2">Manage the features section content for the About Us page</p>
        </div>
        <Card className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
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
        <h1 className="text-2xl font-bold text-gray-900">About Us - Features Section</h1>
        <p className="text-gray-600 mt-2">Manage the features section content for the About Us page</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <ImageUpload
            label="Section Image"
            value={sectionImagePreview}
            onChange={handleSectionImageChange}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Features (Max 4)</h3>
              <Button 
                onClick={addFeature} 
                variant="outline"
                disabled={formData.features.length >= 4}
              >
                Add Feature
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.features.map((feature, index) => (
                <Card key={index} className="p-4 border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Feature {index + 1}</h4>
                      <Button 
                        onClick={() => removeFeature(index)} 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <Input
                          value={feature.featureTitle}
                          onChange={(e) => handleFeatureChange(index, 'featureTitle', e.target.value)}
                          placeholder="Enter feature title"
                        />
                      </div>
                      <div>
                        <ImageUpload
                          label="Feature Icon"
                          value={featureIconPreviews[index] || ''}
                          onChange={(file, preview) => handleFeatureIconChange(index, file, preview)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Textarea
                        value={feature.featureDescription}
                        onChange={(e) => handleFeatureChange(index, 'featureDescription', e.target.value)}
                        placeholder="Enter feature description"
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

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

export default AboutFeaturesSection;
