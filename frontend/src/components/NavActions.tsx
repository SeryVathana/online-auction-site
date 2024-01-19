// 'use client';

// import React, { useEffect } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import { AlignJustify } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button, buttonVariants } from './ui/button';
import { Separator } from './ui/separator';

import { useAuth } from '@/contexts/AuthContext';
import { AuthContextType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Link, Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '@/configs/firebaseConfig';

// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import Link from 'next/link';
// import { redirect, useRouter } from 'next/navigation';
// import { logIn, logOut } from '@/redux/features/auth-slice';
// import { signOut } from 'firebase/auth';
// import { auth } from '@/configs/firebase-config';
// import { useAuth } from '@/customHooks/useAuth';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

const NAVLINK = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Browse',
    to: '/browse',
  },
  {
    label: 'About',
    to: '/about',
  },
  {
    label: 'Contact',
    to: '/contact',
  },
];

const NavActions = () => {
  const { user } = useAuth() as AuthContextType;

  const handleLogout = async () => {
    await signOut(auth);
    return <Navigate to={'/sign-in'} replace={true} />;
  };

  return (
    <>
      <div className='hidden lg:flex lg:items-center lg:ml-auto'>
        {user ? null : (
          <>
            <Link to={'/register'} className={buttonVariants({ variant: 'ghost' })}>
              Create an account
            </Link>
            <div className='h-10 w-px bg-gray-200 mx-3' />
          </>
        )}
        {user ? null : (
          <>
            <Link to={'/sign-in'} className={buttonVariants({ variant: 'ghost' })}>
              Sign In
            </Link>
          </>
        )}

        {!user ? null : (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className={cn('flex items-center gap-2', buttonVariants({ variant: 'ghost' }))}>
                <Avatar className='w-8 h-8 border'>
                  <AvatarImage src={user.pfImgURL} className=' object-cover' sizes='100px' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {user.firstName}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={'/profile'}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={'/create-post'}>Create Post</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleLogout()}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>

      <Sheet>
        <SheetTrigger className='block lg:hidden ml-auto'>
          <AlignJustify />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader></SheetHeader>
          <div className='flex flex-col text-center mt-5'>
            {NAVLINK.map((link) => {
              return (
                <Link key={link.label} to={link.to} className='transition-all hover:opacity-50 text-lg py-5'>
                  <SheetTrigger>{link.label}</SheetTrigger>
                </Link>
              );
            })}
            <Separator />
            {user ? null : (
              <SheetTrigger className='transition-all hover:opacity-50 text-lg py-5'>
                <Link to={'/sign-in'}>Sign In</Link>
              </SheetTrigger>
            )}
            {user ? null : (
              <SheetTrigger className='transition-all hover:opacity-50 text-lg py-5'>
                <Link to={'/sign-up'}>Create an account</Link>
              </SheetTrigger>
            )}

            {!user ? null : (
              <>
                <SheetTrigger className='transition-all hover:opacity-50 text-lg py-5'>
                  <Link to={'/profile'}>Profile</Link>
                </SheetTrigger>

                <SheetTrigger className='transition-all hover:opacity-50 text-lg py-5'>
                  <Link to={'/create-post'}>Create Post</Link>
                </SheetTrigger>

                <SheetTrigger
                  onClick={() => handleLogout()}
                  className='transition-all hover:opacity-50 text-lg py-5 cursor-pointer'
                >
                  Log out
                </SheetTrigger>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default NavActions;
