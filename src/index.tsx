import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignIn from "./page/SignIn";
import Terms from "./page/Terms";
import { Layout } from "./style/styledComponents";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";
import Policy from "./page/Policy";

const router = createBrowserRouter([
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "terms",
    element: <Terms />,
  },
  {
    path: "policy",
    element: <Policy />,
  },
]);
const rootNode = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </ThemeProvider>
  </React.StrictMode>
);
