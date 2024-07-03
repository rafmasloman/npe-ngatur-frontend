import '@mantine/core/styles.css';
import './globals.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../../theme';
import ReactQueryProvider from '../libs/providers/react-query-provider';

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
      <body>
        <ReactQueryProvider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
