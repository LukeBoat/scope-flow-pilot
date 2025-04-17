
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency helper
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Generate a random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Calculate days remaining between two dates
export function daysRemaining(dueDate: Date): number {
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Check if a date is overdue
export function isOverdue(dueDate: Date): boolean {
  return dueDate < new Date();
}

// Get file type based on URL or filename
export function getFileType(url: string): 'image' | 'pdf' | 'document' | 'other' {
  const extension = url.split('.').pop()?.toLowerCase();
  
  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
    return 'image';
  } else if (extension === 'pdf') {
    return 'pdf';
  } else if (['doc', 'docx', 'txt', 'rtf', 'pages'].includes(extension || '')) {
    return 'document';
  } else {
    return 'other';
  }
}

// Format a date with various options
export function formatDate(date: Date, format: 'short' | 'medium' | 'long' | 'relative' = 'medium'): string {
  if (format === 'relative') {
    // Calculate relative time
    const now = new Date();
    const diff = Math.abs(now.getTime() - date.getTime());
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ${date > now ? 'from now' : 'ago'}`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ${date > now ? 'from now' : 'ago'}`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ${date > now ? 'from now' : 'ago'}`;
    }
  }
  
  // Use appropriate date format based on the requested format
  const options: Intl.DateTimeFormatOptions = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  }[format];
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
