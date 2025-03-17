import React from 'react'
import ReactDOM from 'react-dom/client'
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/home/page";
import LoginPage from "./app/login/page";
import { SidebarNavigationMenu } from "./app/sidebar/page";
import Sidebar2List from "./components/sidebar2List";
import { Provider } from "react-redux";
import store from "./store/store";
import Installation from "./app/installation/page";
import { AuthLayout } from "./components";
import Dashboard from './app/dashboard/page';
import LinkedIn from './app/linkedin/page';
import Tweets from './app/tweets/page';
import Profile from './app/profile/page';
import Settings from './app/settings/page';
import Draft from './app/draft/page';
import Post from './app/post/page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <LoginPage />
          </AuthLayout>
        ),
      },
      {
        path: "/installation",
        element: (
          <AuthLayout authentication>
            {" "}
            <Installation />
          </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AuthLayout authentication>
            {" "}
            <SidebarNavigationMenu />
          </AuthLayout>
        ),
        children: [
          {
            path: "",
            element: (
              <AuthLayout authentication>
                {" "}
                <Dashboard />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/linkedin-posts",
            element: (
              <AuthLayout authentication>
                {" "}
                <LinkedIn />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/tweets",
            element: (
              <AuthLayout authentication>
                {" "}
                <Tweets />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/drafts",
            element: (
              <AuthLayout authentication>
                {" "}
                <Draft />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/profile",
            element: (
              <AuthLayout authentication>
                {" "}
                <Profile />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/settings",
            element: (
              <AuthLayout authentication>
                {" "}
                <Settings />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/post/:slug",
            element: (
              <AuthLayout authentication>
                {" "}
                <Post />
              </AuthLayout>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);
