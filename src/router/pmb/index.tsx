import { lazy } from 'react'

const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const DetailProfilePMB = lazy(() => import('@/pages/modules/PMB/data-pmb').then(m => ({ default: m.DetailProfilePMB })))
const UpdatedDataPMB = lazy(() => import('@/pages/modules/PMB/data-pmb/updated').then(m => ({ default: m.UpdatedDataPMB })))
const EntrancePMGPage = lazy(() => import('@/pages/modules/PMB/entrance'))
const ContentEntrancePMb = lazy(() => import('@/pages/modules/PMB/entrance/content').then(m => ({ default: m.ContentEntrancePMb })))
const ListAnnouncementPMB = lazy(() => import('@/pages/modules/PMB/public-content/announcement').then(m => ({ default: m.ListAnnouncementPMB })))
const CreatedAnnouncementPMB = lazy(() => import('@/pages/modules/PMB/public-content/announcement/created').then(m => ({ default: m.CreatedAnnouncementPMB })))
const DetailAnnouncementPMB = lazy(() => import('@/pages/modules/PMB/public-content/announcement/detail').then(m => ({ default: m.DetailAnnouncementPMB })))
const UpdatedAnnouncementPMB = lazy(() => import('@/pages/modules/PMB/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementPMB })))
const LogActivityAnnouncementPMB = lazy(() => import('@/pages/modules/PMB/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementPMB })))
const QuestionFAQPMBPage = lazy(() => import('@/pages/modules/PMB/FAQ').then(m => ({ default: m.QuestionFAQPMBPage })))
const CategoryFAQPMBPage = lazy(() => import('@/pages/modules/PMB/FAQ/category').then(m => ({ default: m.CategoryFAQPMBPage })))
const LandingPagePMB = lazy(() => import('@/pages/modules/PMB/settings/landing').then(m => ({ default: m.LandingPagePMB })))
const ColorSettingPMB = lazy(() => import('@/pages/modules/PMB/settings/color/ColorSettingService.tsx'))
const TemplateWebPMB = lazy(() => import('@/pages/modules/PMB/settings/template-web').then(m => ({ default: m.TemplateWebPMB })))
const ThemaChangeColorPMB = lazy(() => import('@/pages/modules/PMB/settings/template-web/color').then(m => ({ default: m.ThemaChangeColorPMB })))
const DashboardPMB = lazy(() => import('@/pages/modules/PMB/dashboard'))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

export const PMB_ROUTES = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardPMB />,
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
    path: 'data-pmb',
    children: [
      {
        index: true,
        element: <DetailProfilePMB />,
      },
      {
        path: 'edit',
        element: <UpdatedDataPMB />,
      },
    ],
  },
  {
    path: 'entrance-pmb',
    children: [
      {
        index: true,
        element: <EntrancePMGPage />,
      },
      {
        path: 'content/:id',
        element: <ContentEntrancePMb />,
      },
    ],
  },
  {
    path: 'public-content',
    children: [
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <ListAnnouncementPMB />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementPMB />,
          },
          {
            path: 'detail/:id',
            element: <DetailAnnouncementPMB />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementPMB />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementPMB />,
          },
        ],
      },
    ],
  },
  {
    path: 'faq',
    children: [
      {
        index: true,
        element: <QuestionFAQPMBPage />,
      },
      {
        path: 'category',
        element: <CategoryFAQPMBPage />,
      },
    ],
  },
  {
    path: 'settings',
    children: [
      {
        path: 'landing-page',
        element: <LandingPagePMB />,
      },
      {
        path: 'color',
        element: <ColorSettingPMB />,
      },
      {
        path: 'template',
        // element: <TemplateWebPMB />,
        children: [
          {
            index: true,
            element: <TemplateWebPMB />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorPMB />,
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
