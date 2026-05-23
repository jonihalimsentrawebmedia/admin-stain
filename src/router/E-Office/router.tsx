import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import ListLetterNature from '@/pages/modules/E-Office/reference/letter-nature'
import ListLetterType from '@/pages/modules/E-Office/reference/letter-type'
import ListLetterOrigin from '@/pages/modules/E-Office/reference/letter-origin'
import ListLetterClassification from '@/pages/modules/E-Office/reference/letter-classification'
import ListReminderAgenda from '@/pages/modules/E-Office/reference/reminder-agenda'
import TypeServiceListPage from '@/pages/modules/E-Office/services/type-service'
import { RegistrationInbox } from '@/pages/modules/E-Office/inbox/registration-inbox'
import { DetailInboxRegistration } from '@/pages/modules/E-Office/inbox/registration-inbox/detail'
import { RegistrationInboxEdit } from '@/pages/modules/E-Office/inbox/registration-inbox/edit'
import { ListInbox } from '@/pages/modules/E-Office/inbox/list-inbox'

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
    path: 'inbox',
    children: [
      {
        path: 'registration-inbox',
        children: [
          {
            index: true,
            element: <RegistrationInbox />,
          },
          {
            path: 'detail/:id',
            element: <DetailInboxRegistration />,
          },
          {
            path: 'edit/:id',
            element: <RegistrationInboxEdit />,
          },
        ],
      },
      {
        path: 'inbox-list',
        children: [
          {
            index: true,
            element: <ListInbox />,
          },
        ],
      },
    ],
  },
  {
    path: 'service',
    children: [
      {
        path: 'service-type',
        element: <TypeServiceListPage />,
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
