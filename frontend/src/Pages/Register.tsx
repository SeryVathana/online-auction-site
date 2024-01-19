'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AlertCircle, Upload } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, storage } from '@/configs/firebaseConfig';
import { v4 } from 'uuid';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const formSchema = z.object({
  firstname: z.string().min(2).max(30),
  lastname: z.string().min(2).max(10),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be 6 or more characters.'),
});

const Register = () => {
  const [profileImgURL, setProfileImgURL] = useState<string>('');
  const [profileImgFile, setProfileImgFile] = useState<File>();
  const [birthDate, setBirthDate] = useState<string>('');
  const [errorBirthDate, setErrorBirthDate] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (new Date(Date.now()).getFullYear() - new Date(birthDate).getFullYear() < 18) {
      setErrorBirthDate(true);
      return;
    } else {
      setErrorBirthDate(false);
      setLoading(true);
    }

    console.log(values);

    const imgFileName = `auction-users-pfp/${v4()}`;
    const storageRef = ref(storage, imgFileName);

    console.log(imgFileName);

    try {
      const uploadedFile = await uploadBytes(storageRef, profileImgFile!);
      const downloadURL = await getDownloadURL(uploadedFile.ref);

      const newUserFirebase = await createUserWithEmailAndPassword(auth, values.email, values.password);

      const newUserData = {
        id: newUserFirebase.user.uid,
        firstName: values.firstname,
        lastName: values.lastname,
        email: values.email,
        pfImgURL: downloadURL,
        birthDate,
      };

      console.log(newUserData);

      const newUser = await axios.post(`http://localhost:3000/user`, newUserData).catch((err) => {
        console.log(err);
        setLoading(false);
      });

      console.log(newUser);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
    setLoading(false);
  };

  const handleUploadImg = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const url = URL.createObjectURL(e.target.files![0]);

    console.log(await e.target.files![0].arrayBuffer());

    setProfileImgURL(url);
    setProfileImgFile(e.target.files![0]);
  };

  return (
    <MaxWidthWrapper className='flex items-center justify-center min-h-[80vh] my-10'>
      <div className='w-[90%] md:w-[500px] xl:w-[500px]'>
        <h1 className='text-center text-3xl font-semibold'>Create an account</h1>
        <div className='flex flex-col items-center my-10 overflow-hidden'>
          <label
            htmlFor='dropzone-file'
            className=' overflow-hidden flex flex-col items-center justify-center w-32 h-32 border-2 mx-auto border-gray-300  rounded-full cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
          >
            {profileImgURL ? (
              <img src={profileImgURL} alt='s' width={100} height={100} className='w-full h-full object-cover' />
            ) : (
              <Upload className=' text-muted-foreground' />
            )}
            <input id='dropzone-file' type='file' className='hidden' onChange={(e) => handleUploadImg(e)} />
          </label>
          <p className='text-lg font-semibold mt-5'>Profile Picture</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 '>
            <div className='flex gap-5'>
              <FormField
                control={form.control}
                name='firstname'
                render={({ field }) => (
                  <div className='flex-grow'>
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl className='flex-1 flex-grow'>
                        <Input placeholder='Uzumaki' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name='lastname'
                render={({ field }) => (
                  <div className='flex-grow'>
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl className=''>
                        <Input placeholder='Naruto' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl className=''>
                      <Input placeholder='Email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className=''>
                      <Input placeholder='Password' type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />

            <div className='space-y-2'>
              <Label className={errorBirthDate ? 'text-destructive' : ''}>Birth Date</Label>
              <Input
                placeholder='End Date'
                type='date'
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
                className='col-span-3'
              />

              {errorBirthDate && (
                <p className='text-sm font-medium text-destructive'>User must be 18 or above to join bidding.</p>
              )}
            </div>

            <div className='items-top flex space-x-2'>
              <Checkbox id='terms1' />
              <div className='grid gap-1.5 leading-none'>
                <label
                  htmlFor='terms1'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Accept terms and conditions
                </label>
              </div>
            </div>
            {emailError && <AlertDestructive />}
            <div className=' w-full flex justify-center py-5'>
              <Button type='submit' disabled={loading}>
                {!loading ? 'Sign Up' : 'Loading'}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </MaxWidthWrapper>
  );
};

export default Register;

function AlertDestructive() {
  return (
    <Alert variant='destructive'>
      <AlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Email is already in use.</AlertDescription>
    </Alert>
  );
}
