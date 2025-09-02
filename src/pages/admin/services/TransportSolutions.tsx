import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { Plus, Trash2 } from 'lucide-react';

interface ServiceItem {
  id: string;
  text: string;
}

const ServicesTransportSolutions = () => {
  const [formData, setFormData] = useState({
    title: 'Transport solutions',
    description: 'We supply and manage distinguished solutions to suit our clients\' needs with significant experience.',
    image: '/src/assets/images/transportSolutions.svg',
    services: [
      { id: '1', text: 'Shuttle bus service.' },
      { id: '2', text: 'Electrical appliances.' },
      { id: '3', text: 'Autonomous solutions.' },
      { id: '4', text: 'Pool buggy transport.' },
      { id: '5', text: 'Executive transport services.' },
      { id: '6', text: 'Traffic management.' }
    ] as ServiceItem[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, text: value } : service
      )
    }));
  };

  const addService = () => {
    const newService: ServiceItem = {
      id: Date.now().toString(),
      text: ''
    };
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, newService]
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log('Saving Services Transport Solutions:', formData);
    alert('Services Transport Solutions saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services - Transport Solutions</h1>
        <p className="text-gray-600 mt-2">Manage the transport solutions section content</p>
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
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <ImageUpload
            label="Section Image"
            value={formData.image}
            onChange={(file, preview) => setFormData({...formData, image: preview})}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Services</h3>
              <Button onClick={addService} variant="outline">
                Add Service
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.services.map((service, index) => (
                <div key={service.id} className="flex items-center space-x-3">
                  <Input
                    value={service.text}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    placeholder="Enter service item"
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => removeService(index)} 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
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

export default ServicesTransportSolutions;
