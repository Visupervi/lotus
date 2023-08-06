import randomString = require('random-string');
import crypto = require('crypto');
import config from '../config';

export function getConfig() {
  return config;
}

export function getRoomId() {
  const random = randomString({ length: 12, numeric: true, letters: true });
  return 'room' + random;
}

export function getLesseeAppId() {
  const random = randomString({ length: 18, numeric: true, letters: true });
  return random;
}

export function fileHashMd5(buffer: Buffer) {
  const hash = crypto.createHash('md5');
  hash.update(buffer);
  const md5 = hash.digest('hex');
  return md5;
}

export function getFileType(extname: string) {
  const image = ['.jpg', '.png', '.jpeg'];
  const video = ['.mp4'];
  if (image.includes(extname)) {
    return 'image';
  } else if (video.includes(extname)) {
    return 'video';
  }
  return extname;
}
