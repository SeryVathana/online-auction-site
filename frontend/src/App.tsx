import './index.css';
import Homepage from './Pages/Homepage.tsx';
import MainLayout from './layouts/MainLayout.tsx';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import NotFound from './Pages/NotFound.tsx';
import Register from './Pages/Register.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import SignIn from './Pages/SignIn.tsx';
import UnAuthLayout from './layouts/UnAuthLayout.tsx';
import BrowsePage from './Pages/BrowsePage.tsx';
import PostDetailPage from './Pages/PostDetailPage.tsx';
import ProfilePage from './Pages/ProfilePage.tsx';
import CreatePost from './Pages/CreatePost.tsx';
import AuthLayout from './layouts/AuthLayout.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<Homepage />} />
      <Route
        path='profile'
        element={
          <AuthLayout>
            <ProfilePage />
          </AuthLayout>
        }
      />
      <Route
        path='create-post'
        element={
          <AuthLayout>
            <CreatePost />
          </AuthLayout>
        }
      />

      <Route path='browse'>
        <Route index element={<BrowsePage />} />
        <Route path=':itemId' element={<PostDetailPage />} />
      </Route>

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

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
