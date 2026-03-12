import { Syne, Inter } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata = {
  title: 'Ethan Bwibo | Software Developer & Data Analyst',
  description:
    'Personal portfolio of Ethan Bwibo — Software Developer, Data Analyst, and Strathmore Tennis Captain. 3rd-year ICS student at Strathmore University, Nairobi.',
  keywords: ['Software Developer', 'Data Analyst', 'Nairobi', 'Strathmore University'],
  images: ['frontend/public/media/favicon.ico'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-background text-white font-inter antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
