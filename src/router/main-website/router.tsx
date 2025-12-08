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
        ],
      },
      {
        path: '*',
        element: <></>,
      },
    ],
  },
]
