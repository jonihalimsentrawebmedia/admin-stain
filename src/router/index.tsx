import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'

import { PageLoader } from '@/utils/lazyImport'

// ── Router config arrays (ringan, hanya config objects) ──
import { MainWebsiteRouter } from '@/router/main-website/router'
import { SettingRouter } from '@/router/settings/router'
import { WebsiteProdiRouter } from '@/router/website-prodi/router'
import { EditorRouter } from '@/router/editor/router'
import { WebsiteUnitRouter } from '@/router/website-unit/router'
import { WebsiteInstitutionRouter } from '@/router/website-lembaga'
import { routesPPID } from '@/router/ppid/router'
import { routesLPPM } from '@/router/lppm/router'
import { CarrierCenterRoute } from '@/router/pusat-karir'
import { RouterFaculty } from '@/router/website-fakultas'
import { PusilkomRoutes } from '@/router/pusilkom'
import { SPI_ROUTES } from '@/router/SPI'
import { PMB_ROUTES } from '@/router/pmb'
import { E_OFFICE_ROUTE } from '@/router/E-Office'
import { SIMRSROUTES } from '@/router/SIM-RS'
const LoginSimRsView = lazy(() => import('@/pages/modules/SIM-RS/component/login'))
const ForgetPasswordSIMRSView = lazy(() =>
  import('@/pages/modules/SIM-RS/component/login/forget-password/ForgetPasswordSIMRSView')
)
const OtpSIMRSView = lazy(() => import('@/pages/modules/SIM-RS/component/login/otp/OtpSIMRSView'))
const SuccessSIMRSView = lazy(() =>
  import('@/pages/modules/SIM-RS/component/login/success/SuccessSIMRSView')
)
const ChangePasswordSIMRSView = lazy(() =>
  import('@/pages/modules/SIM-RS/component/login/change-password/ChangePasswordSIMRSView')
)

const LoginView = lazy(() => import('@/pages/login/LoginView'))
const ForgetPasswordView = lazy(() => import('@/pages/forget-password/ForgetPasswordView'))
const OtpView = lazy(() => import('@/pages/forget-password/otp/OtpView'))
const ChangePasswordView = lazy(
  () => import('@/pages/forget-password/change-password/ChangePasswordView')
)
const SuccessView = lazy(() => import('@/pages/forget-password/success/SuccessView'))
const MainLayoutSIMRS = lazy(() => import('@/pages/modules/SIM-RS/component/layout'))
const SelectSessionSIMRS = lazy(() =>
  import('@/pages/modules/SIM-RS/select-session').then((m) => ({ default: m.SelectSessionSIMRS }))
)
const SimRSColor = lazy(() => import('@/pages/modules/SIM-RS/component/layout/thema.tsx'))

// ── Lazy: semua komponen modules ──
const ModulesView = lazy(() => import('@/pages/modules/ModulesView'))
const LayoutSetting = lazy(() => import('@/pages/modules/settings/components/layout/LayoutSetting'))
const SelectUniversity = lazy(() =>
  import('@/pages/modules/website-utama/select-university').then((m) => ({
    default: m.SelectUniversity,
  }))
)
const MainLayout = lazy(() => import('@/pages/modules/website-utama/component/layout'))
const ModuleProfileView = lazy(() => import('@/pages/modules/profile/ModuleProfileView'))
const MainLayoutProdi = lazy(() => import('@/pages/modules/website-prodi/components/layout'))
const SelectProdi = lazy(() =>
  import('@/pages/modules/website-prodi/select-prodi').then((m) => ({ default: m.SelectProdi }))
)
const ProdiWebTheme = lazy(() => import('@/pages/modules/website-prodi/components/layout/theme'))
const DefaultTheme = lazy(() => import('@/components/common/theme/default'))
const MainLayoutEditor = lazy(() => import('@/pages/modules/manajeman-editor/components/layout'))
const SelectUnitUniversity = lazy(() =>
  import('@/pages/modules/website-unit/select-unit').then((m) => ({
    default: m.SelectUnitUniversity,
  }))
)
const MainLayoutUnit = lazy(() => import('@/pages/modules/website-unit/components/layout'))
const SelectUniversityEditor = lazy(() =>
  import('@/pages/modules/manajeman-editor/select-university').then((m) => ({
    default: m.SelectUniversityEditor,
  }))
)
const UnitWebTheme = lazy(() => import('@/pages/modules/website-unit/components/layout/theme'))
const SelectInstitutionUniversity = lazy(() =>
  import('@/pages/modules/website-lembaga/select-institution').then((m) => ({
    default: m.SelectInstitutionUniversity,
  }))
)
const LayoutWebsiteInstitution = lazy(() =>
  import('@/pages/modules/website-lembaga/component/Layout').then((m) => ({
    default: m.LayoutWebsiteInstitution,
  }))
)
const InstitutionWebTheme = lazy(
  () => import('@/pages/modules/website-lembaga/component/Layout/theme')
)
const PPIDWebTheme = lazy(() => import('@/pages/modules/ppid/component/Layout/theme'))
const LayoutWebsitePPID = lazy(() =>
  import('@/pages/modules/ppid/component/Layout').then((m) => ({ default: m.LayoutWebsitePPID }))
)
const SelectPPID = lazy(() =>
  import('@/pages/modules/ppid/select-ppid').then((m) => ({ default: m.SelectPPID }))
)
const SelectSessionLPPM = lazy(() =>
  import('@/pages/modules/LPPM/select-lppm').then((m) => ({ default: m.SelectSessionLPPM }))
)
const LPPMWebTheme = lazy(() => import('@/pages/modules/LPPM/components/layout/theme'))
const MainLayoutLPPM = lazy(() => import('@/pages/modules/LPPM/components/layout'))
const ThemeSettings = lazy(() => import('@/pages/modules/settings/components/layout/thema'))
const ProviderLPPM = lazy(() =>
  import('@/pages/modules/LPPM/components/context').then((m) => ({ default: m.ProviderLPPM }))
)
const MainLayoutCarrierCenter = lazy(() => import('@/pages/modules/pusat-karir/component/layout'))
const SelectSessionCarrierCenter = lazy(() =>
  import('@/pages/modules/pusat-karir/component/select-session').then((m) => ({
    default: m.SelectSessionCarrierCenter,
  }))
)
const CarrierWebTheme = lazy(() => import('@/pages/modules/pusat-karir/component/layout/theme'))
const FacultyWebTheme = lazy(
  () => import('@/pages/modules/website-fakultas/component/layout/theme')
)
const MainLayoutFaculty = lazy(() => import('@/pages/modules/website-fakultas/component/layout'))
const SelectSessionFaculty = lazy(() =>
  import('@/pages/modules/website-fakultas/component/select-session').then((m) => ({
    default: m.SelectSessionFaculty,
  }))
)
const MainLayoutPulsikom = lazy(() => import('@/pages/modules/Pulsikom/component/layout'))
const SelectSessionPusilkom = lazy(() =>
  import('@/pages/modules/Pulsikom/component/select-session').then((m) => ({
    default: m.SelectSessionPusilkom,
  }))
)
const PulsikomThema = lazy(() => import('@/pages/modules/Pulsikom/component/layout/theme'))
const SelectSessionSPI = lazy(() =>
  import('@/pages/modules/SPI/component/select-session').then((m) => ({
    default: m.SelectSessionSPI,
  }))
)
const MainLayoutSPI = lazy(() => import('@/pages/modules/SPI/layout'))
const SPIThema = lazy(() => import('@/pages/modules/SPI/layout/theme'))
const MainLayoutPMB = lazy(() => import('@/pages/modules/PMB/component/layout'))
const SelectSessionPMB = lazy(() =>
  import('@/pages/modules/PMB/session').then((m) => ({ default: m.SelectSessionPMB }))
)
const PMBThema = lazy(() => import('@/pages/modules/PMB/component/layout/thema'))
const SelectSessionEOffice = lazy(() =>
  import('@/pages/modules/E-Office/session').then((m) => ({ default: m.SelectSessionEOffice }))
)
const MainLayoutEOffice = lazy(() => import('@/pages/modules/E-Office/component/layout'))
const EOfficeThema = lazy(() => import('@/pages/modules/E-Office/component/layout/theme'))

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
    path: 'e-office/login',
    element: <></>,
  },
  {
    path: 'sim-rs/login',
    children: [
      {
        index: true,
        element: <LoginSimRsView />,
      },
    ],
  },
  {
    path: 'sim-rs/forget-password',
    children: [
      { index: true, element: <ForgetPasswordSIMRSView /> },
      { path: 'otp', element: <OtpSIMRSView /> },
      { path: 'change-password', element: <ChangePasswordSIMRSView /> },
      { path: 'success', element: <SuccessSIMRSView /> },
    ],
  },
  {
    path: 'forget-password',
    children: [
      { index: true, element: <ForgetPasswordView /> },
      { path: 'otp', element: <OtpView /> },
      { path: 'change-password', element: <ChangePasswordView /> },
      { path: 'success', element: <SuccessView /> },
    ],
  },

  // ── Modules dengan Suspense ──
  {
    path: 'modules',
    element: (
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
    ),
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
      // ── Select/Redirect Pages ──
      { path: 'select-university', element: <SelectUniversity /> },
      { path: 'select-Prodi', element: <SelectProdi /> },
      { path: 'editor-university', element: <SelectUniversityEditor /> },
      { path: 'select-unit', element: <SelectUnitUniversity /> },
      { path: 'select-lembaga', element: <SelectInstitutionUniversity /> },
      { path: 'select-ppid', element: <SelectPPID /> },
      { path: 'select-lppm', element: <SelectSessionLPPM /> },
      { path: 'session-carrier', element: <SelectSessionCarrierCenter /> },
      { path: 'select-fakultas', element: <SelectSessionFaculty /> },
      { path: 'session-pulsikom', element: <SelectSessionPusilkom /> },
      { path: 'session-spi', element: <SelectSessionSPI /> },
      { path: 'session-pmb', element: <SelectSessionPMB /> },
      { path: 'session-e-office', element: <SelectSessionEOffice /> },
      { path: 'session-sim-rs', element: <SelectSessionSIMRS /> },

      // ── Settings ──
      {
        path: 'settings',
        element: (
          <ThemeSettings>
            <LayoutSetting />
          </ThemeSettings>
        ),
        children: [...SettingRouter],
      },

      // ── Module: Website Utama ──
      {
        path: 'website-utama',
        element: (
          <DefaultTheme>
            <MainLayout />
          </DefaultTheme>
        ),
        children: [...MainWebsiteRouter],
      },

      // ── Module: Website Prodi ──
      {
        path: 'website-prodi',
        element: (
          <ProdiWebTheme>
            <MainLayoutProdi />
          </ProdiWebTheme>
        ),
        children: [...WebsiteProdiRouter],
      },

      // ── Module: Website Unit ──
      {
        path: 'website-unit',
        element: (
          <UnitWebTheme>
            <MainLayoutUnit />
          </UnitWebTheme>
        ),
        children: [...WebsiteUnitRouter],
      },

      // ── Module: Website Lembaga ──
      {
        path: 'website-lembaga',
        element: (
          <InstitutionWebTheme>
            <LayoutWebsiteInstitution />
          </InstitutionWebTheme>
        ),
        children: [...WebsiteInstitutionRouter],
      },

      // ── Module: PPID ──
      {
        path: 'ppid',
        element: (
          <PPIDWebTheme>
            <LayoutWebsitePPID />
          </PPIDWebTheme>
        ),
        children: [...routesPPID],
      },

      // ── Module: Editor ──
      {
        path: 'editor',
        element: (
          <DefaultTheme>
            <MainLayoutEditor />
          </DefaultTheme>
        ),
        children: [...EditorRouter],
      },

      // ── Module: LPPM ──
      {
        path: 'lppm',
        element: (
          <LPPMWebTheme>
            <ProviderLPPM>
              <MainLayoutLPPM />
            </ProviderLPPM>
          </LPPMWebTheme>
        ),
        children: [...routesLPPM],
      },

      // ── Module: Pusat Karir ──
      {
        path: 'pusat-karir',
        element: (
          <CarrierWebTheme>
            <MainLayoutCarrierCenter />
          </CarrierWebTheme>
        ),
        children: [...CarrierCenterRoute],
      },

      // ── Module: Website Fakultas ──
      {
        path: 'website-fakultas',
        element: (
          <FacultyWebTheme>
            <MainLayoutFaculty />
          </FacultyWebTheme>
        ),
        children: [...RouterFaculty],
      },

      // ── Module: Pulsikom ──
      {
        path: 'pulsikom',
        element: (
          <PulsikomThema>
            <MainLayoutPulsikom />
          </PulsikomThema>
        ),
        children: [...PusilkomRoutes],
      },

      // ── Module: SPI ──
      {
        path: 'spi',
        element: (
          <SPIThema>
            <MainLayoutSPI />
          </SPIThema>
        ),
        children: [...SPI_ROUTES],
      },

      // ── Module: PMB ──
      {
        path: 'pmb',
        element: (
          <PMBThema>
            <MainLayoutPMB />
          </PMBThema>
        ),
        children: [...PMB_ROUTES],
      },

      // ── Module: E-Office ──
      {
        path: 'e-office',
        element: (
          <EOfficeThema>
            <MainLayoutEOffice />
          </EOfficeThema>
        ),
        children: [...E_OFFICE_ROUTE],
      },
      {
        path: 'sim-rs',
        element: (
          <SimRSColor>
            <MainLayoutSIMRS />
          </SimRSColor>
        ),
        children: [...SIMRSROUTES],
      },
    ],
  },
])
