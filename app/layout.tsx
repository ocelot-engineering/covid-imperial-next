import type { Metadata } from 'next';
import { inter } from '@/app/ui/fonts';
import '@/app/ui/globals.css';
import HeaderNav from '@/app/ui/dashboard/headernav';

export const metadata: Metadata = {
  title: 'UK COVID-19 Dashboard',
  description: 'Information regarding COVID-19 cases by UK region.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} antialiased`}>{children}</body> */}
      <body className={`${inter.className} antialiased`}>
        <div className="flex h-screen flex-col md:overflow-hidden">
          <HeaderNav />
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
