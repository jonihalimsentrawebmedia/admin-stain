import AdmissionInformationPublicView from '@/pages/modules/ppid/admission-application/information-public/AdmissionInformationPublicView'
import AdmissionInformationPublicDetailView from '@/pages/modules/ppid/admission-application/information-public/detail/AdmissionInformationPublicDetailView'
import AdmissionInformationPublicLogView from '@/pages/modules/ppid/admission-application/information-public/log/AdmissionInformationPublicLogView'
import ObjectionsPublicDetailView from '@/pages/modules/ppid/admission-application/objections-public/detail/ObjectionsPublicDetailView'
import ObjectionInformationLogView from '@/pages/modules/ppid/admission-application/objections-public/log/ObjectionInformationLogView'
import ObjectionInformationPublicView from '@/pages/modules/ppid/admission-application/objections-public/ObjectionInformationPublicView'
import DashboardPPID from '@/pages/modules/ppid/dashboard'
import InformationAvailableDetailView from '@/pages/modules/ppid/information-public/Information-available/detail/InformationAvailableDetailView'
import InformationAvailableView from '@/pages/modules/ppid/information-public/Information-available/InformationAvailableView'
import InformationImmediatelyAddView from '@/pages/modules/ppid/information-public/information-immediately/add/InformationImmediatelyAddView'
import InformationImmediatelyEditView from '@/pages/modules/ppid/information-public/information-immediately/edit/InformationImmediatelyEditView'
import InformationImmediatelyView from '@/pages/modules/ppid/information-public/information-immediately/InformationImmediatelyView'
import InformationPublicRegisterAddView from '@/pages/modules/ppid/information-public/information-public-register/add/InformationPublicRegisterAddView'
import InformationPublicRegisterEditView from '@/pages/modules/ppid/information-public/information-public-register/edit/InformationPublicRegisterEditView'
import InformationPublicRegisterView from '@/pages/modules/ppid/information-public/information-public-register/InformationPublicRegisterView'
import InformationRegularDetailView from '@/pages/modules/ppid/information-public/information-regular/detail/InformationRegularDetailView'
import InformationRegularView from '@/pages/modules/ppid/information-public/information-regular/InformationRegularView'
import StandartServiceView from '@/pages/modules/ppid/information-public/standart-service/StandartServiceView'

import ServiceCommitmentAddView from '@/pages/modules/ppid/profile/service-commitment/add/ServiceCommitmentAddView'
import ServiceCommitmentEditView from '@/pages/modules/ppid/profile/service-commitment/edit/ServiceCommitmentEditView'
import ServiceCommitmentView from '@/pages/modules/ppid/profile/service-commitment/ServiceCommitmentView'
import ShortDescriptionView from '@/pages/modules/ppid/profile/short-description/ShortDescriptionView'
import StructureOrganitationPPIDView from '@/pages/modules/ppid/profile/structure-organization/StructureOrganitationPPIDView'
import VisiMisiUnitAddView from '@/pages/modules/ppid/profile/visi-misi/add/VisiMisiUnitAddView'
import VisiMisiUnitEditView from '@/pages/modules/ppid/profile/visi-misi/edit/VisiMisiUnitEditView'
import VisiMisiPPIDView from '@/pages/modules/ppid/profile/visi-misi/VisiMisiView'
import WorkResponsibilitiesAddView from '@/pages/modules/ppid/profile/work-responsibilities/add/WorkResponsibilitiesAddView'
import WorkResponsibilitiesEditView from '@/pages/modules/ppid/profile/work-responsibilities/edit/WorkResponsibilitiesEditView'
import WorkResponsibilitiesView from '@/pages/modules/ppid/profile/work-responsibilities/WorkResponsibilitiesView'
import ApplicationProceduresView from '@/pages/modules/ppid/public-content/application-procedures/ApplicationProceduresView'
import InfographicsView from '@/pages/modules/ppid/public-content/Infographics/InfographicsView'
import PPIDNewsPublicContentPage from '@/pages/modules/ppid/public-content/news'
import { CreatedNewsPage } from '@/pages/modules/ppid/public-content/news/created'
import { DetailNewsPage } from '@/pages/modules/ppid/public-content/news/detail/page'
import { LogActivityNewsPage } from '@/pages/modules/ppid/public-content/news/log'
import { UpdatedNewsPage } from '@/pages/modules/ppid/public-content/news/updated'
import ShortcutView from '@/pages/modules/ppid/public-content/shortcut/ShortcutView'
import RegulationEnviromentView from '@/pages/modules/ppid/regulation/enviroment/RegulationEnviromentView'
import RegulationPublicView from '@/pages/modules/ppid/regulation/public/RegulationPublicView'
import ReportsAccessView from '@/pages/modules/ppid/reports/access/ReportsAccessView'
import ReportsServiceView from '@/pages/modules/ppid/reports/services/ReportsServiceView'
import ReportsSurveyView from '@/pages/modules/ppid/reports/survey/ReportsSurveyView'
import PPIDLandingPageView from '@/pages/modules/ppid/settings/landing-page/LandingPageView'
import SettingTemplateServiceView from '@/pages/modules/ppid/settings/template/SettingTemplateServiceView'
import PPIDSettingsVideosView from '@/pages/modules/ppid/settings/videos/PPIDSettingsVideosView'
import ColorSettingService from '@/pages/modules/ppid/settings/warna/ColorSettingService'
import UnitEditPPIDView from '@/pages/modules/ppid/unit/edit/UnitEditPPIDView'
import UnitView from '@/pages/modules/ppid/unit/UnitView'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'

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
        element: <SettingTemplateServiceView />,
      },
      {
        path: 'video',
        element: <PPIDSettingsVideosView />,
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
