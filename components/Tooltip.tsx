import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface TooltipProps {
  triggerContent: React.ReactNode;
  tooltipContent: React.ReactNode;
  delayDuration?: number;
  asChild?: boolean;
  triggerClassName?: string;
  tooltipClassName?: string;
}

export const CustomTooltip: React.FC<TooltipProps> = ({
  triggerContent,
  tooltipContent,
  delayDuration = 10,
  asChild = true,
  triggerClassName = '',
  tooltipClassName = '',
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={delayDuration}>
        <TooltipTrigger asChild={asChild}>
          <div className={triggerClassName}>{triggerContent}</div>
        </TooltipTrigger>
        <TooltipContent className={tooltipClassName}>
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
