import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const CTASection = () => {
  const [ctaData, setCTAData] = useState({
    title: "We would like to hear from you",
    description: "Join countless other businesses that have streamlined their logistics with our cutting-edge solutions",
    buttonText: "Get a Free Quote",
    truckImage: "/src/assets/images/truck.svg"
  });

  const handleSave = () => {
    // TODO: API call to save CTA section data
    console.log('Saving CTA data:', ctaData);
    alert('CTA section updated successfully!');
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
              value={ctaData.title}
              onChange={(e) => setCTAData({...ctaData, title: e.target.value})}
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

          <ImageUpload
            label="Truck Image"
            value={ctaData.truckImage}
            onChange={(file, preview) => setCTAData({...ctaData, truckImage: preview})}
          />

          <div className="flex justify-end space-x-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CTASection;
