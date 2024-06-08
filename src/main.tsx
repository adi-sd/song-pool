import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";

import PoolServer from "./pages/pool-server/pool-server";
import PoolClient from "./pages/pool-client/pool-client";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PoolServer></PoolServer>,
    },
    {
        path: "/client",
        element: <PoolClient></PoolClient>,
    },
    {
        path: "/*",
        element: <p>404 Not Found!</p>,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
