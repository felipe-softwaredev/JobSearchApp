import jwt from 'jsonwebtoken';
import * as jose from 'jose';
import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode('secret-key');

//function
export async function generateToken(username: string) {
  const payload = {
    username: username,
  };
  const token = await new SignJWT(payload)
    .setProtectedHeader({
      alg: 'HS256',
    })
    .sign(secretKey);
  return token;
}

export async function validateToken(token: string) {
  try {
    const { payload, protectedHeader } = await jwtVerify(token, secretKey);
    return { verified: true, payload };
  } catch (e) {
    return { verified: false };
  }
}
