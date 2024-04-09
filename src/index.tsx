import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

const rootNode = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
