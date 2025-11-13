import { Card } from './ui/card';
import { Button } from './ui/button';
import { Plus, MapPin, Calendar } from 'lucide-react';
import { Project } from '../App';

type MyProjectsProps = {
  projects: Project[];
  onViewProject: (project: Project) => void;
  onNewProject: () => void;
};

export function MyProjects({ projects, onViewProject, onNewProject }: MyProjectsProps) {
  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-800 dark:text-gray-200">My Projects</h2>
        <Button
          size="icon"
          onClick={onNewProject}
          className="bg-[#1E88E5] hover:bg-[#1976D2] rounded-full w-12 h-12 text-white"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No projects yet</p>
          <Button onClick={onNewProject} className="bg-[#1E88E5] hover:bg-[#1976D2] text-white">
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => onViewProject(project)}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-gray-800 dark:text-gray-200">{project.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#1E88E5]">₹{project.totalCost.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {project.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {project.date}
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {project.materials.map((material, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-[#E3F2FD] dark:bg-gray-700 text-[#1E88E5] dark:text-gray-300 rounded text-xs"
                  >
                    {material.name}: {material.quantity} {material.unit}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
