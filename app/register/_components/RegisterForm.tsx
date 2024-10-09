/* eslint-disable prefer-const */
'use client';

import * as React from 'react';
import { toast } from 'react-toastify';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import SocialLogins from './SocialLogings';
import Link from 'next/link';
import LoadingButton from '@/components/LodingButton';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function RegisterForm({
  className,
  ...props
}: UserAuthFormProps) {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [errors, setErrors] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{11}$/.test(phone); // Ensures a valid 11-digit phone number
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear corresponding error when input changes
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    let valid = true;
    let newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
    };

    if (!formData.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
      valid = false;
    }

    setErrors(newErrors);

    try {
      if (valid) {
        setIsLoading(true);

        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        setIsLoading(false);

        console.log(response);

        if (response?.status === 400) {
          toast.error('User Already Exists!', {
            position: 'top-center',
          });
        }

        if (response?.status === 200) {
          toast.success('Registration Successfull!', {
            position: 'top-center',
          });

          router.push('/login');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong try again', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className={cn('px-12', className)} {...props}>
      <h1 className="text-3xl mb-6">Registration</h1>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          {/* Name Field */}
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Your Name"
              type="text"
              disabled={isLoading}
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

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
            <Input
              id="password"
              placeholder="*******"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="grid gap-1">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              placeholder="*******"
              type="password"
              autoCapitalize="none"
              disabled={isLoading}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Phone Number Field */}
          <div className="grid gap-1">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="1234567890"
              type="text"
              autoCapitalize="none"
              disabled={isLoading}
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          <LoadingButton
            isLoading={isLoading}
            label="Register"
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
            Already have an Account?{' '}
            <Link className=" text-primary font-bold underline" href="/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
