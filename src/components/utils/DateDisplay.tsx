import React from 'react';
import { parse, formatDistanceToNow, isValid, format } from 'date-fns';
import { de } from 'date-fns/locale';

export type DateFormat =
  | 'full' // e.g., "15. Dezember 2024"
  | 'long' // e.g., "Dezember 2024"
  | 'short' // e.g., "15.12.2024"
  | 'month-year' // e.g., "12.2024"
  | 'day-month' // e.g., "15. Dezember"
  | 'relative' // e.g., "vor 2 Tagen", "heute"
  | 'iso' // e.g., "2024-12-15"
  | 'year' // e.g., "2024"
  | 'custom'; // custom format

export interface DateDisplayProps {
  date?: Date | string | number;
  dateFormat?: DateFormat;
  customFormat?: Intl.DateTimeFormatOptions;
  locale?: string;
  className?: string;
  prefix?: string;
  suffix?: string;
  showTime?: boolean;
  timeFormat?: '12h' | '24h';
}

const DateDisplay: React.FC<DateDisplayProps> = ({
  date = new Date(),
  dateFormat = 'long',
  customFormat,
  locale = 'de-DE',
  className = '',
  prefix = '',
  suffix = '',
  showTime = false,
  timeFormat = '24h',
}) => {
  const dateObj = (() => {
    if (typeof date === 'string') {
      try {
        // Try to parse German date format (dd.mm.yyyy or d.m.yyyy)
        const parsedDate = parse(date, 'dd.MM.yyyy', new Date());
        if (isValid(parsedDate)) {
          return parsedDate;
        }
        // Fallback to ISO date parsing
        return new Date(date);
      } catch (error) {
        return new Date(date);
      }
    } else if (typeof date === 'number') {
      return new Date(date);
    }
    return date;
  })();

  const getRelativeDate = (date: Date): string => {
    try {
      return formatDistanceToNow(date, {
        addSuffix: true,
        locale: de,
      });
    } catch (error) {
      // Fallback to simple relative date
      const now = new Date();
      const diffTime = now.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return 'heute';
      if (diffDays === 1) return 'gestern';
      if (diffDays === -1) return 'morgen';
      if (diffDays > 0)
        return `vor ${diffDays} Tag${diffDays !== 1 ? 'en' : ''}`;
      return `in ${Math.abs(diffDays)} Tag${Math.abs(diffDays) !== 1 ? 'en' : ''}`;
    }
  };

  const getTimeString = (date: Date): string => {
    if (!showTime) return '';

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: timeFormat === '12h',
    };

    return ` ${date.toLocaleTimeString(locale, timeOptions)}`;
  };

  const formatDate = (): string => {
    const timeString = getTimeString(dateObj);

    try {
      let formattedDate: string;

      switch (dateFormat) {
        case 'full':
          formattedDate = format(dateObj, 'dd. MMMM yyyy', { locale: de });
          break;
        case 'long':
          formattedDate = format(dateObj, 'MMMM yyyy', { locale: de });
          break;
        case 'short':
          formattedDate = format(dateObj, 'dd.MM.yyyy', { locale: de });
          break;
        case 'month-year':
          formattedDate = format(dateObj, 'MM.yyyy', { locale: de });
          break;
        case 'day-month':
          formattedDate = format(dateObj, 'dd. MMMM', { locale: de });
          break;
        case 'relative':
          return getRelativeDate(dateObj);
        case 'iso':
          return format(dateObj, 'yyyy-MM-dd');
        case 'year':
          return format(dateObj, 'yyyy');
        case 'custom':
          if (customFormat) {
            formattedDate = format(dateObj, 'dd. MMMM yyyy', {
              locale: de,
            });
          } else {
            formattedDate = format(dateObj, 'dd. MMMM yyyy', {
              locale: de,
            });
          }
          break;
        default:
          formattedDate = format(dateObj, 'MMMM yyyy', { locale: de });
      }

      return `${prefix}${formattedDate}${timeString}${suffix}`;
    } catch (error) {
      // Fallback to basic formatting
      return `${prefix}${dateObj.toLocaleDateString(locale)}${timeString}${suffix}`;
    }
  };

  return <span className={className}>{formatDate()}</span>;
};

export default DateDisplay;
