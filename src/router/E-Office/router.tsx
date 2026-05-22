import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import ListLetterNature from '@/pages/modules/E-Office/reference/letter-nature'
import ListLetterType from '@/pages/modules/E-Office/reference/letter-type'
import ListLetterOrigin from '@/pages/modules/E-Office/reference/letter-origin'
import ListLetterClassification from '@/pages/modules/E-Office/reference/letter-classification'
import ListReminderAgenda from '@/pages/modules/E-Office/reference/reminder-agenda'

export const E_OFFICE_ROUTE = [
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
        path: 'letter-nature',
        element: <ListLetterNature />,
      },
      {
        path: 'letter-type',
        element: <ListLetterType />,
      },
      {
        path: 'letter-origin',
        element: <ListLetterOrigin />,
      },
      {
        path: 'letter-classification',
        element: <ListLetterClassification />,
      },
      {
        path: 'reminder-agenda',
        element: <ListReminderAgenda />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
