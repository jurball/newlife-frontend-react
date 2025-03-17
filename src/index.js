import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { loader as appLoader }  from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Preloader from "./components/Preloader/Preloader";

import NotFound from "./pages/NotFound/NotFound";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary";
import Index from "./pages/Index/Index";
import Registration from "./pages/Registration/Registration";
import Login from "./pages/Login/Login";
import Cabinet from "./pages/Cabinet/Cabinet";
import Shared from "./pages/Shared/Shared";
import Edit from "./pages/Edit/Edit";
import Accesses from "./pages/Accesses/Accesses";
import AccessesDelete from "./pages/Accesses/AccessesDelete";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: appLoader,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <Preloader hydrate/>,
        children: [
            {
                hydrateFallbackElement: <Preloader hydrate/>,
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
                        path: "cabinet/:fileId/edit",
                        element: <Edit/>
                    },
                    {
                        path: "cabinet/:fileId/accesses",
                        element: <Accesses />,
                    },
                    {
                        path: "cabinet/:fileId/accesses/delete",
                        element: <AccessesDelete/>,
                    },
                    {
                        path: "shared",
                        element: <Shared/>,
                    },

                    {
                        path: "*",
                        element: <NotFound />,
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