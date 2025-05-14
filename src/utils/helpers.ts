// Format date to a human-readable format
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Format date to include time
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Check if a date is today
export function isToday(date: Date | string): boolean {
  const today = new Date();
  const d = new Date(date);
  return d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();
}

// Check if a date is in the past
export function isPast(date: Date | string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // Set to start of day
  return d < today;
}

// Check if a date is in the future
export function isFuture(date: Date | string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day
  const d = new Date(date);
  d.setHours(0, 0, 0, 0); // Set to start of day
  return d > today;
}