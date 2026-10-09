import { createBrowserRouter } from "react-router";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
    {
        path:"/",
        element: <Layout/>,
        children: [
            {index: true, element: <Home/>},
            {path:"country/:name", element: <CountryPage/>},
            {path:"*", element: <NotFound/>},
        ]
    }
])