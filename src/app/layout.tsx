import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';

import './globals.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../../theme';
import ReactQueryProvider from '../libs/providers/react-query-provider';
import { Notifications } from '@mantine/notifications';
import ReactDNDProvider from '../libs/providers/react-dnd-provider';
import AuthProviders from '../libs/providers/auth-provider';

// export const metadata = {
//   title: 'Mantine Next.js template',
//   description: 'I am using Mantine with Next.js!',
// };

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/npe_logo.svg" />
      </head>
      <body className="">
        <ReactDNDProvider>
          <MantineProvider theme={theme}>
            <ReactQueryProvider>
              <AuthProviders>
                <Notifications />
                {children}
              </AuthProviders>
            </ReactQueryProvider>
          </MantineProvider>
        </ReactDNDProvider>
      </body>
    </html>
  );
}
