export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/wines/new', '/wines/:id+'],
};