import {
  CreditCardIcon,
  HandshakeIcon,
  IdCardIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react';

export default function CheckoutPage() {
  return (
    <div className=" border-t p-[24px]">
      <div className="grid  lg:grid-cols-2 gap-10">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          {/* cart details */}
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://img.freepik.com/free-photo/pleased-young-pretty-woman-looking-front-doing-peace-sign-isolated-olive-green-wall_141793-109830.jpg?uid=R163516477&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="text-lg ">$138.99</p>
              </div>
            </div>
            <div className="flex flex-col rounded-lg bg-white sm:flex-row">
              <img
                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="https://img.freepik.com/free-photo/pleased-young-pretty-woman-looking-front-doing-peace-sign-isolated-olive-green-wall_141793-109830.jpg?uid=R163516477&ga=GA1.1.911219905.1717681244&semt=ais_hybrid"
                alt=""
              />
              <div className="flex w-full flex-col px-4 py-4">
                <span className="font-semibold">
                  Nike Air Max Pro 8888 - Super Light
                </span>
                <span className="float-right text-gray-400">42EU - 8.5US</span>
                <p className="mt-auto text-lg ">$238.99</p>
              </div>
            </div>
          </div>

          {/* shipping methods */}
          <div>
            <p className="mt-8 text-lg font-medium">Shipping Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  checked
                />
                <span className="peer-checked:border-brand absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-brand peer-checked:bg-gray-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <HandshakeIcon className="w-14 text-brand" size={40} />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash On Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  checked
                />
                <span className="peer-checked:border-brand absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label
                  className="peer-checked:border-2 peer-checked:border-brand peer-checked:bg-gray-50 flex items-center cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <CreditCardIcon className="w-14 text-brand" size={40} />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Pay with Stripe</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <div>
              <label
                htmlFor="email"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-brand focus:ring-brand"
                  placeholder="your.email@gmail.com"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <MailIcon className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="name"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-brand focus:ring-brand"
                  placeholder="Your full name here"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <UserIcon className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="card-holder"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Your Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="Phone"
                  name="phone"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-brand focus:ring-brand"
                  placeholder="Your Phone Number"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <PhoneIcon className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="card-no"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Your address
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="card-holder"
                  name="address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-brand focus:ring-brand"
                  placeholder="Your Full Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <IdCardIcon className="w-4 h-4 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">$399.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">$408.00</p>
            </div>
            <button className="mt-4 mb-8 w-full rounded-md bg-brand px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
