export const formatRelativeTime = (time: string | Date): string => {
  const targetDate = new Date(time);
  const now = new Date();

  if (isNaN(targetDate.getTime())) {
    return "-";
  }

  const startOfTarget = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
  );

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const oneDayInMs = 24 * 60 * 60 * 1000;
  const dayDifference = Math.round(
    (startOfToday.getTime() - startOfTarget.getTime()) / oneDayInMs,
  );

  if (dayDifference === 0) {
    return targetDate
      .toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(".", ":");
  }

  if (dayDifference === 1) {
    return "Yesterday";
  }

  const day = String(targetDate.getDate()).padStart(2, "0");
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const year = targetDate.getFullYear();

  return `${day}/${month}/${year}`;
};
