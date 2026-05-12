import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { DetailProfilePMB } from '@/pages/modules/PMB/data-pmb'
import { UpdatedDataPMB } from '@/pages/modules/PMB/data-pmb/updated'
import EntrancePMGPage from '@/pages/modules/PMB/entrance'

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
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
