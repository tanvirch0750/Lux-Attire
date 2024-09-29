'use client';

import { updateProfileAction } from '@/app/actions/user/user';
import LoadingButton from '@/components/LodingButton';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IUser } from '@/db/models/user-model';

import { useState } from 'react';
import { toast } from 'react-toastify';

export function EditProfile({ user }: { user: IUser }) {
  const [formData, setFormData] = useState({
    name: user?.name,
    phone: user?.phone,
    address: user?.address,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await updateProfileAction(user?._id, formData);

      if (result.status === 200) {
        toast.success('Profile updated successfully', {
          position: 'top-center',
        });
      }

      if (result.status === 404) {
        toast.error(result?.error, {
          position: 'top-center',
        });
      }
    } catch (error) {
      toast.error('Profile updation Failed, Something went wrong', {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="px-6 py-2 bg-brand text-white rounded-md hover:bg-brand/90">
          Edit Profile
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-white z-50">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4 " onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              id="name"
              defaultValue={user?.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              name="phone"
              id="phone"
              defaultValue={user?.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              name="address"
              id="address"
              defaultValue={user?.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="col-span-3"
            />
          </div>

          <DialogFooter>
            <div>
              <LoadingButton
                isLoading={loading}
                label="Update Profile"
                loadingLabel="Updating Profile"
                type="submit"
              />
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
