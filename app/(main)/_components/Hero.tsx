import Image from 'next/image';
import Link from 'next/link';

interface Props {
  variant?: 'slim' | 'to-r' | string;
  data?: any;
  priority?: boolean;
}

export const Hero = ({ data, variant, priority = false }: Props) => {
  const image = data.background_image;

  return (
    <div
      className="relative flex items-center justify-center text-center mb-4 bg-primary mt-[-80px] h-screen"
      //   style={{ height: 'calc(100vh - 80px)' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          className="object-cover"
          alt="img"
          src={image}
          fill
          priority
          quality={100}
        />
      </div>
      <div className="bg-white bg-opacity-90 p-10 m-6 max-w-2xl z-10">
        <h2 className="text-3xl font-bold px-12 mb-2 text-primary ">
          {data.title}
        </h2>
        <div
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
        <Link
          href={data.link_url ? data.link_url : '/'}
          passHref
          className="uppercase font-semibold tracking-wide text-xs text-slate-100 bg-[#eb3d00] rounded-full px-4 py-3 hover:bg-[#eb3d00]/90 transition-colors ease-in duration-150"
        >
          {data.link_title}
        </Link>
      </div>
    </div>
  );
};
