
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export const SuccessStep: React.FC = () => {
  const handleStartOver = () => {
    window.location.reload();
  };

  return (
    <Card className="max-w-md mx-auto bg-foreground/80 border-border/50">
      <CardContent className="text-center py-12">
        <div className="mb-6">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4 fill-current" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Registration Complete!
          </h2>
          <p className="text-muted-foreground">
            Thank you for registering. We&#39;ve sent a confirmation email to your registered email address.
          </p>
        </div>

        <div className="space-y-4 text-sm text-left bg-secondary/30 p-4 rounded-lg mb-6 border border-border/50">
          <h3 className="font-semibold text-foreground">What&#39;s Next?</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>✓ Check your email for confirmation details</li>
            <li>✓ Complete your profile in the member portal</li>
            <li>✓ Start browsing available flights</li>
            <li>✓ Enjoy exclusive member benefits</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
            onClick={() => window.open('mailto:', '_blank')}
          >
            Check Email
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full border-border text-foreground hover:bg-secondary rounded-full p-4"
            onClick={handleStartOver}
          >
            Register Another Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
