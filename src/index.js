import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Root from './Root';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Index from "./components/Index";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage";
import Registration from "./components/Registration";
import Login from "./components/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "/home",
                element: <Home />,
            },
            {
                path: "/registration",
                element: <Registration />,
            },
            {
                path: "/login",
                element: <Login />,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);