export const formatDate = dateString => {
  if (dateString === undefined) return '';
  const today = new Date();
  const date = new Date(dateString);
  const dTimestamp = Date.parse(today) - Date.parse(date);
  if (dTimestamp < 1000 * 60) {
    return `${Number.parseInt(dTimestamp / 1000)} giây trước`;
  }
  if (dTimestamp < 1000 * 60 * 60) {
    return `${Number.parseInt(dTimestamp / (1000 * 60))} phút trước`;
  }
  if (today.toDateString() === date.toDateString()) {
    return date.toLocaleTimeString('vi-VN', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }
  return date.toLocaleDateString('vi-VN', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });
};
