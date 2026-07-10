import { lazy } from 'react'
import NumberOfCodeLetterPage from '@/pages/modules/E-Office/Letter-Generation/code-letter'
import CreatedCodeLetterGenerated from '@/pages/modules/E-Office/Letter-Generation/code-letter/created'
import LetterTypePage from '@/pages/modules/E-Office/Letter-Generation/Letter-type'
import UpdatedCodeLetterGenerated from '@/pages/modules/E-Office/Letter-Generation/code-letter/updated'
import DetailLetterType from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail'
import ListTemplateLetterType from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template'
import ListIsiTemplateSurat from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/isi-template'
import CreateLetterByTypePage from '@/pages/modules/E-Office/Letter-Generation/create-letter'
import ListLetterGeneratePage from '@/pages/modules/E-Office/Letter-Generation/letter-list'
import UpdatedLetterByTemplate from '@/pages/modules/E-Office/Letter-Generation/letter-list/update'
import DetailLetterTemplate from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail'
import BudgetOfficialTravel from '@/pages/modules/E-Office/official-travel/budget'
import LetterOfAssigment from '@/pages/modules/E-Office/official-travel/Letter-Assigment'
import CreatedLetterAssigment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/created'
import UpdatedLetterAssigment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/updated'
import DetailLetterAssigment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail'
import LupSumAssignmentLetter from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/lupsum'
import LupSumUpdated from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/lupsum/updated'
import ListPejabat from '@/pages/modules/E-Office/official-travel/pejabat'
import ReportLetterSPPDAssignment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/report'
import DocumentationLetterAssigment from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/documentation'
import ListDetailGroupLetter from '@/pages/modules/E-Office/Letter-Generation/create-letter/detail-list'
import CreateLetterByTemplate from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate'
import EReceiptPage from '@/pages/modules/E-Office/E-Receipt'
import InvoiceEReceiptPage from '@/pages/modules/E-Office/E-Receipt/invoice'
import SuratKeteranganAktifMahasiswaPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifMahasiswa'
import SuratKeteranganCutiAkademikPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganCutiAkademik'
import SuratPengantarPenelitianPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarPenelitian'

import UpdateSuratKeteranganAktifMahasiswaPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKAM/updated.tsx'
import DetailSKCALetterPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKCA'
import UpdateSuratKeteranganCutiAkademikPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKCA/update.tsx'
import DetailDataSKAM from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKAM'
import UpdateSuratPengantarPenelitianPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPP/update.tsx'
import DetailLetterSPPPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPP'
import SuratPermohonanMagangPKL from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPermohonanMagangPKL'
import SuratPengantarKKN from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarKKN'
import SuratKeteranganAktifKembaliPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganAktifKembali'
import SuratBebasPustakaPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratBebasPustaka'
import SuratKeteranganBebasKeuanganPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasKeuangan'
import SuratKeteranganBebasAkademikPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratKeteranganBebasAkademik'
import UpdatedSuratPermohonanMagangPKL from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPM/updated.tsx'
import UpdatedSuratPengantarKKN from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPK/updated.tsx'
import UpdatedSuratKeteranganAktifKembaliPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKAK/updated.tsx'
import UpdatedSuratBebasPustakaPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBP/updated.tsx'
import UpdatedSuratKeteranganBebasKeuanganPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBK/updated.tsx'
import UpdatedSuratKeteranganBebasAkademikPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBA/updated.tsx'
import DetailSuratPermohonanMagang from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPM'
import DetailSuratPengantarKKN from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPK'
import DetailDataSKAK from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKAK'
import DetailDataSKBP from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBP'
import DetailDataSKBK from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBK'
import DetailDataSKBA from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SKBA'
import SuratRekomendasiBeasiswaPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratRekomendasiBeasiswa'
import DetailDataSRB from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SRB'
import UpdateSuratRekomendasiBeasiswaPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SRB/update.tsx'
import SuratPengantarObservasiPage from '@/pages/modules/E-Office/Letter-Generation/create-letter/CreateByTemplate/SuratPengantarObservasi'
import UpdatedSuratPengantarObservasiPage from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPO/updated.tsx'
import DetailDataSPO from '@/pages/modules/E-Office/Letter-Generation/letter-list/detail/SPO'
import LogDataStudent from '@/pages/modules/E-Office/students/student-data/log-data'

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
const ListTransportType = lazy(() => import('@/pages/modules/E-Office/reference/transport-type'))
const ListBiayaType = lazy(() => import('@/pages/modules/E-Office/reference/costing-type'))
const ListLetterOrigin = lazy(() => import('@/pages/modules/E-Office/reference/letter-origin'))
const ListLetterClassification = lazy(
  () => import('@/pages/modules/E-Office/reference/letter-classification')
)
const ListReminderAgenda = lazy(() => import('@/pages/modules/E-Office/reference/reminder-agenda'))

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
const ListAdmissionProcess = lazy(
  () => import('@/pages/modules/E-Office/students/admission-process')
)
const ListStudentStatus = lazy(() => import('@/pages/modules/E-Office/students/student-status'))
const ListReligion = lazy(() => import('@/pages/modules/E-Office/students/religion'))
const ListStudyProgram = lazy(() => import('@/pages/modules/E-Office/students/study-program'))
const ListStudentData = lazy(() => import('@/pages/modules/E-Office/students/student-data'))
const CreateStudentData = lazy(
  () => import('@/pages/modules/E-Office/students/student-data/create')
)
const UpdatedStudentData = lazy(
  () => import('@/pages/modules/E-Office/students/student-data/Updated')
)
const DetailStudentData = lazy(
  () => import('@/pages/modules/E-Office/students/student-data/detail')
)
const ImportStudentData = lazy(
  () => import('@/pages/modules/E-Office/students/student-data/import')
)

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
  {
    path: 'letter-generation',
    children: [
      {
        path: 'code-letter',
        children: [
          {
            index: true,
            element: <NumberOfCodeLetterPage />,
          },
          {
            path: 'add',
            element: <CreatedCodeLetterGenerated />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedCodeLetterGenerated />,
          },
        ],
      },
      {
        path: 'letter-type',
        children: [
          {
            index: true,
            element: <LetterTypePage />,
          },
          {
            path: 'detail/:id',
            children: [
              {
                index: true,
                element: <DetailLetterType />,
              },
              {
                path: 'detail/:id_template',
                element: <ListTemplateLetterType />,
              },
              {
                path: 'detail/:id_template/isi/:id_template_surat',
                element: <ListIsiTemplateSurat />,
              },
            ],
          },
        ],
      },
      {
        path: 'create-letter',
        children: [
          {
            index: true,
            element: <CreateLetterByTypePage />,
          },
          {
            path: 'create/:id',
            children: [
              {
                index: true,
                element: <ListDetailGroupLetter />,
              },
              {
                path: `U-1`,
                element: <CreateLetterByTemplate />,
              },
              {
                path: 'SKAM-1',
                element: <SuratKeteranganAktifMahasiswaPage />,
              },
              {
                path: 'SKCA-1',
                element: <SuratKeteranganCutiAkademikPage />,
              },
              {
                path: 'SPP-1',
                element: <SuratPengantarPenelitianPage />,
              },
              {
                path: 'SPM-1',
                element: <SuratPermohonanMagangPKL />,
              },
              {
                path: 'SPK-1',
                element: <SuratPengantarKKN />,
              },
              {
                path: 'SKAK-1',
                element: <SuratKeteranganAktifKembaliPage />,
              },
              {
                path: 'SKBP-1',
                element: <SuratBebasPustakaPage />,
              },
              {
                path: 'SKBK-1',
                element: <SuratKeteranganBebasKeuanganPage />,
              },
              {
                path: 'SKBA-1',
                element: <SuratKeteranganBebasAkademikPage />,
              },
              {
                path: 'SRB-1',
                element: <SuratRekomendasiBeasiswaPage />,
              },
              {
                path: 'SPO-1',
                element: <SuratPengantarObservasiPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'letter-list',
        children: [
          {
            index: true,
            element: <ListLetterGeneratePage />,
          },
          {
            path: 'detail/:id',
            children: [
              {
                path: 'U-1',
                element: <DetailLetterTemplate />,
              },
              {
                path: 'SKAM-1',
                element: <DetailDataSKAM />,
              },
              {
                path: 'SKCA-1',
                element: <DetailSKCALetterPage />,
              },
              {
                path: 'SPP-1',
                element: <DetailLetterSPPPage />,
              },
              {
                path: 'SPM-1',
                element: <DetailSuratPermohonanMagang />,
              },
              {
                path: 'SPK-1',
                element: <DetailSuratPengantarKKN />,
              },
              {
                path: 'SKAK-1',
                element: <DetailDataSKAK />,
              },
              {
                path: 'SKBP-1',
                element: <DetailDataSKBP />,
              },
              {
                path: 'SKBK-1',
                element: <DetailDataSKBK />,
              },
              {
                path: 'SKBA-1',
                element: <DetailDataSKBA />,
              },
              {
                path: 'SRB-1',
                element: <DetailDataSRB />,
              },
              {
                path: 'SPO-1',
                element: <DetailDataSPO />,
              },
            ],
          },
          {
            path: 'edit/:id',
            children: [
              {
                path: 'U-1',
                element: <UpdatedLetterByTemplate />,
              },
              {
                path: 'SKAM-1',
                element: <UpdateSuratKeteranganAktifMahasiswaPage />,
              },
              {
                path: 'SKCA-1',
                element: <UpdateSuratKeteranganCutiAkademikPage />,
              },
              {
                path: 'SPP-1',
                element: <UpdateSuratPengantarPenelitianPage />,
              },
              {
                path: 'SPM-1',
                element: <UpdatedSuratPermohonanMagangPKL />,
              },
              {
                path: 'SPK-1',
                element: <UpdatedSuratPengantarKKN />,
              },
              {
                path: 'SKAK-1',
                element: <UpdatedSuratKeteranganAktifKembaliPage />,
              },
              {
                path: 'SKBP-1',
                element: <UpdatedSuratBebasPustakaPage />,
              },
              {
                path: 'SKBK-1',
                element: <UpdatedSuratKeteranganBebasKeuanganPage />,
              },
              {
                path: 'SKBA-1',
                element: <UpdatedSuratKeteranganBebasAkademikPage />,
              },
              {
                path: 'SRB-1',
                element: <UpdateSuratRekomendasiBeasiswaPage />,
              },
              {
                path: 'SPO-1',
                element: <UpdatedSuratPengantarObservasiPage />,
              },
            ],
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
        path: 'transport-type',
        element: <ListTransportType />,
      },
      {
        path: 'costing-type',
        element: <ListBiayaType />,
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
    path: 'official-travel',
    children: [
      {
        path: 'pejabat',
        element: <ListPejabat />,
      },
      {
        path: 'budget',
        element: <BudgetOfficialTravel />,
      },
      {
        path: 'letter-assignment',
        children: [
          {
            index: true,
            element: <LetterOfAssigment />,
          },
          {
            path: 'add',
            element: <CreatedLetterAssigment />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedLetterAssigment />,
          },
          {
            path: 'detail/:id',
            // element: <DetailLetterAssigment />,
            children: [
              {
                index: true,
                element: <DetailLetterAssigment />,
              },
              {
                path: 'lupsum',
                element: <LupSumAssignmentLetter />,
              },
              {
                path: 'lupsum/:id_employee',
                element: <LupSumUpdated />,
              },
              {
                path: 'report',
                element: <ReportLetterSPPDAssignment />,
              },
              {
                path: 'documentation',
                element: <DocumentationLetterAssigment />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'student',
    children: [
      {
        path: 'admission-process',
        element: <ListAdmissionProcess />,
      },
      {
        path: 'student-status',
        element: <ListStudentStatus />,
      },
      {
        path: 'religion',
        element: <ListReligion />,
      },
      {
        path: 'study-program',
        element: <ListStudyProgram />,
      },
      {
        path: 'student-data',
        children: [
          {
            index: true,
            element: <ListStudentData />,
          },
          {
            path: 'add',
            element: <CreateStudentData />,
          },
          {
            path: 'detail/:id',
            element: <DetailStudentData />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedStudentData />,
          },
          {
            path: 'log/:id',
            element: <LogDataStudent />,
          },
          {
            path: 'import',
            element: <ImportStudentData />,
          },
        ],
      },
    ],
  },
  {
    path: 'e-receipt',
    children: [
      {
        index: true,
        element: <EReceiptPage />,
      },
      {
        path: `invoice/:id`,
        element: <InvoiceEReceiptPage />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
