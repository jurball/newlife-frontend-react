import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { loader as appLoader }  from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import AuthProvider from "./context/Auth";
import Preloader from "./components/UI/Preloader/Preloader";

import NotFound from "./pages/NotFound/NotFound";
import ErrorBoundary from "./pages/ErrorBoundary/ErrorBoundary";
import Index from "./pages/Index/Index";
import Registration, { loader as registrationLoader } from "./pages/Registration/Registration";
import Login, {loader as loginLoader} from "./pages/Login/Login";
import Cabinet, { loader as loaderCabinet } from "./pages/Cabinet/Cabinet";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: appLoader,
        errorElement: <ErrorBoundary />,
        hydrateFallbackElement: <Preloader/>,
        children: [
            {
                // hydrateFallbackElement: <Preloader/>,
                errorElement: <ErrorBoundary />,
                children: [
                    {
                        index: true,
                        element: <Index />,
                    },
                    {
                        path: "registration",
                        element: <Registration />,
                        loader: registrationLoader,
                    },
                    {
                        path: "login",
                        element: <Login />,
                        loader: loginLoader,
                        // hydrateFallbackElement: <Preloader/>,
                    },
                    {
                        path: "cabinet",
                        element: <Cabinet/>,
                        loader: loaderCabinet,
                    },
                    {
                        path: "cabinet/:fileId/edit",
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
            }
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
      <AuthProvider>
          <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </AuthProvider>
  </React.StrictMode>
);