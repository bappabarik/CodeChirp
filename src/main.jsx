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
                <Installation />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/linkedin-posts",
            element: (
              <AuthLayout authentication>
                {" "}
                <Sidebar2List />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/tweets",
            element: (
              <AuthLayout authentication>
                {" "}
                <Sidebar2List />
              </AuthLayout>
            ),
          },
          {
            path: "/dashboard/profile",
            element: (
              <AuthLayout authentication>
                {" "}
                <Sidebar2List />
              </AuthLayout>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
