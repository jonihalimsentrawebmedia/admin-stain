import ModulesView from "@/pages/modules/ModulesView";
import LayoutSetting from "@/pages/modules/settings/components/layout/LayoutSetting";
import MainDataUniversityView from "@/pages/modules/settings/main-data-university/MainDataUniversityView";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "login",
    element: <></>,
  },
  {
    path: "modules",

    children: [
      {
        index: true,
        element: <ModulesView />,
      },
      {
        path: "settings",
        element: <LayoutSetting />,
        children: [
          {
            path: "dashboard",
            element: <></>,
          },
          {
            path: "main-data-university",
            element: <MainDataUniversityView />,
          },
        ],
      },
    ],
  },
]);
