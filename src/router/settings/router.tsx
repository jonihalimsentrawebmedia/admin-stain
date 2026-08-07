import { lazy } from 'react'

const DashboardView = lazy(() => import('@/pages/modules/settings/dashboard/DashboardView'))
const DomainView = lazy(() => import('@/pages/modules/settings/domain/DomainView'))
const FacultyCreateView = lazy(() => import('@/pages/modules/settings/faculty/create/FacultyCreateView'))
const FacultyDetailView = lazy(() => import('@/pages/modules/settings/faculty/detail/FacultyDetailView'))
const FacultyEditView = lazy(() => import('@/pages/modules/settings/faculty/edit/FacultyEditView'))
const FacultyView = lazy(() => import('@/pages/modules/settings/faculty/FacultyView'))
const InstitutionCreateView = lazy(() => import('@/pages/modules/settings/institution/create/InstitutionCreateView'))
const InstitutionDetailView = lazy(() => import('@/pages/modules/settings/institution/detail/InstitutionDetailView'))
const InstitutionEditView = lazy(() => import('@/pages/modules/settings/institution/edit/InstitutionEditView'))
const InstitutionView = lazy(() => import('@/pages/modules/settings/institution/InstitutionView'))
const UniversityCreateView = lazy(() => import('@/pages/modules/settings/main-data-university/create/UniversityCreateView'))
const UniversityDetailView = lazy(() => import('@/pages/modules/settings/main-data-university/detail/UniversityDetailView'))
const UniversityEditView = lazy(() => import('@/pages/modules/settings/main-data-university/edit/UniversityEditView'))
const MainDataUniversityView = lazy(() => import('@/pages/modules/settings/main-data-university/MainDataUniversityView'))
const HistoryLoginDetailView = lazy(() => import('@/pages/modules/settings/management-users/history-login/detail/HistoryLoginDetailView'))
const HistoryLoginView = lazy(() => import('@/pages/modules/settings/management-users/history-login/HistoryLoginView'))
const LevelCreateView = lazy(() => import('@/pages/modules/settings/management-users/level/create/LevelCreateView'))
const LevelEditView = lazy(() => import('@/pages/modules/settings/management-users/level/edit/LevelEditView'))
const LevelView = lazy(() => import('@/pages/modules/settings/management-users/level/LevelView'))
const UsersCreateView = lazy(() => import('@/pages/modules/settings/management-users/users/create/UsersCreateView'))
const UsersDetailView = lazy(() => import('@/pages/modules/settings/management-users/users/detail/UsersDetailView'))
const UsersEditView = lazy(() => import('@/pages/modules/settings/management-users/users/edit/UsersEditView'))
const UsersView = lazy(() => import('@/pages/modules/settings/management-users/users/UsersView'))
const ModuleView = lazy(() => import('@/pages/modules/settings/module/ModuleView'))
const ProdiCreateView = lazy(() => import('@/pages/modules/settings/prodi/create/ProdiCreateView'))
const ProdiDetailView = lazy(() => import('@/pages/modules/settings/prodi/detail/ProdiDetailView'))
const ProdiEditView = lazy(() => import('@/pages/modules/settings/prodi/edit/ProdiEditView'))
const ProdiView = lazy(() => import('@/pages/modules/settings/prodi/ProdiView'))
const AcademicRankView = lazy(() => import('@/pages/modules/settings/reference/academic-rank/AcademicRankView'))
const GroupRankView = lazy(() => import('@/pages/modules/settings/reference/group-rank/GroupRankView'))
const NewsCategoryView = lazy(() => import('@/pages/modules/settings/reference/news-category/NewsCategoryView'))
const UnitCreateView = lazy(() => import('@/pages/modules/settings/unit/create/UnitCreateView'))
const UnitDetailView = lazy(() => import('@/pages/modules/settings/unit/detail/UnitDetailView'))
const UnitEditView = lazy(() => import('@/pages/modules/settings/unit/edit/UnitEditView'))
const UnitView = lazy(() => import('@/pages/modules/settings/unit/UnitView'))
const EducationalLevelView = lazy(() => import('@/pages/modules/settings/reference/educational-level/EducationalLevelView'))
const ImpactInnovationView = lazy(() => import('@/pages/modules/settings/reference/impact-innovation/ImpactInnovationView'))
const ProfileView = lazy(() => import('@/pages/modules/settings/dashboard/profile/ProfileView'))
const EditProfileView = lazy(() => import('@/pages/modules/settings/dashboard/profile/edit/EditProfileView'))
const ChangePasswordProfileView = lazy(() => import('@/pages/modules/settings/dashboard/change-password/ChangePasswordView'))
const CountryView = lazy(() => import('@/pages/modules/settings/reference/country/CountryView'))
const ProvinceView = lazy(() => import('@/pages/modules/settings/reference/province/ProvinceView'))
const RegencyView = lazy(() => import('@/pages/modules/settings/reference/regency/RegencyView'))
const NewsCategoryLanguagePage = lazy(() => import('@/pages/modules/settings/reference/news-category/language').then(m => ({ default: m.NewsCategoryLanguagePage })))
const CategoryImpactInnovationLanguagePage = lazy(() => import('@/pages/modules/settings/reference/impact-innovation/language').then(m => ({ default: m.CategoryImpactInnovationLanguagePage })))
const RankedGroupCategoryLanguagePage = lazy(() => import('@/pages/modules/settings/reference/group-rank/language').then(m => ({ default: m.RankedGroupCategoryLanguagePage })))
const RankedAcademicLanguagePage = lazy(() => import('@/pages/modules/settings/reference/academic-rank/language').then(m => ({ default: m.RankedAcademicLanguagePage })))
const IdentityView = lazy(() => import('@/pages/modules/settings/identity/IdentityView'))
const BackupDataView = lazy(() => import('@/pages/modules/settings/backup-data/BackupDataView'))
const BackupHistoryView = lazy(() => import('@/pages/modules/settings/backup-data/history'))
const EducationLevelLanguagePage = lazy(() => import('@/pages/modules/settings/reference/educational-level/language').then(m => ({ default: m.EducationLevelLanguagePage })))
const MainDataUniversityLanguageView = lazy(() => import('@/pages/modules/settings/main-data-university/language/MainDataUniversityLanguageView'))
const FacultyLanguageView = lazy(() => import('@/pages/modules/settings/faculty/language/FacultyLanguageView'))
const ProdiLanguageView = lazy(() => import('@/pages/modules/settings/prodi/language/ProdiLanguageView'))
const UnitLanguageView = lazy(() => import('@/pages/modules/settings/unit/language/UnitLanguageView'))
const InstitutionLanguageView = lazy(() => import('@/pages/modules/settings/institution/language/InstitutionLanguageView'))
const StructuralOfficialPage = lazy(() => import('@/pages/modules/settings/reference/structural-official'))
const StructuralOfficialLanguagePage = lazy(() => import('@/pages/modules/settings/reference/structural-official/language').then(m => ({ default: m.StructuralOfficialLanguagePage })))
const SideMenuView = lazy(() => import('@/pages/modules/settings/Side-Menu'))

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
      {
        path: 'structural-official',
        element: <StructuralOfficialPage />,
      },
      {
        path: 'structural-official/language/:id',
        element: <StructuralOfficialLanguagePage />,
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
    path: 'side-menu',
    children: [
      {
        index: true,
        element: <SideMenuView />,
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
      {
        path: 'history',
        element: <BackupHistoryView />,
      },
    ],
  },
]
