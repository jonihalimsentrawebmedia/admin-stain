import FaculityDetailHistoryView from '@/pages/modules/manajeman-editor/faculty/detail-history/FaculityDetailHistoryView'
import FacultyDetailView from '@/pages/modules/manajeman-editor/faculty/detail/FacultyDetailView'
import FacultyEditView from '@/pages/modules/manajeman-editor/faculty/edit/FacultyEditView'
import FacultyView from '@/pages/modules/manajeman-editor/faculty/FacultyView'
import InstitutionDetailHistoryView from '@/pages/modules/manajeman-editor/institution/detail-history/InstitutionDetailHistoryView'
import InstitutionDetailView from '@/pages/modules/manajeman-editor/institution/detail/InstitutionDetailView'
import InstitutionEditView from '@/pages/modules/manajeman-editor/institution/edit/InstitutionEditView'
import InstitutionView from '@/pages/modules/manajeman-editor/institution/InstitutionView'
import MainDataUniversityDetailHistoryView from '@/pages/modules/manajeman-editor/main-data-university/detail-history/MainDataUniversityDetailHistoryView'
import UniversityDetailView from '@/pages/modules/manajeman-editor/main-data-university/detail/UniversityDetailView'
import UniversityEditView from '@/pages/modules/manajeman-editor/main-data-university/edit/UniversityEditView'
import MainDataUniversityView from '@/pages/modules/manajeman-editor/main-data-university/MainDataUniversityView'
import ProdiDetailHistoryView from '@/pages/modules/manajeman-editor/prodi/detail-history/ProdiDetailHistoryView'
import ProdiDetailView from '@/pages/modules/manajeman-editor/prodi/detail/ProdiDetailView'
import ProdiEditView from '@/pages/modules/manajeman-editor/prodi/edit/ProdiEditView'
import ProdiView from '@/pages/modules/manajeman-editor/prodi/ProdiView'
import UnitDetailHistoryView from '@/pages/modules/manajeman-editor/unit/detail-history/UnitDetailHistoryView'
import UnitDetailView from '@/pages/modules/manajeman-editor/unit/detail/UnitDetailView'
import UnitEditView from '@/pages/modules/manajeman-editor/unit/edit/UnitEditView'
import UnitView from '@/pages/modules/manajeman-editor/unit/UnitView'

import DashboardAdmin from '@/pages/modules/website-utama/beranda'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'

export const EditorRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
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
    path: 'main-data-university',
    children: [
      {
        index: true,
        element: <MainDataUniversityView />,
      },

      {
        path: 'edit/:id',
        element: <UniversityEditView />,
      },
      {
        path: 'detail/:id',
        element: <UniversityDetailView />,
      },
      {
        path: ':id/detail/:idHistory',
        element: <MainDataUniversityDetailHistoryView />,
      },
    ],
  },
  {
    path: 'faculty',
    children: [
      {
        index: true,
        element: <FacultyView />,
      },

      {
        path: 'edit/:id',
        element: <FacultyEditView />,
      },
      {
        path: 'detail/:id',
        element: <FacultyDetailView />,
      },
      {
        path: ':id/detail/:idHistory',
        element: <FaculityDetailHistoryView />,
      },
    ],
  },
  {
    path: 'prodi',
    children: [
      {
        index: true,
        element: <ProdiView />,
      },

      {
        path: 'edit/:id',
        element: <ProdiEditView />,
      },
      {
        path: 'detail/:id',
        element: <ProdiDetailView />,
      },
      {
        path: ':id/detail/:idHistory',
        element: <ProdiDetailHistoryView />,
      },
    ],
  },
  {
    path: 'unit',
    children: [
      {
        index: true,
        element: <UnitView />,
      },

      {
        path: 'edit/:id',
        element: <UnitEditView />,
      },
      {
        path: 'detail/:id',
        element: <UnitDetailView />,
      },
      {
        path: ':id/detail/:idHistory',
        element: <UnitDetailHistoryView />,
      },
    ],
  },
  {
    path: 'institution',
    children: [
      {
        index: true,
        element: <InstitutionView />,
      },

      {
        path: 'edit/:id',
        element: <InstitutionEditView />,
      },
      {
        path: 'detail/:id',
        element: <InstitutionDetailView />,
      },
      {
        path: ':id/detail/:idHistory',
        element: <InstitutionDetailHistoryView />,
      },
    ],
  },
]
