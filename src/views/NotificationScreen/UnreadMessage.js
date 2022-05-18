import notifee, { AndroidStyle } from '@notifee/react-native';
import { getAvatarFromUri } from '../../utils/avatarUltis';
import {
  findNotificationById,
  addMessage,
} from '../../utils/notificationUtils';

export async function newUnreadMessage(message, channelId) {
  return notifee.displayNotification({
    id: message?.user?._id,
    title: `Tin nhắn mới từ ${message?.user?.name}`,
    body: message?.text,
    android: {
      smallIcon: 'ic_small_icon',
      color: 'black',
      timestamp: Date.parse(message?.createdAt),
      showTimestamp: true,
      largeIcon: getAvatarFromUri(message?.user?.avatar),
      channelId,
      style: {
        type: AndroidStyle.INBOX,
        lines: [message?.text],
      },
    },
  });
}

export async function showIncomingMessage(message, channelId) {
  const notis = await notifee.getDisplayedNotifications();
  const noti = findNotificationById(notis, message?.user?._id);
  if (noti) {
    return notifee.displayNotification(addMessage(noti, message));
  } else return newUnreadMessage(message, channelId);
}
