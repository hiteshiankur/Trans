import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImageUpload from '@/components/ui/ImageUpload';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const ServicesSection = () => {
  const [sectionData, setSectionData] = useState({
    title: "Our Services",
    description: "TRANS plans, designs, and monitor transport systems of all types and sizes from corporate-scale to one-off signature projects. Above all, we work with complete transparency to optimize the cost and fulfill our client needs.",
    services: [
      {
        id: '1',
        title: 'Transport solutions',
        description: 'Stay updated on your cargo\'s exact location with instant tracking notifications',
        icon: '/src/assets/images/transport-solutions.svg'
      },
      {
        id: '2',
        title: 'Data analysis',
        description: 'Cut costs and time by letting our AI-driven system optimize delivery routes.',
        icon: '/src/assets/images/data-analysis.svg'
      },
      {
        id: '3',
        title: 'Hardware logistics',
        description: 'Make data-driven decisions with comprehensive logistics reports at your fingertips.',
        icon: '/src/assets/images/hardware-logistics.svg'
      },
      {
        id: '4',
        title: 'Fleet management',
        description: 'Make data-driven decisions with comprehensive logistics reports at your fingertips.',
        icon: '/src/assets/images/fleet-management.svg'
      }
    ] as Service[]
  });

  const handleServiceUpdate = (id: string, field: keyof Service, value: string) => {
    setSectionData(prev => ({
      ...prev,
      services: prev.services.map(service => 
        service.id === id ? { ...service, [field]: value } : service
      )
    }));
  };

  const handleSave = () => {
    // TODO: API call to save services section data
    console.log('Saving services data:', sectionData);
    alert('Services section updated successfully!');
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Our Services Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the services section of your landing page</p>
      </div>

      <div className="space-y-6">
        {/* Section Header */}
        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>
              <Input
                value={sectionData.title}
                onChange={(e) => setSectionData({...sectionData, title: e.target.value})}
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
              </label>
              <Textarea
                value={sectionData.description}
                onChange={(e) => setSectionData({...sectionData, description: e.target.value})}
                placeholder="Section description"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        <Card>
          <CardHeader>
            <CardTitle>Services ({sectionData.services.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sectionData.services.map((service, index) => (
                <div key={service.id} className="border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-lg">Service {index + 1}</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Title
                    </label>
                    <Input
                      value={service.title}
                      onChange={(e) => handleServiceUpdate(service.id, 'title', e.target.value)}
                      placeholder="Service title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Description
                    </label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => handleServiceUpdate(service.id, 'description', e.target.value)}
                      placeholder="Service description"
                      rows={3}
                    />
                  </div>
                  <ImageUpload
                    label="Service Icon"
                    value={service.icon}
                    onChange={(file, preview) => handleServiceUpdate(service.id, 'icon', preview)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
