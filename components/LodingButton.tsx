import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

interface LoadingButtonProps {
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  isLoading: boolean;
  disabled?: boolean;
  onClick?: () => void | Promise<void>;
  label: string;
  loadingLabel?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  type = 'submit',
  className = '',
  isLoading,
  disabled,
  onClick,
  label,
  loadingLabel = 'Please wait',
}) => {
  return (
    <Button
      type={type}
      className={` px-4 py-2 bg-brand text-white font-semibold rounded-md hover:bg-brand/90 ${className}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </Button>
  );
};

export default LoadingButton;
