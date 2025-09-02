import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Mail, KeyRound } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login, verifyOtp, requestOtp } = useAuth();
  
  // Get email and flow type from location state
  const email = location.state?.email;
  const flow = location.state?.flow || 'register'; // default to register for backward compatibility
  
  useEffect(() => {
    if (!email) {
      // Redirect based on flow type
      navigate(flow === 'login' ? '/login' : '/register');
    }
  }, [email, flow, navigate]);

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      
        // For registration flow, use verifyOtp
       const resp =  await verifyOtp(email, otp);
       console.log("--1088--",resp);
       
 
      
      toast({
        title: flow === 'login' ? "Login Successful" : "Registration Successful",
        description: flow === 'login' ? "Welcome back to Trans App!" : "Welcome to Trans App!",
      });
      
      // Redirect to dashboard (home)
      navigate('/home');
    } catch (err: any) {
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError('');

    try {
      await requestOtp(email);
      
      toast({
        title: "OTP Resent",
        description: "Please check your email for the new verification code.",
      });
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-accent p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-custom-xl">
          <CardHeader className="text-center space-y-1">
            <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
              <span className="text-primary-foreground font-bold text-xl">T</span>
            </div>
            <CardTitle className="text-2xl font-bold">
              {flow === 'login' ? 'Welcome Back' : 'Verify Your Email'}
            </CardTitle>
            <CardDescription>
              Enter the verification code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    className="pl-10 bg-muted"
                    disabled
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification code to this email address
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    className="pl-10 text-center text-lg tracking-widest"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || otp.length !== 4}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
                
                <div className="flex flex-col space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleResendOtp}
                    disabled={loading}
                  >
                    Resend OTP
                  </Button>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={() => navigate(flow === 'login' ? '/login' : '/register')}
                    disabled={loading}
                  >
                    {flow === 'login' ? 'Back to Login' : 'Back to Registration'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {flow === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyOtp;
