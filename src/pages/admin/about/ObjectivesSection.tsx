import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { aboutContentApi } from '@/lib/api';

interface Objective {
  id: string;
  objectiveText: string;
}

const AboutObjectivesSection = () => {
  const [formData, setFormData] = useState({
    objectivesTitle: '',
    objectives: [] as Objective[]
  });
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchObjectivesData();
  }, []);

  const fetchObjectivesData = async () => {
    try {
      setLoading(true);
      const response = await aboutContentApi.getSectionContent('about-objectives');
      const content = response.section.contentEn;
      
      setFormData({
        objectivesTitle: content.objectivesTitle || '',
        objectives: content.objectives || []
      });
      
      if (content.objectivesIcon) {
        setIconPreview(content.objectivesIcon);
      }
    } catch (error) {
      console.error('Error fetching objectives data:', error);
      toast.error('Failed to load objectives data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setIconPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleObjectiveChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.map((objective, i) => 
        i === index ? { ...objective, objectiveText: value } : objective
      )
    }));
  };

  const addObjective = () => {
    const newObjective: Objective = {
      id: Date.now().toString(),
      objectiveText: ''
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

  const handleSave = async () => {
    try {
      setSaving(true);
      
      const updateData = {
        objectivesTitle: formData.objectivesTitle,
        objectives: formData.objectives,
        ...(iconFile && { objectivesIcon: iconFile })
      };
      
      await aboutContentApi.updateObjectivesSection(updateData);
      toast.success('Objectives section updated successfully!');
      
      // Refresh data to get updated URLs
      await fetchObjectivesData();
    } catch (error) {
      console.error('Error updating objectives:', error);
      toast.error('Failed to update objectives section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">About Us - Objectives Section</h1>
          <p className="text-gray-600 mt-2">Manage the objectives section content for the About Us page</p>
        </div>
        <Card className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
              name="objectivesTitle"
              value={formData.objectivesTitle}
              onChange={handleInputChange}
              placeholder="Enter objectives title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Objectives Icon
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {iconPreview && (
                <div className="w-16 h-16 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={iconPreview}
                    alt="Icon preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
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
                        value={objective.objectiveText}
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
            <Button 
              onClick={handleSave} 
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AboutObjectivesSection;
