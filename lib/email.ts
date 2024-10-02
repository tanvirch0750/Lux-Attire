'use server';

import EmailTemplate from '@/components/EmailTemplate';
import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(
  process.env.RESEND_API_KEY || 're_MsNKdjP6_3sQKk7HfEjmTeavvztXfdxuF'
);

// Define the type for each email's information
interface EmailInfo {
  to: string;
  subject: string;
  message: string;
}

// Define the type for the array of email info
type EmailInfoArray = EmailInfo[];

export const sendEmails = async (emailInfo: EmailInfoArray) => {
  if (!emailInfo || emailInfo.length === 0) return null;

  const response = await Promise.allSettled(
    emailInfo.map(async (data) => {
      const { to, subject, message } = data;

      if (to && message && subject) {
        try {
          // Send email via Resend API
          const sentInfo = await resend.emails.send({
            from: 'info@tanvir-chowdhury.xyz',
            to,
            subject,
            react: EmailTemplate({ message }), // Using the react-based template
          });

          return sentInfo;
        } catch (error) {
          // Handle Resend API errors
          throw new Error(`Failed to send email to ${to}: ${error}`);
        }
      } else {
        throw new Error(`Invalid email data: ${JSON.stringify(data)}`);
      }
    })
  );

  return response;
};
