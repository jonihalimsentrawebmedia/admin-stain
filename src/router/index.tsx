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
import MainLayoutProdi from '@/pages/modules/website-prodi/components/layout'
import { WebsiteProdiRouter } from '@/router/website-prodi/router.tsx'
import { SelectProdi } from '@/pages/modules/website-prodi/select-prodi'
import ProdiWebTheme from '@/pages/modules/website-prodi/components/layout/theme.tsx'
import DefaultTheme from '@/components/common/theme/default.tsx'
import MainLayoutEditor from '@/pages/modules/manajeman-editor/components/layout'
import { EditorRouter } from './editor/router'
import { SelectUnitUniversity } from '@/pages/modules/website-unit/select-unit'
import { WebsiteUnitRouter } from '@/router/website-unit/router.tsx'
import MainLayoutUnit from '@/pages/modules/website-unit/components/layout'
import { SelectUniversityEditor } from '@/pages/modules/manajeman-editor/select-university'
import UnitWebTheme from '@/pages/modules/website-unit/components/layout/theme.tsx'
import { SelectInstitutionUniversity } from '@/pages/modules/website-lembaga/select-institution'
import { LayoutWebsiteInstitution } from '@/pages/modules/website-lembaga/component/Layout'
import { WebsiteInstitutionRouter } from '@/router/website-lembaga'
import InstitutionWebTheme from '@/pages/modules/website-lembaga/component/Layout/theme'
import PPIDWebTheme from '@/pages/modules/ppid/component/Layout/theme'
import { LayoutWebsitePPID } from '@/pages/modules/ppid/component/Layout'
import { routesPPID } from './ppid/router'
import { SelectPPID } from '@/pages/modules/ppid/select-ppid'

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
        element: (
          <DefaultTheme>
            <ModulesView />
          </DefaultTheme>
        ),
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
        path: 'select-Prodi',
        element: <SelectProdi />,
      },
      {
        path: 'editor-university',
        element: <SelectUniversityEditor />,
      },
      {
        path: 'select-unit',
        element: <SelectUnitUniversity />,
      },
      {
        path: 'select-lembaga',
        element: <SelectInstitutionUniversity />,
      },
      {
        path: 'select-ppid',
        element: <SelectPPID />,
      },
      {
        path: 'settings',
        element: <LayoutSetting />,
        children: [...SettingRouter],
      },
      {
        path: 'website-utama',
        element: (
          <DefaultTheme>
            <MainLayout />
          </DefaultTheme>
        ),
        children: [...MainWebsiteRouter],
      },
      {
        path: 'website-prodi',
        element: (
          <ProdiWebTheme>
            <MainLayoutProdi />
          </ProdiWebTheme>
        ),
        children: [...WebsiteProdiRouter],
      },
      {
        path: 'website-unit',
        element: (
          <>
            <UnitWebTheme>
              <MainLayoutUnit />
            </UnitWebTheme>
          </>
        ),
        children: [...WebsiteUnitRouter],
      },

      {
        path: 'website-lembaga',
        element: (
          <InstitutionWebTheme>
            <LayoutWebsiteInstitution />
          </InstitutionWebTheme>
        ),
        children: [...WebsiteInstitutionRouter],
      },
      {
        path: 'ppid',
        element: (
          <PPIDWebTheme>
            <LayoutWebsitePPID />
          </PPIDWebTheme>
        ),
        children: [...routesPPID],
      },

      {
        path: 'editor',
        element: (
          <DefaultTheme>
            <MainLayoutEditor />
          </DefaultTheme>
        ),
        children: [...EditorRouter],
      },
    ],
  },
])
