import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing'; // or './src/i18n/routing' depending on your structure

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!api|admin|_next|.*\\..*).*)']']
};
