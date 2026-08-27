import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

// Creates typed wrappers for Next.js navigation hooks
export const {Link, redirect, usePathname, useRouter, getPathname} = createNavigation(routing);