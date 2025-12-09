import { ProfilePageMainWebsite } from '@/pages/modules/website-utama/profile'
import { EditPageUniversity } from '@/pages/modules/website-utama/profile/editPage'
import { TopSliderPublicContent } from '@/pages/modules/website-utama/public-content/slider/top-slider'
import { CreateTopSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create'
import { UpdatedTopSliderPage } from '@/pages/modules/website-utama/public-content/slider/top-slider/updated'
import { BottomSliderPublicContent } from '@/pages/modules/website-utama/public-content/slider/bottom-slider'
import { CreateBottomSlider } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/create'
import { UpdatedBottomSlider } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/updated'
import NewsPublicContentPage from '@/pages/modules/website-utama/public-content/news'
import { CreatedNewsPage } from '@/pages/modules/website-utama/public-content/news/created'
import { UpdatedNewsPage } from '@/pages/modules/website-utama/public-content/news/updated'
import { DetailNewsPage } from '@/pages/modules/website-utama/public-content/news/detail/page.tsx'
import { AnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement'
import { CreateAnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement/created'
import { UpdatedAnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement/updated'

export const MainWebsiteRouter = [
  {
    path: 'dashboard',
    element: <></>,
  },
  {
    path: 'profile',
    children: [
      {
        index: true,
        element: <ProfilePageMainWebsite />,
      },
      {
        path: 'edit',
        element: <EditPageUniversity />,
      },
    ],
  },
  {
    path: 'public-content',
    children: [
      {
        path: 'slider',
        children: [
          {
            path: 'top-slider',
            children: [
              {
                index: true,
                element: <TopSliderPublicContent />,
              },
              {
                path: 'add',
                element: <CreateTopSlider />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedTopSliderPage />,
              },
            ],
          },
          {
            path: 'bottom-slider',
            children: [
              {
                index: true,
                element: <BottomSliderPublicContent />,
              },
              {
                path: 'add',
                element: <CreateBottomSlider />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedBottomSlider />,
              },
            ],
          },
        ],
      },
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
        ],
      },
      {
        path: '*',
        element: <></>,
      },
    ],
  },
]
