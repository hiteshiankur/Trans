import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const SafetySection = () => {
  const [safetyData, setSafetyData] = useState({
    title: "Your Fleet's Safety, Our Top Priority",
    description: "Regular safety checks and maintenance are part of our commitment to keeping your fleet in top condition. Our app schedules and tracks inspections, ensuring that every vehicle meets stringent safety standards",
    buttonText: "Get a Free Quote",
    vanImage: "/src/assets/images/VAN 1.svg",
    quoteIcon: "/src/assets/images/double-quotes.svg"
  });

  const handleSave = () => {
    // TODO: API call to save safety section data
    console.log('Saving safety data:', safetyData);
    alert('Safety section updated successfully!');
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
              value={safetyData.title}
              onChange={(e) => setSafetyData({...safetyData, title: e.target.value})}
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
            <ImageUpload
              label="Van Image"
              value={safetyData.vanImage}
              onChange={(file, preview) => setSafetyData({...safetyData, vanImage: preview})}
            />
            <ImageUpload
              label="Quote Icon"
              value={safetyData.quoteIcon}
              onChange={(file, preview) => setSafetyData({...safetyData, quoteIcon: preview})}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafetySection;
