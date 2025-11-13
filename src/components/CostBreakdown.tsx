import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import { Project } from '../App';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

type CostBreakdownProps = {
  project: Project;
  onRecalculate: (project: Project) => void;
  onBack: () => void;
};

const COLORS = ['#1E88E5', '#FBC02D', '#43A047', '#E53935', '#8E24AA', '#FB8C00'];

export function CostBreakdown({ project, onRecalculate, onBack }: CostBreakdownProps) {
  const [materials, setMaterials] = useState(project.materials);

  const chartData = materials.map((material) => ({
    name: material.name,
    value: material.cost,
  }));

  const handleRateChange = (index: number, newRate: string) => {
    const rate = parseFloat(newRate) || 0;
    const updatedMaterials = [...materials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      rate,
      cost: updatedMaterials[index].quantity * rate,
    };
    setMaterials(updatedMaterials);
  };

  const handleRecalculate = () => {
    const totalCost = materials.reduce((sum, m) => sum + m.cost, 0);
    const updatedProject: Project = {
      ...project,
      materials,
      totalCost,
    };
    onRecalculate(updatedProject);
  };

  const totalCost = materials.reduce((sum, m) => sum + m.cost, 0);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-gray-800 dark:text-gray-200">Cost Breakdown</h2>
      </div>

      {/* Pie Chart */}
      <Card className="p-4 mb-4">
        <h3 className="mb-4 text-center text-gray-800 dark:text-gray-200">Cost Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `₹${value.toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Total Cost */}
      <Card className="p-4 mb-4 bg-[#1E88E5] text-white">
        <p className="text-sm opacity-90">Total Cost</p>
        <p className="text-3xl mt-1">₹{totalCost.toLocaleString()}</p>
      </Card>

      {/* Editable Material Rates */}
      <div className="mb-4">
        <h3 className="mb-3 text-gray-800 dark:text-gray-200">Modify Material Rates</h3>
        <div className="space-y-3">
          {materials.map((material, idx) => (
            <Card key={idx} className="p-4">
              <div className="mb-2">
                <Label htmlFor={`rate-${idx}`}>{material.name}</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {material.quantity} {material.unit}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <Input
                    id={`rate-${idx}`}
                    type="number"
                    value={material.rate}
                    onChange={(e) => handleRateChange(idx, e.target.value)}
                    placeholder="Rate"
                  />
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Cost</p>
                  <p className="text-[#1E88E5]">₹{material.cost.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recalculate Button */}
      <Button
        onClick={handleRecalculate}
        className="w-full bg-[#FBC02D] hover:bg-[#F9A825] h-12 text-white"
      >
        <RefreshCw className="w-5 h-5 mr-2" />
        Recalculate
      </Button>
    </div>
  );
}
