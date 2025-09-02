import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';

const ServicesFleetManagement = () => {
  const [formData, setFormData] = useState({
    title: 'Fleet management',
    description1: 'TRANS control and operate fleets by using technology intelligent transport systems (ITS) and Artificial Intelligence (AI) to track and monitor, dispatch, and manage mobility and safety. For your business, we can provide you with reconciliation.',
    description2: 'Also, our ground GPS system can supervise and audit by key process indicator (KPI) to make sure that the service compliance as per the client needs.',
    image: '/src/assets/images/fleetManagement.svg'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving Services Fleet Management:', formData);
    alert('Services Fleet Management saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services - Fleet Management</h1>
        <p className="text-gray-600 mt-2">Manage the fleet management section content</p>
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
              First Description
            </label>
            <Textarea
              name="description1"
              value={formData.description1}
              onChange={handleInputChange}
              placeholder="Enter first description"
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second Description
            </label>
            <Textarea
              name="description2"
              value={formData.description2}
              onChange={handleInputChange}
              placeholder="Enter second description"
              rows={3}
            />
          </div>

          <ImageUpload
            label="Section Image"
            value={formData.image}
            onChange={(file, preview) => setFormData({...formData, image: preview})}
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

export default ServicesFleetManagement;
