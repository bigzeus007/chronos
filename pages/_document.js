// pages/_document.js (optionnel mais correct pour Next.js 14+ et NextUI v2)
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <html lang="fr">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </html>
  );
}
