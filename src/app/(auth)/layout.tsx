import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'auth',
  description: 'auth page',
};

export default function AuthLayout({children}: {children: React.ReactNode}) {
  return <div className="max-w-screen-2xl mt-[10%]">{children}</div>;
}
