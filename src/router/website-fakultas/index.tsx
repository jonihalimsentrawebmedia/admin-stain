import { DetailProfileFaculty } from '@/pages/modules/website-fakultas/data-fakultas'
import { UpdatedDataFaculty } from '@/pages/modules/website-fakultas/data-fakultas/updated'
import { NewsCarrierPublicContentPage } from '@/pages/modules/website-fakultas/public-content/news'
import { NewsFacultyCreated } from '@/pages/modules/website-fakultas/public-content/news/created'
import { DetailNewsFacultyPage } from '@/pages/modules/website-fakultas/public-content/news/detail'
import { NewsFacultyUpdated } from '@/pages/modules/website-fakultas/public-content/news/updated'
import { LogActivityNewsFacultyPage } from '@/pages/modules/website-fakultas/public-content/news/log-data'
import { AgendaFacultyPublicContent } from '@/pages/modules/website-fakultas/public-content/agenda'
import { CreateAgendaFacultyPage } from '@/pages/modules/website-fakultas/public-content/agenda/created'
import { UpdatedAgendaFacultyPage } from '@/pages/modules/website-fakultas/public-content/agenda/updated'
import { AgendaFacultyDetailPage } from '@/pages/modules/website-fakultas/public-content/agenda/detail'
import { LogActivityAgendaFacultyPage } from '@/pages/modules/website-fakultas/public-content/agenda/log'
import { AnnouncementFacultyPublicContent } from '@/pages/modules/website-fakultas/public-content/announcement'
import { CreatedAnnouncementFaculty } from '@/pages/modules/website-fakultas/public-content/announcement/created'
import { UpdatedAnnouncementFaculty } from '@/pages/modules/website-fakultas/public-content/announcement/updated'
import { AnnouncementFacultyDetailPage } from '@/pages/modules/website-fakultas/public-content/announcement/detail'
import { LogActivityAnnouncementFaculty } from '@/pages/modules/website-fakultas/public-content/announcement/log'
import DownloadFileFacultyPage from '@/pages/modules/website-fakultas/public-content/Download'
import { CategoryDownloadFacultyPage } from '@/pages/modules/website-fakultas/public-content/Download/category'
import { AddDownloadCarrierPage } from '@/pages/modules/website-fakultas/public-content/Download/created'
import { UpdatedDownloadFacultyPage } from '@/pages/modules/website-fakultas/public-content/Download/updated'
import { LandingPageCarrier } from '@/pages/modules/website-fakultas/settings/landing-page'
import ColorSettingFaculty from '@/pages/modules/website-fakultas/settings/color/ColorSettingService.tsx'
import { TemplateWebFacultySettings } from '@/pages/modules/website-fakultas/settings/template-web'
import LayoutFaculty from '@/pages/modules/website-fakultas/about-faculty/component/layout'
import AboutFacultyView from '@/pages/modules/website-fakultas/about-faculty'
import UserFacultyView from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola'
import VisionMissionFaculty from '@/pages/modules/website-fakultas/about-faculty/vision-mission'
import OrganizationalStructureView from '@/pages/modules/website-fakultas/about-faculty/organization'
import ContactUsView from '@/pages/modules/website-fakultas/about-faculty/contact-us'
import ProgramStudyView from '@/pages/modules/website-fakultas/academic/program-studi'
import LayoutStudyProgram from '@/pages/modules/website-fakultas/academic/program-studi/component/layout'
import AboutProdiView from '@/pages/modules/website-fakultas/academic/program-studi/detail/about'
import UserProdiView from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola'
import VisionMissionProdi from '@/pages/modules/website-fakultas/academic/program-studi/detail/vision-mission'
import ProdiOrganizationalStructureView from '@/pages/modules/website-fakultas/academic/program-studi/detail/organization'
import ProdiContactUsView from '@/pages/modules/website-fakultas/academic/program-studi/detail/contact-us'
import ProdiCurriculumView from '@/pages/modules/website-fakultas/academic/curriculum'
import { AcademicPPSMPage } from '@/pages/modules/website-fakultas/academic/ppsm'
import DashboardFaculty from '@/pages/modules/website-fakultas/dashboard'
import { AlumniStoriesPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story'
import { CreatedStoryAlumni } from '@/pages/modules/website-fakultas/academic/ppsm/story/create'
import { ProdiGallery } from '@/pages/modules/website-fakultas/academic/program-studi/detail/gallery'

export const RouterFaculty = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardFaculty />,
      },
    ],
  },
  {
    path: 'data-faculty',
    children: [
      {
        index: true,
        element: <DetailProfileFaculty />,
      },
      {
        path: 'edit',
        element: <UpdatedDataFaculty />,
      },
    ],
  },
  {
    path: 'about-faculty',
    element: <LayoutFaculty />,
    children: [
      {
        index: true,
        element: <AboutFacultyView />,
      },
      {
        path: 'unit-pengelola',
        element: <UserFacultyView />,
      },
      {
        path: 'visi-misi',
        element: <VisionMissionFaculty />,
      },
      {
        path: 'struktur-organisasi',
        element: <OrganizationalStructureView />,
      },
      {
        path: 'staff',
        element: <></>,
      },
      {
        path: 'dosen',
        element: <></>,
      },
      {
        path: 'berita',
        element: <></>,
      },
      {
        path: 'galeri',
        element: <></>,
      },
      {
        path: 'hubungi-kami',
        element: <ContactUsView />,
      },
    ],
  },
  {
    path: 'academic',
    children: [
      {
        path: 'study-program',
        children: [
          {
            index: true,
            element: <ProgramStudyView />,
          },
          {
            path: ':id',
            element: <LayoutStudyProgram />,
            children: [
              {
                path: 'tentang',
                element: <AboutProdiView />,
              },
              {
                path: 'unit-pengelola',
                element: <UserProdiView />,
              },
              {
                path: 'visi-misi',
                element: <VisionMissionProdi />,
              },
              {
                path: 'struktur-organisasi',
                element: <ProdiOrganizationalStructureView />,
              },
              {
                path: 'staff',
                element: <></>,
              },
              {
                path: 'dosen',
                element: <></>,
              },
              {
                path: 'berita',
                element: <></>,
              },
              {
                path: 'galeri',
                element: <ProdiGallery />,
              },
              {
                path: 'hubungi-kami',
                element: <ProdiContactUsView />,
              },
            ],
          },
        ],
      },
      {
        path: 'curriculum',
        children: [
          {
            index: true,
            element: <ProdiCurriculumView />,
          },
        ],
      },
      {
        path: 'ppsm',
        children: [
          {
            index: true,
            element: <AcademicPPSMPage />,
          },
          {
            path: 'story',
            children: [
              {
                index: true,
                element: <AlumniStoriesPPSM />,
              },
              {
                path: 'add',
                element: <CreatedStoryAlumni />,
              },
            ],
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
            element: <NewsCarrierPublicContentPage />,
          },
          {
            path: 'add',
            element: <NewsFacultyCreated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsFacultyPage />,
          },
          {
            path: 'edit/:id',
            element: <NewsFacultyUpdated />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsFacultyPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaFacultyPublicContent />,
          },
          {
            path: 'add',
            element: <CreateAgendaFacultyPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaFacultyPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaFacultyDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaFacultyPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementFacultyPublicContent />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementFaculty />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementFaculty />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementFacultyDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementFaculty />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFileFacultyPage />,
          },
          {
            path: 'category',
            element: <CategoryDownloadFacultyPage />,
          },
          {
            path: 'add',
            element: <AddDownloadCarrierPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedDownloadFacultyPage />,
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
        element: <LandingPageCarrier />,
      },
      {
        path: 'color',
        element: <ColorSettingFaculty />,
      },
      {
        path: 'template',
        element: <TemplateWebFacultySettings />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
