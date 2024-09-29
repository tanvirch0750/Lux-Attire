'use client';

import { Button } from '@/components/ui/button';
import { IUser } from '@/db/models/user-model';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateProfileAction } from '@/app/actions/user/user';

export default function ProfileImage({ user }: { user: IUser }) {
  const [imageUrl, setImageUrl] = useState(
    user?.profilePicture || 'https://github.com/shadcn.png'
  );

  const handleImageUpload = async (newImageUrl: string) => {
    // Update the local image URL state
    setImageUrl(newImageUrl);

    try {
      // Call the updateProfileAction with the user's ID and the new image URL
      const result = await updateProfileAction(user._id, {
        profilePicture: newImageUrl,
      });

      if (result.status === 200) {
        toast.success('Profile picture updated successfully!', {
          position: 'top-center',
        });
      } else {
        toast.error('Failed to update profile picture. Please try again.', {
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating the profile picture.', {
        position: 'top-center',
      });
    }
  };

  return (
    <div className="mb-8 flex items-center gap-4">
      <Image
        alt={user?.name}
        src={imageUrl as string}
        width={400}
        height={400}
        className="rounded-full w-16 h-16"
      />

      <div className="col-span-3">
        <CldUploadWidget
          uploadPreset="luxe-attire"
          onSuccess={(result) => {
            // @ts-ignore
            const newImageUrl = result?.info?.url;
            // Call the image upload handler
            handleImageUpload(newImageUrl);
          }}
        >
          {({ open }) => (
            <Button
              variant="link"
              size="sm"
              type="button"
              className="text-brand"
              onClick={() => open()}
            >
              Change Profile Picture
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
}
