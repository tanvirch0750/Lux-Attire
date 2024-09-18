import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { doSocialLogin } from '@/app/actions-and-queries/auth';

const SocialLogins = () => {
  return (
    <>
      <form action={doSocialLogin} className=" w-full">
        <Button
          className=" w-full py-4 bg-brand/90 hover:bg-brand"
          type="submit"
          name="action"
          value="google"
        >
          <span>Sign In With Google</span>
        </Button>
      </form>
    </>
  );
};

export default SocialLogins;
