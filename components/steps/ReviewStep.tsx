"use client"

import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RegistrationFormData } from '../RegistrationForm';

interface ReviewStepProps {
  form: UseFormReturn<RegistrationFormData>;
  onPrev: () => void;
  onSubmit: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  form,
  onPrev,
  onSubmit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { watch, setValue, formState: { errors } } = form;
  const formData = watch();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatValue = (key: string, value: string) => {
    if (key === 'gender') {
      return value.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase());
    }
    if (key === 'travelClass') {
      return value === 'first' ? 'First Class' : 
             value.charAt(0).toUpperCase() + value.slice(1);
    }
    if (key.includes('Preference')) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name:</span>
              <span className="font-medium text-foreground">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date of Birth:</span>
              <span className="font-medium text-foreground">{formData.dateOfBirth}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gender:</span>
              <span className="font-medium text-foreground">{formatValue('gender', formData.gender)}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email:</span>
              <span className="font-medium text-foreground break-all">{formData.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone:</span>
              <span className="font-medium text-foreground">{formData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium text-foreground text-right">
                {formData.city}, {formData.country}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className=" border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Travel Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Travel Class</p>
              <p className="font-semibold text-primary">
                {formatValue('travelClass', formData.travelClass)}
              </p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Seat Preference</p>
              <p className="font-semibold text-primary">
                {formatValue('seatPreference', formData.seatPreference)}
              </p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">Meal Preference</p>
              <p className="font-semibold text-primary">
                {formatValue('mealPreference', formData.mealPreference)}
              </p>
            </div>
          </div>
          
          {formData.specialRequests && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Special Requests:</p>
              <p className="text-sm bg-secondary/50 p-3 rounded-lg text-foreground">
                {formData.specialRequests}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Separator className="bg-border" />

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => setValue('termsAccepted', !!checked)}
            className={`border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary ${
              errors.termsAccepted ? 'border-destructive' : ''
            }`}
          />
          <div className="space-y-1">
            <Label 
              htmlFor="termsAccepted"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            >
              I accept the Terms and Conditions
            </Label>
            <p className="text-xs text-muted-foreground">
              By checking this box, you agree to our terms of service and privacy policy.
            </p>
            {errors.termsAccepted && (
              <p className="text-xs text-destructive" role="alert">
                {errors.termsAccepted.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Checkbox
            id="newsletterSubscribe"
            checked={formData.newsletterSubscribe}
            onCheckedChange={(checked) => setValue('newsletterSubscribe', !!checked)}
            className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <div className="space-y-1">
            <Label 
              htmlFor="newsletterSubscribe"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
            >
              Subscribe to our newsletter
            </Label>
            <p className="text-xs text-muted-foreground">
              Get updates on special offers and travel deals.
            </p>
          </div>
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
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.termsAccepted}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 rounded-full disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Next'}
        </Button>
      </div>
    </div>
  );
};
