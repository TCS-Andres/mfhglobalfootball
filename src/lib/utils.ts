import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// shadcn-style class combiner used by the 21st.dev React components.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
