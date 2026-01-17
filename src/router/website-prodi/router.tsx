import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { Navigate } from 'react-router-dom'
import { ProfileProdiLayout } from '@/pages/modules/website-prodi/profile/layout'
import { AboutProfileProdi } from '@/pages/modules/website-prodi/profile/about'
import { ManagementUnitPage } from '@/pages/modules/website-prodi/profile/management-unit'
import ProfileVisionMissionPage from '@/pages/modules/website-prodi/profile/vision-mission'
import StructureOganizationProfilePage from '@/pages/modules/website-prodi/profile/structure'
import StaffProfilePage from '@/pages/modules/website-prodi/profile/staff'
import LecturerProfilePage from '@/pages/modules/website-prodi/profile/dosen'
import { NewsPublishedProfile } from '@/pages/modules/website-prodi/profile/news'
import ContactUsProfilePage from '@/pages/modules/website-prodi/profile/contact-us'
import { NewsProdiPublicContentPage } from '@/pages/modules/website-prodi/public-content/news'
import { NewsProdiCreated } from '@/pages/modules/website-prodi/public-content/news/created'
import { NewsProdiUpdated } from '@/pages/modules/website-prodi/public-content/news/updated'
import { DetailNewsProdiPage } from '@/pages/modules/website-prodi/public-content/news/detail'
import { LogActivityNewsProdiPage } from '@/pages/modules/website-prodi/public-content/news/log-data'
import { AnnouncementProdiPublicContent } from '@/pages/modules/website-prodi/public-content/announcement'
import { CreatedAnnouncementProdi } from '@/pages/modules/website-prodi/public-content/announcement/created'
import { UpdatedAnnouncementProdi } from '@/pages/modules/website-prodi/public-content/announcement/updated'
import { AnnouncementProdiDetailPage } from '@/pages/modules/website-prodi/public-content/announcement/detail'
import { LogActivityAnnouncementProdiPage } from '@/pages/modules/website-prodi/public-content/announcement/log'
import { AgendaProdiPublicContent } from '@/pages/modules/website-prodi/public-content/agenda'
import { CreateAgendaProdiPage } from '@/pages/modules/website-prodi/public-content/agenda/created'
import { UpdatedAgendaProdiPage } from '@/pages/modules/website-prodi/public-content/agenda/updated'
import { AgendaProdiDetailPage } from '@/pages/modules/website-prodi/public-content/agenda/detail'
import { LogActivityAgendaProdiPage } from '@/pages/modules/website-prodi/public-content/agenda/log'
import DownloadFileProdiPage from '@/pages/modules/website-prodi/public-content/Download'
import { CategoryDownloadProdiPage } from '@/pages/modules/website-prodi/public-content/Download/category'
import { AddDownloadProdiPage } from '@/pages/modules/website-prodi/public-content/Download/created'
import { UpdatedDownloadProdiPage } from '@/pages/modules/website-prodi/public-content/Download/updated'
import { PromotionProdiPage } from '@/pages/modules/website-prodi/public-content/promotion'
import { CreatedPromotionProdi } from '@/pages/modules/website-prodi/public-content/promotion/created'
import { UpdatedPromotionProdi } from '@/pages/modules/website-prodi/public-content/promotion/updated'
import { LogActivityPromotionProdiPage } from '@/pages/modules/website-prodi/public-content/promotion/log'
import { DetailPromotionPage } from '@/pages/modules/website-prodi/public-content/promotion/detail'
import { QuestionFAQProdiPage } from '@/pages/modules/website-prodi/question/FAQ'
import { CategoryFAQProdiPage } from '@/pages/modules/website-prodi/question/FAQ/category'
import { InboxMessage } from '@/pages/modules/website-prodi/question/inbox-message'
import { CurriculumProdiPage } from '@/pages/modules/website-prodi/curriculum'
import { DataProdiProfile } from '@/pages/modules/website-prodi/data-prodi'
import { UpdatedDataProdi } from '@/pages/modules/website-prodi/data-prodi/updated'
import { AccreditationProdiPage } from '@/pages/modules/website-prodi/accreditation'
import { GalleryVideoProdiPage } from '@/pages/modules/website-prodi/gallery/video'
import AccreditationProdiLog from '@/pages/modules/website-prodi/accreditation/log'
import { GalleryAlbumProdiPage } from '@/pages/modules/website-prodi/gallery/album'
import { GalleryPhotoProdiPage } from '@/pages/modules/website-prodi/gallery/photo'
import { LogActivityGalleryAlbum } from '@/pages/modules/website-prodi/gallery/album/log'
import { GalleryProfileDetail } from '@/pages/modules/website-prodi/profile/gallery'
import DashboardAdminProdi from '@/pages/modules/website-prodi/dashboard'
import { CurriculumSubjectDetail } from '@/pages/modules/website-prodi/curriculum/suject-detail'
import { RegistrationQuestionPage } from '@/pages/modules/website-prodi/question/registration'
import { LandingPageProdi } from '@/pages/modules/website-prodi/settings/landing-page'
import { LandingPromotion } from '@/pages/modules/website-prodi/settings/landing-promotion'
import { BackgroundWebsiteSettings } from '@/pages/modules/website-prodi/settings/background'
import { ServiceProdiPage } from '@/pages/modules/website-prodi/service'
import { LogDataServicePage } from '@/pages/modules/website-prodi/service/log'

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
        element: <GalleryVideoProdiPage />,
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
        ],
      },
      {
        path: 'inbox',
        element: <InboxMessage />,
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
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
