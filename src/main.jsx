import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import Login from "./components/Login/Login.jsx";
import DashboardContent from "./components/DashboardContent/DashboardContent.jsx";
import Users from "./components/Users/Users.jsx";
import UserDetails from "./components/UserDetails/UserDetails.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { UsersProvider } from "./context/usersContext.jsx";
import Airports from "./components/Airports/Airports.jsx";
import AirportDetails from "./components/AirportDetails/AirportDetails.jsx";

const RedirectToDashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToDashboard />,
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "",
        element: <DashboardContent />,
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "userDetails/:userName",
            element: <UserDetails />,
          },
        ],
      },
		{
        path: "airports",
        element: <Airports />,
      },
		{
			path: "airport/:id",
			element: <AirportDetails />,
		 },
      // ...
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
