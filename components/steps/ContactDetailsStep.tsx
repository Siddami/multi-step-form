
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RegistrationFormData } from '../RegistrationForm';

interface ContactDetailsStepProps {
  form: UseFormReturn<RegistrationFormData>;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
  'Spain', 'Italy', 'Japan', 'Australia', 'Brazil', 'Other'
];

export const ContactDetailsStep: React.FC<ContactDetailsStepProps> = ({
  form,
  onNext,
  onPrev,
}) => {
  const { register, formState: { errors }, setValue, watch } = form;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
            className={`bg-input border-border text-background placeholder:text-muted-foreground ${
              errors.email ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
            }`}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-destructive" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...register('phone')}
            className={`bg-input border-border text-background placeholder:text-muted-foreground ${
              errors.phone ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
            }`}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="text-xs text-destructive" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium text-foreground">
          Address
        </Label>
        <Input
          id="address"
          type="text"
          placeholder="123 Main Street, Apt 4B"
          {...register('address')}
          className={`bg-input border-border text-background placeholder:text-muted-foreground ${
            errors.address ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
          }`}
          aria-describedby={errors.address ? 'address-error' : undefined}
        />
        {errors.address && (
          <p id="address-error" className="text-xs text-destructive" role="alert">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-foreground">
            City
          </Label>
          <Input
            id="city"
            type="text"
            placeholder="New York"
            {...register('city')}
            className={`bg-input border-border text-background placeholder:text-muted-foreground ${
              errors.city ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
            }`}
            aria-describedby={errors.city ? 'city-error' : undefined}
          />
          {errors.city && (
            <p id="city-error" className="text-xs text-destructive" role="alert">
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium text-foreground">
            Country
          </Label>
          <Select
            value={watch('country')}
            onValueChange={(value) => setValue('country', value)}
          >
            <SelectTrigger 
              id="country"
              className={`bg-input border-border text-muted-foreground ${
                errors.country ? 'border-destructive focus-visible:ring-destructive' : 'focus-visible:ring-primary'
              }`}
              aria-describedby={errors.country ? 'country-error' : undefined}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {countries.map((country) => (
                <SelectItem key={country} value={country} className="text-background">
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p id="country-error" className="text-xs text-destructive" role="alert">
              {errors.country.message}
            </p>
          )}
        </div>
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
