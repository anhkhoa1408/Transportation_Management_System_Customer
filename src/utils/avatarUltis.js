import { MAIN_URL } from '../api/config';

export function getAvatarFromUser(user = undefined) {
  return getAvatarFromUri(user?.avatar?.url);
}

export function getAvatarFromUri(uri = undefined) {
  if (uri === undefined || typeof uri !== 'string') {
    return 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png';
  }
  if (uri.search('/') === 0) {
    return MAIN_URL + uri;
  }
  return uri;
}

export function getNameFromUser(user) {
  if (user?.name) {
    const s_name = user?.name.split(' ');
    return s_name[s_name.length - 1];
  } else if (user?.email) return user?.email.split('@')[0];
  else if (user?.phone) return user?.phone;
  else return 'Khách hàng';
}

export function getName(name) {
  return name.split(' ').pop();
}
