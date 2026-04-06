import { Public_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

const neuropolitical = localFont({
  src: [
    {
      path: "../../public/fonts/Neuropolitical Rg.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-neuropolitical",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <body
        className={`${publicSans.variable} ${neuropolitical.variable} antialiased bg-black overflow-x-hidden`}
        style={{ fontFamily: "var(--font-public-sans), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}