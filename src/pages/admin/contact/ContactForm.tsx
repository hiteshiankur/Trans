import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface SubjectOption {
  id: string;
  label: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    formImage: '/src/assets/images/letter_send.svg',
    submitButtonText: 'Send Message',
    subjectOptions: [
      { id: '1', label: 'General Inquiry' },
      { id: '2', label: 'Support' },
      { id: '3', label: 'Partnership' },
      { id: '4', label: 'Other' }
    ] as SubjectOption[],
    formFields: {
      firstName: {
        label: 'First Name',
        required: true
      },
      lastName: {
        label: 'Last Name',
        required: true
      },
      email: {
        label: 'Email',
        required: true
      },
      phoneNumber: {
        label: 'Phone Number',
        required: false
      },
      message: {
        label: 'Message',
        placeholder: 'Write your message...',
        required: true
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      subjectOptions: prev.subjectOptions.map((option, i) => 
        i === index ? { ...option, label: value } : option
      )
    }));
  };

  const addSubjectOption = () => {
    const newOption: SubjectOption = {
      id: Date.now().toString(),
      label: ''
    };
    setFormData(prev => ({
      ...prev,
      subjectOptions: [...prev.subjectOptions, newOption]
    }));
  };

  const removeSubjectOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjectOptions: prev.subjectOptions.filter((_, i) => i !== index)
    }));
  };

  const handleFieldLabelChange = (fieldName: string, label: string) => {
    setFormData(prev => ({
      ...prev,
      formFields: {
        ...prev.formFields,
        [fieldName]: {
          ...prev.formFields[fieldName as keyof typeof prev.formFields],
          label
        }
      }
    }));
  };

  const handleFieldRequiredChange = (fieldName: string, required: boolean) => {
    setFormData(prev => ({
      ...prev,
      formFields: {
        ...prev.formFields,
        [fieldName]: {
          ...prev.formFields[fieldName as keyof typeof prev.formFields],
          required
        }
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving Contact Form:', formData);
    alert('Contact Form saved successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Us - Contact Form</h1>
        <p className="text-gray-600 mt-2">Manage the contact form configuration</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Form Image Path
            </label>
            <Input
              name="formImage"
              value={formData.formImage}
              onChange={handleInputChange}
              placeholder="Enter form image path"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Submit Button Text
            </label>
            <Input
              name="submitButtonText"
              value={formData.submitButtonText}
              onChange={handleInputChange}
              placeholder="Enter submit button text"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Subject Options</h3>
              <Button onClick={addSubjectOption} variant="outline">
                Add Option
              </Button>
            </div>
            
            <div className="space-y-3">
              {formData.subjectOptions.map((option, index) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Input
                    value={option.label}
                    onChange={(e) => handleSubjectChange(index, e.target.value)}
                    placeholder="Enter subject option"
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => removeSubjectOption(index)} 
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

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Form Fields Configuration</h3>
            <div className="space-y-4">
              {Object.entries(formData.formFields).map(([fieldName, field]) => (
                <Card key={fieldName} className="p-4 border border-gray-200">
                  <div className="space-y-3">
                    <h4 className="font-medium capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Field Label
                        </label>
                        <Input
                          value={field.label}
                          onChange={(e) => handleFieldLabelChange(fieldName, e.target.value)}
                          placeholder="Enter field label"
                        />
                      </div>
                      <div className="flex items-center space-x-2 pt-6">
                        <input
                          type="checkbox"
                          id={`${fieldName}-required`}
                          checked={field.required}
                          onChange={(e) => handleFieldRequiredChange(fieldName, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`${fieldName}-required`} className="text-sm text-gray-700">
                          Required field
                        </label>
                      </div>
                    </div>
                    {'placeholder' in field && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Placeholder Text
                        </label>
                        <Input
                          value={field.placeholder || ''}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              formFields: {
                                ...prev.formFields,
                                [fieldName]: {
                                  ...prev.formFields[fieldName as keyof typeof prev.formFields],
                                  placeholder: e.target.value
                                }
                              }
                            }));
                          }}
                          placeholder="Enter placeholder text"
                        />
                      </div>
                    )}
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

export default ContactForm;
