// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* favicon */}
        <link rel="icon" type="image/svg+xml" href="/dashboard/vite.svg" />
        
        {/* meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard - Dipo</title>

        {/* stylesheet tambahan kalau ada */}
        {/* <link rel="stylesheet" href="/dashboard/assets/index-Cj-1rzdE.css" /> */}
      </Head>
      <body>
        {/* ini sama seperti <div id="root"></div> di React */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
