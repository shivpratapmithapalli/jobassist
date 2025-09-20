import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getStatusColor(status: string) {
  const colors = {
    'Applied': 'bg-blue-500',
    'Interview': 'bg-yellow-500',
    'Rejected': 'bg-red-500',
    'Offer': 'bg-green-500',
    'Withdrawn': 'bg-gray-500',
  };
  return colors[status as keyof typeof colors] || 'bg-gray-500';
}

export function getImpactColor(impact: string) {
  const colors = {
    'High': 'text-red-400',
    'Medium': 'text-yellow-400',
    'Low': 'text-green-400',
  };
  return colors[impact as keyof typeof colors] || 'text-gray-400';
}