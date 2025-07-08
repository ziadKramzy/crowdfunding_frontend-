import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { Home } from "../pages/Home";
import { CampaignDetails } from "../pages/CampaignDetails";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import NotFoundPage from "../pages/NotFoundPage";
import { CampaignForm } from "../pages/CreateCampaign/CampaignForm";
import { CampaignEdit } from "../pages/EditCampaign/CampaignEdit";
import MyCampaign from "../pages/MyCampaign";
import { ProtectedRoute } from "./ProtectedRoute";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>},
      { path: "campaigns", element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "campaign-details/:id", element:<ProtectedRoute><CampaignDetails /></ProtectedRoute>  },
      { path: "create-campaign", element: <ProtectedRoute><CampaignForm /></ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "campaign/edit/:id", element:<ProtectedRoute><CampaignEdit /></ProtectedRoute>  },
      {path: "mycampaigns/", element: <ProtectedRoute><MyCampaign /></ProtectedRoute>},
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
export default route;
