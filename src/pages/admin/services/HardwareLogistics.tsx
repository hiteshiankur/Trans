import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { Plus, Trash2 } from 'lucide-react';

interface LogisticsItem {
  itemText: string;
}

const ServicesHardwareLogistics = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sectionImage: '',
    logisticsItems: [] as LogisticsItem[]
  });
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
      logisticsItems: prev.logisticsItems.map((item, i) => 
        i === index ? { ...item, itemText: value } : item
      )
    }));
  };

  const addItem = () => {
    const newItem: LogisticsItem = {
      itemText: ''
    };
    setFormData(prev => ({
      ...prev,
      logisticsItems: [...prev.logisticsItems, newItem]
    }));
  };

  const removeItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      logisticsItems: prev.logisticsItems.filter((_, i) => i !== index)
    }));
  };

  useEffect(() => {
    fetchHardwareLogisticsContent();
  }, []);

  const fetchHardwareLogisticsContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/admin/service-content/services-hardware-logistics', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.section) {
          const content = data.section.contentEn || {};
          setFormData({
            title: content.title || '',
            description: content.description || '',
            sectionImage: content.sectionImage || '',
            logisticsItems: content.logisticsItems || []
          });
        }
      }
    } catch (error) {
      console.error('Error fetching hardware logistics content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('logisticsItems', JSON.stringify(formData.logisticsItems));
      
      if (uploadedFile) {
        formDataToSend.append('sectionImage', uploadedFile);
      }
      
      const response = await fetch('http://localhost:3000/api/admin/service-content/hardware-logistics', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en'
        },
        body: formDataToSend
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          alert('Hardware Logistics section updated successfully!');
          fetchHardwareLogisticsContent(); // Refresh data
        } else {
          alert('Error updating section: ' + (data.message || 'Unknown error'));
        }
      } else {
        alert('Error updating section');
      }
    } catch (error) {
      console.error('Error saving hardware logistics content:', error);
      alert('Error saving changes');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <ImageUpload
            label="Section Image"
            value={formData.sectionImage}
            onChange={(file) => {
              setUploadedFile(file);
              if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setFormData(prev => ({...prev, sectionImage: e.target?.result as string}));
                };
                reader.readAsDataURL(file);
              }
            }}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Logistics Items</h3>
              <Button onClick={addItem} variant="outline" disabled={loading}>
                Add Item
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.logisticsItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Input
                    value={item.itemText}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    placeholder="Enter logistics item"
                    className="flex-1"
                    disabled={loading}
                  />
                  <Button 
                    onClick={() => removeItem(index)} 
                    variant="outline" 
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    disabled={loading}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServicesHardwareLogistics;
