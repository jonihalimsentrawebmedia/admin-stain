import LoginView from "@/pages/login/LoginView";
import ModulesView from "@/pages/modules/ModulesView";
import LayoutSetting from "@/pages/modules/settings/components/layout/LayoutSetting";
import DashboardView from "@/pages/modules/settings/dashboard/DashboardView";
import DomainView from "@/pages/modules/settings/domain/DomainView";
import FacultyCreateView from "@/pages/modules/settings/faculty/create/FacultyCreateView";
import FacultyDetailView from "@/pages/modules/settings/faculty/detail/FacultyDetailView";
import FacultyEditView from "@/pages/modules/settings/faculty/edit/FacultyEditView";
import FacultyView from "@/pages/modules/settings/faculty/FacultyView";
import InstitutionCreateView from "@/pages/modules/settings/institution/create/InstitutionCreateView";
import InstitutionDetailView from "@/pages/modules/settings/institution/detail/InstitutionDetailView";
import InstitutionEditView from "@/pages/modules/settings/institution/edit/InstitutionEditView";
import InstitutionView from "@/pages/modules/settings/institution/InstitutionView";
import MainDataUniversityView from "@/pages/modules/settings/main-data-university/MainDataUniversityView";
import HistoryLoginDetailView from "@/pages/modules/settings/management-users/history-login/detail/HistoryLoginDetailView";
import HistoryLoginView from "@/pages/modules/settings/management-users/history-login/HistoryLoginView";
import LevelCreateView from "@/pages/modules/settings/management-users/level/create/LevelCreateView";
import LevelEditView from "@/pages/modules/settings/management-users/level/edit/LevelEditView";
import LevelView from "@/pages/modules/settings/management-users/level/LevelView";
import UsersCreateView from "@/pages/modules/settings/management-users/users/create/UsersCreateView";
import UsersDetailView from "@/pages/modules/settings/management-users/users/detail/UsersDetailView";
import UsersEditView from "@/pages/modules/settings/management-users/users/edit/UsersEditView";
import UsersView from "@/pages/modules/settings/management-users/users/UsersView";
import ModuleView from "@/pages/modules/settings/module/ModuleView";
import ProdiCreateView from "@/pages/modules/settings/prodi/create/ProdiCreateView";
import ProdiDetailView from "@/pages/modules/settings/prodi/detail/ProdiDetailView";
import ProdiEditView from "@/pages/modules/settings/prodi/edit/ProdiEditView";
import ProdiView from "@/pages/modules/settings/prodi/ProdiView";
import AcademicRankView from "@/pages/modules/settings/reference/academic-rank/AcademicRankView";
import GroupRankView from "@/pages/modules/settings/reference/group-rank/GroupRankView";
import NewsCategoryView from "@/pages/modules/settings/reference/news-category/NewsCategoryView";
import UnitCreateView from "@/pages/modules/settings/unit/create/UnitCreateView";
import UnitDetailView from "@/pages/modules/settings/unit/detail/UnitDetailView";
import UnitEditView from "@/pages/modules/settings/unit/edit/UnitEditView";
import UnitView from "@/pages/modules/settings/unit/UnitView";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/login"} />,
  },
  {
    path: "login",
    element: <LoginView />,
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
            element: <DashboardView />,
          },
          {
            path: "main-data-university",
            element: <MainDataUniversityView />,
          },
          {
            path: "faculty",
            children: [
              {
                index: true,
                element: <FacultyView />,
              },
              {
                path: "add",
                element: <FacultyCreateView />,
              },
              {
                path: "edit/:id",
                element: <FacultyEditView />,
              },
              {
                path: "detail/:id",
                element: <FacultyDetailView />,
              },
            ],
          },
          {
            path: "prodi",
            children: [
              {
                index: true,
                element: <ProdiView />,
              },
              {
                path: "add",
                element: <ProdiCreateView />,
              },
              {
                path: "edit/:id",
                element: <ProdiEditView />,
              },
              {
                path: "detail/:id",
                element: <ProdiDetailView />,
              },
            ],
          },
          {
            path: "unit",
            children: [
              {
                index: true,
                element: <UnitView />,
              },
              {
                path: "add",
                element: <UnitCreateView />,
              },
              {
                path: "edit/:id",
                element: <UnitEditView />,
              },
              {
                path: "detail/:id",
                element: <UnitDetailView />,
              },
            ],
          },
          {
            path: "institution",
            children: [
              {
                index: true,
                element: <InstitutionView />,
              },
              {
                path: "add",
                element: <InstitutionCreateView />,
              },
              {
                path: "edit/:id",
                element: <InstitutionEditView />,
              },
              {
                path: "detail/:id",
                element: <InstitutionDetailView />,
              },
            ],
          },
          {
            path: "management-users",
            children: [
              {
                path: "level",
                children: [
                  {
                    index: true,
                    element: <LevelView />,
                  },
                  {
                    path: "add",
                    element: <LevelCreateView />,
                  },
                  {
                    path: "edit/:id",
                    element: <LevelEditView />,
                  },
                ],
              },
              {
                path: "users",
                children: [
                  {
                    index: true,
                    element: <UsersView />,
                  },
                  {
                    path: "add",
                    element: <UsersCreateView />,
                  },
                  {
                    path: "edit/:id",
                    element: <UsersEditView />,
                  },
                  {
                    path: "detail/:id",
                    element: <UsersDetailView />,
                  },
                ],
              },
              {
                path: "history",
                children: [
                  {
                    index: true,
                    element: <HistoryLoginView />,
                  },
                  {
                    path: "detail/:id",
                    element: <HistoryLoginDetailView />,
                  },
                ],
              },
            ],
          },
          {
            path: "reference",
            children: [
              {
                path: "news-category",
                element: <NewsCategoryView />,
              },
              {
                path: "group-rank",
                element: <GroupRankView />,
              },
              {
                path: "academic-rank",
                element: <AcademicRankView />,
              },
            ],
          },
          {
            path: "module",
            children: [
              {
                index: true,
                element: <ModuleView />,
              },
            ],
          },
          {
            path: "domain",
            children: [
              {
                index: true,
                element: <DomainView />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
