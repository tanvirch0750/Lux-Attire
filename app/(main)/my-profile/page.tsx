import { auth } from '@/auth';
import { EditProfile } from '../_components/EditProfile';
import { getUserByEmail } from '@/db/actions-and-queries/user/user-query';
import ProfileImage from '../_components/ProfileImage';

const ProfilePage = async () => {
  const session = await auth();
  const user = await getUserByEmail(session?.user?.email as string);

  return (
    <div className="bg-gray-100 min-h-screen py-10 pt-16">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <EditProfile user={user} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Profile Information */}
          <div className="bg-gray-50 p-6 rounded-lg lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Profile Information
            </h2>
            <div className=" space-y-4">
              <ProfileImage
                user={user}
                sessionImage={session?.user?.image as string}
              />
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-600 text-sm">Full Name</label>
                <p className="font-semibold">{user?.name}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Email</label>
                <p className="font-semibold">{user?.email}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Phone</label>
                <p className="font-semibold">{user?.phone}</p>
              </div>
              <div>
                <label className="block text-gray-600 text-sm">Address</label>
                <p className="font-semibold">{user?.address}</p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-3 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Recent Orders
            </h2>
            <div className="space-y-4">
              <div className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">Order #12345</p>
                    <p className="text-gray-600">
                      Placed on September 15, 2024
                    </p>
                  </div>
                  <p className="font-semibold text-brand">$120.00</p>
                </div>
                <div className="mt-2 flex justify-between">
                  <p className="text-sm text-gray-600">
                    Status:{' '}
                    <span className="font-semibold text-green-600">
                      Delivered
                    </span>
                  </p>
                  <button className="text-brand hover:underline">
                    View Details
                  </button>
                </div>
              </div>

              <div className="border p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900">Order #12346</p>
                    <p className="text-gray-600">
                      Placed on September 10, 2024
                    </p>
                  </div>
                  <p className="font-semibold text-brand">$85.00</p>
                </div>
                <div className="mt-2 flex justify-between">
                  <p className="text-sm text-gray-600">
                    Status:{' '}
                    <span className="font-semibold text-yellow-600">
                      In Progress
                    </span>
                  </p>
                  <button className="text-brand hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
