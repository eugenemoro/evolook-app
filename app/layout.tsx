import '@/styles/globals.css';

export const metadata = {
  title: 'Fashion AI',
  description: 'AI-powered fashion stylist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
