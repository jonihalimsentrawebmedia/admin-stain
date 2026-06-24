import { lazy } from 'react'
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const DashboardSPI = lazy(() => import('@/pages/modules/SPI/dashboard'))
const DetailProfileSPI = lazy(() => import('@/pages/modules/SPI/data-spi').then(m => ({ default: m.DetailProfileSPI })))
const UpdatedDataSPI = lazy(() => import('@/pages/modules/SPI/data-spi/updated').then(m => ({ default: m.UpdatedDataSPI })))
const ProfileHistoryPage = lazy(() => import('@/pages/modules/SPI/about/history').then(m => ({ default: m.ProfileHistoryPage })))
const VisionMissionSPIPage = lazy(() => import('@/pages/modules/SPI/about/vision-mission').then(m => ({ default: m.VisionMissionSPIPage })))
const ProfileStructurePage = lazy(() => import('@/pages/modules/SPI/about/structure').then(m => ({ default: m.ProfileStructurePage })))
const ShortProfilePage = lazy(() => import('@/pages/modules/SPI/about/short-profile').then(m => ({ default: m.ShortProfilePage })))
const AuthoritySPIPage = lazy(() => import('@/pages/modules/SPI/about/authority').then(m => ({ default: m.AuthoritySPIPage })))
const ProfileCodeEthicsPage = lazy(() => import('@/pages/modules/SPI/about/ethics').then(m => ({ default: m.ProfileCodeEthicsPage })))
const ServicesSPI = lazy(() => import('@/pages/modules/SPI/services').then(m => ({ default: m.ServicesSPI })))
const CreatedService = lazy(() => import('@/pages/modules/SPI/services/created').then(m => ({ default: m.CreatedService })))
const UpdatedService = lazy(() => import('@/pages/modules/SPI/services/updated').then(m => ({ default: m.UpdatedService })))
const DetailServiceSPI = lazy(() => import('@/pages/modules/SPI/services/detail').then(m => ({ default: m.DetailServiceSPI })))
const RegulationPage = lazy(() => import('@/pages/modules/SPI/regulation').then(m => ({ default: m.RegulationPage })))
const HumanResourcePage = lazy(() => import('@/pages/modules/SPI/about/human-resource').then(m => ({ default: m.HumanResourcePage })))
const OfficialDataSPI = lazy(() => import('@/pages/modules/SPI/about/human-resource/official').then(m => ({ default: m.OfficialDataSPI })))
const ELHKPNDetailPage = lazy(() => import('@/pages/modules/SPI/e-lhkpn').then(m => ({ default: m.ELHKPNDetailPage })))
const AwardListPage = lazy(() => import('@/pages/modules/SPI/award').then(m => ({ default: m.AwardListPage })))
const ExternalPortalPage = lazy(() => import('@/pages/modules/SPI/external-portal').then(m => ({ default: m.ExternalPortalPage })))
const AuditManagementPage = lazy(() => import('@/pages/modules/SPI/quality-assurance/audit').then(m => ({ default: m.AuditManagementPage })))
const DocumentSystemPage = lazy(() => import('@/pages/modules/SPI/quality-assurance/document-system').then(m => ({ default: m.DocumentSystemPage })))
const CategoryDocumentSystemPage = lazy(() => import('@/pages/modules/SPI/quality-assurance/document-system/category').then(m => ({ default: m.CategoryDocumentSystemPage })))
const AddDocumentSystem = lazy(() => import('@/pages/modules/SPI/quality-assurance/document-system/created').then(m => ({ default: m.AddDocumentSystem })))
const EditDocumentSystem = lazy(() => import('@/pages/modules/SPI/quality-assurance/document-system/updated').then(m => ({ default: m.EditDocumentSystem })))
const DocumentAuditPage = lazy(() => import('@/pages/modules/SPI/quality-assurance/audit/Document').then(m => ({ default: m.DocumentAuditPage })))
const AddDocumentAudit = lazy(() => import('@/pages/modules/SPI/quality-assurance/audit/Document/created').then(m => ({ default: m.AddDocumentAudit })))
const UpdatedDocumentAudit = lazy(() => import('@/pages/modules/SPI/quality-assurance/audit/Document/updated').then(m => ({ default: m.UpdatedDocumentAudit })))
const NewsSPIPublicContentPage = lazy(() => import('@/pages/modules/SPI/public-content/news').then(m => ({ default: m.NewsSPIPublicContentPage })))
const CreateNewsSPI = lazy(() => import('@/pages/modules/SPI/public-content/news/created').then(m => ({ default: m.CreateNewsSPI })))
const UpdatedNewsSPI = lazy(() => import('@/pages/modules/SPI/public-content/news/updated').then(m => ({ default: m.UpdatedNewsSPI })))
const DetailNewsSPI = lazy(() => import('@/pages/modules/SPI/public-content/news/detail').then(m => ({ default: m.DetailNewsSPI })))
const LogActivityNewsSPI = lazy(() => import('@/pages/modules/SPI/public-content/news/log-data').then(m => ({ default: m.LogActivityNewsSPI })))
const ListAgendaSPI = lazy(() => import('@/pages/modules/SPI/public-content/agenda').then(m => ({ default: m.ListAgendaSPI })))
const CreateAgendaSPI = lazy(() => import('@/pages/modules/SPI/public-content/agenda/created').then(m => ({ default: m.CreateAgendaSPI })))
const UpdatedAgendaSPI = lazy(() => import('@/pages/modules/SPI/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaSPI })))
const DetailAgendaSPI = lazy(() => import('@/pages/modules/SPI/public-content/agenda/detail').then(m => ({ default: m.DetailAgendaSPI })))
const LogActivityAgendaSPI = lazy(() => import('@/pages/modules/SPI/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaSPI })))
const ListAnnouncementSPI = lazy(() => import('@/pages/modules/SPI/public-content/announcement').then(m => ({ default: m.ListAnnouncementSPI })))
const CreatedAnnouncementSPI = lazy(() => import('@/pages/modules/SPI/public-content/announcement/created').then(m => ({ default: m.CreatedAnnouncementSPI })))
const UpdatedAnnouncementSPI = lazy(() => import('@/pages/modules/SPI/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementSPI })))
const DetailAnnouncementSPI = lazy(() => import('@/pages/modules/SPI/public-content/announcement/detail').then(m => ({ default: m.DetailAnnouncementSPI })))
const LogActivityAnnouncementSPI = lazy(() => import('@/pages/modules/SPI/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementSPI })))
const LandingPageSPI = lazy(() => import('@/pages/modules/SPI/settings/landing-page').then(m => ({ default: m.LandingPageSPI })))
const SettingsBackground = lazy(() => import('@/pages/modules/SPI/settings/background').then(m => ({ default: m.SettingsBackground })))
const ColorSettingSPI = lazy(() => import('@/pages/modules/SPI/settings/color/ColorSettingService.tsx'))
const TemplateWebSPI = lazy(() => import('@/pages/modules/SPI/settings/template-web').then(m => ({ default: m.TemplateWebSPI })))
const ThemaChangeColorSPI = lazy(() => import('@/pages/modules/SPI/settings/template-web/color').then(m => ({ default: m.ThemaChangeColorSPI })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

export const SPI_ROUTES = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardSPI />,
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
    path:"panduan",
    element:<GuideListView/>
  },
  {
    path: 'data-spi',
    children: [
      {
        index: true,
        element: <DetailProfileSPI />,
      },
      {
        path: 'edit',
        element: <UpdatedDataSPI />,
      },
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: 'profile',
        element: <ShortProfilePage />,
      },
      {
        path: 'history',
        element: <ProfileHistoryPage />,
      },
      {
        path: 'vision-mission',
        element: <VisionMissionSPIPage />,
      },
      {
        path: 'organization',
        element: <ProfileStructurePage />,
      },
      {
        path: 'human-resource',
        children: [
          {
            index: true,
            element: <HumanResourcePage />,
          },
          {
            path: 'official/:id',
            element: <OfficialDataSPI />,
          },
        ],
      },
      {
        path: 'authority',
        element: <AuthoritySPIPage />,
      },
      {
        path: 'ethics',
        element: <ProfileCodeEthicsPage />,
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        index: true,
        element: <ServicesSPI />,
      },
      {
        path: 'add',
        element: <CreatedService />,
      },
      {
        path: 'edit/:id',
        element: <UpdatedService />,
      },
      {
        path: 'detail/:id',
        element: <DetailServiceSPI />,
      },
    ],
  },
  {
    path: 'quality-assurance',
    children: [
      {
        path: 'audit',
        children: [
          {
            index: true,
            element: <AuditManagementPage />,
          },
          {
            path: 'document',
            children: [
              {
                index: true,
                element: <DocumentAuditPage />,
              },
              {
                path: 'add',
                element: <AddDocumentAudit />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedDocumentAudit />,
              },
            ],
          },
        ],
      },
      {
        path: 'document-system',
        children: [
          {
            index: true,
            element: <DocumentSystemPage />,
          },
          {
            path: 'category',
            element: <CategoryDocumentSystemPage />,
          },
          {
            path: 'add',
            element: <AddDocumentSystem />,
          },
          {
            path: 'edit/:id',
            element: <EditDocumentSystem />,
          },
        ],
      },
    ],
  },
  {
    path: 'regulation',
    children: [
      {
        index: true,
        element: <RegulationPage />,
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
            element: <NewsSPIPublicContentPage />,
          },
          {
            path: 'add',
            element: <CreateNewsSPI />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedNewsSPI />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsSPI />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsSPI />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <ListAgendaSPI />,
          },
          {
            path: 'add',
            element: <CreateAgendaSPI />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaSPI />,
          },
          {
            path: 'detail/:id',
            element: <DetailAgendaSPI />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaSPI />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <ListAnnouncementSPI />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementSPI />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementSPI />,
          },
          {
            path: 'detail/:id',
            element: <DetailAnnouncementSPI />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementSPI />,
          },
        ],
      },
    ],
  },
  {
    path: 'award',
    element: <AwardListPage />,
  },
  {
    path: 'e-lhkpn',
    element: <ELHKPNDetailPage />,
  },
  {
    path: 'external-portal',
    element: <ExternalPortalPage />,
  },
  {
    path: 'settings',
    children: [
      {
        path: 'landing-page',
        element: <LandingPageSPI />,
      },
      {
        path: 'background-image',
        element: <SettingsBackground />,
      },
      {
        path: 'color',
        element: <ColorSettingSPI />,
      },
      {
        path: 'template',
        // element: <TemplateWebSPI />,
        children: [
          {
            index: true,
            element: <TemplateWebSPI />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorSPI />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
