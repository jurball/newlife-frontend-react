import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { loader as appLoader }  from './App';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from "react-router-dom";

import Preloader from "./components/UI/Preloader/Preloader";

import NotFound from "./pages/NotFound/NotFound";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary";
import Index from "./pages/Index/Index";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Cabinet, {loader as cabinetLoader } from "./pages/Cabinet/Cabinet";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: appLoader,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <Preloader/>,
        children: [
            {
                hydrateFallbackElement: <Preloader/>,
                errorElement: <ErrorBoundary />,
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
                        path: "cabinet",
                        element: <Cabinet/>,
                    },
                    {
                        path: ":fileId/edit",
                        element: <main><p>Edit</p></main>,
                    },
                    {
                        path: "cabinet/:fileId/accesses",
                        element: <main><p>Add Accesses</p></main>,
                    },
                    {
                        path: "*",
                        element: <NotFound />,
                    }
                ]
            },
            {
                element: <NotFound />,
                children: [
                    {
                        path: "cabinet/disk",
                        loader: cabinetLoader,
                    }
                ]
            },
        ]
    },
], {
    future: {
        v7_partialHydration: true,
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
  </React.StrictMode>
);