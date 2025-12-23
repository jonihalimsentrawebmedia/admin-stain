import ChangePasswordView from '@/pages/forget-password/change-password/ChangePasswordView'
import ForgetPasswordView from '@/pages/forget-password/ForgetPasswordView'
import OtpView from '@/pages/forget-password/otp/OtpView'
import SuccessView from '@/pages/forget-password/success/SuccessView'
import LoginView from '@/pages/login/LoginView'
import ModulesView from '@/pages/modules/ModulesView'
import LayoutSetting from '@/pages/modules/settings/components/layout/LayoutSetting'

import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SelectUniversity } from '@/pages/modules/website-utama/select-university'

import MainLayout from '@/pages/modules/website-utama/component/layout'
import ModuleProfileView from '@/pages/modules/profile/ModuleProfileView'
import { MainWebsiteRouter } from '@/router/main-website/router.tsx'
import { SettingRouter } from './settings/router'

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={'/login'} />,
  },
  {
    path: 'login',
    element: <LoginView />,
  },
  {
    path: 'forget-password',
    children: [
      {
        index: true,
        element: <ForgetPasswordView />,
      },
      {
        path: 'otp',
        element: <OtpView />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordView />,
      },
      {
        path: 'success',
        element: <SuccessView />,
      },
    ],
  },

  {
    path: 'modules',
    children: [
      {
        index: true,
        element: <ModulesView />,
      },
      {
        path: 'profile',
        element: <ModuleProfileView />,
      },
      {
        path: 'select-university',
        element: <SelectUniversity />,
      },
      {
        path: 'settings',
        element: <LayoutSetting />,
        children: [...SettingRouter],
      },
      {
        path: 'website-utama',
        element: <MainLayout />,
        children: [...MainWebsiteRouter],
      },
    ],
  },
])
