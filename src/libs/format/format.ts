import dayjs from "dayjs";

const THOUSANDS_REGEX = /\B(?=(\d{3})+(?!\d))/g;
const MS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;

const pad = (value: number) => String(value).padStart(2, "0");

/** Formats an amount as "$ 12.345" (no decimals, dot as thousands separator). */
export const formatMoney = (amount: number) =>
  `$ ${Math.round(amount).toString().replace(THOUSANDS_REGEX, ".")}`;

/** Formats a duration in milliseconds as "HH:MM:SS". */
export const formatClock = (elapsedMs: number) => {
  const seconds = Math.floor(elapsedMs / MS_PER_SECOND);
  const hours = Math.floor(seconds / SECONDS_PER_HOUR);
  const minutes = Math.floor((seconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE);
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds % SECONDS_PER_MINUTE)}`;
};

/** Splits a duration in milliseconds into whole hours and remaining minutes. */
export const splitDuration = (elapsedMs: number) => {
  const totalMinutes = Math.floor(elapsedMs / MS_PER_SECOND / SECONDS_PER_MINUTE);
  return {
    hours: Math.floor(totalMinutes / SECONDS_PER_MINUTE),
    minutes: totalMinutes % SECONDS_PER_MINUTE,
  };
};

export const formatTime = (isoDate: string) => dayjs(isoDate).format("HH:mm");

export const formatDateTime = (isoDate: string) =>
  dayjs(isoDate).format("DD/MM/YYYY HH:mm");

/** Returns up to two initials from a full name ("Lucía Fernández" → "LF"). */
export const getInitials = (fullName: string) =>
  fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

export const formatDate = (isoDate: string) => dayjs(isoDate).format("DD/MM/YYYY");

const SALE_NUMBER_DIGITS = 4;

/** Formats a sale number as "#0007". */
export const formatSaleNumber = (saleNumber: number) =>
  `#${String(saleNumber).padStart(SALE_NUMBER_DIGITS, "0")}`;
