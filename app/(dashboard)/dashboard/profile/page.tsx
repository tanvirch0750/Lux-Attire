import { auth } from '@/auth';
import PageContainer from '../../_components/layout/PageContainer';
import UpdateProfile from './_components/UpdateProfile';
import { getUserByEmail } from '@/db/actions-and-queries/user/user-query';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);
  return (
    <PageContainer>
      <UpdateProfile
        userData={user}
        sessionImage={session?.user?.image as string}
      />
    </PageContainer>
  );
}
