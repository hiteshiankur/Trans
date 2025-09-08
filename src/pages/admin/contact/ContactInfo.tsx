import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    sectionTitle: '',
    sectionSubtitle: '',
    phoneNumber: '',
    emailAddress: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch existing data on component mount
  useEffect(() => {
    fetchContactInfoData();
  }, []);

  const fetchContactInfoData = async () => {
    setLoading(true);
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ';
      const response = await fetch('http://localhost:3000/api/admin/contact-content/contact-information', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'lang': 'en'
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Contact Info API Response:', result);
        
        // Handle different possible response structures
        let content = null;
        
        if (result.data && result.data.content) {
          content = result.data.content;
        } else if (result.data) {
          content = result.data;
        } else if (result.content) {
          content = result.content;
        } else {
          content = result;
        }
        
        if (content) {
          setFormData({
            sectionTitle: content.sectionTitle || '',
            sectionSubtitle: content.sectionSubtitle || '',
            phoneNumber: content.phoneNumber || '',
            emailAddress: content.emailAddress || '',
            addressLine1: content.addressLine1 || '',
            addressLine2: content.addressLine2 || '',
            addressLine3: content.addressLine3 || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching contact info data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ';
      const response = await fetch('http://localhost:3000/api/admin/contact-content/information', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'lang': 'en'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Contact Information saved successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Failed to save'}`);
      }
    } catch (error) {
      console.error('Error saving contact info data:', error);
      alert('Error saving data. Please try again.');
    } finally {
      setSaving(false);
    }
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
              disabled={loading || saving}
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
              disabled={loading || saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <Input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              disabled={loading || saving}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              placeholder="Enter email address"
              disabled={loading || saving}
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
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  placeholder="Enter address line 1"
                  disabled={loading || saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <Input
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Enter address line 2"
                  disabled={loading || saving}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 3
                </label>
                <Input
                  name="addressLine3"
                  value={formData.addressLine3}
                  onChange={handleInputChange}
                  placeholder="Enter address line 3"
                  disabled={loading || saving}
                />
              </div>
            </div>
          </div>

          {loading && (
            <div className="flex justify-center py-4">
              <div className="text-gray-600">Loading...</div>
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={loading || saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactInfo;
