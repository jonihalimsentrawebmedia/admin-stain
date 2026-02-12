import DashboardLPMI from '@/pages/modules/website-lembaga/dashboard'
import AuditInternalView from '@/pages/modules/website-lembaga/jaminan-mutu/audit-internal/AuditInternalView'
import ManagementRiskView from '@/pages/modules/website-lembaga/jaminan-mutu/manajemen-resiko/ManagementRiskView'
import SystemDocumentationView from '@/pages/modules/website-lembaga/jaminan-mutu/sistem-dokumentasi/SystemDocumentationView'
import ManagementReviewView from '@/pages/modules/website-lembaga/jaminan-mutu/tinjauan-manajemen/ManagementReviewView'
import TemplateAimDetailView from '@/pages/modules/website-lembaga/layanan/aim/template/detail/TemplateAimDetailView'
import TemplateAimView from '@/pages/modules/website-lembaga/layanan/aim/template/TemplateAimView'
import ServiceAccreditationView from '@/pages/modules/website-lembaga/layanan/akreditasi/ServiceAccreditationView'
import PublicServiceView from '@/pages/modules/website-lembaga/layanan/pelayanan-public/PublicServiceView'
import SpmiAsesorView from '@/pages/modules/website-lembaga/layanan/spmi/asesor/SpmiAsesorView'
import SpmiAuditorInternalView from '@/pages/modules/website-lembaga/layanan/spmi/auditor-internal/SpmiAuditorInternalView'
import DocumentSupportDetailView from '@/pages/modules/website-lembaga/layanan/spmi/dokumen-pendukung/detail/DocumentSupportDetailView'
import DocumentSupportView from '@/pages/modules/website-lembaga/layanan/spmi/dokumen-pendukung/DocumentSupportView'
import BenchmarkingReportView from '@/pages/modules/website-lembaga/layanan/spmi/laporan-benchmarking/BenchmarkingReportView'
import SpmiReviewerView from '@/pages/modules/website-lembaga/layanan/spmi/reviewer/SpmiReviewerView'
import LandingPageView from '@/pages/modules/website-lembaga/pengaturan/landing-page/LandingPageView'
import SettingTemplateServiceView from '@/pages/modules/website-lembaga/pengaturan/template/SettingTemplateServiceView'
import ColorSettingService from '@/pages/modules/website-lembaga/pengaturan/warna/ColorSettingService'
import { AgendaPage } from '@/pages/modules/website-lembaga/public-content/agenda'
import { CreateAgendaPage } from '@/pages/modules/website-lembaga/public-content/agenda/created'
import { DetailAgendaPage } from '@/pages/modules/website-lembaga/public-content/agenda/detail'
import { AgendaLanguagePage } from '@/pages/modules/website-lembaga/public-content/agenda/language'
import { LogActivityAgendaPage } from '@/pages/modules/website-lembaga/public-content/agenda/log'
import { UpdatedAgendaPage } from '@/pages/modules/website-lembaga/public-content/agenda/updated'
import { AnnouncementPage } from '@/pages/modules/website-lembaga/public-content/announcement'
import { CreateAnnouncementPage } from '@/pages/modules/website-lembaga/public-content/announcement/created'
import { AnnouncementDetailPage } from '@/pages/modules/website-lembaga/public-content/announcement/detail'
import { AnnouncementLanguage } from '@/pages/modules/website-lembaga/public-content/announcement/language'
import { LogActivityAnnouncementPage } from '@/pages/modules/website-lembaga/public-content/announcement/log'
import { UpdatedAnnouncementPage } from '@/pages/modules/website-lembaga/public-content/announcement/updated'
import NewsPublicContentPage from '@/pages/modules/website-lembaga/public-content/news'
import { CreatedNewsPage } from '@/pages/modules/website-lembaga/public-content/news/created'
import { DetailNewsPage } from '@/pages/modules/website-lembaga/public-content/news/detail/page'
import { NewsWithLanguage } from '@/pages/modules/website-lembaga/public-content/news/language'
import { LogActivityNewsPage } from '@/pages/modules/website-lembaga/public-content/news/log'
import { UpdatedNewsPage } from '@/pages/modules/website-lembaga/public-content/news/updated'
import ComplaintService from '@/pages/modules/website-lembaga/keluhan/ComplaintService.tsx'
import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'

export const WebsiteInstitutionRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardLPMI />,
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
    path: 'jaminan-mutu',
    children: [
      {
        path: 'sistem-dokumentasi',
        element: <SystemDocumentationView />,
      },
      {
        path: 'manajemen-resiko',
        element: <ManagementRiskView />,
      },
      {
        path: 'audit-internal',
        element: <AuditInternalView />,
      },
      {
        path: 'tinjauan-manajemen',
        element: <ManagementReviewView />,
      },
    ],
  },
  {
    path: 'layanan',
    children: [
      {
        path: 'spmi',
        children: [
          {
            path: 'dokumen-pendukung',
            children: [
              {
                index: true,
                element: <DocumentSupportView />,
              },
              {
                path: ':id',
                element: <DocumentSupportDetailView />,
              },
            ],
          },
          {
            path: 'asesor',
            element: <SpmiAsesorView />,
          },
          {
            path: 'auditor-internal',
            element: <SpmiAuditorInternalView />,
          },
          {
            path: 'reviewer',
            element: <SpmiReviewerView />,
          },
          {
            path: 'laporan-benchmarking',
            element: <BenchmarkingReportView />,
          },
        ],
      },
      {
        path: 'aim',
        children: [
          {
            path: 'template',
            children: [
              {
                index: true,
                element: <TemplateAimView />,
              },
              {
                path: ':id',
                element: <TemplateAimDetailView />,
              },
            ],
          },
        ],
      },
      {
        path: 'akreditasi',
        element: <ServiceAccreditationView />,
      },
      {
        path: 'pelayanan-public',
        element: <PublicServiceView />,
      },
    ],
  },
  {
    path: 'keluhan',
    element: <ComplaintService />,
  },
  {
    path: 'pengaturan',
    children: [
      {
        path: 'landing-page',
        element: <LandingPageView />,
      },
      {
        path: 'warna',
        element: <ColorSettingService />,
      },
      {
        path: 'template',
        element: <SettingTemplateServiceView />,
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
            element: <NewsPublicContentPage />,
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
          {
            path: 'language/:id',
            element: <NewsWithLanguage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementPage />,
          },
          {
            path: 'add',
            element: <CreateAnnouncementPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementPage />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementPage />,
          },
          {
            path: 'language/:id',
            element: <AnnouncementLanguage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaPage />,
          },
          {
            path: 'add',
            element: <CreateAgendaPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailAgendaPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaPage />,
          },
          {
            path: 'language/:id',
            element: <AgendaLanguagePage />,
          },
        ],
      },
    ],
  },
]
