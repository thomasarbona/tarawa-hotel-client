import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.cdnfonts.com/css/samsungone"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/samsung-sharp-sans"
          rel="stylesheet"
        />
        <link
          href="https://fonts.cdnfonts.com/css/tiger-walk"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
