"use client"


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { StepIndicator } from './StepIndicator';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { ContactDetailsStep } from './steps/ContactDetailsStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { ReviewStep } from './steps/ReviewStep';
import { SuccessStep } from './steps/SuccessStep';
import { User, Mail, Settings, FileText} from 'lucide-react';

const registrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
  
  // Contact Details
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  country: z.string().min(1, 'Please select a country'),
  
  // Preferences
  travelClass: z.enum(['economy', 'business', 'first']),
  seatPreference: z.enum(['window', 'aisle', 'middle']),
  mealPreference: z.enum(['standard', 'vegetarian', 'vegan', 'halal', 'kosher']),
  specialRequests: z.string().optional(),
  
  // Agreements
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms and conditions'),
  newsletterSubscribe: z.boolean().optional(),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;

const steps = [
  { id: 1, title: 'Personal Info', description: 'Basic information about you', icon: <User size={18} /> },
  { id: 2, title: 'Contact Details', description: 'How to reach you', icon: <Mail size={18} /> },
  { id: 3, title: 'Preferences', description: 'Your travel preferences', icon: <Settings size={18} /> },
  { id: 4, title: 'Review', description: 'Confirm your details', icon: <FileText size={18} /> },
];

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: 'prefer-not-to-say',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      travelClass: 'economy',
      seatPreference: 'window',
      mealPreference: 'standard',
      specialRequests: '',
      termsAccepted: false,
      newsletterSubscribe: false,
    },
  });

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const validateCurrentStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const getFieldsForStep = (step: number): (keyof RegistrationFormData)[] => {
    switch (step) {
      case 1:
        return ['firstName', 'lastName', 'dateOfBirth', 'gender'];
      case 2:
        return ['email', 'phone', 'address', 'city', 'country'];
      case 3:
        return ['travelClass', 'seatPreference', 'mealPreference'];
      case 4:
        return ['termsAccepted'];
      default:
        return [];
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    console.log('Form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitted(true);
  };

  const renderCurrentStep = () => {
    if (isSubmitted) {
      return <SuccessStep />;
    }

    const stepProps = {
      form,
      onNext: nextStep,
      onPrev: prevStep,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === steps.length,
    };

    switch (currentStep) {
      case 1:
        return <PersonalInfoStep {...stepProps} />;
      case 2:
        return <ContactDetailsStep {...stepProps} />;
      case 3:
        return <PreferencesStep {...stepProps} />;
      case 4:
        return <ReviewStep {...stepProps} onSubmit={form.handleSubmit(onSubmit)} />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <SuccessStep />
      </div>
    );
  }

  return (
    <div className="bg-background py-8 px-4 max-w-5xl w-full mx-auto rounded-xl">
      <div className="mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Search Flights, Cheapest Flights
          </h1>
          <p className="text-muted-foreground text-sm">
            All the plane tickets you are looking for together!
          </p>
        </div>

        <StepIndicator steps={steps} currentStep={currentStep} />

        <Card>
          <CardContent className="p-8">
            <div className={isAnimating ? 'animate-slide-out' : 'animate-slide-in'}>
              {renderCurrentStep()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
