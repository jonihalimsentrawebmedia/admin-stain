import { lazy } from 'react'
import { PatientPage } from '@/pages/modules/SIM-RS/reference/patient'
import CreatePatient from '@/pages/modules/SIM-RS/reference/patient/created'
import UpdatePatient from '@/pages/modules/SIM-RS/reference/patient/updated'
import DetailPatient from '@/pages/modules/SIM-RS/reference/patient/detail'
import { PoliPage } from '@/pages/modules/SIM-RS/reference/poli'
import CreatePoli from '@/pages/modules/SIM-RS/reference/poli/created'
import UpdatePoli from '@/pages/modules/SIM-RS/reference/poli/updated'
import DetailPoli from '@/pages/modules/SIM-RS/reference/poli/detail'
import { RoomTypePage } from '@/pages/modules/SIM-RS/reference/room-type'
import { RoomPage } from '@/pages/modules/SIM-RS/reference/room'
import CreateRoom from '@/pages/modules/SIM-RS/reference/room/created'
import UpdateRoom from '@/pages/modules/SIM-RS/reference/room/updated'
import DetailRoom from '@/pages/modules/SIM-RS/reference/room/detail'
import { SpecialistPage } from '@/pages/modules/SIM-RS/reference/specialist'
import { DiagnosisRefPage } from '@/pages/modules/SIM-RS/reference/diagnosis'
import { ProcedurePage } from '@/pages/modules/SIM-RS/reference/procedure'
import { DoctorPage } from '@/pages/modules/SIM-RS/reference/doctor'
import CreateDoctor from '@/pages/modules/SIM-RS/reference/doctor/created'
import UpdateDoctor from '@/pages/modules/SIM-RS/reference/doctor/updated'
import DetailDoctor from '@/pages/modules/SIM-RS/reference/doctor/detail'
import ProfileHospitalPage from '@/pages/modules/SIM-RS/profile-rs'
import { RegisterPage } from '@/pages/modules/SIM-RS/services/register'
import CreateRegistration from '@/pages/modules/SIM-RS/services/register/created'
import UpdateRegistration from '@/pages/modules/SIM-RS/services/register/updated'
import DetailRegistration from '@/pages/modules/SIM-RS/services/register/detail'
import DiagnosisPage from '@/pages/modules/SIM-RS/services/register/diagnosis'
import { OutpatientPage } from '@/pages/modules/SIM-RS/services/outpatient'
import DetailOutpatient from '@/pages/modules/SIM-RS/services/outpatient/detail'
import EditPemeriksaan from '@/pages/modules/SIM-RS/services/outpatient/detail/edit-pemeriksaan'
import { InpatientPage } from '@/pages/modules/SIM-RS/services/inpatient'
import DetailInpatient from '@/pages/modules/SIM-RS/services/inpatient/detail'
import BackHomeInpatient from '@/pages/modules/SIM-RS/services/inpatient/back-home'
import UpdatedInpatient from '@/pages/modules/SIM-RS/services/inpatient/updated'
import Dashboard from '@/pages/modules/SIM-RS/services/dashboard'
import { DoctorSchedulePage } from '@/pages/modules/SIM-RS/schedule'
import DetailJadwalDokter from '@/pages/modules/SIM-RS/schedule/detail'

const UserProfilePage = lazy(() =>
  import('@/pages/modules/website-utama/user-profile').then((m) => ({ default: m.UserProfilePage }))
)
const ChangePassword = lazy(() =>
  import('@/pages/modules/website-utama/change-password').then((m) => ({
    default: m.ChangePassword,
  }))
)

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
        element: <UserProfilePage />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
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
    path: '*',
    element: <></>,
  },
]
