import { lazy } from 'react'

const UserProfilePage = lazy(() =>
  import('@/pages/modules/website-utama/user-profile').then((m) => ({ default: m.UserProfilePage }))
)
const ChangePassword = lazy(() =>
  import('@/pages/modules/website-utama/change-password').then((m) => ({ default: m.ChangePassword }))
)
import CreatePatient from '@/pages/modules/SIM-RS/reference/patient/created'
import { PoliPage } from '@/pages/modules/SIM-RS/reference/poli'
import CreatePoli from '@/pages/modules/SIM-RS/reference/poli/created'
import UpdatePoli from '@/pages/modules/SIM-RS/reference/poli/updated'
import DetailPoli from '@/pages/modules/SIM-RS/reference/poli/detail'
import { RoomTypePage } from '@/pages/modules/SIM-RS/reference/room-type'
import { RoomPage } from '@/pages/modules/SIM-RS/reference/room'
import CreateRoom from '@/pages/modules/SIM-RS/reference/room/created'
import UpdateRoom from '@/pages/modules/SIM-RS/reference/room/updated'
import { SpecialistPage } from '@/pages/modules/SIM-RS/reference/specialist'
import { DoctorPage } from '@/pages/modules/SIM-RS/reference/doctor'
import CreateDoctor from '@/pages/modules/SIM-RS/reference/doctor/created'
import UpdateDoctor from '@/pages/modules/SIM-RS/reference/doctor/updated'

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
      {
        path: 'poli',
        children: [
          {
            index: true,
            element: <PoliPage />,
          },
          {
            path: 'add',
            element: <CreatePoli />,
          },
          {
            path: 'edit/:id',
            element: <UpdatePoli />,
          },
          {
            path: 'detail/:id',
            element: <DetailPoli />,
          },
        ],
      },
      {
        path: 'room-type',
        children: [
          {
            index: true,
            element: <RoomTypePage />,
          },
        ],
      },
      {
        path: 'room',
        children: [
          {
            index: true,
            element: <RoomPage />,
          },
          {
            path: 'add',
            element: <CreateRoom />,
          },
          {
            path: 'edit/:id',
            element: <UpdateRoom />,
          },
        ],
      },
      {
        path: 'specialist',
        children: [
          {
            index: true,
            element: <SpecialistPage />,
          },
        ],
      },
      {
        path: 'doctor',
        children: [
          {
            index: true,
            element: <DoctorPage />,
          },
          {
            path: 'add',
            element: <CreateDoctor />,
          },
          {
            path: 'edit/:id',
            element: <UpdateDoctor />,
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
