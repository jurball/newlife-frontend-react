import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App, {loader as rootLoader} from './App';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Index from "./components/Index";
import Home from "./components/Home";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Registration from "./components/Registration";
import Login from "./components/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        // loader: rootLoader,
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