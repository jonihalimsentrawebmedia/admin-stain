import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const ProfileProdiLayout = lazy(() => import('@/pages/modules/website-prodi/profile/layout').then(m => ({ default: m.ProfileProdiLayout })))
const AboutProfileProdi = lazy(() => import('@/pages/modules/website-prodi/profile/about').then(m => ({ default: m.AboutProfileProdi })))
const ManagementUnitPage = lazy(() => import('@/pages/modules/website-prodi/profile/management-unit').then(m => ({ default: m.ManagementUnitPage })))
const ProfileVisionMissionPage = lazy(() => import('@/pages/modules/website-prodi/profile/vision-mission'))
const StructureOganizationProfilePage = lazy(() => import('@/pages/modules/website-prodi/profile/structure'))
const StaffProfilePage = lazy(() => import('@/pages/modules/website-prodi/profile/staff'))
const LecturerProfilePage = lazy(() => import('@/pages/modules/website-prodi/profile/dosen'))
const NewsPublishedProfile = lazy(() => import('@/pages/modules/website-prodi/profile/news').then(m => ({ default: m.NewsPublishedProfile })))
const ContactUsProfilePage = lazy(() => import('@/pages/modules/website-prodi/profile/contact-us'))
const NewsProdiPublicContentPage = lazy(() => import('@/pages/modules/website-prodi/public-content/news').then(m => ({ default: m.NewsProdiPublicContentPage })))
const NewsProdiCreated = lazy(() => import('@/pages/modules/website-prodi/public-content/news/created').then(m => ({ default: m.NewsProdiCreated })))
const NewsProdiUpdated = lazy(() => import('@/pages/modules/website-prodi/public-content/news/updated').then(m => ({ default: m.NewsProdiUpdated })))
const DetailNewsProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/news/detail').then(m => ({ default: m.DetailNewsProdiPage })))
const LogActivityNewsProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/news/log-data').then(m => ({ default: m.LogActivityNewsProdiPage })))
const AnnouncementProdiPublicContent = lazy(() => import('@/pages/modules/website-prodi/public-content/announcement').then(m => ({ default: m.AnnouncementProdiPublicContent })))
const CreatedAnnouncementProdi = lazy(() => import('@/pages/modules/website-prodi/public-content/announcement/created').then(m => ({ default: m.CreatedAnnouncementProdi })))
const UpdatedAnnouncementProdi = lazy(() => import('@/pages/modules/website-prodi/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementProdi })))
const AnnouncementProdiDetailPage = lazy(() => import('@/pages/modules/website-prodi/public-content/announcement/detail').then(m => ({ default: m.AnnouncementProdiDetailPage })))
const LogActivityAnnouncementProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementProdiPage })))
const AgendaProdiPublicContent = lazy(() => import('@/pages/modules/website-prodi/public-content/agenda').then(m => ({ default: m.AgendaProdiPublicContent })))
const CreateAgendaProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/agenda/created').then(m => ({ default: m.CreateAgendaProdiPage })))
const UpdatedAgendaProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaProdiPage })))
const AgendaProdiDetailPage = lazy(() => import('@/pages/modules/website-prodi/public-content/agenda/detail').then(m => ({ default: m.AgendaProdiDetailPage })))
const LogActivityAgendaProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaProdiPage })))
const DownloadFileProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/Download'))
const CategoryDownloadProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/Download/category').then(m => ({ default: m.CategoryDownloadProdiPage })))
const AddDownloadProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/Download/created').then(m => ({ default: m.AddDownloadProdiPage })))
const UpdatedDownloadProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/Download/updated').then(m => ({ default: m.UpdatedDownloadProdiPage })))
const PromotionProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/promotion').then(m => ({ default: m.PromotionProdiPage })))
const CreatedPromotionProdi = lazy(() => import('@/pages/modules/website-prodi/public-content/promotion/created').then(m => ({ default: m.CreatedPromotionProdi })))
const UpdatedPromotionProdi = lazy(() => import('@/pages/modules/website-prodi/public-content/promotion/updated').then(m => ({ default: m.UpdatedPromotionProdi })))
const LogActivityPromotionProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/promotion/log').then(m => ({ default: m.LogActivityPromotionProdiPage })))
const DetailPromotionPage = lazy(() => import('@/pages/modules/website-prodi/public-content/promotion/detail').then(m => ({ default: m.DetailPromotionPage })))
const QuestionFAQProdiPage = lazy(() => import('@/pages/modules/website-prodi/question/FAQ').then(m => ({ default: m.QuestionFAQProdiPage })))
const CategoryFAQProdiPage = lazy(() => import('@/pages/modules/website-prodi/question/FAQ/category').then(m => ({ default: m.CategoryFAQProdiPage })))
const FAQBackground = lazy(() => import('@/pages/modules/website-prodi/question/FAQ/background').then(m => ({ default: m.FAQBackground })))
const InboxMessage = lazy(() => import('@/pages/modules/website-prodi/question/inbox-message').then(m => ({ default: m.InboxMessage })))
const InboxBackground = lazy(() => import('@/pages/modules/website-prodi/question/inbox-message/background').then(m => ({ default: m.InboxBackground })))
const CurriculumProdiPage = lazy(() => import('@/pages/modules/website-prodi/curriculum').then(m => ({ default: m.CurriculumProdiPage })))
const DataProdiProfile = lazy(() => import('@/pages/modules/website-prodi/data-prodi').then(m => ({ default: m.DataProdiProfile })))
const UpdatedDataProdi = lazy(() => import('@/pages/modules/website-prodi/data-prodi/updated').then(m => ({ default: m.UpdatedDataProdi })))
const AccreditationProdiPage = lazy(() => import('@/pages/modules/website-prodi/accreditation').then(m => ({ default: m.AccreditationProdiPage })))
const GalleryVideoProdiPage = lazy(() => import('@/pages/modules/website-prodi/gallery/video').then(m => ({ default: m.GalleryVideoProdiPage })))
const LogActivityVideoProdi = lazy(() => import('@/pages/modules/website-prodi/gallery/video/log').then(m => ({ default: m.LogActivityVideoProdi })))
const AccreditationProdiLog = lazy(() => import('@/pages/modules/website-prodi/accreditation/log'))
const GalleryAlbumProdiPage = lazy(() => import('@/pages/modules/website-prodi/gallery/album').then(m => ({ default: m.GalleryAlbumProdiPage })))
const GalleryPhotoProdiPage = lazy(() => import('@/pages/modules/website-prodi/gallery/photo').then(m => ({ default: m.GalleryPhotoProdiPage })))
const LogActivityGalleryAlbum = lazy(() => import('@/pages/modules/website-prodi/gallery/album/log').then(m => ({ default: m.LogActivityGalleryAlbum })))
const GalleryProfileDetail = lazy(() => import('@/pages/modules/website-prodi/profile/gallery').then(m => ({ default: m.GalleryProfileDetail })))
const DashboardAdminProdi = lazy(() => import('@/pages/modules/website-prodi/dashboard'))
const CurriculumSubjectDetail = lazy(() => import('@/pages/modules/website-prodi/curriculum/subject-detail').then(m => ({ default: m.CurriculumSubjectDetail })))
const RegistrationQuestionPage = lazy(() => import('@/pages/modules/website-prodi/question/registration').then(m => ({ default: m.RegistrationQuestionPage })))
const LandingPageProdi = lazy(() => import('@/pages/modules/website-prodi/settings/landing-page').then(m => ({ default: m.LandingPageProdi })))
const LandingPromotion = lazy(() => import('@/pages/modules/website-prodi/settings/landing-promotion').then(m => ({ default: m.LandingPromotion })))
const BackgroundWebsiteSettings = lazy(() => import('@/pages/modules/website-prodi/settings/background').then(m => ({ default: m.BackgroundWebsiteSettings })))
const ServiceProdiPage = lazy(() => import('@/pages/modules/website-prodi/service').then(m => ({ default: m.ServiceProdiPage })))
const LogDataServicePage = lazy(() => import('@/pages/modules/website-prodi/service/log').then(m => ({ default: m.LogDataServicePage })))
const PrimaryAndFooterColorProdi = lazy(() => import('@/pages/modules/website-prodi/settings/color').then(m => ({ default: m.PrimaryAndFooterColorProdi })))
const TemplateWebsite = lazy(() => import('@/pages/modules/website-prodi/settings/template-website').then(m => ({ default: m.TemplateWebsite })))
const ThemaChangeColorProdi = lazy(() => import('@/pages/modules/website-prodi/settings/template-website/color').then(m => ({ default: m.ThemaChangeColorProdi })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

export const WebsiteProdiRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardAdminProdi />,
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
    path: 'data-prodi',
    children: [
      {
        index: true,
        element: <DataProdiProfile />,
      },
      {
        path: 'edit',
        element: <UpdatedDataProdi />,
      },
    ],
  },
  {
    path: 'profile',
    element: <ProfileProdiLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={'about'} />,
      },
      {
        path: 'about',
        element: <AboutProfileProdi />,
      },
      {
        path: 'management-unit',
        element: <ManagementUnitPage />,
      },
      {
        path: 'vision-mission',
        element: <ProfileVisionMissionPage />,
      },
      {
        path: 'organization-structure',
        element: <StructureOganizationProfilePage />,
      },
      {
        path: 'staff',
        element: <StaffProfilePage />,
      },
      {
        path: 'lecturer',
        element: <LecturerProfilePage />,
      },
      {
        path: 'news',
        element: <NewsPublishedProfile />,
      },
      {
        path: 'gallery',
        element: <GalleryProfileDetail />,
      },
      {
        path: 'contact-us',
        element: <ContactUsProfilePage />,
      },
      {
        path: '*',
        element: <></>,
      },
    ],
  },
  {
    path: 'service',
    children: [
      {
        index: true,
        element: <ServiceProdiPage />,
      },
      {
        path: 'log/:id',
        element: <LogDataServicePage />,
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
            element: <NewsProdiPublicContentPage />,
          },
          {
            path: 'add',
            element: <NewsProdiCreated />,
          },
          {
            path: 'edit/:id',
            element: <NewsProdiUpdated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsProdiPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsProdiPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementProdiPublicContent />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementProdi />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementProdi />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementProdiDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementProdiPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaProdiPublicContent />,
          },
          {
            path: 'add',
            element: <CreateAgendaProdiPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaProdiPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaProdiDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaProdiPage />,
          },
        ],
      },
      {
        path: 'promotion',
        children: [
          {
            index: true,
            element: <PromotionProdiPage />,
          },
          {
            path: 'add',
            element: <CreatedPromotionProdi />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedPromotionProdi />,
          },
          {
            path: 'detail/:id',
            element: <DetailPromotionPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityPromotionProdiPage />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFileProdiPage />,
          },
          {
            path: 'category',
            element: <CategoryDownloadProdiPage />,
          },
          {
            path: 'add',
            element: <AddDownloadProdiPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedDownloadProdiPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'accreditation',
    children: [
      {
        index: true,
        element: <AccreditationProdiPage />,
      },
      {
        path: 'log/:id',
        element: <AccreditationProdiLog />,
      },
    ],
  },
  {
    path: 'curriculum',
    children: [
      {
        index: true,
        element: <CurriculumProdiPage />,
      },
      {
        path: 'subject/:id',
        element: <CurriculumSubjectDetail />,
      },
    ],
  },
  {
    path: 'Gallery',
    children: [
      {
        path: 'video',
        children: [
          {
            index: true,
            element: <GalleryVideoProdiPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityVideoProdi />,
          },
        ],
      },
      {
        path: 'photo',
        children: [
          {
            index: true,
            element: <GalleryAlbumProdiPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityGalleryAlbum />,
          },
          {
            path: 'album/:id',
            element: <GalleryPhotoProdiPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'question',
    children: [
      {
        path: 'faq',
        children: [
          {
            index: true,
            element: <QuestionFAQProdiPage />,
          },
          {
            path: 'category',
            element: <CategoryFAQProdiPage />,
          },
          {
            path: 'background',
            element: <FAQBackground />,
          },
        ],
      },
      {
        path: 'inbox',
        children: [
          {
            index: true,
            element: <InboxMessage />,
          },
          {
            path: 'background',
            element: <InboxBackground />,
          },
        ],
      },
      {
        path: 'registration',
        element: <RegistrationQuestionPage />,
      },
    ],
  },
  {
    path: 'settings',
    children: [
      {
        path: 'landing-page',
        element: <LandingPageProdi />,
      },
      {
        path: 'landing-promosi',
        element: <LandingPromotion />,
      },
      {
        path: 'background',
        element: <BackgroundWebsiteSettings />,
      },
      {
        path: 'primary-color',
        element: <PrimaryAndFooterColorProdi />,
      },
      {
        path: 'template',
        children: [
          {
            index: true,
            element: <TemplateWebsite />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorProdi />,
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
