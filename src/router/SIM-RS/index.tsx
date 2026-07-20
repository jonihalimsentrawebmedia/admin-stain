import { lazy } from 'react'
import { MedicinePage } from '@/pages/modules/SIM-RS/pharmacy/medicine'

const UserSimRSProfilePage = lazy(() =>
  import('@/pages/modules/SIM-RS/component/updated-detail').then((m) => ({
    default: m.UserSimRSProfilePage,
  }))
)
const ChangePasswordSIMRS = lazy(() =>
  import('@/pages/modules/SIM-RS/component/change-password').then((m) => ({
    default: m.ChangePasswordSIMRS,
  }))
)

const PatientPage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/patient').then((m) => ({ default: m.PatientPage }))
)
const CreatePatient = lazy(() => import('@/pages/modules/SIM-RS/reference/patient/created'))
const UpdatePatient = lazy(() => import('@/pages/modules/SIM-RS/reference/patient/updated'))
const DetailPatient = lazy(() => import('@/pages/modules/SIM-RS/reference/patient/detail'))
const PoliPage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/poli').then((m) => ({ default: m.PoliPage }))
)
const CreatePoli = lazy(() => import('@/pages/modules/SIM-RS/reference/poli/created'))
const UpdatePoli = lazy(() => import('@/pages/modules/SIM-RS/reference/poli/updated'))
const DetailPoli = lazy(() => import('@/pages/modules/SIM-RS/reference/poli/detail'))
const RoomTypePage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/room-type').then((m) => ({ default: m.RoomTypePage }))
)
const RoomPage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/room').then((m) => ({ default: m.RoomPage }))
)
const CreateRoom = lazy(() => import('@/pages/modules/SIM-RS/reference/room/created'))
const UpdateRoom = lazy(() => import('@/pages/modules/SIM-RS/reference/room/updated'))
const DetailRoom = lazy(() => import('@/pages/modules/SIM-RS/reference/room/detail'))
const SpecialistPage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/specialist').then((m) => ({ default: m.SpecialistPage }))
)
const DiagnosisRefPage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/diagnosis').then((m) => ({
    default: m.DiagnosisRefPage,
  }))
)
const ProcedurePage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/procedure').then((m) => ({ default: m.ProcedurePage }))
)
const SumberBiayaPage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/source-medical-treatment').then((m) => ({
    default: m.SumberBiayaPage,
  }))
)
const DoctorPage = lazy(() =>
  import('@/pages/modules/SIM-RS/reference/doctor').then((m) => ({ default: m.DoctorPage }))
)
const CreateDoctor = lazy(() => import('@/pages/modules/SIM-RS/reference/doctor/created'))
const UpdateDoctor = lazy(() => import('@/pages/modules/SIM-RS/reference/doctor/updated'))
const DetailDoctor = lazy(() => import('@/pages/modules/SIM-RS/reference/doctor/detail'))
const ProfileHospitalPage = lazy(() => import('@/pages/modules/SIM-RS/profile-rs'))
const RegisterPage = lazy(() =>
  import('@/pages/modules/SIM-RS/services/register').then((m) => ({ default: m.RegisterPage }))
)
const CreateRegistration = lazy(() => import('@/pages/modules/SIM-RS/services/register/created'))
const UpdateRegistration = lazy(() => import('@/pages/modules/SIM-RS/services/register/updated'))
const DetailRegistration = lazy(() => import('@/pages/modules/SIM-RS/services/register/detail'))
const DiagnosisPage = lazy(() => import('@/pages/modules/SIM-RS/services/register/diagnosis'))
const OutpatientPage = lazy(() => import('@/pages/modules/SIM-RS/services/outpatient'))
const DetailOutpatient = lazy(() => import('@/pages/modules/SIM-RS/services/outpatient/detail'))
const EditPemeriksaan = lazy(
  () => import('@/pages/modules/SIM-RS/services/outpatient/detail/edit-pemeriksaan')
)
const InvoiceOutPatient = lazy(
  () => import('@/pages/modules/SIM-RS/services/outpatient/invoice')
)
const InpatientPage = lazy(() => import('@/pages/modules/SIM-RS/services/inpatient'))
const DetailInpatient = lazy(() => import('@/pages/modules/SIM-RS/services/inpatient/detail'))
const BackHomeInpatient = lazy(() => import('@/pages/modules/SIM-RS/services/inpatient/back-home'))
const UpdatedInpatient = lazy(() => import('@/pages/modules/SIM-RS/services/inpatient/updated'))
const Dashboard = lazy(() => import('@/pages/modules/SIM-RS/services/dashboard'))
const DoctorSchedulePage = lazy(() =>
  import('@/pages/modules/SIM-RS/schedule').then((m) => ({ default: m.DoctorSchedulePage }))
)
const DetailJadwalDokter = lazy(() => import('@/pages/modules/SIM-RS/schedule/detail'))
const PatientReportPage = lazy(() =>
  import('@/pages/modules/SIM-RS/report/patient-report').then((m) => ({
    default: m.PatientReportPage,
  }))
)
const VisitReportPage = lazy(() =>
  import('@/pages/modules/SIM-RS/report/visit-report').then((m) => ({ default: m.VisitReportPage }))
)
const InpatientReportPage = lazy(() =>
  import('@/pages/modules/SIM-RS/report/inpatient-report').then((m) => ({
    default: m.InpatientReportPage,
  }))
)
const ColorSettingSIMRS = lazy(() => import('@/pages/modules/SIM-RS/setting/color'))
const CodeSettingSIMRS = lazy(() => import('@/pages/modules/SIM-RS/setting/code'))
const RolePage = lazy(() =>
  import('@/pages/modules/SIM-RS/user-management/role').then((m) => ({ default: m.RolePage }))
)
const CreateRole = lazy(() => import('@/pages/modules/SIM-RS/user-management/role/created'))
const UpdateRole = lazy(() => import('@/pages/modules/SIM-RS/user-management/role/updated'))
const UserListPage = lazy(() =>
  import('@/pages/modules/SIM-RS/user-management/user-list').then((m) => ({
    default: m.UserListPage,
  }))
)
const CreateUser = lazy(() => import('@/pages/modules/SIM-RS/user-management/user-list/created'))
const UpdateUser = lazy(() => import('@/pages/modules/SIM-RS/user-management/user-list/updated'))
const DetailUser = lazy(() => import('@/pages/modules/SIM-RS/user-management/user-list/detail'))

export const SIMRSROUTES = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'user-profile',
        element: <UserSimRSProfilePage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordSIMRS />,
      },
    ],
  },
  {
    path: 'profile',
    element: <ProfileHospitalPage />,
  },
  {
    path: 'reference',
    children: [
      {
        path: 'patient',
        children: [
          {
            index: true,
            element: <PatientPage />,
          },
          {
            path: 'add',
            element: <CreatePatient />,
          },
          {
            path: 'edit/:id',
            element: <UpdatePatient />,
          },
          {
            path: 'detail/:id',
            element: <DetailPatient />,
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
          {
            path: 'detail/:id',
            element: <DetailRoom />,
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
        path: 'diagnosis',
        children: [
          {
            index: true,
            element: <DiagnosisRefPage />,
          },
        ],
      },
      {
        path: 'procedure',
        children: [
          {
            index: true,
            element: <ProcedurePage />,
          },
        ],
      },
      {
        path: 'source-medical-treatment',
        children: [
          {
            index: true,
            element: <SumberBiayaPage />,
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
          {
            path: 'detail/:id',
            element: <DetailDoctor />,
          },
        ],
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        path: 'registration',
        children: [
          {
            index: true,
            element: <RegisterPage />,
          },
          {
            path: 'add',
            element: <CreateRegistration />,
          },
          {
            path: 'detail/:id',
            element: <DetailRegistration />,
          },
          {
            path: 'diagnosis/:id',
            element: <DiagnosisPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdateRegistration />,
          },
        ],
      },
      {
        path: 'outpatient',
        children: [
          {
            index: true,
            element: <OutpatientPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailOutpatient />,
          },
          {
            path: 'detail/:id/edit-pemeriksaan',
            element: <EditPemeriksaan />,
          },
          {
            path: 'invoice/:id',
            element: <InvoiceOutPatient />,
          },
        ],
      },
      {
        path: 'inpatient',
        children: [
          {
            index: true,
            element: <InpatientPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailInpatient />,
          },
          {
            path: 'back-home/:id',
            element: <BackHomeInpatient />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedInpatient />,
          },
        ],
      },
    ],
  },
  {
    path: 'schedule',
    children: [
      {
        index: true,
        element: <DoctorSchedulePage />,
      },
      {
        path: ':id',
        element: <DetailJadwalDokter />,
      },
    ],
  },
  {
    path: 'report',
    children: [
      {
        path: 'patient-report',
        element: <PatientReportPage />,
      },
      {
        path: 'visit-report',
        element: <VisitReportPage />,
      },
      {
        path: 'inpatient-report',
        element: <InpatientReportPage />,
      },
    ],
  },
  {
    path: 'setting',
    children: [
      {
        path: 'color',
        element: <ColorSettingSIMRS />,
      },
      {
        path: 'code',
        element: <CodeSettingSIMRS />,
      },
    ],
  },
  {
    path: 'user-management',
    children: [
      {
        path: 'role',
        children: [
          {
            index: true,
            element: <RolePage />,
          },
          {
            path: 'add',
            element: <CreateRole />,
          },
          {
            path: 'edit/:id',
            element: <UpdateRole />,
          },
        ],
      },
      {
        path: 'user-list',
        children: [
          {
            index: true,
            element: <UserListPage />,
          },
          {
            path: 'add',
            element: <CreateUser />,
          },
          {
            path: 'edit/:id',
            element: <UpdateUser />,
          },
          {
            path: 'detail/:id',
            element: <DetailUser />,
          },
        ],
      },
    ],
  },
  {
    path: 'pharmacy',
    children: [
      {
        path: 'medicine',
        element: <MedicinePage />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
