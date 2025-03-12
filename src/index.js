import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import App, { loader as appLoader }  from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Index from "./pages/Index";
import Cabinet, { loader as loaderCabinet } from "./pages/UserPages/CabinetPage/Cabinet";
import Registration, { loader as registrationLoader } from "./pages/RegistrationPage/Registration";
import Preloader from "./pages/components/UI/Preloader/Preloader";
import Login, {loader as loginLoader} from "./pages/LoginPage/Login";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // loader: appLoader,
        errorElement: <ErrorPage />,
        hydrateFallbackElement: <Preloader/>,
        children: [
            {
                index: true,
                element: <Index />,
                errorElement: <ErrorPage />,

            },
            {
                path: "registration",
                element: <Registration />,
                loader: registrationLoader,
                errorElement: <ErrorPage />,

            },
            {
                path: "login",
                element: <Login />,
                loader: loginLoader,
                hydrateFallbackElement: <Preloader/>,
            },
            {
                path: "cabinet",
                children: [
                    {
                        index: true,
                        element: <Cabinet />,
                        loader: loaderCabinet,
                        errorElement: <ErrorPage />,

                    },
                    {
                        path: "edit/:id",
                        element: <main><p>Edit</p></main>,
                        errorElement: <ErrorPage />,

                    },
                    {
                        path: "accesses/:id",
                        element: <main><p>Add Accesses</p></main>,
                        errorElement: <ErrorPage />,

                    }
                ]
            },
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}   future={{
          v7_startTransition: true,
      }}/>
  </React.StrictMode>
);