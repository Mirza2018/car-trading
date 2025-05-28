// components/RelativeTime.jsx
import React from "react";

const RelativeTime = ({ timestamp }) => {
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();

    if (diffMs < 0) return "just now"; // future date guard

    const seconds = Math.floor(diffMs / 1000);
    if (seconds < 60) return "just now";

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    const remMinutes = minutes % 60;
    if (hours < 24)
      return remMinutes === 0
        ? `${hours} hour ago`
        : `${hours} hour ${remMinutes} min ago`;

    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    if (days < 30)
      return remHours === 0
        ? `${days} day ago`
        : `${days} day ${remHours} hour ago`;

    const months = Math.floor(days / 30);
    const remDays = days % 30;
    if (months < 12)
      return remDays === 0
        ? `${months} month ago`
        : `${months} month ${remDays} day ago`;

    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return remMonths === 0
      ? `${years} year ago`
      : `${years} year ${remMonths} month ago`;
  };

  return (
    <span className="text-sm text-gray-600">{getRelativeTime(timestamp)}</span>
  );
};

export default RelativeTime;
