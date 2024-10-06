'use client';

import { useState } from 'react';

export default function NewsLetter() {
  // State for managing email input and form submission status
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Simulate form submission (e.g., an API call)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation (you can make this more robust)
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      // Simulate a successful API request (replace with real API call)
      setTimeout(() => {
        setIsSubmitted(true);
        setError(''); // Clear any previous errors
      }, 1000);
    } catch (err) {
      // Handle error during submission
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="bg-gradient-to-r from-brand via-brand/90 to-brand/80 text-white py-16 px-6 m-[24px] rounded-md ">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
          Stay Updated
        </h2>
        <p className="text-lg md:text-xl mb-8 animate-fade-in">
          Subscribe to our newsletter and get exclusive fashion updates, special
          offers, and promotions straight to your inbox.
        </p>

        {isSubmitted ? (
          <p className="text-lg md:text-xl font-bold animate-fade-in">
            Thank you for subscribing! 🎉
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full md:w-2/3 px-4 py-3 text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-400"
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto bg-white text-primary font-bold px-6 py-3 rounded-md hover:bg-primary/40 hover:text-white transition duration-300 ease-in-out animate-pulse"
            >
              Subscribe Now
            </button>
          </form>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </section>
  );
}
