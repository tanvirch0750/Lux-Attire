import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './EmblaCarousel';

import offerOne from '@/assests/1.png';
import offerTwo from '@/assests/2.png';
import offerThree from '@/assests/3.png';
import offerFour from '@/assests/4.png';

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const SLIDE_COUNT = 4;
const SLIDES = [offerOne, offerTwo, offerThree, offerFour];

const slideObj = [
  {
    img: offerOne,
    title: 'Exclusive Deals Just for You!',
    desc: 'Discover unparalleled offers on top fashion trends.',
  },
  {
    img: offerTwo,
    title: 'Seasonal Sale: Up to 50% Off!',
    desc: 'Refresh your wardrobe with our exclusive deals',
  },
  {
    img: offerThree,
    title: 'Unlock Exclusive Savings Today!',
    desc: 'Find amazing deals on premium fashion and accessories.',
  },
  {
    img: offerFour,
    title: 'Elevate Your Style with Special Offers!',
    desc: 'Explore luxurious discounts on high-end clothing.',
  },
];

export default function SpecialOffer() {
  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
