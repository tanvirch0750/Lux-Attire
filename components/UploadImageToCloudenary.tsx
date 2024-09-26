'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from './ui/button';

export default function UploadImageToCloudenary() {
  return (
    <CldUploadWidget uploadPreset="luxe-attire">
      {({ open }) => {
        return (
          <Button
            className=" bg-brand hover:bg-brand/90"
            onClick={() => open()}
          >
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
