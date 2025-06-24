// app/generate/page.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/authOptions';
import { redirect } from 'next/navigation';
import GenerateForm from '@/components/GenerateForm';

export default async function GeneratePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect('/signin');
  }

  return <GenerateForm />;
}
