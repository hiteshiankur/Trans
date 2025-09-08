import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stat {
  value: string;
  label: string;
}

interface StatsData {
  statistics: Stat[];
}

const StatsSection = () => {
  const [statsData, setStatsData] = useState<StatsData>({
    statistics: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" }
    ]
  });
  const [loading, setLoading] = useState(false);

  // Fetch existing stats content
  const fetchStatsContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/content/stats', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'lang': 'en',
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Full API response:', result);
        
        // Handle different response structures
        let content: any = {};
        if (result.data?.section?.contentEn) {
          content = result.data.section.contentEn;
        } else if (result.data?.contentEn) {
          content = result.data.contentEn;
        } else if (result.section?.contentEn) {
          content = result.section.contentEn;
        } else if (result.contentEn) {
          content = result.contentEn;
        } else if (result.data) {
          content = result.data;
        }
        
        console.log('Parsed content:', content);
        
        setStatsData({
          statistics: content.statistics || [
            { value: "", label: "" },
            { value: "", label: "" },
            { value: "", label: "" },
            { value: "", label: "" }
          ]
        });
      } else {
        console.log('API response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching stats content:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatsContent();
  }, []);

  const handleStatUpdate = (index: number, field: keyof Stat, value: string) => {
    setStatsData(prev => ({
      ...prev,
      statistics: prev.statistics.map((stat, i) => 
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/content/stats', {
        method: 'PUT',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZWU5MWE2YS1iZGQ5LTQ5NzctOTk1My02M2ZlMDU3MTczNjYiLCJ1c2VyUm9sZSI6InN1cGVyQWRtaW4iLCJpYXQiOjE3NTY4ODUwNzYsImV4cCI6MTc1OTQ3NzA3Nn0.GSgw6Qq825txLZryTs8J4M9rQUAexo2wKQO5W7yImVQ',
          'Content-Type': 'application/json',
          'lang': 'en',
        },
        body: JSON.stringify({
          contentEn: {
            statistics: statsData.statistics
          }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Stats updated successfully:', result);
        alert('Stats section updated successfully!');
        // Refresh data
        await fetchStatsContent();
      } else {
        const errorData = await response.json();
        console.error('Error updating stats:', errorData);
        alert('Error updating stats: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving stats:', error);
      alert('Error saving stats. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Stats Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the statistics section of your landing page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistics ({statsData.statistics.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statsData.statistics.map((stat, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-lg">Stat {index + 1}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <Input
                    value={stat.value}
                    onChange={(e) => handleStatUpdate(index, 'value', e.target.value)}
                    placeholder="e.g., 10,000+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <Input
                    value={stat.label}
                    onChange={(e) => handleStatUpdate(index, 'label', e.target.value)}
                    placeholder="e.g., Deliveries Managed"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
