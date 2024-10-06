import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyIcon } from 'lucide-react'; // Assuming you're using Lucide icons or similar

export function LoginCredentials() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Demo Credentials</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle>Demo Login Credentials</DialogTitle>
          <DialogDescription>
            Below are demo credentials for both a user and an admin. Use these
            to log in and explore the system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* User Credentials Section */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">User Login Credentials</h3>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user-email" className="text-right">
                Email
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="user-email"
                  defaultValue="tanvirchowdhury996@gmail.com"
                  className="col-span-3"
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy('tanvirchowdhury996@gmail.com')}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user-password" className="text-right">
                Password
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="user-password"
                  defaultValue="123456"
                  type="password"
                  className="col-span-3"
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy('123456')}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Admin Credentials Section */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Admin Login Credentials</h3>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="admin-email" className="text-right">
                Email
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="admin-email"
                  defaultValue="tanvir.chowdhury532@gmail.com"
                  className="col-span-3"
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy('tanvir.chowdhury532@gmail.com')}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="admin-password" className="text-right">
                Password
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="admin-password"
                  defaultValue="123456"
                  type="password"
                  className="col-span-3"
                  readOnly
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy('123456')}
                >
                  <CopyIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          {copiedText && (
            <div className="fixed bottom-4 left-4 p-2 bg-green-100 text-green-700 rounded-md shadow-md">
              {copiedText} copied to clipboard!
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose>
            {' '}
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
