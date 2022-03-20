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
