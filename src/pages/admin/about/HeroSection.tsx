import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const AboutHeroSection = () => {
  const [formData, setFormData] = useState({
    subtitle: 'A BIT',
    title: 'About Us',
    description: 'With more than 14 years of knowledge in transport planning and managing city transportation and fleet manpower for mega-project in the KSA. You can rely on TRANS to deliver world-class transport management and consultancy. We offer a comprehensive suite of services, all tailored to your exact needs',
    buttonText: 'Explore Now',
    heroImage: '/src/assets/images/group.svg'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving About Us Hero Section:', formData);
    alert('About Us Hero Section saved successfully!');
  };

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
              name="title"
              value={formData.title}
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
            value={formData.heroImage}
            onChange={(file, preview) => setFormData({...formData, heroImage: preview})}
          />

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutHeroSection;
