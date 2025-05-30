import { Html, Head, Main, NextScript } from 'next/document';

import DefaultHead from '@/components/Head';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <DefaultHead title="Job search" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
