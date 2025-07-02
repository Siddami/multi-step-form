
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RegistrationFormData } from '../RegistrationForm';

interface PreferencesStepProps {
  form: UseFormReturn<RegistrationFormData>;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({
  form,
  onNext,
  onPrev,
}) => {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="travelClass" className="text-sm font-medium text-foreground">
            Travel Class
          </Label>
          <Select
            value={watch('travelClass')}
            onValueChange={(value: 'economy' | 'business' | 'first') => setValue('travelClass', value)}
          >
            <SelectTrigger 
              id="travelClass"
              className={`border-border text-foreground ${
                errors.travelClass ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
              }`}
            >
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="economy" className="text-foreground">Economy</SelectItem>
              <SelectItem value="business" className="text-foreground">Business</SelectItem>
              <SelectItem value="first" className="text-foreground">First Class</SelectItem>
            </SelectContent>
          </Select>
          {errors.travelClass && (
            <p className="text-xs text-destructive" role="alert">
              {errors.travelClass.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="seatPreference" className="text-sm font-medium text-foreground">
            Seat Preference
          </Label>
          <Select
            value={watch('seatPreference')}
            onValueChange={(value: 'window' | 'aisle' | 'middle') => setValue('seatPreference', value)}
          >
            <SelectTrigger 
              id="seatPreference"
              className={`border-border text-foreground ${
                errors.seatPreference ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
              }`}
            >
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="window" className="text-foreground">Window</SelectItem>
              <SelectItem value="aisle" className="text-foreground">Aisle</SelectItem>
              <SelectItem value="middle" className="text-foreground">Middle</SelectItem>
            </SelectContent>
          </Select>
          {errors.seatPreference && (
            <p className="text-xs text-destructive" role="alert">
              {errors.seatPreference.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="mealPreference" className="text-sm font-medium text-foreground">
            Meal Preference
          </Label>
          <Select
            value={watch('mealPreference')}
            onValueChange={(value: 'standard' | 'vegetarian' | 'vegan' | 'halal' | 'kosher') => setValue('mealPreference', value)}
          >
            <SelectTrigger 
              id="mealPreference"
              className={`border-border text-foreground ${
                errors.mealPreference ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
              }`}
            >
              <SelectValue placeholder="Select meal" />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              <SelectItem value="standard" className="text-foreground">Standard</SelectItem>
              <SelectItem value="vegetarian" className="text-foreground">Vegetarian</SelectItem>
              <SelectItem value="vegan" className="text-foreground">Vegan</SelectItem>
              <SelectItem value="halal" className="text-foreground">Halal</SelectItem>
              <SelectItem value="kosher" className="text-foreground">Kosher</SelectItem>
            </SelectContent>
          </Select>
          {errors.mealPreference && (
            <p className="text-xs text-destructive" role="alert">
              {errors.mealPreference.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests" className="text-sm font-medium text-foreground">
          Special Requests (Optional)
        </Label>
        <Textarea
          id="specialRequests"
          placeholder="Any special requirements or requests..."
          {...register('specialRequests')}
          className="min-h-[100px] resize-none bg-input border-border text-background placeholder:text-muted-foreground focus-visible:ring-primary"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground">
          {watch('specialRequests')?.length || 0}/500 characters
        </p>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          onClick={onPrev}
          variant="outline"
          className="border-border text-foreground hover:bg-secondary px-8 py-2 rounded-full"
        >
          Before
        </Button>
        
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
