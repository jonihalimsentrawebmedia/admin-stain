import { ProfilePageMainWebsite } from '@/pages/modules/website-utama/profile'
import { EditPageUniversity } from '@/pages/modules/website-utama/profile/editPage'
import { TopSliderPublicContent } from '@/pages/modules/website-utama/public-content/slider/top-slider'
import { CreateTopSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create'
import { UpdatedTopSliderPage } from '@/pages/modules/website-utama/public-content/slider/top-slider/updated'

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
        ],
      },
      {
        path: '*',
        element: <></>,
      },
    ],
  },
]
