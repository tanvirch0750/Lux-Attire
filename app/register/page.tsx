import Image from 'next/image';

import RegisterImg from '@/assests/register-img.jpg';
import RegisterForm from './_components/RegisterForm';

export default function LoginPage() {
  return (
    <div className="w-full h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center">
        {/* Hide image on small screens */}
        <div className="hidden md:block relative h-full">
          {/* Gradient overlay with a warm tone */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand/60 to-transparent z-10"></div>
          <Image
            src={RegisterImg}
            alt="login image"
            layout="fill"
            objectFit="cover"
            className="w-full h-full filter saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-500 ease-in-out"
          />
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}
