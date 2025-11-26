/**
 * Date Utility Functions
 * Handles date formatting and manipulation
 */

/**
 * Format timestamp to readable date string
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date string (e.g., "Nov 26, 2024")
 */
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

/**
 * Format timestamp to include time
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Formatted date and time string (e.g., "Nov 26, 2024 at 2:30 PM")
 */
export const formatDateTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const dateStr = date.toLocaleDateString("en-US", dateOptions);
  const timeStr = date.toLocaleTimeString("en-US", timeOptions);

  return `${dateStr} at ${timeStr}`;
};

/**
 * Get relative time string (e.g., "2 hours ago", "Yesterday")
 * @param timestamp - Unix timestamp in milliseconds
 * @returns Relative time string
 */
export const getRelativeTime = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "Just now";
  if (minutes < 60) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  if (hours < 24) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;

  return formatDate(timestamp);
};

/**
 * Get start of day timestamp
 * @param date - Date object (defaults to today)
 * @returns Timestamp at start of day (00:00:00)
 */
export const getStartOfDay = (date: Date = new Date()): number => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start.getTime();
};

/**
 * Get end of day timestamp
 * @param date - Date object (defaults to today)
 * @returns Timestamp at end of day (23:59:59)
 */
export const getEndOfDay = (date: Date = new Date()): number => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end.getTime();
};

/**
 * Check if timestamp is today
 * @param timestamp - Unix timestamp in milliseconds
 * @returns True if timestamp is from today
 */
export const isToday = (timestamp: number): boolean => {
  const today = getStartOfDay();
  const tomorrow = getStartOfDay(new Date(Date.now() + 86400000));
  return timestamp >= today && timestamp < tomorrow;
};

/**
 * Generate unique ID with timestamp
 * @returns Unique string ID
 */
export const generateId = (): string => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
