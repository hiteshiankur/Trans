import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    title: "Our Promise Delivered to Every Client Every Time",
    subtitle: "Expert transport management for fleets and logistics",
    primaryButtonText: "Get a Free Quote",
    secondaryButtonText: "Learn More",
    backgroundImage: "/src/assets/images/delivery-worker.svg"
  });

  const handleSave = () => {
    // TODO: API call to save hero section data
    console.log('Saving hero data:', heroData);
    alert('Hero section updated successfully!');
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hero Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the main hero section of your landing page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Title
            </label>
            <Textarea
              value={heroData.title}
              onChange={(e) => setHeroData({...heroData, title: e.target.value})}
              placeholder="Enter main title"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <Input
              value={heroData.subtitle}
              onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
              placeholder="Enter subtitle"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Button Text
              </label>
              <Input
                value={heroData.primaryButtonText}
                onChange={(e) => setHeroData({...heroData, primaryButtonText: e.target.value})}
                placeholder="Primary button text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Button Text
              </label>
              <Input
                value={heroData.secondaryButtonText}
                onChange={(e) => setHeroData({...heroData, secondaryButtonText: e.target.value})}
                placeholder="Secondary button text"
              />
            </div>
          </div>

          <ImageUpload
            label="Background Image"
            value={heroData.backgroundImage}
            onChange={(file, preview) => setHeroData({...heroData, backgroundImage: preview})}
          />

          <div className="flex justify-end space-x-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroSection;
