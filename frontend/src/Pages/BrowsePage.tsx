import { ChangeEvent, useEffect, useState } from 'react';

import { PRODUCT_CATEGORIES } from '@/data/category';
import { Input } from '@/components/ui/input';
import PostCard from '@/components/PostCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PostType } from '@/lib/types';

import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const BrowsePage = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('');

  const [posts, setPosts] = useState<PostType[]>([]);
  const [defaultPosts, setDefaultPosts] = useState<PostType[]>([]);

  const [searchParams, setSearchParams] = useSearchParams({ q: '' });
  const q = searchParams.get('q');

  // const category = searchParams.get('category');
  // const sorted = searchParams.get('sorted');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setSearchParams((prev) => {
      prev.set('q', e.target.value);
      return prev;
    });
    // setFilter({ searchTerm: e.target.value, selectedCategory });
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);

    // setFilter({ searchTerm, selectedCategory: val });
  };

  const handleSortChange = (val: string) => {
    setSelectedSort(val);
  };

  useEffect(() => {
    setPosts(defaultPosts.filter((post) => post.title.includes(q!)));
  }, [searchParams]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch('http://localhost:3000/post');
      const data = await res.json();
      setPosts(data);
      setDefaultPosts(data);
    };

    getPosts();
  }, []);

  return (
    <div className='my-10 gap-5 min-h-[70vh]'>
      <div className=' xl:col-span-10 md:ml-1'>
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between'>
          <h1 className=' text-2xl font-semibold'>All Items</h1>
          <div className='grid flex-grow grid-cols-12 items-end gap-2 mt-5 sm:mt-0  sm:ml-5 max-w-[800px]'>
            <div className='relative col-span-12 sm:col-span-6 flex items-center h-fit'>
              <Input
                className='flex-grow full w-full pr-10'
                placeholder='Search item by name'
                value={searchTerm}
                onChange={(e) => handleSearchChange(e)}
              />
              <Search className='absolute right-3 -translate-y-1/2 top-1/2 w-5 text-muted-foreground' />
            </div>

            <div className=' col-span-6 sm:col-span-3'>
              <p className='mb-2'>Categories:</p>
              <Select defaultValue='all' onValueChange={(e) => handleCategoryChange(e)}>
                <SelectTrigger className=''>
                  <SelectValue placeholder='Sort By' />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className=' col-span-6 sm:col-span-3'>
              <p className='mb-2'>Sort By:</p>
              <Select defaultValue='default' onValueChange={(e) => handleSortChange(e)}>
                <SelectTrigger className=''>
                  <SelectValue placeholder='Sort By' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='default'>Default</SelectItem>
                  <SelectItem value='name'>Name</SelectItem>
                  <SelectItem value='newest'>Newest</SelectItem>
                  <SelectItem value='oldest'>Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 my-5'>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;
