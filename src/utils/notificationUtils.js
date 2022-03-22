export function findNotificationById(notis, id) {
  for (const noti of notis) {
    if (noti.id === id) return noti.notification;
  }
  return false;
}

export function addMessage(noti, message) {
  return {
    ...noti,
    android: {
      ...noti.android,
      timestamp: Date.parse(message?.createdAt),
      style: {
        ...noti.android.style,
        lines: [...noti.android.style.lines, message?.text],
      },
    },
  };
}
