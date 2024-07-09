// middleware.js
import { NextResponse } from 'next/server';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';

export async function middleware(req) {
  const cookies = req.headers.get('cookie');
  const { token } = cookies ? parse(cookies) : {};

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    jwt.verify(token, 'secret'); // Gunakan kunci rahasia yang sama
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}
