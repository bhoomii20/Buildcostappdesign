import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ArrowLeft, Calculator } from 'lucide-react';
import { Project } from '../App';

type ProjectInputProps = {
  onEstimate: (project: Project) => void;
  onBack: () => void;
};

const materialRates: Record<string, { rate: number; unit: string }> = {
  Cement: { rate: 450, unit: 'bags' },
  Sand: { rate: 800, unit: 'm³' },
  Gravel: { rate: 900, unit: 'm³' },
  Steel: { rate: 65, unit: 'kg' },
  Bricks: { rate: 8, unit: 'nos' },
  Paint: { rate: 250, unit: 'liters' },
};

export function ProjectInput({ onEstimate, onBack }: ProjectInputProps) {
  const [projectType, setProjectType] = useState('Building');
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');
  const [thickness, setThickness] = useState('');
  const [location, setLocation] = useState('');
  const [projectName, setProjectName] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(['Cement', 'Sand', 'Gravel']);

  const toggleMaterial = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter((m) => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const calculateQuantities = () => {
    const l = parseFloat(length);
    const b = parseFloat(breadth);
    const h = parseFloat(height);
    const volume = l * b * h;

    const materials = selectedMaterials.map((material) => {
      let quantity = 0;
      const { rate, unit } = materialRates[material];

      switch (material) {
        case 'Cement':
          quantity = Math.ceil(volume * 1.33);
          break;
        case 'Sand':
          quantity = Math.ceil(volume * 0.42);
          break;
        case 'Gravel':
          quantity = Math.ceil(volume * 0.37);
          break;
        case 'Steel':
          quantity = Math.ceil(volume * 50);
          break;
        case 'Bricks':
          quantity = Math.ceil(volume * 500);
          break;
        case 'Paint':
          quantity = Math.ceil(volume * 0.5);
          break;
        default:
          quantity = 0;
      }

      return {
        name: material,
        quantity,
        unit,
        rate,
        cost: quantity * rate,
      };
    });

    const totalCost = materials.reduce((sum, m) => sum + m.cost, 0);

    const project: Project = {
      id: Date.now().toString(),
      name: projectName || `${projectType} Project`,
      type: projectType,
      date: new Date().toISOString().split('T')[0],
      totalCost,
      dimensions: {
        length: l,
        breadth: b,
        height: h,
        thickness: thickness ? parseFloat(thickness) : undefined,
      },
      materials,
      location: location || 'Not specified',
    };

    onEstimate(project);
  };

  const isValid = length && breadth && height && selectedMaterials.length > 0;

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-gray-800 dark:text-gray-200">New Estimate</h2>
      </div>

      <div className="space-y-4">
        {/* Project Name */}
        <Card className="p-4">
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            placeholder="e.g., Residential Building"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-2"
          />
        </Card>

        {/* Project Type */}
        <Card className="p-4">
          <Label htmlFor="projectType">Project Type</Label>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Building">Building</SelectItem>
              <SelectItem value="Road">Road</SelectItem>
              <SelectItem value="Wall">Wall</SelectItem>
              <SelectItem value="Bridge">Bridge</SelectItem>
            </SelectContent>
          </Select>
        </Card>

        {/* Dimensions */}
        <Card className="p-4">
          <h3 className="mb-3 text-gray-800 dark:text-gray-200">Dimensions</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="length">Length (m)</Label>
              <Input
                id="length"
                type="number"
                placeholder="20"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="breadth">Breadth (m)</Label>
              <Input
                id="breadth"
                type="number"
                placeholder="15"
                value={breadth}
                onChange={(e) => setBreadth(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="height">Height (m)</Label>
              <Input
                id="height"
                type="number"
                placeholder="3"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="thickness">Thickness (m)</Label>
              <Input
                id="thickness"
                type="number"
                placeholder="0.23"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Materials Selection */}
        <Card className="p-4">
          <h3 className="mb-3 text-gray-800 dark:text-gray-200">Select Materials</h3>
          <div className="space-y-3">
            {Object.keys(materialRates).map((material) => (
              <div key={material} className="flex items-center space-x-3">
                <Checkbox
                  id={material}
                  checked={selectedMaterials.includes(material)}
                  onCheckedChange={() => toggleMaterial(material)}
                />
                <Label htmlFor={material} className="flex-1 cursor-pointer">
                  {material}
                </Label>
                <span className="text-sm text-gray-500">
                  ₹{materialRates[material].rate}/{materialRates[material].unit}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Location */}
        <Card className="p-4">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g., Mumbai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-2"
          />
        </Card>

        {/* Estimate Button */}
        <Button
          onClick={calculateQuantities}
          disabled={!isValid}
          className="w-full bg-[#1E88E5] hover:bg-[#1976D2] h-12 text-white"
        >
          <Calculator className="w-5 h-5 mr-2" />
          Estimate Now
        </Button>
      </div>
    </div>
  );
}
