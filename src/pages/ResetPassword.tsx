import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [tokensReady, setTokensReady] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    // Parse tokens from URL hash but don't set session yet
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const urlAccessToken = hashParams.get('access_token');
    const urlRefreshToken = hashParams.get('refresh_token');

    if (!urlAccessToken || !urlRefreshToken) {
      setError('Invalid or missing reset token. Please request a new password reset.');
      return;
    }

    setAccessToken(urlAccessToken);
    setRefreshToken(urlRefreshToken);
    setTokensReady(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccess && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isSuccess && countdown === 0) {
      navigate('/login');
    }
    return () => clearTimeout(timer);
  }, [isSuccess, countdown, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!tokensReady || !accessToken || !refreshToken) {
      setError('Reset tokens not ready. Please try again.');
      return;
    }

    setIsLoading(true);

    try {
      // Set the session using the tokens from the URL
      const { error: sessionError } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken
      });

      if (sessionError) {
        throw sessionError;
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        throw updateError;
      }

      setIsSuccess(true);
      toast({
        title: "Password reset successful",
        description: "Your password has been updated successfully!",
      });

    } catch (error: any) {
      console.error('Password reset error:', error);
      
      if (error.message?.includes('expired') || error.message?.includes('invalid')) {
        setError('Reset link has expired or is invalid. Please request a new password reset.');
      } else {
        setError(error.message || 'Failed to reset password. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto bg-card rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">Password Reset Successful!</h1>
              <p className="text-muted-foreground mb-8">
                Your password has been updated successfully. You will be redirected to the login page in {countdown} seconds.
              </p>
              <Button 
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Go to Login Now
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto bg-card rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-foreground text-center mb-8">Reset Your Password</h1>
          
          {error && (
            <Alert className="mb-6" variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="password">New Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading || !tokensReady}
                placeholder="Enter your new password"
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading || !tokensReady}
                placeholder="Confirm your new password"
                minLength={6}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading || !tokensReady}
            >
              {isLoading ? 'Updating Password...' : 'Update Password'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => navigate('/login')}
              className="text-primary hover:text-primary/80"
            >
              Back to Sign In
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;