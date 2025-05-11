import { format } from 'date-fns'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy');
}