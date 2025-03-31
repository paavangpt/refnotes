import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="handle-hydration" strategy="afterInteractive">
          {`
          (function() {
            // Remove attributes injected by browser extensions (e.g., Cisco Webex)
            if (typeof window !== 'undefined') {
              setTimeout(() => {
                const attribute = document.body.getAttribute('cz-shortcut-listen');
                if (attribute) {
                  document.body.removeAttribute('cz-shortcut-listen');
                }
              }, 0);
            }
          })();
          `}
        </Script>
      </body>
    </Html>
  );
} 