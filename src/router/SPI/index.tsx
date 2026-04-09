import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import DashboardSPI from '@/pages/modules/SPI/dashboard'
import { DetailProfileSPI } from '@/pages/modules/SPI/data-spi'
import { UpdatedDataSPI } from '@/pages/modules/SPI/data-spi/updated'
import { ProfileHistoryPage } from '@/pages/modules/SPI/about/history'
import { VisionMissionSPIPage } from '@/pages/modules/SPI/about/vision-mission'
import { ProfileStructurePage } from '@/pages/modules/SPI/about/structure'
import { ShortProfilePage } from '@/pages/modules/SPI/about/short-profile'
import { AuthoritySPIPage } from '@/pages/modules/SPI/about/authority'
import { ProfileCodeEthicsPage } from '@/pages/modules/SPI/about/ethics'
import { ServicesSPI } from '@/pages/modules/SPI/services'
import { CreatedService } from '@/pages/modules/SPI/services/created'
import { UpdatedService } from '@/pages/modules/SPI/services/updated'
import { DetailServiceSPI } from '@/pages/modules/SPI/services/detail'
import { RegulationPage } from '@/pages/modules/SPI/regulation'
import { HumanResourcePage } from '@/pages/modules/SPI/about/human-resource'
import { OfficiallyDataSPI } from '@/pages/modules/SPI/about/human-resource/officialy'
import { ELHKPNDetailPage } from '@/pages/modules/SPI/e-lhkpn'
import { AwardListPage } from '@/pages/modules/SPI/award'
import { ExternalPortalPage } from '@/pages/modules/SPI/external-portal'
import { AuditManagementPage } from '@/pages/modules/SPI/quality-assurance/audit'
import { DocumentSystemPage } from '@/pages/modules/SPI/quality-assurance/document-system'
import { CategoryDocumentSystemPage } from '@/pages/modules/SPI/quality-assurance/document-system/category'
import { AddDocumentSystem } from '@/pages/modules/SPI/quality-assurance/document-system/created'
import { EditDocumentSystem } from '@/pages/modules/SPI/quality-assurance/document-system/updated'
import { DocumentAuditPage } from '@/pages/modules/SPI/quality-assurance/audit/Document'
import { AddDocumentAudit } from '@/pages/modules/SPI/quality-assurance/audit/Document/created'
import { UpdatedDocumentAudit } from '@/pages/modules/SPI/quality-assurance/audit/Document/updated'
import { NewsSPIPublicContentPage } from '@/pages/modules/SPI/publict-content/news'
import { CreateNewsSPI } from '@/pages/modules/SPI/publict-content/news/created'
import { UpdatedNewsSPI } from '@/pages/modules/SPI/publict-content/news/updated'
import { DetailNewsSPI } from '@/pages/modules/SPI/publict-content/news/detail'
import { LogActivityNewsSPI } from '@/pages/modules/SPI/publict-content/news/log-data'
import { ListAgendaSPI } from '@/pages/modules/SPI/publict-content/agenda'
import { CreateAgendaSPI } from '@/pages/modules/SPI/publict-content/agenda/created'
import { UpdatedAgendaSPI } from '@/pages/modules/SPI/publict-content/agenda/updated'
import { DetailAgendaSPI } from '@/pages/modules/SPI/publict-content/agenda/detail'
import { LogActivityAgendaSPI } from '@/pages/modules/SPI/publict-content/agenda/log'
import { ListAnnouncementSPI } from '@/pages/modules/SPI/publict-content/announcement'
import { CreatedAnnouncementSPI } from '@/pages/modules/SPI/publict-content/announcement/created'
import { UpdatedAnnouncementSPI } from '@/pages/modules/SPI/publict-content/announcement/updated'
import { DetailAnnouncementSPI } from '@/pages/modules/SPI/publict-content/announcement/detail'
import { LogActivityAnnouncementSPI } from '@/pages/modules/SPI/publict-content/announcement/log'
import { LandingPageSPI } from '@/pages/modules/SPI/settings/landing-page'
import { SettingsBackground } from '@/pages/modules/SPI/settings/background'
import ColorSettingSPI from '@/pages/modules/SPI/settings/color/ColorSettingService.tsx'
import { TemplateWebSPI } from '@/pages/modules/SPI/settings/template-web'

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
            element: <OfficiallyDataSPI />,
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
        element: <TemplateWebSPI />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
