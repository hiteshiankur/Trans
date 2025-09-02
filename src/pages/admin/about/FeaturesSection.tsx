import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ImageUpload from '@/components/ui/ImageUpload';
import { Plus, Trash2 } from 'lucide-react';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const AboutFeaturesSection = () => {
  const [formData, setFormData] = useState({
    sectionImage: '/src/assets/images/parcelboy.svg',
    features: [
      {
        id: '1',
        title: 'Bespoke Solutions Every Time',
        description: 'We\'ve never had a templated approach. Instead, we collaborate closely with our partners to devise unique project plans that optimize our clients\' capabilities and match their working methods.',
        icon: '/src/assets/images/bespoke.svg'
      },
      {
        id: '2',
        title: 'Single-Provider Efficiencies',
        description: 'It takes time and money to commission, brief and manage multiple suppliers. We relieve that burden, offering you radically reduced administrative and operational overhead.',
        icon: '/src/assets/images/single-provider.svg'
      },
      {
        id: '3',
        title: 'World Class Technology',
        description: 'Because we work uniquely, we keep working with the most advanced solutions to achieve the intended outcomes.',
        icon: '/src/assets/images/technology.svg'
      },
      {
        id: '4',
        title: 'It\'s a matter of ethics',
        description: 'Good business relies on trust, openness, and transparency - and our hiring policies reflect this. We choose our team members based on their creativity, disciplinary and achievements.',
        icon: '/src/assets/images/ethics.svg'
      }
    ] as Feature[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (index: number, field: keyof Feature, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((feature, i) => 
        i === index ? { ...feature, [field]: value } : feature
      )
    }));
  };

  const addFeature = () => {
    const newFeature: Feature = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: ''
    };
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log('Saving About Us Features Section:', formData);
    alert('About Us Features Section saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Us - Features Section</h1>
        <p className="text-gray-600 mt-2">Manage the features section content for the About Us page</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <ImageUpload
            label="Section Image"
            value={formData.sectionImage}
            onChange={(file, preview) => setFormData({...formData, sectionImage: preview})}
          />

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
              <Button onClick={addFeature} variant="outline">
                Add Feature
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.features.map((feature, index) => (
                <Card key={feature.id} className="p-4 border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">Feature {index + 1}</h4>
                      <Button 
                        onClick={() => removeFeature(index)} 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <Input
                          value={feature.title}
                          onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                          placeholder="Enter feature title"
                        />
                      </div>
                      <div>
                        <ImageUpload
                          label="Feature Icon"
                          value={feature.icon}
                          onChange={(file, preview) => updateFeature(index, 'icon', preview)}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <Textarea
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                        placeholder="Enter feature description"
                        rows={3}
                      />
                    </div>
                  </div>
                </Card>
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

export default AboutFeaturesSection;
