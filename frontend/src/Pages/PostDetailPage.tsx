import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Separator } from '@/components/ui/separator';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const PostDetailPage = () => {
  const params = useParams();

  const itemId = params.itemId;

  const [data, setData] = useState<PostType | null>();
  const [seller, setSeller] = useState<UserDBType | null>();
  const [imgSlides, setImageSlides] = useState<string[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch(`http://localhost:3000/post/${itemId}`);
      const resData = await res.json();
      setData(resData);
      setImageSlides([]);
      setImageSlides((prev) => [...prev, resData.displayImgURL]);
      setImageSlides((prev) => [...prev, ...resData.othersImgURL]);
      console.log(resData);
    };

    getPosts();
  }, [itemId]);

  useEffect(() => {
    if (data) {
      axios.get(`http://localhost:3000/user/${data.sellerId}`).then((res) => {
        setSeller(res.data);
      });
    }
  }, [data]);

  if (!seller || !data) {
    return <h1>Loading</h1>;
  }

  return (
    <div className='my-10 grid grid-cols-2 gap-2 md:gap-5 xl:gap-10'>
      <ImageSlider slides={imgSlides!} />
      <div className='col-span-2 md:col-span-1 row-span-3 mt-5 md:mt-0'>
        <div className='flex items-center gap-3 mb-5'>
          <Avatar>
            <AvatarImage src={seller.pfImgURL} className=' object-cover' />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>

          <div>
            <h3 className='text-lg font-semibold'>{seller.firstName + ' ' + seller?.lastName}</h3>
            <h6 className='text-sm'>Seller</h6>
          </div>
        </div>
        <Separator />

        <div>
          <h1 className='mt-5 mb-2 text-2xl font-semibold'>{data.title}</h1>
          <p className=' text-muted-foreground'>{data.description}</p>

          <Table className='mt-5'>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[30%] text-lg'>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className='font-medium'>Category</TableCell>
                <TableCell>--------</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Post Date: </TableCell>
                <TableCell>{new Date(data.createdAt ?? '').toLocaleString('default', { hour12: true })}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>End Date</TableCell>
                <TableCell>{new Date(data.endDate ?? '').toLocaleString('default', { hour12: true })}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Remaining Days</TableCell>
                <TableCell>12d : 12h : 12mn</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Start Price</TableCell>
                <TableCell>$ {data.initialPrice.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Bid Increment</TableCell>
                <TableCell>$ {data.bidIncrement.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className='font-medium'>Current Price</TableCell>
                <TableCell>$ {data.curPrice.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <div className=' col-span-2 md:col-span-1'>
        <BidTable list={data.biddingHistory} />
        {/* <BiddingAction data={data!} /> */}
      </div>
    </div>
  );
};

export default PostDetailPage;

const BidTable = ({ list }: { list: BiddingHistoryType[] }) => {
  return (
    <>
      <h1 className='text-xl font-semibold mt-5 '>Bidding History</h1>

      <div className='max-h-[300px] overflow-y-auto border my-5 rounded-sm'>
        {list?.length <= 0 && <h1 className='my-5 ml-5'>No bidder right now.</h1>}
        <Table className=''>
          <TableBody>
            {list?.map((item: BiddingHistoryType, index) => {
              return (
                <TableRow key={index}>
                  <BidRow item={item} index={index} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

const BidRow = ({ item, index }: { item: BiddingHistoryType; index: number }) => {
  const [bidder, setBidder] = useState<UserDBType | null>();
  useEffect(() => {
    if (item) {
      axios.get(`http://localhost:3000/user/${item.userId}`).then((res) => {
        setBidder(res.data);
      });
    }
  }, [item]);

  if (!bidder) {
    return;
  }
  return (
    <>
      <TableCell className='font-medium'>{index + 1}</TableCell>
      <TableCell className='font-medium'>{bidder.firstName}</TableCell>
      <TableCell>$ {item.bidAmount.toLocaleString()}</TableCell>
      <TableCell>{new Date(item.bidDate).toLocaleString('default', { hour12: true })}</TableCell>
    </>
  );
};

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AspectRatio } from '@/components/ui/aspect-ratio';

import { Badge } from '@/components/ui/badge';
import { BiddingHistoryType, PostType, UserDBType } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ImageSlider = ({ slides }: { slides: string[] }) => {
  return (
    <Carousel className='relative col-span-2 md:col-span-1 bg-gray-50 rounded-lg' opts={{ loop: true }}>
      <CarouselContent>
        {slides?.map((slide, index: number) => {
          return (
            <CarouselItem key={index}>
              <Badge variant='secondary' className='absolute z-10 w-auto whitespace-nowrap mt-5 ml-5'>
                {index + 1} / {slides?.length}
              </Badge>
              <AspectRatio ratio={16 / 9}>
                <img src={slide} alt='image slider' className='rounded-sm w-full h-full object-contain' />
              </AspectRatio>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className='absolute top-1/2 left-7 -translate-x-1/2' />
      <CarouselNext className='absolute top-1/2 right-0 -translate-x-1/2' />
    </Carousel>
  );
};
