import DashboardView from '@/pages/modules/settings/dashboard/DashboardView'
import DomainView from '@/pages/modules/settings/domain/DomainView'
import FacultyCreateView from '@/pages/modules/settings/faculty/create/FacultyCreateView'
import FacultyDetailView from '@/pages/modules/settings/faculty/detail/FacultyDetailView'
import FacultyEditView from '@/pages/modules/settings/faculty/edit/FacultyEditView'
import FacultyView from '@/pages/modules/settings/faculty/FacultyView'
import InstitutionCreateView from '@/pages/modules/settings/institution/create/InstitutionCreateView'
import InstitutionDetailView from '@/pages/modules/settings/institution/detail/InstitutionDetailView'
import InstitutionEditView from '@/pages/modules/settings/institution/edit/InstitutionEditView'
import InstitutionView from '@/pages/modules/settings/institution/InstitutionView'
import UniversityCreateView from '@/pages/modules/settings/main-data-university/create/UniversityCreateView'
import UniversityDetailView from '@/pages/modules/settings/main-data-university/detail/UniversityDetailView'
import UniversityEditView from '@/pages/modules/settings/main-data-university/edit/UniversityEditView'
import MainDataUniversityView from '@/pages/modules/settings/main-data-university/MainDataUniversityView'
import HistoryLoginDetailView from '@/pages/modules/settings/management-users/history-login/detail/HistoryLoginDetailView'
import HistoryLoginView from '@/pages/modules/settings/management-users/history-login/HistoryLoginView'
import LevelCreateView from '@/pages/modules/settings/management-users/level/create/LevelCreateView'
import LevelEditView from '@/pages/modules/settings/management-users/level/edit/LevelEditView'
import LevelView from '@/pages/modules/settings/management-users/level/LevelView'
import UsersCreateView from '@/pages/modules/settings/management-users/users/create/UsersCreateView'
import UsersDetailView from '@/pages/modules/settings/management-users/users/detail/UsersDetailView'
import UsersEditView from '@/pages/modules/settings/management-users/users/edit/UsersEditView'
import UsersView from '@/pages/modules/settings/management-users/users/UsersView'
import ModuleView from '@/pages/modules/settings/module/ModuleView'
import ProdiCreateView from '@/pages/modules/settings/prodi/create/ProdiCreateView'
import ProdiDetailView from '@/pages/modules/settings/prodi/detail/ProdiDetailView'
import ProdiEditView from '@/pages/modules/settings/prodi/edit/ProdiEditView'
import ProdiView from '@/pages/modules/settings/prodi/ProdiView'
import AcademicRankView from '@/pages/modules/settings/reference/academic-rank/AcademicRankView'
import GroupRankView from '@/pages/modules/settings/reference/group-rank/GroupRankView'
import NewsCategoryView from '@/pages/modules/settings/reference/news-category/NewsCategoryView'
import UnitCreateView from '@/pages/modules/settings/unit/create/UnitCreateView'
import UnitDetailView from '@/pages/modules/settings/unit/detail/UnitDetailView'
import UnitEditView from '@/pages/modules/settings/unit/edit/UnitEditView'
import UnitView from '@/pages/modules/settings/unit/UnitView'
import EducationalLevelView from '@/pages/modules/settings/reference/educational-level/EducationalLevelView'
import ImpactInnovationView from '@/pages/modules/settings/reference/impact-innovation/ImpactInnovationView'
import ProfileView from '@/pages/modules/settings/dashboard/profile/ProfileView'
import EditProfileView from '@/pages/modules/settings/dashboard/profile/edit/EditProfileView'
import ChangePasswordProfileView from '@/pages/modules/settings/dashboard/change-password/ChangePasswordView'
import CountryView from '@/pages/modules/settings/reference/country/CountryView'
import ProvinceView from '@/pages/modules/settings/reference/province/ProvinceView'
import RegencyView from '@/pages/modules/settings/reference/regency/RegencyView'
import { NewsCategoryLanguagePage } from '@/pages/modules/settings/reference/news-category/language'
import { CategoryImpactInnovationLanguagePage } from '@/pages/modules/settings/reference/impact-innovation/language'
import { RankedGroupCategoryLanguagePage } from '@/pages/modules/settings/reference/group-rank/language'
import { RankedAcademicLanguagePage } from '@/pages/modules/settings/reference/academic-rank/language'
import IdentityView from '@/pages/modules/settings/identity/IdentityView'
import BackupDataView from '@/pages/modules/settings/backup-data/BackupDataView'
import { EducationLevelLanguagePage } from '@/pages/modules/settings/reference/educational-level/language'
import MainDataUniversityLanguageView from '@/pages/modules/settings/main-data-university/language/MainDataUniversityLanguageView'
import FacultyLanguageView from '@/pages/modules/settings/faculty/language/FacultyLanguageView'
import ProdiLanguageView from '@/pages/modules/settings/prodi/language/ProdiLanguageView'
import UnitLanguageView from '@/pages/modules/settings/unit/language/UnitLanguageView'
import InstitutionLanguageView from '@/pages/modules/settings/institution/language/InstitutionLanguageView'
export const SettingRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardView />,
      },
      {
        path: 'profile',
        element: <ProfileView />,
      },
      {
        path: 'user-profile',
        element: <EditProfileView />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordProfileView />,
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
        path: 'add',
        element: <UniversityCreateView />,
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
        path: 'language/:id',
        element: <MainDataUniversityLanguageView />,
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
        path: 'add',
        element: <FacultyCreateView />,
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
        path: 'language/:id',
        element: <FacultyLanguageView />,
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
        path: 'add',
        element: <ProdiCreateView />,
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
        path: 'language/:id',
        element: <ProdiLanguageView />,
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
        path: 'add',
        element: <UnitCreateView />,
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
        path: 'language/:id',
        element: <UnitLanguageView />,
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
        path: 'add',
        element: <InstitutionCreateView />,
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
        path: 'language/:id',
        element: <InstitutionLanguageView />,
      },
    ],
  },
  {
    path: 'management-users',
    children: [
      {
        path: 'level',
        children: [
          {
            index: true,
            element: <LevelView />,
          },
          {
            path: 'add',
            element: <LevelCreateView />,
          },
          {
            path: 'edit/:id',
            element: <LevelEditView />,
          },
        ],
      },
      {
        path: 'users',
        children: [
          {
            index: true,
            element: <UsersView />,
          },
          {
            path: 'add',
            element: <UsersCreateView />,
          },
          {
            path: 'edit/:id',
            element: <UsersEditView />,
          },
          {
            path: 'detail/:id',
            element: <UsersDetailView />,
          },
        ],
      },
      {
        path: 'history',
        children: [
          {
            index: true,
            element: <HistoryLoginView />,
          },
          {
            path: 'detail/:id',
            element: <HistoryLoginDetailView />,
          },
        ],
      },
    ],
  },
  {
    path: 'reference',
    children: [
      {
        path: 'news-category',
        element: <NewsCategoryView />,
      },
      {
        path: 'news-category/language/:id',
        element: <NewsCategoryLanguagePage />,
      },
      {
        path: 'group-rank',
        element: <GroupRankView />,
      },
      {
        path: 'group-rank/language/:id',
        element: <RankedGroupCategoryLanguagePage />,
      },
      {
        path: 'academic-rank',
        element: <AcademicRankView />,
      },
      {
        path: 'academic-rank/language/:id',
        element: <RankedAcademicLanguagePage />,
      },
      {
        path: 'impact-innovation',
        element: <ImpactInnovationView />,
      },
      {
        path: 'impact-innovation/language/:id',
        element: <CategoryImpactInnovationLanguagePage />,
      },
      {
        path: 'educational-level',
        element: <EducationalLevelView />,
      },
      {
        path: 'educational-level/language/:id',
        element: <EducationLevelLanguagePage />,
      },
      {
        path: 'countries',
        element: <CountryView />,
      },
      {
        path: 'province',
        element: <ProvinceView />,
      },
      {
        path: 'regency',
        element: <RegencyView />,
      },
    ],
  },
  {
    path: 'module',
    children: [
      {
        index: true,
        element: <ModuleView />,
      },
    ],
  },
  {
    path: 'domain',
    children: [
      {
        index: true,
        element: <DomainView />,
      },
    ],
  },
  {
    path: 'identity-menu',
    children: [
      {
        index: true,
        element: <IdentityView />,
      },
    ],
  },
  {
    path: 'backup-data',
    children: [
      {
        index: true,
        element: <BackupDataView />,
      },
    ],
  },
]
