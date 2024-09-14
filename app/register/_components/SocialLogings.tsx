import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { doSocialLogin } from '@/app/actions/auth';

const SocialLogins = () => {
  return (
    <>
      <form action={doSocialLogin} className=" w-full">
        <Button
          className=" w-full py-6"
          variant="outline"
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
