import clsx from 'clsx';

interface LoaderProps {
  text: string;
  className?: string; // Optional className prop for additional styles
}

export default function Loader({ text, className }: LoaderProps) {
  return (
    <div
      className={clsx(
        'flex flex-col flex-1 justify-center items-center min-h-[400px] h-full w-full space-y-4',
        className
      )}
    >
      {/* Bouncing dots animation */}
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-brand rounded-full animate-bounce1"></div>
        <div className="w-4 h-4 bg-brand rounded-full animate-bounce2"></div>
        <div className="w-4 h-4 bg-brand rounded-full animate-bounce3"></div>
      </div>

      {/* Animated Text */}
      <div className="flex space-x-1">
        {text.split('').map((letter, index) => (
          <span
            key={index}
            className="text-3xl font-bold text-primary inline-block animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }} // Delay each letter's animation
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
