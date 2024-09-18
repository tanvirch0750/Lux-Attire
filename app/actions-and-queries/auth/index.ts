'use server';

import { signIn } from '@/auth';

export async function ceredntialLogin(formData: {
  email: string;
  password: string;
}) {
  console.log(formData);
  try {
    const response = await signIn('credentials', {
      email: formData?.email,
      password: formData?.password,
      redirect: false,
    });

    console.log('login res', response);
    return response;
  } catch (error: any) {
    if (error.type === 'CallbackRouteError' || 'CredentialsSignin') {
      throw new Error('Invalid Credentials');
    } else {
      throw new Error('Something went wrong!');
    }
  }
}

export async function doSocialLogin(formData: any) {
  const action = formData.get('action');
  await signIn(action, { redirectTo: '/' });
}
