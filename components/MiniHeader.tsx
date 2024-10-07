/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const MiniHeader = () => {
  return (
    <div className="hidden lg:flex bg-[#bc3100] text-white py-2 text-center text-sm justify-between items-center px-4 lg:px-8">
      <p className="uppercase tracking-wide text-sm">
        Hurry! Limited stock available—shop now before it's gone.
      </p>
      <div className="flex space-x-4 items-center">
        <Link href="/about-us" className="hover:text-gray-400">
          About us
        </Link>
        <span>·</span>
        <Link href="/support-center" className="hover:text-gray-400">
          Support
        </Link>
        <span>·</span>
        <Link href="/privacy-policy" className="hover:text-gray-400">
          Policy
        </Link>
        <span>·</span>
        <Link
          href="https://www.facebook.com/tanvirchowdhury.shahib"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <FaFacebook />
        </Link>
        <Link
          href="https://twitter.com/mtc0750"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <FaTwitter />
        </Link>
        <Link
          href="https://www.linkedin.com/in/tanvirc/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400"
        >
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
};

export default MiniHeader;
