/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ceredntialLogin } from '@/db/actions-and-queries/auth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import SocialLogins from '@/app/register/_components/SocialLogings';
import Link from 'next/link';
import { LoginCredentials } from './DemoLoginCredentials';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import LoadingButton from '@/components/LodingButton';

interface UserLoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: UserLoginFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear corresponding error
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let valid = true;
    const newErrors = { email: '', password: '' };

    // Email Validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    // Password Validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);

    try {
      if (valid) {
        setIsLoading(true);

        const response = await ceredntialLogin(formData);

        console.log(response);

        if (!!response.error) {
          console.error(response.error);
          toast.error(`${response?.error}`, {
            position: 'top-center',
          });
          setIsLoading(false);
        } else {
          router.push('/');
          setIsLoading(false);
        }
      }
    } catch (e: any) {
      console.log(e);
      toast.error(`${e.message || 'something went wrong'}`, {
        position: 'top-center',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('px-12', className)} {...props}>
      <div className=" flex gap-2 justify-between items-center">
        <h1 className="text-3xl mb-8">Login</h1>
        <LoginCredentials />
      </div>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {/* Email Field */}
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-1">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="*******"
                type={showPassword ? 'text' : 'password'} // Toggle between text and password
                autoCapitalize="none"
                disabled={isLoading}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="pr-10" // Add padding for the icon
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" /> // Icon for hiding password
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" /> // Icon for showing password
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </Button> */}
          <LoadingButton
            isLoading={isLoading}
            label="Login"
            loadingLabel="Processsing"
            disabled={isLoading}
            type="submit"
            className=" bg-primary hover:bg-primary/90"
          />
        </div>
      </form>

      {/* Google Sign-in Button */}
      <div className="relative py-4">
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">OR</span>
        </div>
      </div>
      <SocialLogins />
      <div className="relative pt-4">
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-muted-foreground">
            Don't have an Account?{' '}
            <Link
              className=" text-primary font-bold underline"
              href="/register"
            >
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
