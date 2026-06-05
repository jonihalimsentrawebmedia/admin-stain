import { lazy } from 'react'
const AdmissionInformationPublicView = lazy(() => import('@/pages/modules/ppid/admission-application/information-public/AdmissionInformationPublicView'))
const AdmissionInformationPublicDetailView = lazy(() => import('@/pages/modules/ppid/admission-application/information-public/detail/AdmissionInformationPublicDetailView'))
const AdmissionInformationPublicLogView = lazy(() => import('@/pages/modules/ppid/admission-application/information-public/log/AdmissionInformationPublicLogView'))
const ObjectionsPublicDetailView = lazy(() => import('@/pages/modules/ppid/admission-application/objections-public/detail/ObjectionsPublicDetailView'))
const ObjectionInformationLogView = lazy(() => import('@/pages/modules/ppid/admission-application/objections-public/log/ObjectionInformationLogView'))
const ObjectionInformationPublicView = lazy(() => import('@/pages/modules/ppid/admission-application/objections-public/ObjectionInformationPublicView'))
const DashboardPPID = lazy(() => import('@/pages/modules/ppid/dashboard'))
const InformationAvailableDetailView = lazy(() => import('@/pages/modules/ppid/information-public/Information-available/detail/InformationAvailableDetailView'))
const InformationAvailableView = lazy(() => import('@/pages/modules/ppid/information-public/Information-available/InformationAvailableView'))
const InformationImmediatelyAddView = lazy(() => import('@/pages/modules/ppid/information-public/information-immediately/add/InformationImmediatelyAddView'))
const InformationImmediatelyEditView = lazy(() => import('@/pages/modules/ppid/information-public/information-immediately/edit/InformationImmediatelyEditView'))
const InformationImmediatelyView = lazy(() => import('@/pages/modules/ppid/information-public/information-immediately/InformationImmediatelyView'))
const InformationPublicRegisterAddView = lazy(() => import('@/pages/modules/ppid/information-public/information-public-register/add/InformationPublicRegisterAddView'))
const InformationPublicRegisterEditView = lazy(() => import('@/pages/modules/ppid/information-public/information-public-register/edit/InformationPublicRegisterEditView'))
const InformationPublicRegisterView = lazy(() => import('@/pages/modules/ppid/information-public/information-public-register/InformationPublicRegisterView'))
const InformationRegularDetailView = lazy(() => import('@/pages/modules/ppid/information-public/information-regular/detail/InformationRegularDetailView'))
const InformationRegularView = lazy(() => import('@/pages/modules/ppid/information-public/information-regular/InformationRegularView'))
const StandartServiceView = lazy(() => import('@/pages/modules/ppid/information-public/standart-service/StandartServiceView'))

const ServiceCommitmentAddView = lazy(() => import('@/pages/modules/ppid/profile/service-commitment/add/ServiceCommitmentAddView'))
const ServiceCommitmentEditView = lazy(() => import('@/pages/modules/ppid/profile/service-commitment/edit/ServiceCommitmentEditView'))
const ServiceCommitmentView = lazy(() => import('@/pages/modules/ppid/profile/service-commitment/ServiceCommitmentView'))
const ShortDescriptionView = lazy(() => import('@/pages/modules/ppid/profile/short-description/ShortDescriptionView'))
const StructureOrganitationPPIDView = lazy(() => import('@/pages/modules/ppid/profile/structure-organization/StructureOrganitationPPIDView'))
const VisiMisiUnitAddView = lazy(() => import('@/pages/modules/ppid/profile/visi-misi/add/VisiMisiUnitAddView'))
const VisiMisiUnitEditView = lazy(() => import('@/pages/modules/ppid/profile/visi-misi/edit/VisiMisiUnitEditView'))
const VisiMisiPPIDView = lazy(() => import('@/pages/modules/ppid/profile/visi-misi/VisiMisiView'))
const WorkResponsibilitiesAddView = lazy(() => import('@/pages/modules/ppid/profile/work-responsibilities/add/WorkResponsibilitiesAddView'))
const WorkResponsibilitiesEditView = lazy(() => import('@/pages/modules/ppid/profile/work-responsibilities/edit/WorkResponsibilitiesEditView'))
const WorkResponsibilitiesView = lazy(() => import('@/pages/modules/ppid/profile/work-responsibilities/WorkResponsibilitiesView'))
const ApplicationProceduresView = lazy(() => import('@/pages/modules/ppid/public-content/application-procedures/ApplicationProceduresView'))
const InfographicsView = lazy(() => import('@/pages/modules/ppid/public-content/Infographics/InfographicsView'))
const PPIDNewsPublicContentPage = lazy(() => import('@/pages/modules/ppid/public-content/news'))
const CreatedNewsPage = lazy(() => import('@/pages/modules/ppid/public-content/news/created').then(m => ({ default: m.CreatedNewsPage })))
const DetailNewsPage = lazy(() => import('@/pages/modules/ppid/public-content/news/detail/page').then(m => ({ default: m.DetailNewsPage })))
const LogActivityNewsPage = lazy(() => import('@/pages/modules/ppid/public-content/news/log').then(m => ({ default: m.LogActivityNewsPage })))
const UpdatedNewsPage = lazy(() => import('@/pages/modules/ppid/public-content/news/updated').then(m => ({ default: m.UpdatedNewsPage })))
const ShortcutView = lazy(() => import('@/pages/modules/ppid/public-content/shortcut/ShortcutView'))
const RegulationEnviromentView = lazy(() => import('@/pages/modules/ppid/regulation/enviroment/RegulationEnviromentView'))
const RegulationPublicView = lazy(() => import('@/pages/modules/ppid/regulation/public/RegulationPublicView'))
const ReportsAccessView = lazy(() => import('@/pages/modules/ppid/reports/access/ReportsAccessView'))
const ReportsServiceView = lazy(() => import('@/pages/modules/ppid/reports/services/ReportsServiceView'))
const ReportsSurveyView = lazy(() => import('@/pages/modules/ppid/reports/survey/ReportsSurveyView'))
const PPIDLandingPageView = lazy(() => import('@/pages/modules/ppid/settings/landing-page/LandingPageView'))
const SettingTemplateServiceView = lazy(() => import('@/pages/modules/ppid/settings/template/SettingTemplateServiceView'))
const PPIDSettingsVideosView = lazy(() => import('@/pages/modules/ppid/settings/videos/PPIDSettingsVideosView'))
const ColorSettingService = lazy(() => import('@/pages/modules/ppid/settings/warna/ColorSettingService'))
const UnitEditPPIDView = lazy(() => import('@/pages/modules/ppid/unit/edit/UnitEditPPIDView'))
const UnitView = lazy(() => import('@/pages/modules/ppid/unit/UnitView'))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const SettingsBackground = lazy(() => import('@/pages/modules/ppid/settings/background').then(m => ({ default: m.SettingsBackground })))
const ThemaChangeColorPPID = lazy(() => import('@/pages/modules/ppid/settings/template/color').then(m => ({ default: m.ThemaChangeColorPPID })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

export const routesPPID = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardPPID />,
      },
      {
        path: 'user-profile',
        element: <UserProfilePage />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: 'panduan',
    element: <GuideListView />,
  },
  {
    path: 'unit',
    children: [
      {
        index: true,
        element: <UnitView />,
      },
      {
        path: 'edit',
        element: <UnitEditPPIDView />,
      },
    ],
  },
  {
    path: 'profile',
    children: [
      {
        path: 'visi-misi',
        children: [
          {
            index: true,
            element: <VisiMisiPPIDView />,
          },
          {
            path: 'add',
            element: <VisiMisiUnitAddView />,
          },
          {
            path: 'edit/:id',
            element: <VisiMisiUnitEditView />,
          },
        ],
      },
      {
        path: 'work-responsibilities',
        children: [
          {
            index: true,
            element: <WorkResponsibilitiesView />,
          },
          {
            path: 'add',
            element: <WorkResponsibilitiesAddView />,
          },
          {
            path: 'edit/:id',
            element: <WorkResponsibilitiesEditView />,
          },
        ],
      },
      {
        path: 'service-commitment',
        children: [
          {
            index: true,
            element: <ServiceCommitmentView />,
          },
          {
            path: 'add',
            element: <ServiceCommitmentAddView />,
          },
          {
            path: 'edit/:id',
            element: <ServiceCommitmentEditView />,
          },
        ],
      },
      {
        path: 'short-description',
        element: <ShortDescriptionView />,
      },
      {
        path: 'structure-organization',
        element: <StructureOrganitationPPIDView />,
      },
    ],
  },
  {
    path: 'information-public',
    children: [
      {
        path: 'information-regular',
        children: [
          {
            index: true,
            element: <InformationRegularView />,
          },
          {
            path: ':id',
            element: <InformationRegularDetailView />,
          },
        ],
      },
      {
        path: 'information-available',
        children: [
          {
            index: true,
            element: <InformationAvailableView />,
          },
          {
            path: ':id',
            element: <InformationAvailableDetailView />,
          },
        ],
      },
      {
        path: 'information-immediately',
        children: [
          {
            index: true,
            element: <InformationImmediatelyView />,
          },
          {
            path: 'add',
            element: <InformationImmediatelyAddView />,
          },

          {
            path: 'edit/:id',
            element: <InformationImmediatelyEditView />,
          },
        ],
      },
      {
        path: 'standard-service',
        element: <StandartServiceView />,
      },
      {
        path: 'register',
        children: [
          {
            index: true,
            element: <InformationPublicRegisterView />,
          },
          {
            path: 'add',
            element: <InformationPublicRegisterAddView />,
          },
          {
            path: 'edit/:id',
            element: <InformationPublicRegisterEditView />,
          },
        ],
      },
    ],
  },

  {
    path: 'settings',
    children: [
      {
        path: 'landing-page',
        element: <PPIDLandingPageView />,
      },
      {
        path: 'warna',
        element: <ColorSettingService />,
      },
      {
        path: 'template',
        // element: <SettingTemplateServiceView />,
        children: [
          {
            index: true,
            element: <SettingTemplateServiceView />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorPPID />,
          },
        ],
      },
      {
        path: 'video',
        element: <PPIDSettingsVideosView />,
      },
      {
        path: 'background',
        element: <SettingsBackground />,
      },
    ],
  },
  {
    path: 'regulation',
    children: [
      {
        path: 'public',
        element: <RegulationPublicView />,
      },
      {
        path: 'enviroment',
        element: <RegulationEnviromentView />,
      },
    ],
  },

  {
    path: 'public-content',
    children: [
      {
        path: 'news',
        children: [
          {
            index: true,
            element: <PPIDNewsPublicContentPage />,
          },
          {
            path: 'add',
            element: <CreatedNewsPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedNewsPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsPage />,
          },
        ],
      },
      {
        path: 'infographics',
        element: <InfographicsView />,
      },
      {
        path: 'application-procedures',
        element: <ApplicationProceduresView />,
      },
      {
        path: 'shortcut',
        element: <ShortcutView />,
      },
    ],
  },
  {
    path: 'reports',
    children: [
      {
        path: 'services',
        element: <ReportsServiceView />,
      },
      {
        path: 'survey',
        element: <ReportsSurveyView />,
      },
      {
        path: 'access',
        element: <ReportsAccessView />,
      },
    ],
  },
  {
    path: 'admission-application',
    children: [
      {
        path: 'information-public',
        children: [
          {
            index: true,
            element: <AdmissionInformationPublicView />,
          },
          {
            path: 'detail/:id',
            element: <AdmissionInformationPublicDetailView />,
          },
          {
            path: 'log/:id',
            element: <AdmissionInformationPublicLogView />,
          },
        ],
      },
      {
        path: 'objections-public',
        children: [
          {
            index: true,
            element: <ObjectionInformationPublicView />,
          },
          {
            path: 'detail/:id',
            element: <ObjectionsPublicDetailView />,
          },
          {
            path: 'log/:id',
            element: <ObjectionInformationLogView />,
          },
        ],
      },
    ],
  },
]
