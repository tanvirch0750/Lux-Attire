import { Hero } from './_components/Hero';
import Img from '@/assests/hero-two.jpg';

export default function HomePage() {
  const data = {
    background_image: Img,
    title: 'Unveil Timeless Elegance',
    description:
      'Discover a curated collection of sophisticated fashion that transcends trends. At Luxe Attire, we bring you luxurious garments crafted for those who appreciate style with grace. Elevate your wardrobe with pieces designed to make a statement in every moment.',
    link_title: 'Shop At Luxe Attire',
    link_url: '/products',
  };

  return (
    <>
      <Hero data={data} />
    </>
  );
}
