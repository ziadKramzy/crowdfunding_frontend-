import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { CampaignDetails } from "../pages/CampaignDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import NotFoundPage from "../pages/NotFoundPage";
import { CampaignForm } from "../pages/CampaignForm";
import { CampaignEdit } from "../pages/CampaignEdit";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "campaigns", element: <Home /> },
      { path: "campaign-details/:id", element: <CampaignDetails /> },
      { path: "create-campaign", element: <CampaignForm /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "campaign/edit/:id", element: <CampaignEdit /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
export default route;
