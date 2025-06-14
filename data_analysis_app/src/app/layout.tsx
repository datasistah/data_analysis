import '../styles/globals.css';
import type { Metadata } from 'next';
import Navbar from '../components/navigation/Navbar';
import { AuthProvider } from '@/lib/auth-context';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Data Analysis Learning Platform',
  description: 'Interactive data analysis sessions to build your portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      {/* Suppress attribute warnings: data-new-gr-c-s-check-loaded, data-gr-ext-installed */}
      <body suppressHydrationWarning className="bg-gradient-to-br from-gray-950 to-gray-900 text-gray-100 antialiased font-inter min-h-screen">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <footer className="py-6 px-4 border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <div className="container mx-auto text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Data Analysis Learning Platform. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
