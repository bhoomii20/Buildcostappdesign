import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calculator, FolderOpen, FileText, TrendingUp, HardHat } from 'lucide-react';
import { Project } from '../App';

type HomeProps = {
  projects: Project[];
  onNewEstimate: () => void;
  onMyProjects: () => void;
  onSavedBills: () => void;
};

export function Home({ projects, onNewEstimate, onMyProjects, onSavedBills }: HomeProps) {
  const totalBudget = projects.reduce((sum, p) => sum + p.totalCost, 0);
  const recentProjects = projects.slice(0, 3);

  return (
    <div className="p-4">
      {/* Header */}
      <div className="mb-6 text-center py-6">
        <div className="flex items-center justify-center mb-3">
          <HardHat className="w-10 h-10 text-[#1E88E5] mr-2" />
          <h1 className="text-[#1E88E5]">BuildCost</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">Your Digital Construction Assistant</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        <Button
          onClick={onNewEstimate}
          className="bg-[#1E88E5] hover:bg-[#1976D2] h-14 text-white"
        >
          <Calculator className="w-5 h-5 mr-2" />
          New Estimate
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={onMyProjects}
            variant="outline"
            className="h-14 border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD]"
          >
            <FolderOpen className="w-5 h-5 mr-2" />
            My Projects
          </Button>
          <Button
            onClick={onSavedBills}
            variant="outline"
            className="h-14 border-[#1E88E5] text-[#1E88E5] hover:bg-[#E3F2FD]"
          >
            <FileText className="w-5 h-5 mr-2" />
            Saved Bills
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 bg-gradient-to-br from-[#1E88E5] to-[#1976D2] text-white">
          <div className="flex items-start justify-between mb-2">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-xs opacity-90 mb-1">Total Projects</p>
          <p className="text-2xl">{projects.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-[#FBC02D] to-[#F9A825] text-white">
          <div className="flex items-start justify-between mb-2">
            <Calculator className="w-5 h-5" />
          </div>
          <p className="text-xs opacity-90 mb-1">Total Budget</p>
          <p className="text-2xl">₹{(totalBudget / 1000).toFixed(0)}K</p>
        </Card>
      </div>

      {/* Recent Estimates */}
      <div className="mb-6">
        <h3 className="mb-3 text-gray-800 dark:text-gray-200">Recent Estimates</h3>
        <div className="space-y-3">
          {recentProjects.map((project) => (
            <Card key={project.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200">{project.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{project.type} • {project.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#1E88E5]">₹{project.totalCost.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{project.date}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                {project.materials.slice(0, 3).map((material, idx) => (
                  <span key={idx} className="px-2 py-1 bg-[#E3F2FD] dark:bg-gray-700 text-[#1E88E5] dark:text-gray-300 rounded text-xs">
                    {material.name}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
