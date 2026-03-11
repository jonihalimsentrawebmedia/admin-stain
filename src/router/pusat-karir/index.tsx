import { DetailProfileCarrierCenter } from '@/pages/modules/pusat-karir/data-unit'
import { UpdatedDataCarrierCenter } from '@/pages/modules/pusat-karir/data-unit/updated'
import DashboardCarrierCenter from '@/pages/modules/pusat-karir/dashboard'
import { NewsCarrierPublicContentPage } from '@/pages/modules/pusat-karir/public-content/news'
import { NewsCarrierCreated } from '@/pages/modules/pusat-karir/public-content/news/created'
import { NewsCarrierUpdated } from '@/pages/modules/pusat-karir/public-content/news/updated'
import { DetailNewsCarrierPage } from '@/pages/modules/pusat-karir/public-content/news/detail'
import { LogActivityNewsCarrierPage } from '@/pages/modules/pusat-karir/public-content/news/log-data'
import { AgendaCarrierPublicContent } from '@/pages/modules/pusat-karir/public-content/agenda'
import { CreateAgendaCarrierPage } from '@/pages/modules/pusat-karir/public-content/agenda/created'
import DownloadFileCarrierPage from '@/pages/modules/pusat-karir/public-content/Download'
import { CategoryDownloadCarrierPage } from '@/pages/modules/pusat-karir/public-content/Download/category'
import { AddDownloadCarrierPage } from '@/pages/modules/pusat-karir/public-content/Download/created'
import { UpdatedDownloadCarrierPage } from '@/pages/modules/pusat-karir/public-content/Download/updated'
import { UpdatedAgendaCarrierPage } from '@/pages/modules/pusat-karir/public-content/agenda/updated'
import { AgendaCarrierDetailPage } from '@/pages/modules/pusat-karir/public-content/agenda/detail'
import { LogActivityAgendaCarrierPage } from '@/pages/modules/pusat-karir/public-content/agenda/log'
import { AboutProfileCarrier } from '@/pages/modules/pusat-karir/about/profile'
import { VisionMissionCarrierPage } from '@/pages/modules/pusat-karir/about/vision-mission'
import { StructureOrganizationProfileCarrier } from '@/pages/modules/pusat-karir/about/structure'
import { ProfileGreetingLeaderPage } from '@/pages/modules/pusat-karir/about/greeting-leader'
import { ArticleCarrierPublicContentPage } from '@/pages/modules/pusat-karir/public-content/article'
import { ArticleCarrierCreated } from '@/pages/modules/pusat-karir/public-content/article/create'
import { ArticleCarrierUpdated } from '@/pages/modules/pusat-karir/public-content/article/updated'
import { DetailArticleCarrierPage } from '@/pages/modules/pusat-karir/public-content/article/detail'
import { LogActivityArticleCarrierPage } from '@/pages/modules/pusat-karir/public-content/article/log-data'
import { TracerStudyPage } from '@/pages/modules/pusat-karir/tracer-study'
import { ServiceJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy'
import { SpecializationPage } from '@/pages/modules/pusat-karir/reference/specialization'
import { SubSpecializationPage } from '@/pages/modules/pusat-karir/reference/specialization/sub-specialization'
import { CreatedJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/created'
import { UpdatedJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/updated'
import { DetailJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/detail'
import { ApplicantJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/Applicant-user'
import { CarrierConsultationPage } from '@/pages/modules/pusat-karir/service/carrier-consultation'
import { PortalCVATS } from '@/pages/modules/pusat-karir/service/portal-cv'
import { MainService } from '@/pages/modules/pusat-karir/service/main'
import { FooterServicePage } from '@/pages/modules/pusat-karir/service/Footer'

export const CarrierCenterRoute = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardCarrierCenter />,
      },
    ],
  },
  {
    path: 'data-unit',
    children: [
      {
        index: true,
        element: <DetailProfileCarrierCenter />,
      },
      {
        path: 'edit',
        element: <UpdatedDataCarrierCenter />,
      },
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: 'profile',
        element: <AboutProfileCarrier />,
      },
      {
        path: 'vision-mission',
        element: <VisionMissionCarrierPage />,
      },
      {
        path: 'structure',
        element: <StructureOrganizationProfileCarrier />,
      },
      {
        path: 'greeting-leader',
        element: <ProfileGreetingLeaderPage />,
      },
    ],
  },
  {
    path: 'service',
    children: [
      {
        path: 'job-vacancy',
        children: [
          {
            index: true,
            element: <ServiceJobVacancy />,
          },
          {
            path: 'add',
            element: <CreatedJobVacancy />,
          },
          {
            path: ':id',
            children: [
              {
                path: 'edit',
                element: <UpdatedJobVacancy />,
              },
              {
                path: 'detail',
                element: <DetailJobVacancy />,
              },
              {
                path: 'applicant',
                element: <ApplicantJobVacancy />,
              },
            ],
          },
        ],
      },
      {
        path: 'internship-vacancy',
      },
      {
        path: 'consultation',
        element: <CarrierConsultationPage />,
      },
      {
        path: 'portal-cv',
        element: <PortalCVATS />,
      },
      {
        path: 'main',
        element: <MainService />,
      },
      {
        path: 'footer',
        element: <FooterServicePage />,
      },
    ],
  },
  {
    path: 'tracer-study',
    element: <TracerStudyPage />,
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
            element: <NewsCarrierCreated />,
          },
          {
            path: 'edit/:id',
            element: <NewsCarrierUpdated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsCarrierPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsCarrierPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaCarrierPublicContent />,
          },
          {
            path: 'add',
            element: <CreateAgendaCarrierPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaCarrierPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaCarrierDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaCarrierPage />,
          },
        ],
      },
      {
        path: 'article',
        children: [
          {
            index: true,
            element: <ArticleCarrierPublicContentPage />,
          },
          {
            path: 'add',
            element: <ArticleCarrierCreated />,
          },
          {
            path: 'edit/:id',
            element: <ArticleCarrierUpdated />,
          },
          {
            path: 'detail/:id',
            element: <DetailArticleCarrierPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityArticleCarrierPage />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFileCarrierPage />,
          },
          {
            path: 'add',
            element: <AddDownloadCarrierPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedDownloadCarrierPage />,
          },
          {
            path: 'category',
            children: [
              {
                index: true,
                element: <CategoryDownloadCarrierPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'reference',
    children: [
      {
        path: 'specialization',
        children: [
          {
            index: true,
            element: <SpecializationPage />,
          },
          {
            path: ':id',
            children: [
              {
                path: 'sub-specialization',
                element: <SubSpecializationPage />,
              },
            ],
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
