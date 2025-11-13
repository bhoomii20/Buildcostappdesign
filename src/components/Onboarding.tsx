import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, Calculator, FolderOpen, FileText, HardHat } from 'lucide-react';
import { motion } from 'motion/react';

type OnboardingProps = {
  onComplete: () => void;
};

const slides = [
  {
    title: 'Welcome to BuildCost',
    description: 'Your all-in-one digital construction assistant for estimating costs and managing projects',
    icon: HardHat,
    color: '#1E88E5',
  },
  {
    title: 'Estimate Materials',
    description: 'Calculate required quantities and costs for cement, sand, steel, bricks, and more in seconds',
    icon: Calculator,
    color: '#FBC02D',
  },
  {
    title: 'Manage Projects',
    description: 'Save all your estimates, track project costs, and access them anytime, anywhere',
    icon: FolderOpen,
    color: '#43A047',
  },
  {
    title: 'Organize Documents',
    description: 'Store bills, invoices, and documents in one secure place, linked to your projects',
    icon: FileText,
    color: '#E53935',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] to-[#1976D2] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <Icon className="w-16 h-16" style={{ color: slide.color }} />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h1 className="text-gray-800 mb-4">{slide.title}</h1>
            <p className="text-gray-600 mb-8">{slide.description}</p>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-[#1E88E5]'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {currentSlide < slides.length - 1 && (
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="flex-1 h-12"
                >
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 h-12 bg-[#1E88E5] hover:bg-[#1976D2] text-white"
              >
                {currentSlide < slides.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-5 h-5 ml-1" />
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
