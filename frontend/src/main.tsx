import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Homepage from './App.tsx';
import MainLayout from './layouts/MainLayout.tsx';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NotFound from './Pages/NotFound.tsx';
import Register from './Pages/Register.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import SignIn from './Pages/SignIn.tsx';
import UnAuthLayout from './layouts/UnAuthLayout.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Homepage />} />

      <Route
        path='register'
        element={
          <UnAuthLayout>
            <Register />
          </UnAuthLayout>
        }
      />
      <Route
        path='sign-in'
        element={
          <UnAuthLayout>
            <SignIn />
          </UnAuthLayout>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
