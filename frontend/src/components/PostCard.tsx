import { PostType } from '@/lib/types';

import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from 'react-router-dom';

const PostCard = ({ post }: { post: PostType }) => {
  return (
    <Card className='shadow-none p-0 overflow-hidden flex min-h-[180px] sm:block sm:h-auto'>
      <CardHeader className='p-0 overflow-hidden border-r sm:border-r-0 border-b-0 sm:border-b min-w-[120px]'>
        <AspectRatio ratio={16 / 9} className='bg-gray-50 overflow-hidden min-h-[180px] sm:min-h-[120px] h-full'>
          <img src={post.displayImgURL} alt='Image' className='rounded-md w-full h-full object-contain object-center' />
        </AspectRatio>
      </CardHeader>

      <div className='flex-grow'>
        <CardContent className='p-2 space-y-1'>
          <Link to={`/browse/${post._id}`}>
            <CardTitle className='text-xl line-clamp-1'>{post.title}</CardTitle>
          </Link>
          <p className='mt-2 text-sm line-clamp-1'>Bid Increment: ${post.bidIncrement.toLocaleString()}</p>
          <p className='text-sm line-clamp-1'>
            Price: <span className='text-lg font-semibold text-blue-500 line'>${post.curPrice.toLocaleString()}</span>
          </p>
          <p className='text-sm block sm:hidden line-clamp-1'>
            <span>Time: </span>3d : 2h : 1mn
          </p>
        </CardContent>
        {/* <Separator className='my-1' /> */}
        <CardFooter className='p-2 flex justify-between sm:border-t flex-wrap gap-2'>
          <p className='text-sm hidden sm:block'>3d : 2h : 1mn</p>

          <Button asChild variant={'outline'} size={'sm'} className='text-sm self-end w-full sm:w-auto'>
            <Link to={`/browse/${post._id}`}>Place Bid</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
