import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import DashboardPulsikom from '@/pages/modules/Pulsikom/dashboard'
import { DetailProfilePuslikom } from '@/pages/modules/Pulsikom/data-pulsikom'
import { UpdatedDataPulsikom } from '@/pages/modules/Pulsikom/data-pulsikom/updated'
import { HistoryAboutPulsikom } from '@/pages/modules/Pulsikom/about/history'
import { VisionMissionPulsikom } from '@/pages/modules/Pulsikom/about/vision-mission'
import { ChiefOfficer } from '@/pages/modules/Pulsikom/about/chief-officer'
import { OfficiallyData } from '@/pages/modules/Pulsikom/about/chief-officer/officialy'

export const PusilkomRoutes = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardPulsikom />,
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
    path: 'data-pulsikom',
    children: [
      {
        index: true,
        element: <DetailProfilePuslikom />,
      },
      {
        path: 'edit',
        element: <UpdatedDataPulsikom />,
      },
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: 'History',
        element: <HistoryAboutPulsikom />,
      },
      {
        path: 'vision-mission',
        element: <VisionMissionPulsikom />,
      },
      {
        path: 'chief-officer',
        children: [
          {
            index: true,
            element: <ChiefOfficer />,
          },
          {
            path: 'official/:id',
            element: <OfficiallyData />,
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
