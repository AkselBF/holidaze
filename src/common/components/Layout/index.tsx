import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className='p-2'>
        <Header />
        <main className="flex-grow m-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;