import Link from 'next/link';
import { Button } from './ui/button';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '+8801302047933';
  const message = encodeURIComponent('Hello! How can I help you?');

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className=" px-6 py-2"
    >
      <Button className="bg-green-600  hover:bg-green-500">
        Chat with us on WhatsApp
      </Button>
    </Link>
  );
};

export default WhatsAppButton;
