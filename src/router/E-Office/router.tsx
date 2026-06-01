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
import { RegistrationOutbox } from '@/pages/modules/E-Office/outbox/registration-outbox'
import { DetailOutboxRegistration } from '@/pages/modules/E-Office/outbox/registration-outbox/detail'
import { ListOutbox } from '@/pages/modules/E-Office/outbox/list-outbox'
import { RegistrationOutboxEdit } from '@/pages/modules/E-Office/outbox/registration-outbox/edit'
import DispositionListPage from '@/pages/modules/E-Office/inbox/disposition'
import { DetailDisposition } from '@/pages/modules/E-Office/inbox/disposition/detail'
import { CopyLetterPage } from '@/pages/modules/E-Office/inbox/copy-letter'
import { DetailCopyLetterPage } from '@/pages/modules/E-Office/inbox/copy-letter/detail'
import { ListAgendaInboxPage } from '@/pages/modules/E-Office/agenda/inbox'
import { ListAgendaOutboxPage } from '@/pages/modules/E-Office/agenda/outbox'
import { AcceptNotificationPage } from '@/pages/modules/E-Office/settings/accept-notification'
import GustBookList from '@/pages/modules/E-Office/gustbook'
import CreateGustBook from '@/pages/modules/E-Office/gustbook/create'
import PurposeTypePage from '@/pages/modules/E-Office/reference/purpose-type'
import PurposeGuestPage from '@/pages/modules/E-Office/reference/purpose-guest'
import QuestionnairePage from '@/pages/modules/E-Office/questionnaire'
import CreateQuantitativeQuestionnaire from '@/pages/modules/E-Office/questionnaire/quantitative'
import UpdatedGustBook from '@/pages/modules/E-Office/gustbook/Updated'

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
      {
        path: 'inbox-disposition',
        children: [
          {
            index: true,
            element: <DispositionListPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailDisposition />,
          },
        ],
      },
      {
        path: 'copy-letter',
        children: [
          {
            index: true,
            element: <CopyLetterPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailCopyLetterPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'outbox',
    children: [
      {
        path: 'registration-outbox',
        children: [
          {
            index: true,
            element: <RegistrationOutbox />,
          },
          {
            path: 'detail/:id',
            element: <DetailOutboxRegistration />,
          },
          {
            path: 'edit/:id',
            element: <RegistrationOutboxEdit />,
          },
        ],
      },
      {
        path: 'outbox-list',
        children: [
          {
            index: true,
            element: <ListOutbox />,
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
      {
        path: 'purpose-type',
        element: <PurposeTypePage />,
      },
      {
        path: 'purpose-guest',
        element: <PurposeGuestPage />,
      },
    ],
  },
  {
    path: 'agenda',
    children: [
      {
        path: 'inbox',
        element: <ListAgendaInboxPage />,
      },
      {
        path: 'outbox',
        element: <ListAgendaOutboxPage />,
      },
    ],
  },
  {
    path: 'settings',
    children: [
      {
        path: 'accept-notification',
        element: <AcceptNotificationPage />,
      },
    ],
  },
  {
    path: 'guestbook',
    children: [
      {
        path: 'guestbook-list',
        children: [
          {
            index: true,
            element: <GustBookList />,
          },
          {
            path: 'add',
            element: <CreateGustBook />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedGustBook />,
          },
        ],
      },
      {
        path: 'questionnaire',
        children: [
          {
            index: true,
            element: <QuestionnairePage />,
          },
          {
            path: 'quantitative',
            children: [
              {
                path: 'add',
                element: <CreateQuantitativeQuestionnaire />,
              },
            ],
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
