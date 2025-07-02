
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RegistrationFormData } from '../RegistrationForm';

interface PersonalInfoStepProps {
  form: UseFormReturn<RegistrationFormData>;
  onNext: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({
  form,
  onNext,
}) => {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-foreground">
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter your first name"
            {...register('firstName')}
            className={`bg-input border-border text-background placeholder:text-muted-foreground ${
              errors.firstName ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
            }`}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
          />
          {errors.firstName && (
            <p id="firstName-error" className="text-xs text-destructive" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-foreground">
            Last Name
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter your last name"
            {...register('lastName')}
            className={`bg-input border-border text-background placeholder:text-muted-foreground ${
              errors.lastName ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
            }`}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
          />
          {errors.lastName && (
            <p id="lastName-error" className="text-xs text-destructive" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-foreground">
            Date of Birth
          </Label>
          <Input
            id="dateOfBirth"
            type="date"
            {...register('dateOfBirth')}
            className={`bg-input border-border text-muted-foreground ${
              errors.dateOfBirth ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
            }`}
            aria-describedby={errors.dateOfBirth ? 'dateOfBirth-error' : undefined}
          />
          {errors.dateOfBirth && (
            <p id="dateOfBirth-error" className="text-xs text-destructive" role="alert">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender" className="text-sm font-medium text-foreground">
            Gender
          </Label>
          <Select
            value={watch('gender')}
            onValueChange={(value: 'male' | 'female' | 'other' | 'prefer-not-to-say') => setValue('gender', value)}
          >
            <SelectTrigger 
              id="gender"
              className={`bg-input border-border text-muted-foreground ${
                errors.gender ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
              }`}
              aria-describedby={errors.gender ? 'gender-error' : undefined}
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              <SelectItem value="male" className="text-background">Male</SelectItem>
              <SelectItem value="female" className="text-background">Female</SelectItem>
              <SelectItem value="other" className="text-background">Other</SelectItem>
              <SelectItem value="prefer-not-to-say" className="text-background">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p id="gender-error" className="text-xs text-destructive" role="alert">
              {errors.gender.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button 
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-full"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
