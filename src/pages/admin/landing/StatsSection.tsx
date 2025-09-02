import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Stat {
  id: string;
  value: string;
  label: string;
}

const StatsSection = () => {
  const [statsData, setStatsData] = useState({
    stats: [
      {
        id: '1',
        value: '10,000+',
        label: 'Deliveries Managed'
      },
      {
        id: '2',
        value: '2,500+',
        label: 'Active Clients'
      },
      {
        id: '3',
        value: '98%',
        label: 'On-Time Delivery Rate'
      },
      {
        id: '4',
        value: '200+',
        label: 'Industry Awards'
      }
    ] as Stat[]
  });

  const handleStatUpdate = (id: string, field: keyof Stat, value: string) => {
    setStatsData(prev => ({
      ...prev,
      stats: prev.stats.map(stat => 
        stat.id === id ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const handleSave = () => {
    // TODO: API call to save stats section data
    console.log('Saving stats data:', statsData);
    alert('Stats section updated successfully!');
  };

  return (
    <div className="p-6 w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Stats Section Management</h1>
        <p className="text-gray-600 mt-2">Manage the statistics section of your landing page</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistics ({statsData.stats.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {statsData.stats.map((stat, index) => (
              <div key={stat.id} className="border rounded-lg p-4 space-y-4">
                <h3 className="font-semibold text-lg">Stat {index + 1}</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <Input
                    value={stat.value}
                    onChange={(e) => handleStatUpdate(stat.id, 'value', e.target.value)}
                    placeholder="e.g., 10,000+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <Input
                    value={stat.label}
                    onChange={(e) => handleStatUpdate(stat.id, 'label', e.target.value)}
                    placeholder="e.g., Deliveries Managed"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsSection;
