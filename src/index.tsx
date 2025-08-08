import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Dashboard } from './pages/Dashboard';
import { loader as ordersLoader } from './pages/Orders';
import Orders from './pages/Orders';
import { loader as customersLoader } from './pages/Customers';
import Customers from './pages/Customers';
import { loader as packagesLoader } from './pages/Packages';
import Packages from './pages/Packages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/orders',
        element: <Orders />,
        loader: ordersLoader,
      },
      {
        path: '/customers',
        element: <Customers />,
        loader: customersLoader,
      },
      {
        path: '/packages',
        element: <Packages />,
        loader: packagesLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
