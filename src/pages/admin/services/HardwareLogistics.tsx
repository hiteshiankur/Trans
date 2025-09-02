import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { Plus, Trash2 } from 'lucide-react';

interface LogisticsItem {
  id: string;
  text: string;
}

const ServicesHardwareLogistics = () => {
  const [formData, setFormData] = useState({
    title: 'Hardware logistics',
    description: 'Our clients can benefit from our logistic support by supplying, installing, servicing and more.',
    image: '/src/assets/images/hardwareLogistics.svg',
    items: [
      { id: '1', text: 'Bus stations.' },
      { id: '2', text: 'Electrical and lighting ITS server stations.' },
      { id: '3', text: 'Design and Install Signage.' },
      { id: '4', text: 'Closed-circuit television (CCTV).' },
      { id: '5', text: 'Traffic support material traffic cones, police barriers and water barriers.' }
    ] as LogisticsItem[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) => 
        i === index ? { ...item, text: value } : item
      )
    }));
  };

  const addItem = () => {
    const newItem: LogisticsItem = {
      id: Date.now().toString(),
      text: ''
    };
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log('Saving Services Hardware Logistics:', formData);
    alert('Services Hardware Logistics saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services - Hardware Logistics</h1>
        <p className="text-gray-600 mt-2">Manage the hardware logistics section content</p>
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
              <h3 className="text-lg font-medium text-gray-900">Logistics Items</h3>
              <Button onClick={addItem} variant="outline">
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.items.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <Input
                    value={item.text}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder="Enter logistics item"
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => removeItem(index)} 
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

export default ServicesHardwareLogistics;
