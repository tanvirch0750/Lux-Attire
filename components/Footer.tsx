/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-gray-300 text-white py-16 border-t">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Social</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <FaInstagram className="mr-2" /> Instagram
              </li>
              <li className="flex items-center">
                <FaTwitter className="mr-2" /> Twitter
              </li>
              <li className="flex items-center">
                <FaFacebook className="mr-2" /> Facebook
              </li>
              <li className="flex items-center">
                <FaYoutube className="mr-2" /> Youtube
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Contact Us</li>
              <li>tanvirch7575@email.com</li>
              <li>example@luxe-attire.com</li>
              <li>Call us: +8801302047933</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">About</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/support-center">Support Center</Link>
              </li>
              <li>
                <Link href="/about-us">About Us</Link>
              </li>
              <li>
                <Link href="/copyright">Copyright</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">
              Customer Care
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/support-center">FAQ & Helps</Link>
              </li>
              <li>
                <Link href="/shipping-delivery">Shipping & Delivery</Link>
              </li>
              <li>
                <Link href="/return-exchange">Return & Exchanges</Link>
              </li>
            </ul>
          </div>

          {/* Our Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">
              Our Information
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>

              <li>
                <Link href="/terms-condition">Terms & Conditions</Link>
              </li>
              <li>
                <Link href="/return-exchange">Return Policy</Link>
              </li>
            </ul>
          </div>

          {/* Top Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">
              Top Categories
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/products/mens-collection">Men's Wear</Link>
              </li>
              <li>
                <Link href="/products/womens-collection">Women's Wear</Link>
              </li>
              <li>
                <Link href="/products/activewear">Active Wear</Link>
              </li>
              <li>
                <Link href="/products/kids-wear">Kid's Wear</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            &copy; 2024 <span className="font-bold">Luxe Attier</span>. All
            rights reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Image
              width={30}
              height={20}
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
              alt="MasterCard"
              className="h-4"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
