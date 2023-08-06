import { getConfig } from '.';
import jwt = require('jsonwebtoken');

export interface TokenModel {
  userId: number;
  roleId: number;
  lesseeId: number;
  userName: string;
}

export const getTokenData = (token: string): TokenModel => {
  const { KEY } = getConfig();
  return jwt.verify(token, KEY);
};

export const setDataToken = (data: TokenModel): string => {
  const { KEY } = getConfig();
  return jwt.sign(data, KEY, { expiresIn: '24h' });
};
