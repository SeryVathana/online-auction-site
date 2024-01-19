import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PostType } from './lib/types';
import { useEffect, useState } from 'react';
import PostCard from './components/PostCard';

const Homepage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch('http://localhost:3000/post');
      console.log('h');

      const data = await res.json();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <>
      <section className='flex flex-col justify-center items-center pt-32 pb-16'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-semibold max-w-xl text-center lg:leading-tight'>
          Unleash the Thrill of the Hunt: <span className='text-blue-500'>Bid Now on Rare Treasures!</span>
        </h1>
        <p className='text-sm sm:text-xl text-center max-w-2xl mt-6'>
          Welcome to a realm where the past whispers secrets and the future beckons with untold possibilities. This is the domain
          of the auction, where dreams take flight and fortunes are made. Dive into a curated selection of unique and exquisite
          items, each with a story waiting to be unearthed.
        </p>

        <div className='flex flex-col sm:flex-row gap-10 mt-10'>
          <Button asChild variant='default' size={'lg'}>
            <Link to='/browse'>Browse more &rarr;</Link>
          </Button>
        </div>
      </section>

      <section className='my-20'>
        <div className='flex items-center justify-between'>
          <h1 className=' text-2xl font-semibold'>We got for you</h1>

          <Button asChild variant={'ghost'}>
            <Link to={'/browse'}>See more &rarr;</Link>
          </Button>
        </div>
        <div>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        {/* <CardsContainer inputData={data} itemNumber={4} className='mt-5' /> */}
      </section>
    </>
  );
};

export default Homepage;
