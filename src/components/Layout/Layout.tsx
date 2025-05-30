import { ReactNode } from 'react';
import Header from '../Header';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>{children}</main>
    </div>
  );
}
