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

export const WebsiteProdiRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <></>,
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
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
