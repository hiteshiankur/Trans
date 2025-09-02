import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const ServicesDataAnalysis = () => {
  const [formData, setFormData] = useState({
    title: 'Data analysis',
    description: 'We engage at every stage of transport planning and design. Your project can benefit from our strengths in capacity analysis, traffic management, and intelligent transport systems. And at ground level, we incorporate the best in wayfinding systems.',
    image: '/src/assets/images/dataAnalysis.svg',
    subsectionTitle: 'Commercial and sales advice',
    subsectionDescription: 'If your company is looking for a project of any size, we can help you build a winning proposal. Our consultants will help ensure that your submission satisfies the highest levels of scrutiny and evaluation, both for commercial and civilian projects.'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving Services Data Analysis:', formData);
    alert('Services Data Analysis saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services - Data Analysis</h1>
        <p className="text-gray-600 mt-2">Manage the data analysis section content</p>
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Main Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter main description"
              rows={4}
            />
          </div>

          <ImageUpload
            label="Section Image"
            value={formData.image}
            onChange={(file, preview) => setFormData({...formData, image: preview})}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subsection Title
            </label>
            <Input
              name="subsectionTitle"
              value={formData.subsectionTitle}
              onChange={handleInputChange}
              placeholder="Enter subsection title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subsection Description
            </label>
            <Textarea
              name="subsectionDescription"
              value={formData.subsectionDescription}
              onChange={handleInputChange}
              placeholder="Enter subsection description"
              rows={4}
            />
          </div>

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

export default ServicesDataAnalysis;
