import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Volunteens — Start your global path",
    template: "%s · Volunteens",
  },
  description: "Curated fully-funded scholarships, programs, and opportunities for ambitious students worldwide. Especially Central Asia.",
  keywords: ["scholarships", "summer programs", "competitions", "students", "fully funded", "Central Asia"],
  openGraph: {
    title: "Volunteens — Start your global path",
    description: "Curated fully-funded scholarships, programs, and opportunities for ambitious students worldwide.",
    url: siteUrl,
    siteName: "Volunteens",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Volunteens — Start your global path",
    description: "Curated fully-funded scholarships, programs, and opportunities for ambitious students worldwide.",
  },
};

// Runs before first paint to prevent a flash of the wrong theme (FOUC)
// and to set the <html lang> attribute from the saved language preference.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');var l=localStorage.getItem('lang');if(l)document.documentElement.lang=l;}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}