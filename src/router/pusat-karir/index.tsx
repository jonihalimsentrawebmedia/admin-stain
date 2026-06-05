import { lazy } from 'react'
const DetailProfileCarrierCenter = lazy(() => import('@/pages/modules/pusat-karir/data-unit').then(m => ({ default: m.DetailProfileCarrierCenter })))
const UpdatedDataCarrierCenter = lazy(() => import('@/pages/modules/pusat-karir/data-unit/updated').then(m => ({ default: m.UpdatedDataCarrierCenter })))
const DashboardCarrierCenter = lazy(() => import('@/pages/modules/pusat-karir/dashboard'))
const NewsCarrierPublicContentPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/news').then(m => ({ default: m.NewsCarrierPublicContentPage })))
const NewsCarrierCreated = lazy(() => import('@/pages/modules/pusat-karir/public-content/news/created').then(m => ({ default: m.NewsCarrierCreated })))
const NewsCarrierUpdated = lazy(() => import('@/pages/modules/pusat-karir/public-content/news/updated').then(m => ({ default: m.NewsCarrierUpdated })))
const DetailNewsCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/news/detail').then(m => ({ default: m.DetailNewsCarrierPage })))
const LogActivityNewsCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/news/log-data').then(m => ({ default: m.LogActivityNewsCarrierPage })))
const AgendaCarrierPublicContent = lazy(() => import('@/pages/modules/pusat-karir/public-content/agenda').then(m => ({ default: m.AgendaCarrierPublicContent })))
const CreateAgendaCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/agenda/created').then(m => ({ default: m.CreateAgendaCarrierPage })))
const DownloadFileCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/Download'))
const CategoryDownloadCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/Download/category').then(m => ({ default: m.CategoryDownloadCarrierPage })))
const AddDownloadCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/Download/created').then(m => ({ default: m.AddDownloadCarrierPage })))
const UpdatedDownloadCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/Download/updated').then(m => ({ default: m.UpdatedDownloadCarrierPage })))
const UpdatedAgendaCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaCarrierPage })))
const AgendaCarrierDetailPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/agenda/detail').then(m => ({ default: m.AgendaCarrierDetailPage })))
const LogActivityAgendaCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaCarrierPage })))
const AboutProfileCarrier = lazy(() => import('@/pages/modules/pusat-karir/about/profile').then(m => ({ default: m.AboutProfileCarrier })))
const VisionMissionCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/about/vision-mission').then(m => ({ default: m.VisionMissionCarrierPage })))
const StructureOrganizationProfileCarrier = lazy(() => import('@/pages/modules/pusat-karir/about/structure').then(m => ({ default: m.StructureOrganizationProfileCarrier })))
const ProfileGreetingLeaderPage = lazy(() => import('@/pages/modules/pusat-karir/about/greeting-leader').then(m => ({ default: m.ProfileGreetingLeaderPage })))
const ArticleCarrierPublicContentPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/article').then(m => ({ default: m.ArticleCarrierPublicContentPage })))
const ArticleCarrierCreated = lazy(() => import('@/pages/modules/pusat-karir/public-content/article/create').then(m => ({ default: m.ArticleCarrierCreated })))
const ArticleCarrierUpdated = lazy(() => import('@/pages/modules/pusat-karir/public-content/article/updated').then(m => ({ default: m.ArticleCarrierUpdated })))
const DetailArticleCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/article/detail').then(m => ({ default: m.DetailArticleCarrierPage })))
const LogActivityArticleCarrierPage = lazy(() => import('@/pages/modules/pusat-karir/public-content/article/log-data').then(m => ({ default: m.LogActivityArticleCarrierPage })))
const TracerStudyPage = lazy(() => import('@/pages/modules/pusat-karir/tracer-study').then(m => ({ default: m.TracerStudyPage })))
const ServiceJobVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/job-vacancy').then(m => ({ default: m.ServiceJobVacancy })))
const SpecializationPage = lazy(() => import('@/pages/modules/pusat-karir/reference/specialization').then(m => ({ default: m.SpecializationPage })))
const SubSpecializationPage = lazy(() => import('@/pages/modules/pusat-karir/reference/specialization/sub-specialization').then(m => ({ default: m.SubSpecializationPage })))
const CreatedJobVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/job-vacancy/created').then(m => ({ default: m.CreatedJobVacancy })))
const UpdatedJobVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/job-vacancy/updated').then(m => ({ default: m.UpdatedJobVacancy })))
const DetailJobVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/job-vacancy/detail').then(m => ({ default: m.DetailJobVacancy })))
const ApplicantJobVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/job-vacancy/Applicant-user').then(m => ({ default: m.ApplicantJobVacancy })))
const CarrierConsultationPage = lazy(() => import('@/pages/modules/pusat-karir/service/carrier-consultation').then(m => ({ default: m.CarrierConsultationPage })))
const PortalCVATS = lazy(() => import('@/pages/modules/pusat-karir/service/portal-cv').then(m => ({ default: m.PortalCVATS })))
const MainService = lazy(() => import('@/pages/modules/pusat-karir/service/main').then(m => ({ default: m.MainService })))
const FooterServicePage = lazy(() => import('@/pages/modules/pusat-karir/service/Footer').then(m => ({ default: m.FooterServicePage })))
const CompanySizePage = lazy(() => import('@/pages/modules/pusat-karir/reference/company-size').then(m => ({ default: m.CompanySizePage })))
const IndustryCategoryPage = lazy(() => import('@/pages/modules/pusat-karir/reference/industry-category').then(m => ({ default: m.IndustryCategoryPage })))
const LandingPageCarrier = lazy(() => import('@/pages/modules/pusat-karir/settings/landing-page').then(m => ({ default: m.LandingPageCarrier })))
const TemplateWebCarrierSettings = lazy(() => import('@/pages/modules/pusat-karir/settings/template-web').then(m => ({ default: m.TemplateWebCarrierSettings })))
const ColorSettingCarrier = lazy(() => import('@/pages/modules/pusat-karir/settings/warna/ColorSettingService.tsx'))
const SurveyListPage = lazy(() => import('@/pages/modules/pusat-karir/survey').then(m => ({ default: m.SurveyListPage })))
const CreateSurveyData = lazy(() => import('@/pages/modules/pusat-karir/survey/create').then(m => ({ default: m.CreateSurveyData })))
const UpdatedSurveyData = lazy(() => import('@/pages/modules/pusat-karir/survey/Updated').then(m => ({ default: m.UpdatedSurveyData })))
const DetailSurvey = lazy(() => import('@/pages/modules/pusat-karir/survey/detail').then(m => ({ default: m.DetailSurvey })))
const PreviewSurveyCreate = lazy(() => import('@/pages/modules/pusat-karir/survey/preview').then(m => ({ default: m.PreviewSurveyCreate })))
const ManagementListUserPage = lazy(() => import('@/pages/modules/pusat-karir/management-user/list-user').then(m => ({ default: m.ManagementListUserPage })))
const CreateJobsSeekers = lazy(() => import('@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/create').then(m => ({ default: m.CreateJobsSeekers })))
const UpdateJobsSeekers = lazy(() => import('@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/update').then(m => ({ default: m.UpdateJobsSeekers })))
const DetailUserJobsSeekers = lazy(() => import('@/pages/modules/pusat-karir/management-user/list-user/jobs-seekers/detail').then(m => ({ default: m.DetailUserJobsSeekers })))
const CreatePartnership = lazy(() => import('@/pages/modules/pusat-karir/management-user/list-user/Partnership/create').then(m => ({ default: m.CreatePartnership })))
const UpdatePartnershipData = lazy(() => import('@/pages/modules/pusat-karir/management-user/list-user/Partnership/update').then(m => ({ default: m.UpdatePartnershipData })))
const DetailProfilePartnership = lazy(() => import('@/pages/modules/pusat-karir/management-user/list-user/Partnership/detail').then(m => ({ default: m.DetailProfilePartnership })))
const ProcedureJobSeekerPage = lazy(() => import('@/pages/modules/pusat-karir/management-user/procedure/job-seeker').then(m => ({ default: m.ProcedureJobSeekerPage })))
const ProcedurePartnershipPage = lazy(() => import('@/pages/modules/pusat-karir/management-user/procedure/partnership').then(m => ({ default: m.ProcedurePartnershipPage })))
const UserVerificationPage = lazy(() => import('@/pages/modules/pusat-karir/management-user/user-verification').then(m => ({ default: m.UserVerificationPage })))
const DetailDataUserVerification = lazy(() => import('@/pages/modules/pusat-karir/management-user/user-verification/job-seeker/check-data').then(m => ({ default: m.DetailDataUserVerification })))
const DetailDataCompanyVerification = lazy(() => import('@/pages/modules/pusat-karir/management-user/user-verification/partnership/check-data').then(m => ({ default: m.DetailDataCompanyVerification })))
const ServiceInternshipVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/internship-vacancy').then(m => ({ default: m.ServiceInternshipVacancy })))
const CreatedInternshipVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/internship-vacancy/created').then(m => ({ default: m.CreatedInternshipVacancy })))
const UpdatedInternshipVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/internship-vacancy/updated').then(m => ({ default: m.UpdatedInternshipVacancy })))
const DetailInternshipVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/internship-vacancy/detail').then(m => ({ default: m.DetailInternshipVacancy })))
const ApplicantInternshipVacancy = lazy(() => import('@/pages/modules/pusat-karir/service/internship-vacancy/aplicant').then(m => ({ default: m.ApplicantInternshipVacancy })))
const ResultStatistic = lazy(() => import('@/pages/modules/pusat-karir/survey/statistic').then(m => ({ default: m.ResultStatistic })))
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const ThemaChangeColorCarrierCenter = lazy(() => import('@/pages/modules/pusat-karir/settings/template-web/color').then(m => ({ default: m.ThemaChangeColorCarrierCenter })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

export const CarrierCenterRoute = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardCarrierCenter />,
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
        children: [
          {
            index: true,
            element: <ServiceInternshipVacancy />,
          },
          {
            path: 'add',
            element: <CreatedInternshipVacancy />,
          },
          {
            path: ':id',
            children: [
              {
                path: 'edit',
                element: <UpdatedInternshipVacancy />,
              },
              {
                path: 'detail',
                element: <DetailInternshipVacancy />,
              },
              {
                path: 'applicant',
                element: <ApplicantInternshipVacancy />,
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
      {
        path: 'company-size',
        children: [
          {
            index: true,
            element: <CompanySizePage />,
          },
        ],
      },
      {
        path: 'industry-category',
        children: [
          {
            index: true,
            element: <IndustryCategoryPage />,
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
        path: 'template',
        // element: <TemplateWebCarrierSettings />,
        children: [
          {
            index: true,
            element: <TemplateWebCarrierSettings />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorCarrierCenter />,
          },
        ],
      },
      {
        path: 'color',
        element: <ColorSettingCarrier />,
      },
    ],
  },
  {
    path: 'survey',
    children: [
      {
        index: true,
        element: <SurveyListPage />,
      },
      {
        path: 'add',
        element: <CreateSurveyData />,
      },
      {
        path: 'preview',
        element: <PreviewSurveyCreate />,
      },
      {
        path: ':id',
        children: [
          {
            path: 'edit',
            element: <UpdatedSurveyData />,
          },
          {
            path: 'detail',
            element: <DetailSurvey />,
          },
          {
            path: 'statistic',
            element: <ResultStatistic />,
          },
        ],
      },
    ],
  },
  {
    path: 'management-user',
    children: [
      {
        path: 'user',
        children: [
          {
            index: true,
            element: <ManagementListUserPage />,
          },
          {
            path: 'pencari-kerja',
            children: [
              {
                path: 'add',
                element: <CreateJobsSeekers />,
              },
              {
                path: 'edit/:id',
                element: <UpdateJobsSeekers />,
              },
              {
                path: 'detail/:id',
                element: <DetailUserJobsSeekers />,
              },
            ],
          },
          {
            path: 'mitra-kerja',
            children: [
              {
                path: 'add',
                element: <CreatePartnership />,
              },
              {
                path: 'edit/:id',
                element: <UpdatePartnershipData />,
              },
              {
                path: 'detail/:id',
                element: <DetailProfilePartnership />,
              },
            ],
          },
        ],
      },
      {
        path: 'procedure',
        children: [
          {
            path: 'job-seeker',
            element: <ProcedureJobSeekerPage />,
          },
          {
            path: 'partnership',
            element: <ProcedurePartnershipPage />,
          },
        ],
      },
      {
        path: 'user-verification',
        children: [
          {
            index: true,
            element: <UserVerificationPage />,
          },
          {
            path: 'job-seeker/:id',
            element: <DetailDataUserVerification />,
          },
          {
            path: 'partnership/:id',
            element: <DetailDataCompanyVerification />,
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
