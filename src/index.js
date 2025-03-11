import React, {useContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthProvider, {Auth} from "./context/Auth";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Index from "./pages/Index";
import Cabinet from "./pages/UserPages/CabinetPage/Cabinet";
import Registration from "./pages/RegistrationPage/Registration";
import Login from "./pages/LoginPage/Login";
import PreLoader from "./pages/components/UI/PreLoader/PreLoader";
import Protect from "./Protect";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: null,
        action: null,
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
                element: <Protect />,
                children: [
                    {
                        index: true,
                        element: <Cabinet />,
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
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);