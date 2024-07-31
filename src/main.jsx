import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import { useEffect } from "react";
import Login from "./components/Login/Login.jsx";
import DashboardContent from "./components/DashboardContent/DashboardContent.jsx";
import { ShoppingListProvider } from "./context/shoppingListContext.jsx";
import { ProductsProvider } from "./context/productsContext.jsx";

const RedirectToSignIn = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/signIn");
  }, [navigate]);

  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RedirectToSignIn />,
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "",
        element: <DashboardContent />,
      },
		],
		},
	{
	path: "/signIn",
	element: <Login />,
	},
	{
	path: "/signOut",
	element: <Login />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <ShoppingListProvider>
	<ProductsProvider>
			<RouterProvider router={router} />
	</ProductsProvider>
  </ShoppingListProvider>
  
  </>
);