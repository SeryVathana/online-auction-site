import Footer from '@/components/Footer';
import Header from '@/components/Header';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <MaxWidthWrapper>
        <main className=' min-h-[80vh]'>
          <Outlet />
        </main>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default MainLayout;
