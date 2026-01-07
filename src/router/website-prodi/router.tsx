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
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
