import { NextRequest, NextResponse } from 'next/server';
import { TOKEN_NAME } from './constant/token.constant';
import { jwtDecode } from 'jwt-decode';
import {
  CLIENT_ADMIN_PAGE,
  CREATE_CLIENT_ADMIN_PAGE,
  CREATE_MEMBER_ADMIN_PAGE,
  CREATE_PROJECT_ADMIN_PAGE,
  CREATE_USER_ADMIN_PAGE,
  DASHBOARD_ADMIN_PAGE,
  MEMBER_ADMIN_PAGE,
  PROJECTS_ADMIN_PAGE,
  USER_ADMIN_PAGE,
} from './constant/page_routes';
import {
  API_BASE_URL,
  API_MIDDLEWARE_BASE_DEVELOPMENT_URL,
} from './constant/api_routes';

function willAccessPath(paths: string[], currentPath: string) {
  return paths.some(
    (path) =>
      currentPath === path ||
      currentPath.startsWith(`${path}?`) ||
      currentPath.startsWith(`${path}/`),
  );
}

export async function middleware(request: NextRequest) {
  let token = request.cookies.get(TOKEN_NAME);

  const userStaffAccessPaths = ['/project-manager', '/staff'];
  const adminAccessPath = ['/admin'];

  const path = request.nextUrl.pathname;

  const adminRoutes = [
    DASHBOARD_ADMIN_PAGE,
    CLIENT_ADMIN_PAGE,
    CREATE_CLIENT_ADMIN_PAGE,
    USER_ADMIN_PAGE,
    CREATE_USER_ADMIN_PAGE,
    MEMBER_ADMIN_PAGE,
    CREATE_MEMBER_ADMIN_PAGE,
    PROJECTS_ADMIN_PAGE,
    CREATE_PROJECT_ADMIN_PAGE,
  ];

  let decodeToken = '';
  let userData = { id: '' };

  try {
    if (!token) {
      decodeToken = '';

      const willAccessUserAuthenticationPath = willAccessPath(
        userStaffAccessPaths,
        path,
      );

      const willAccessAdminAuthenticationPath = willAccessPath(
        adminAccessPath,
        path,
      );

      if (
        willAccessUserAuthenticationPath ||
        willAccessAdminAuthenticationPath
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } else {
      const url = request.nextUrl.clone();
      decodeToken = JSON.stringify(jwtDecode(token.value));
      userData = JSON.parse(decodeToken);

      const response = await fetch(`${API_BASE_URL}/users/${userData.id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      const data = await response.json();

      const userRole = data.data;

      if (
        userRole.role.toLowerCase() === 'admin' &&
        userStaffAccessPaths.some((pathname) => path.startsWith(pathname))
      ) {
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }

      if (
        userRole.role.toLowerCase() === 'project-manager' &&
        adminAccessPath.some((pathname) => path.startsWith(pathname))
      ) {
        url.pathname = '/project-manager';
        return NextResponse.redirect(url);
      }

      if (
        userRole.role.toLowerCase() === 'staff' &&
        adminAccessPath.some((pathname) => path.startsWith(pathname))
      ) {
        url.pathname = '/staff';
        return NextResponse.redirect(url);
      }
      //  else {
      //   return NextResponse.redirect(new URL('/'));
      // }
    }
    return NextResponse.next();
  } catch (error) {
    console.log('error message : ', error);
  }

  console.log('tess');
}

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    '/:path*',
    '/admin/:path*',
    '/project-manager/:path*',
  ],
};
