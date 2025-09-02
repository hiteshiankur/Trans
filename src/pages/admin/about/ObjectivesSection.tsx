import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';

interface Objective {
  id: string;
  text: string;
}

const AboutObjectivesSection = () => {
  const [formData, setFormData] = useState({
    title: 'Our Objectives',
    objectives: [
      {
        id: '1',
        text: 'To be the most sought-after transportation partner thanks to our capabilities and ethics.'
      },
      {
        id: '2',
        text: 'To be the most idol and iconic model of services in transport with our clients.'
      },
      {
        id: '3',
        text: 'To work with our clients with integrity, in a spirit of genuine partnership.'
      }
    ] as Objective[]
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleObjectiveChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((objective, i) => 
        i === index ? { ...objective, text: value } : objective
      )
    }));
  };

  const addObjective = () => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      text: ''
    };
    setFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, newObjective]
    }));
  };

  const removeObjective = (index: number) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    console.log('Saving About Us Objectives Section:', formData);
    alert('About Us Objectives Section saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">About Us - Objectives Section</h1>
        <p className="text-gray-600 mt-2">Manage the objectives section content for the About Us page</p>
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
              placeholder="Enter objectives title"
            />
          </div>


          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Objectives</h3>
              <Button onClick={addObjective} variant="outline">
                Add Objective
              </Button>
            </div>
            
            <div className="space-y-4">
              {formData.objectives.map((objective, index) => (
                <Card key={objective.id} className="p-4 border border-gray-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Objective {index + 1}
                      </label>
                      <Textarea
                        value={objective.text}
                        onChange={(e) => handleObjectiveChange(index, e.target.value)}
                        placeholder="Enter objective text"
                        rows={2}
                      />
                    </div>
                    <Button 
                      onClick={() => removeObjective(index)} 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 mt-6"
                    >
                      Remove
                    </Button>
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

export default AboutObjectivesSection;
