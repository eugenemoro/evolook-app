import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';

export const metadata = {
  title: 'Evolook',
  description: 'AI-powered fashion stylist',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Navbar session={session} />
        {children}
      </body>
    </html>
  );
}
