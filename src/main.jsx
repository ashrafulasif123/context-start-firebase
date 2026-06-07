import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import AuthProvider from "./contexts/AuthContext/AuthProvider";
import Orders from "./components/Orders/Orders";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./Routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "orders",
        element: <PrivateRoute>
          <Orders></Orders>
        </PrivateRoute>
      },
      {
        path: "profile",
        element: <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>
);
