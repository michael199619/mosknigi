import * as crypto from 'crypto';
import {Request} from 'express';
import {ExtractJwt} from 'passport-jwt';

export function getHash(str: string): string {
  return crypto
    .createHash('sha256')
    .update(str)
    .digest('hex');
}

export function getPwsSaltPair(pwd: string, salt: string) {
  return `${salt}:${pwd}`;
}

export function getPasswordHash(pwd: string, salt: string): string {
  const pair = getPwsSaltPair(pwd, salt);
  return getHash(pair);
}

export function jwtFromRequest(req: Request) : string | null {
  if (!req.headers['authorization'] && req.query.token) {
    req.headers['authorization'] = `Bearer ${req.query.token}`;
  }

  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
}