import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {Toaster} from 'sonner';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'home',
  description: 'home page for todos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <main className="max-w-screen-2xl mx-auto">
          <Toaster richColors position="top-right" />
          {children}
        </main>
      </body>
    </html>
  );
}
