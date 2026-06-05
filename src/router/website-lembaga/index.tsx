import { lazy } from 'react'
const DashboardLPMI = lazy(() => import('@/pages/modules/website-lembaga/dashboard'))
const AuditInternalView = lazy(() => import('@/pages/modules/website-lembaga/jaminan-mutu/audit-internal/AuditInternalView'))
const ManagementRiskView = lazy(() => import('@/pages/modules/website-lembaga/jaminan-mutu/manajemen-resiko/ManagementRiskView'))
const SystemDocumentationView = lazy(() => import('@/pages/modules/website-lembaga/jaminan-mutu/sistem-dokumentasi/SystemDocumentationView'))
const ManagementReviewView = lazy(() => import('@/pages/modules/website-lembaga/jaminan-mutu/tinjauan-manajemen/ManagementReviewView'))
const TemplateAimDetailView = lazy(() => import('@/pages/modules/website-lembaga/layanan/aim/template/detail/TemplateAimDetailView'))
const TemplateAimView = lazy(() => import('@/pages/modules/website-lembaga/layanan/aim/template/TemplateAimView'))
const ServiceAccreditationView = lazy(() => import('@/pages/modules/website-lembaga/layanan/akreditasi/ServiceAccreditationView'))
const PublicServiceView = lazy(() => import('@/pages/modules/website-lembaga/layanan/pelayanan-public/PublicServiceView'))
const SpmiAsesorView = lazy(() => import('@/pages/modules/website-lembaga/layanan/spmi/asesor/SpmiAsesorView'))
const SpmiAuditorInternalView = lazy(() => import('@/pages/modules/website-lembaga/layanan/spmi/auditor-internal/SpmiAuditorInternalView'))
const DocumentSupportDetailView = lazy(() => import('@/pages/modules/website-lembaga/layanan/spmi/dokumen-pendukung/detail/DocumentSupportDetailView'))
const DocumentSupportView = lazy(() => import('@/pages/modules/website-lembaga/layanan/spmi/dokumen-pendukung/DocumentSupportView'))
const BenchmarkingReportView = lazy(() => import('@/pages/modules/website-lembaga/layanan/spmi/laporan-benchmarking/BenchmarkingReportView'))
const SpmiReviewerView = lazy(() => import('@/pages/modules/website-lembaga/layanan/spmi/reviewer/SpmiReviewerView'))
const LandingPageView = lazy(() => import('@/pages/modules/website-lembaga/pengaturan/landing-page/LandingPageView'))
const SettingTemplateServiceView = lazy(() => import('@/pages/modules/website-lembaga/pengaturan/template/SettingTemplateServiceView'))
const ColorSettingService = lazy(() => import('@/pages/modules/website-lembaga/pengaturan/warna/ColorSettingService'))
const AgendaPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/agenda').then(m => ({ default: m.AgendaPage })))
const CreateAgendaPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/agenda/created').then(m => ({ default: m.CreateAgendaPage })))
const DetailAgendaPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/agenda/detail').then(m => ({ default: m.DetailAgendaPage })))
const AgendaLanguagePage = lazy(() => import('@/pages/modules/website-lembaga/public-content/agenda/language').then(m => ({ default: m.AgendaLanguagePage })))
const LogActivityAgendaPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaPage })))
const UpdatedAgendaPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaPage })))
const AnnouncementPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/announcement').then(m => ({ default: m.AnnouncementPage })))
const CreateAnnouncementPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/announcement/created').then(m => ({ default: m.CreateAnnouncementPage })))
const AnnouncementDetailPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/announcement/detail').then(m => ({ default: m.AnnouncementDetailPage })))
const AnnouncementLanguage = lazy(() => import('@/pages/modules/website-lembaga/public-content/announcement/language').then(m => ({ default: m.AnnouncementLanguage })))
const LogActivityAnnouncementPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementPage })))
const UpdatedAnnouncementPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementPage })))
const NewsPublicContentPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/news'))
const CreatedNewsPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/news/created').then(m => ({ default: m.CreatedNewsPage })))
const DetailNewsPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/news/detail/page').then(m => ({ default: m.DetailNewsPage })))
const NewsWithLanguage = lazy(() => import('@/pages/modules/website-lembaga/public-content/news/language').then(m => ({ default: m.NewsWithLanguage })))
const LogActivityNewsPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/news/log').then(m => ({ default: m.LogActivityNewsPage })))
const UpdatedNewsPage = lazy(() => import('@/pages/modules/website-lembaga/public-content/news/updated').then(m => ({ default: m.UpdatedNewsPage })))
const ComplaintService = lazy(() => import('@/pages/modules/website-lembaga/keluhan/ComplaintService.tsx'))
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const VisiMisiView = lazy(() => import('@/pages/modules/website-lembaga/profile/visi-misi/VisiMisiView'))
const VisiMisiLembagaAdd = lazy(() => import('@/pages/modules/website-lembaga/profile/visi-misi/add/VisiMisiLembagaAdd'))
const VisiMisiLembagaEdit = lazy(() => import('@/pages/modules/website-lembaga/profile/visi-misi/edit/VisiMisiLembagaEdit'))
const PerformanceInstitutaionView = lazy(() => import('@/pages/modules/website-lembaga/profile/prestasi/PerformanceInstitutaionView'))
const SelayangPandangView = lazy(() => import('@/pages/modules/website-lembaga/profile/selayang-pandang/SelayangPandangView'))
const WorkProgramInstitutaionView = lazy(() => import('@/pages/modules/website-lembaga/profile/program-kerja/WorkProgramInstitutaionView'))
const StructureOrganitationInstitutionView = lazy(() => import('@/pages/modules/website-lembaga/profile/struktur-organisasi/StructureOrganitationInstitutionView'))
const HummanResourceInstitutaionView = lazy(() => import('@/pages/modules/website-lembaga/profile/sumber-daya-manusia/HummanResourceInstitutaionView'))
const LembagaView = lazy(() => import('@/pages/modules/website-lembaga/lembaga/LembagaView'))
const LembagaEditView = lazy(() => import('@/pages/modules/website-lembaga/lembaga/edit/LembagaEditView'))
const ThemaChangeColorInstitution = lazy(() => import('@/pages/modules/website-lembaga/pengaturan/template/color').then(m => ({ default: m.ThemaChangeColorInstitution })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

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
    path:"panduan",
    element:<GuideListView/>
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
        // element: <SettingTemplateServiceView />,
        children: [
          {
            index: true,
            element: <SettingTemplateServiceView />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorInstitution />,
          },
        ],
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

  {
    path: 'profile',
    children: [
      {
        path: 'visi-misi',
        children: [
          {
            index: true,
            element: <VisiMisiView />,
          },
          {
            path: 'add',
            element: <VisiMisiLembagaAdd />,
          },
          {
            path: 'edit/:id',
            element: <VisiMisiLembagaEdit />,
          },
        ],
      },
      {
        path: 'prestasi',
        element: <PerformanceInstitutaionView />,
      },
      {
        path: 'selayang-pandang',
        element: <SelayangPandangView />,
      },
      {
        path: 'program-kerja',
        element: <WorkProgramInstitutaionView />,
      },
      {
        path: 'struktur-organisasi',
        element: <StructureOrganitationInstitutionView />,
      },
      {
        path: 'sumber-daya-manusia',
        element: <HummanResourceInstitutaionView />,
      },
    ],
  },
  {
    path: 'lembaga',
    children: [
      {
        index: true,
        element: <LembagaView />,
      },
      {
        path: 'edit',
        element: <LembagaEditView />,
      },
    ],
  },
]
