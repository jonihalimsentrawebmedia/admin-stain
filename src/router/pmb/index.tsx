import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { DetailProfilePMB } from '@/pages/modules/PMB/data-pmb'
import { UpdatedDataPMB } from '@/pages/modules/PMB/data-pmb/updated'
import EntrancePMGPage from '@/pages/modules/PMB/entrance'
import { ContentEntrancePMb } from '@/pages/modules/PMB/entrance/content'
import { ListAnnouncementPMB } from '@/pages/modules/PMB/public-content/announcement'
import { CreatedAnnouncementPMB } from '@/pages/modules/PMB/public-content/announcement/created'
import { DetailAnnouncementPMB } from '@/pages/modules/PMB/public-content/announcement/detail'
import { UpdatedAnnouncementPMB } from '@/pages/modules/PMB/public-content/announcement/updated'
import { LogActivityAnnouncementPMB } from '@/pages/modules/PMB/public-content/announcement/log'
import { QuestionFAQPMBPage } from '@/pages/modules/PMB/FAQ'
import { CategoryFAQPMBPage } from '@/pages/modules/PMB/FAQ/category'
import { LandingPagePMB } from '@/pages/modules/PMB/settings/landing'
import ColorSettingPMB from '@/pages/modules/PMB/settings/color/ColorSettingService.tsx'
import { TemplateWebPMB } from '@/pages/modules/PMB/settings/template-web'
import { ThemaChangeColorPMB } from '@/pages/modules/PMB/settings/template-web/color'

export const PMB_ROUTES = [
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
