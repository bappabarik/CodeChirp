import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './app/home/page'
import LoginPage from './app/login/page'
import { Dashboard, SidebarNavigationMenu } from './app/sidebar/page'
import Sidebar2List from './components/sidebar2List'


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
        element: <LoginPage />,
      },
      {
        path: "/dashboard",
        element: <SidebarNavigationMenu />,
        children : [
          {
            path: "/dashboard",
            element: <Dashboard />
          },
          {
            path: "/dashboard/profile",
            element: <Sidebar2List />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
