import type { Metadata } from "next";
import { Geologica } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geologica = Geologica({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-geologica",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geologica.variable} font-geologica antialiased h-screen w-full overflow-hidden`}
        suppressHydrationWarning
      >
        {children}
        
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
    </html>
  );
}
