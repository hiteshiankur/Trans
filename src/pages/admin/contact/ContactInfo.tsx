import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    sectionTitle: 'Contact Information',
    sectionSubtitle: 'Say something to start a live chat!',
    phone: '+96 65697 90065',
    email: 'clientservices@trans.com.co',
    address: {
      line1: 'Level 7 Almurjanah Tower',
      line2: 'Prince Sultan St.',
      line3: 'Ar Rawdah,Jeddah , KSA'
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = () => {
    console.log('Saving Contact Information:', formData);
    alert('Contact Information saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Us - Contact Information</h1>
        <p className="text-gray-600 mt-2">Manage the contact information section content</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title
            </label>
            <Input
              name="sectionTitle"
              value={formData.sectionTitle}
              onChange={handleInputChange}
              placeholder="Enter section title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Subtitle
            </label>
            <Input
              name="sectionSubtitle"
              value={formData.sectionSubtitle}
              onChange={handleInputChange}
              placeholder="Enter section subtitle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <Input
                  name="address.line1"
                  value={formData.address.line1}
                  onChange={handleInputChange}
                  placeholder="Enter address line 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <Input
                  name="address.line2"
                  value={formData.address.line2}
                  onChange={handleInputChange}
                  placeholder="Enter address line 2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 3
                </label>
                <Input
                  name="address.line3"
                  value={formData.address.line3}
                  onChange={handleInputChange}
                  placeholder="Enter address line 3"
                />
              </div>
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

export default ContactInfo;
