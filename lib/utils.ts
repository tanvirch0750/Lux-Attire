import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

export function formatDateAndTime(isoDateString: string): {
  date: string;
  time: string;
} {
  const date = new Date(isoDateString);

  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate: string = date.toLocaleDateString('en-US', optionsDate);

  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  const formattedTime: string = date.toLocaleTimeString('en-US', optionsTime);

  return {
    date: formattedDate,
    time: formattedTime,
  };
}

// Example usage
// const isoDate = '2024-09-30T12:49:57.979Z';
// const result = formatDateAndTime(isoDate);
// console.log(result);
