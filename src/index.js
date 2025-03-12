import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Index from "./pages/Index";
import Cabinet, { loader as loaderCabinet } from "./pages/UserPages/CabinetPage/Cabinet";
import Registration from "./pages/RegistrationPage/Registration";
import Login from "./pages/LoginPage/Login";
import PreLoader from "./pages/components/UI/PreLoader/PreLoader";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: "registration",
                element: <Registration />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "loader",
                element: <PreLoader />,
            },
            {
                path: "cabinet",
                children: [
                    {
                        index: true,
                        element: <Cabinet />,
                        loader: loaderCabinet,
                    },
                    {
                        path: "edit/:id",
                        element: <main><p>Edit</p></main>,
                    },
                    {
                        path: "accesses/:id",
                        element: <main><p>Add Accesses</p></main>,
                    }
                ]
            },
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);