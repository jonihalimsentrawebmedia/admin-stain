import { lazy } from 'react'

const UserProfilePage = lazy(() =>
  import('@/pages/modules/website-utama/user-profile').then((m) => ({ default: m.UserProfilePage }))
)
const ChangePassword = lazy(() =>
  import('@/pages/modules/website-utama/change-password').then((m) => ({ default: m.ChangePassword }))
)
import CreatePatient from '@/pages/modules/SIM-RS/reference/patient/created'

export const SIMRSROUTES = [
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
    path: 'reference',
    children: [
      {
        path: 'patient',
        children: [
          {
            index: true,
            element: <></>,
          },
          {
            path: 'add',
            element: <CreatePatient />,
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
