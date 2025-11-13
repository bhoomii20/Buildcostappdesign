import { Card } from './ui/card';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Moon, Sun, DollarSign, Download, Upload, Edit } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

type SettingsProps = {
  isDarkMode: boolean;
  onToggleTheme: () => void;
};

const materialsList = [
  { name: 'Cement', rate: 450, unit: 'bags' },
  { name: 'Sand', rate: 800, unit: 'm³' },
  { name: 'Gravel', rate: 900, unit: 'm³' },
  { name: 'Steel', rate: 65, unit: 'kg' },
  { name: 'Bricks', rate: 8, unit: 'nos' },
  { name: 'Paint', rate: 250, unit: 'liters' },
];

export function Settings({ isDarkMode, onToggleTheme }: SettingsProps) {
  const handleBackup = () => {
    toast.success('Data backed up successfully!');
  };

  const handleRestore = () => {
    toast.success('Data restored successfully!');
  };

  return (
    <div className="p-4">
      {/* Header */}
      <h2 className="mb-6 text-gray-800 dark:text-gray-200">Settings</h2>

      <div className="space-y-4">
        {/* Theme Toggle */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-[#1E88E5]" />
              ) : (
                <Sun className="w-5 h-5 text-[#FBC02D]" />
              )}
              <div>
                <Label>Dark Mode</Label>
                <p className="text-xs text-gray-500 dark:text-gray-400">Switch to dark theme</p>
              </div>
            </div>
            <Switch checked={isDarkMode} onCheckedChange={onToggleTheme} />
          </div>
        </Card>

        {/* Currency Selection */}
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <DollarSign className="w-5 h-5 text-[#1E88E5] mt-1" />
            <div className="flex-1">
              <Label htmlFor="currency">Currency</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Select your preferred currency</p>
              <Select defaultValue="INR">
                <SelectTrigger id="currency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ Indian Rupee (INR)</SelectItem>
                  <SelectItem value="USD">$ US Dollar (USD)</SelectItem>
                  <SelectItem value="EUR">€ Euro (EUR)</SelectItem>
                  <SelectItem value="GBP">£ British Pound (GBP)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Material Rates */}
        <Card className="p-4">
          <div className="flex items-start gap-3 mb-4">
            <Edit className="w-5 h-5 text-[#1E88E5] mt-1" />
            <div className="flex-1">
              <Label>Material Rate List</Label>
              <p className="text-xs text-gray-500 dark:text-gray-400">Update default material rates</p>
            </div>
          </div>
          <div className="space-y-3">
            {materialsList.map((material, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-800 dark:text-gray-200">{material.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">per {material.unit}</p>
                </div>
                <Input
                  type="number"
                  defaultValue={material.rate}
                  className="w-24"
                  placeholder="Rate"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Data Backup */}
        <Card className="p-4">
          <div className="mb-4">
            <Label>Data Backup</Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">Backup or restore your data</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleBackup}
              variant="outline"
              className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD]"
            >
              <Download className="w-4 h-4 mr-2" />
              Backup
            </Button>
            <Button
              onClick={handleRestore}
              variant="outline"
              className="border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD]"
            >
              <Upload className="w-4 h-4 mr-2" />
              Restore
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-4 bg-[#E3F2FD] dark:bg-gray-700">
          <div className="text-center">
            <p className="text-gray-800 dark:text-gray-200">BuildCost v1.0.0</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Your Digital Construction Assistant
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
