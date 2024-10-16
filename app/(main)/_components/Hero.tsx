import Image from 'next/image';
import Link from 'next/link';

interface Props {
  data?: any;
}

export const Hero = ({ data }: Props) => {
  const image = data.background_image;

  return (
    <div className="relative flex items-center justify-center text-center mb-4  mt-[-80px] h-screen ">
      {/* Parallax effect on the image */}
      <div className="absolute inset-0 overflow-hidden parallax">
        <Image
          className="object-cover animate-zoom-in-out"
          placeholder="blur"
          alt="img"
          src={image}
          fill
          priority
          quality={100}
        />
      </div>

      {/* Text content with fade-in and scale effect */}
      <div className="bg-white bg-opacity-70 p-10 m-6 max-w-2xl z-10 fade-in-up">
        <h1 className="text-3xl font-bold px-12 mb-2 text-primary fade-in-up">
          {data.title}
        </h1>
        <div
          className="mb-6 fade-in-up"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />

        {/* Animated Button */}
        <Link
          href={data.link_url ? data.link_url : '/'}
          passHref
          className="uppercase font-semibold tracking-wide text-xs text-slate-100 bg-brand rounded-full px-4 py-3 hover:bg-brand/90 transition-colors ease-in duration-150 btn-animated"
        >
          {data.link_title}
        </Link>
      </div>
    </div>
  );
};
