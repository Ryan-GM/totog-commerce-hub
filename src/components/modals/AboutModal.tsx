import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Target, Eye, Sparkles, Shield, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({ isOpen, onClose }: AboutModalProps) => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    onClose();
    navigate('/signup');
  };

  const handleContact = () => {
    onClose();
    // This will trigger the contact modal from the parent component
    const event = new CustomEvent('openContactModal');
    window.dispatchEvent(event);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            About Totog Commerce Hub
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8 mt-6">
          {/* Who We Are */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Who We Are
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At Totog Commerce Hub, we're redefining the way businesses and customers connect online. 
              Our platform seamlessly integrates products, categories, brands, and payments to make 
              commerce smooth, secure, and scalable.
            </p>
          </section>

          <Separator />

          {/* Our Story */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              We started with a simple goal: to solve the frustration of disconnected e-commerce systems. 
              From mismatched products to missing brand visibility, we built a solution that ties everything 
              together for merchants and customers alike.
            </p>
          </section>

          <Separator />

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <section className="space-y-4 bg-primary/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Our Mission
              </h2>
              <p className="text-muted-foreground">
                To empower businesses and individuals with reliable, user-friendly tools that simplify online trade.
              </p>
            </section>

            <section className="space-y-4 bg-primary/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Our Vision
              </h2>
              <p className="text-muted-foreground">
                A world where commerce flows seamlessly across products, categories, and brands — 
                giving businesses more reach and customers more choice.
              </p>
            </section>
          </div>

          <Separator />

          {/* Core Values */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Shield className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Transparency</h3>
                  <p className="text-sm text-muted-foreground">Honest systems, clear results.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Sparkles className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Innovation</h3>
                  <p className="text-sm text-muted-foreground">Smart solutions for modern challenges.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Users className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Reliability</h3>
                  <p className="text-sm text-muted-foreground">Always secure, always consistent.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                <Heart className="h-5 w-5 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Customer First</h3>
                  <p className="text-sm text-muted-foreground">Every feature built with users in mind.</p>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 p-8 rounded-lg text-center space-y-4">
            <h2 className="text-2xl font-semibold">Ready to get started?</h2>
            <p className="text-muted-foreground">
              Join thousands of businesses already transforming their commerce experience.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleSignUp} size="lg">
                Sign Up Now
              </Button>
              <Button onClick={handleContact} variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;