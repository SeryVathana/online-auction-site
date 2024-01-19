import { Button } from '@/components/ui/button';
import { MoveLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-[80vh] space-y-5'>
      <h1 className='text-8xl tracking-wider text-red-500'>404</h1>
      <h6 className='text-3xl uppercase'>Page Not Found</h6>
      <Button asChild variant={'secondary'}>
        <Link to='/' className=''>
          <MoveLeft className='mr-2' />
          <span>Return Home</span>
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
