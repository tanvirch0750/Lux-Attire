import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from './EmblaCarousel';

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
const SLIDE_COUNT = 4;
const SLIDES = [
  'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-2.jpg&w=1920&q=100',
  'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fgrid%2Fbanner-4.png&w=1080&q=100',
  'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbanner-2.jpg&w=1200&q=100',
  'https://chawkbazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fslider%2Fbanner-1.jpg&w=1920&q=100',
];

export default function SpecialOffer() {
  return (
    <div>
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </div>
  );
}
