import { lazy } from 'react'

const UserProfilePage = lazy(() =>
  import('@/pages/modules/website-utama/user-profile').then((m) => ({ default: m.UserProfilePage }))
)
const ChangePassword = lazy(() =>
  import('@/pages/modules/website-utama/change-password').then((m) => ({
    default: m.ChangePassword,
  }))
)
const ListLetterNature = lazy(() => import('@/pages/modules/E-Office/reference/letter-nature'))
const ListLetterType = lazy(() => import('@/pages/modules/E-Office/reference/letter-type'))
const ListLetterOrigin = lazy(() => import('@/pages/modules/E-Office/reference/letter-origin'))
const ListLetterClassification = lazy(
  () => import('@/pages/modules/E-Office/reference/letter-classification')
)
const ListReminderAgenda = lazy(() => import('@/pages/modules/E-Office/reference/reminder-agenda'))
// const ListTemplateSurat = lazy(() => import('@/pages/modules/E-Office/reference/template-surat'))
// const CreateTemplateSurat = lazy(
//   () => import('@/pages/modules/E-Office/reference/template-surat/create')
// )
// const UpdateTemplateSurat = lazy(
//   () => import('@/pages/modules/E-Office/reference/template-surat/update')
// )
// const DetailTemplateSurat = lazy(
//   () => import('@/pages/modules/E-Office/reference/template-surat/detail')
// )
// const GenerateSuratView = lazy(
//   () => import('@/pages/modules/E-Office/reference/template-surat/generate')
// )
const TypeServiceListPage = lazy(() => import('@/pages/modules/E-Office/services/type-service'))
const RegistrationInbox = lazy(() =>
  import('@/pages/modules/E-Office/inbox/registration-inbox').then((m) => ({
    default: m.RegistrationInbox,
  }))
)
const DetailInboxRegistration = lazy(() =>
  import('@/pages/modules/E-Office/inbox/registration-inbox/detail').then((m) => ({
    default: m.DetailInboxRegistration,
  }))
)
const RegistrationInboxEdit = lazy(() =>
  import('@/pages/modules/E-Office/inbox/registration-inbox/edit').then((m) => ({
    default: m.RegistrationInboxEdit,
  }))
)
const ListInbox = lazy(() =>
  import('@/pages/modules/E-Office/inbox/list-inbox').then((m) => ({ default: m.ListInbox }))
)
const RegistrationOutbox = lazy(() =>
  import('@/pages/modules/E-Office/outbox/registration-outbox').then((m) => ({
    default: m.RegistrationOutbox,
  }))
)
const DetailOutboxRegistration = lazy(() =>
  import('@/pages/modules/E-Office/outbox/registration-outbox/detail').then((m) => ({
    default: m.DetailOutboxRegistration,
  }))
)
const ListOutbox = lazy(() =>
  import('@/pages/modules/E-Office/outbox/list-outbox').then((m) => ({ default: m.ListOutbox }))
)
const RegistrationOutboxEdit = lazy(() =>
  import('@/pages/modules/E-Office/outbox/registration-outbox/edit').then((m) => ({
    default: m.RegistrationOutboxEdit,
  }))
)
const DispositionListPage = lazy(() => import('@/pages/modules/E-Office/inbox/disposition'))
const DetailDisposition = lazy(() =>
  import('@/pages/modules/E-Office/inbox/disposition/detail').then((m) => ({
    default: m.DetailDisposition,
  }))
)
const CopyLetterPage = lazy(() =>
  import('@/pages/modules/E-Office/inbox/copy-letter').then((m) => ({ default: m.CopyLetterPage }))
)
const DetailCopyLetterPage = lazy(() =>
  import('@/pages/modules/E-Office/inbox/copy-letter/detail').then((m) => ({
    default: m.DetailCopyLetterPage,
  }))
)
const ListAgendaInboxPage = lazy(() =>
  import('@/pages/modules/E-Office/agenda/inbox').then((m) => ({ default: m.ListAgendaInboxPage }))
)
const ListAgendaOutboxPage = lazy(() =>
  import('@/pages/modules/E-Office/agenda/outbox').then((m) => ({
    default: m.ListAgendaOutboxPage,
  }))
)
const AcceptNotificationPage = lazy(() =>
  import('@/pages/modules/E-Office/settings/accept-notification').then((m) => ({
    default: m.AcceptNotificationPage,
  }))
)
const GustBookList = lazy(() => import('@/pages/modules/E-Office/gustbook'))
const CreateGustBook = lazy(() => import('@/pages/modules/E-Office/gustbook/create'))
const PurposeTypePage = lazy(() => import('@/pages/modules/E-Office/reference/purpose-type'))
const PurposeGuestPage = lazy(() => import('@/pages/modules/E-Office/reference/purpose-guest'))
const QuestionnairePage = lazy(() => import('@/pages/modules/E-Office/questionnaire'))
const CreateQuantitativeQuestionnaire = lazy(
  () => import('@/pages/modules/E-Office/questionnaire/quantitative')
)
const UpdatedGustBook = lazy(() => import('@/pages/modules/E-Office/gustbook/Updated'))
const CreateQualitativeQuestionnaire = lazy(
  () => import('@/pages/modules/E-Office/questionnaire/qualitative')
)
const UpdatedQuantitativeQuestionnaire = lazy(
  () => import('@/pages/modules/E-Office/questionnaire/quantitative/updated')
)
const UpdatedQualitativeQuestionnaire = lazy(
  () => import('@/pages/modules/E-Office/questionnaire/qualitative/updated')
)
const DetailQuestionnaire = lazy(() => import('@/pages/modules/E-Office/questionnaire/detail'))
const EventDataActivity = lazy(() => import('@/pages/modules/E-Office/event-activity/event-data'))
const DetailEventActivity = lazy(
  () => import('@/pages/modules/E-Office/event-activity/event-data/detail')
)
const ReportEventActivity = lazy(() => import('@/pages/modules/E-Office/event-activity/report'))
const PrintAttendanceList = lazy(
  () => import('@/pages/modules/E-Office/event-activity/event-data/printAttendance')
)
const LetterHeader = lazy(() =>
  import('@/pages/modules/E-Office/settings/letter-header').then((m) => ({
    default: m.LetterHeader,
  }))
)
const DashboardEOfficePage = lazy(() => import('@/pages/modules/E-Office/dashboard'))
// const ListSuratGenerated = lazy(() => import('@/pages/modules/E-Office/surat-generated'))
// const DetailSuratGenerated = lazy(() => import('@/pages/modules/E-Office/surat-generated/detail'))

export const E_OFFICE_ROUTE = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardEOfficePage />,
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
  // {
  //   path: 'surat-generated',
  //   children: [
  //     {
  //       index: true,
  //       element: <ListSuratGenerated />,
  //     },
  //     {
  //       path: 'detail/:id',
  //       element: <DetailSuratGenerated />,
  //     },
  //   ],
  // },
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
      // {
      //   path: 'template-surat',
      //   children: [
      //     {
      //       index: true,
      //       element: <ListTemplateSurat />,
      //     },
      //     {
      //       path: 'create',
      //       element: <CreateTemplateSurat />,
      //     },
      //     {
      //       path: 'update/:id',
      //       element: <UpdateTemplateSurat />,
      //     },
      //     {
      //       path: 'detail/:id',
      //       element: <DetailTemplateSurat />,
      //     },
      //     {
      //       path: 'generate/:id',
      //       element: <GenerateSuratView />,
      //     },
      //   ],
      // },
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
      {
        path: 'letter-header',
        element: <LetterHeader />,
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
              {
                path: 'edit/:id',
                element: <UpdatedQuantitativeQuestionnaire />,
              },
              {
                path: 'detail/:id',
                element: <DetailQuestionnaire />,
              },
            ],
          },
          {
            path: 'qualitative',
            children: [
              {
                path: 'add',
                element: <CreateQualitativeQuestionnaire />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedQualitativeQuestionnaire />,
              },
              {
                path: 'detail/:id',
                element: <DetailQuestionnaire />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'event-activity',
    children: [
      {
        path: 'event-data',
        children: [
          {
            index: true,
            element: <EventDataActivity />,
          },
          {
            path: 'detail/:id',
            element: <DetailEventActivity />,
          },
          {
            path: 'print/:id',
            element: <PrintAttendanceList />,
          },
        ],
      },
      {
        path: 'report',
        element: <ReportEventActivity />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
