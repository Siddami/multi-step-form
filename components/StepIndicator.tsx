
import React from 'react';
import { Check} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full mx-auto mb-8">
      <div className="flex items-center justify-evenly relative px-4">
        {/* Progress Line */}
        <div className="absolute top-8 left-0 w-full h-0.5 bg-border/30 border-[2px] z-0">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Step Circles */}
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div
                className={cn(
                  'w-18 h-18 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2',
                  {
                    'bg-primary text-primary-foreground border-primary': isCompleted || isCurrent,
                    'bg-background text-muted-foreground border-border': isUpcoming,
                  }
                )}
                role="progressbar"
                aria-valuenow={currentStep}
                aria-valuemin={1}
                aria-valuemax={steps.length}
                aria-label={`Step ${stepNumber}: ${step.title}`}
              >
                {isCompleted ? (
                  <Check size={18} />
                ) : (
                  step.icon
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
