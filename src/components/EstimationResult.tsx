import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowLeft, Download, Share2, PieChart, Save } from 'lucide-react';
import { Project } from '../App';
import { toast } from 'sonner@2.0.3';

type EstimationResultProps = {
  project: Project;
  onViewBreakdown: () => void;
  onSaveProject: (project: Project) => void;
  onBack: () => void;
};

export function EstimationResult({ project, onViewBreakdown, onSaveProject, onBack }: EstimationResultProps) {
  const handleSave = () => {
    onSaveProject(project);
    toast.success('Project saved successfully!');
  };

  const handleShare = () => {
    toast.success('Report ready to share!');
  };

  const handleDownload = () => {
    toast.success('Downloading PDF report...');
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-gray-800 dark:text-gray-200">Estimation Result</h2>
      </div>

      {/* Project Info */}
      <Card className="p-4 mb-4 bg-gradient-to-br from-[#1E88E5] to-[#1976D2] text-white">
        <h3>{project.name}</h3>
        <p className="text-sm opacity-90 mt-1">{project.type} • {project.location}</p>
        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm opacity-90">Total Estimated Cost</p>
          <p className="text-3xl mt-1">₹{project.totalCost.toLocaleString()}</p>
        </div>
      </Card>

      {/* Dimensions */}
      <Card className="p-4 mb-4">
        <h3 className="mb-3 text-gray-800 dark:text-gray-200">Dimensions</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Length</p>
            <p className="text-gray-800 dark:text-gray-200">{project.dimensions.length}m</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Breadth</p>
            <p className="text-gray-800 dark:text-gray-200">{project.dimensions.breadth}m</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Height</p>
            <p className="text-gray-800 dark:text-gray-200">{project.dimensions.height}m</p>
          </div>
        </div>
      </Card>

      {/* Materials Breakdown */}
      <div className="mb-4">
        <h3 className="mb-3 text-gray-800 dark:text-gray-200">Materials Required</h3>
        <div className="space-y-3">
          {project.materials.map((material, idx) => (
            <Card key={idx} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-gray-800 dark:text-gray-200">{material.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {material.quantity} {material.unit} × ₹{material.rate}
                  </p>
                </div>
                <p className="text-[#1E88E5]">₹{material.cost.toLocaleString()}</p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-[#1E88E5] h-2 rounded-full"
                  style={{ width: `${(material.cost / project.totalCost) * 100}%` }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 mb-4">
        <Button
          onClick={onViewBreakdown}
          variant="outline"
          className="w-full h-12 border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD]"
        >
          <PieChart className="w-5 h-5 mr-2" />
          View Cost Breakdown
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={handleDownload}
            variant="outline"
            className="h-12"
          >
            <Download className="w-5 h-5 mr-2" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="h-12"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
        <Button
          onClick={handleSave}
          className="w-full bg-[#FBC02D] hover:bg-[#F9A825] h-12 text-white"
        >
          <Save className="w-5 h-5 mr-2" />
          Add to My Projects
        </Button>
      </div>
    </div>
  );
}
