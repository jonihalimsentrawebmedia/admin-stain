import { lazy } from 'react'

// import FaculityDetailHistoryView from '@/pages/modules/manajeman-editor/faculty/detail-history/FaculityDetailHistoryView'
// import FacultyDetailView from '@/pages/modules/manajeman-editor/faculty/detail/FacultyDetailView'
// import FacultyEditView from '@/pages/modules/manajeman-editor/faculty/edit/FacultyEditView'
// import FacultyView from '@/pages/modules/manajeman-editor/faculty/FacultyView'
// import InstitutionDetailHistoryView from '@/pages/modules/manajeman-editor/institution/detail-history/InstitutionDetailHistoryView'
// import InstitutionDetailView from '@/pages/modules/manajeman-editor/institution/detail/InstitutionDetailView'
// import InstitutionEditView from '@/pages/modules/manajeman-editor/institution/edit/InstitutionEditView'
// import InstitutionView from '@/pages/modules/manajeman-editor/institution/InstitutionView'
// import MainDataUniversityDetailHistoryView from '@/pages/modules/manajeman-editor/main-data-university/detail-history/MainDataUniversityDetailHistoryView'
// import UniversityDetailView from '@/pages/modules/manajeman-editor/main-data-university/detail/UniversityDetailView'
// import UniversityEditView from '@/pages/modules/manajeman-editor/main-data-university/edit/UniversityEditView'
// import MainDataUniversityView from '@/pages/modules/manajeman-editor/main-data-university/MainDataUniversityView'
// import ProdiDetailHistoryView from '@/pages/modules/manajeman-editor/prodi/detail-history/ProdiDetailHistoryView'
// import ProdiDetailView from '@/pages/modules/manajeman-editor/prodi/detail/ProdiDetailView'
// import ProdiEditView from '@/pages/modules/manajeman-editor/prodi/edit/ProdiEditView'
// import ProdiView from '@/pages/modules/manajeman-editor/prodi/ProdiView'
// import { AchievementPage } from '@/pages/modules/manajeman-editor/public-content/achievement'
// import { DetailAchievementPage } from '@/pages/modules/manajeman-editor/public-content/achievement/detail'
// import { LogActivityAchievement } from '@/pages/modules/manajeman-editor/public-content/achievement/log'
// import { UpdatedAchievementPage } from '@/pages/modules/manajeman-editor/public-content/achievement/create'
// import { AgendaManagementEditorPublicContent } from '@/pages/modules/manajeman-editor/public-content/agenda'
// import { AgendaManagementEditorDetailPage } from '@/pages/modules/manajeman-editor/public-content/agenda/detail'
// import { LogActivityAgendaManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/agenda/log'
// import { UpdatedAgendaManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/agenda/create'
// import { AnnouncementManagementEditorPublicContent } from '@/pages/modules/manajeman-editor/public-content/announcement'
// import { AnnouncementManagementEditorDetailPage } from '@/pages/modules/manajeman-editor/public-content/announcement/detail'
// import { LogActivityAnnouncementManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/announcement/log'
// import { UpdatedAnnouncementManagementEditor } from '@/pages/modules/manajeman-editor/public-content/announcement/create'
// import { FacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities'
// import { FacilitiesUnitEditor } from '@/pages/modules/manajeman-editor/public-content/facilities-unit'
// import { DetailFacilitiesUnitPage } from '@/pages/modules/manajeman-editor/public-content/facilities-unit/detail'
// import { LogActivityFacilitiesUnitPage } from '@/pages/modules/manajeman-editor/public-content/facilities-unit/log'
// import { UpdatedFacilitiesUnit } from '@/pages/modules/manajeman-editor/public-content/facilities-unit/create'
// import { DetailFacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities/detail'
// import { LogActivityFacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities/log'
// import { UpdatedFacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities/create'
// import { ImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation'
// import { DetailImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation/detail'
// import { LogActivityImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation/log'
// import { UpdatedImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation/create'
// import { NewsManagementEditorPublicContentPage } from '@/pages/modules/manajeman-editor/public-content/news'
// import { DetailNewsManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/news/detail'
// import { LogActivityNewsManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/news/log-data'
// import { NewsManagementEditorUpdated } from '@/pages/modules/manajeman-editor/public-content/news/create'
// import { PromotionManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/promotion'
// import { DetailPromotionPage } from '@/pages/modules/manajeman-editor/public-content/promotion/detail'
// import { LogActivityPromotionManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/promotion/log'
// import { UpdatedPromotionMangementEditor } from '@/pages/modules/manajeman-editor/public-content/promotion/create'
// import { BottomSliderPublicContent } from '@/pages/modules/manajeman-editor/public-content/slider/bottom-slider'
// import { LogBottomActivityPage } from '@/pages/modules/manajeman-editor/public-content/slider/bottom-slider/log'
// import { UpdatedBottomSlider } from '@/pages/modules/manajeman-editor/public-content/slider/bottom-slider/create'
// import { TopSliderPublicContent } from '@/pages/modules/manajeman-editor/public-content/slider/top-slider'
// import { LogActivityPage } from '@/pages/modules/manajeman-editor/public-content/slider/top-slider/log'
// import { UpdatedTopSliderPage } from '@/pages/modules/manajeman-editor/public-content/slider/top-slider/create'
// import UnitDetailHistoryView from '@/pages/modules/manajeman-editor/unit/detail-history/UnitDetailHistoryView'
// import UnitDetailView from '@/pages/modules/manajeman-editor/unit/detail/UnitDetailView'
// import UnitEditView from '@/pages/modules/manajeman-editor/unit/edit/UnitEditView'
// import UnitView from '@/pages/modules/manajeman-editor/unit/UnitView'

const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const DashboardAdminEditor = lazy(() => import('@/pages/modules/manajeman-editor/beranda'))
const UpdatedTopSliderPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/top-slider/updated').then(m => ({ default: m.UpdatedTopSliderPage })))
const LogActivityPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/top-slider/log').then(m => ({ default: m.LogActivityPage })))
const UseGetTopSliderDetail = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/top-slider/detail').then(m => ({ default: m.UseGetTopSliderDetail })))
const UseGetBottomSliderDetail = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/bottom-slider/detail').then(m => ({ default: m.UseGetBottomSliderDetail })))
const UpdatedBottomSlider = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/bottom-slider/updated').then(m => ({ default: m.UpdatedBottomSlider })))
const LogBottomActivityPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/bottom-slider/log').then(m => ({ default: m.LogBottomActivityPage })))
const DetailNewsManagementEditorPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/news/detail').then(m => ({ default: m.DetailNewsManagementEditorPage })))
const NewsManagementEditorUpdated = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/news/updated').then(m => ({ default: m.NewsManagementEditorUpdated })))
const LogActivityNewsManagementEditorPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/news/log-data').then(m => ({ default: m.LogActivityNewsManagementEditorPage })))
const DetailImpactInnovationPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/impact-innovation/detail').then(m => ({ default: m.DetailImpactInnovationPage })))
const UpdatedImpactInnovationPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/impact-innovation/updated').then(m => ({ default: m.UpdatedImpactInnovationPage })))
const LogActivityImpactInnovationPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/impact-innovation/log').then(m => ({ default: m.LogActivityImpactInnovationPage })))
const AnnouncementManagementEditorDetailPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/announcement/detail').then(m => ({ default: m.AnnouncementManagementEditorDetailPage })))
const LogActivityAnnouncementManagementEditorPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementManagementEditorPage })))
const UpdatedAnnouncementManagementEditor = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementManagementEditor })))
const AgendaManagementEditorDetailPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/agenda/detail').then(m => ({ default: m.AgendaManagementEditorDetailPage })))
const UpdatedAgendaManagementEditorPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaManagementEditorPage })))
const LogActivityAgendaManagementEditorPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/agenda/log').then(m => ({ default: m.LogActivityAgendaManagementEditorPage })))
const DetailFacilitiesPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/facilities/detail').then(m => ({ default: m.DetailFacilitiesPage })))
const UpdatedFacilitiesPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/facilities/updated').then(m => ({ default: m.UpdatedFacilitiesPage })))
const LogActivityFacilitiesPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/facilities/log').then(m => ({ default: m.LogActivityFacilitiesPage })))
const UpdatedAchievementPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/achievement/updated').then(m => ({ default: m.UpdatedAchievementPage })))
const DetailAchievementPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/achievement/detail').then(m => ({ default: m.DetailAchievementPage })))
const LogActivityAchievement = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/achievement/log').then(m => ({ default: m.LogActivityAchievement })))
const DetailPromotionPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/promotion/detail').then(m => ({ default: m.DetailPromotionPage })))
const LogActivityPromotionManagementEditorPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/promotion/log').then(m => ({ default: m.LogActivityPromotionManagementEditorPage })))
const UpdatedPromotionManagementEditor = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/promotion/updated').then(m => ({ default: m.UpdatedPromotionManagementEditor })))
const UpdatedFacilitiesUnit = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/facilities-unit/updated').then(m => ({ default: m.UpdatedFacilitiesUnit })))
const DetailFacilitiesUnitPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/facilities-unit/detail').then(m => ({ default: m.DetailFacilitiesUnitPage })))
const LogActivityFacilitiesUnitPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/facilities-unit/log').then(m => ({ default: m.LogActivityFacilitiesUnitPage })))
const UniversityEditView = lazy(() => import('@/pages/modules/manajeman-editor/main-data-university/edit/UniversityEditView.tsx'))
const UniversityDetailView = lazy(() => import('@/pages/modules/manajeman-editor/main-data-university/detail/UniversityDetailView.tsx'))
const MainDataUniversityDetailHistoryView = lazy(() => import('@/pages/modules/manajeman-editor/main-data-university/detail-history/MainDataUniversityDetailHistoryView.tsx'))
const ProdiEditView = lazy(() => import('@/pages/modules/manajeman-editor/prodi/edit/ProdiEditView'))
const ProdiDetailView = lazy(() => import('@/pages/modules/manajeman-editor/prodi/detail/ProdiDetailView'))
const ProdiDetailHistoryView = lazy(() => import('@/pages/modules/manajeman-editor/prodi/detail-history/ProdiDetailHistoryView'))
const UnitEditView = lazy(() => import('@/pages/modules/manajeman-editor/unit/edit/UnitEditView'))
const UnitDetailView = lazy(() => import('@/pages/modules/manajeman-editor/unit/detail/UnitDetailView'))
const UnitDetailHistoryView = lazy(() => import('@/pages/modules/manajeman-editor/unit/detail-history/UnitDetailHistoryView'))
const InstitutionEditView = lazy(() => import('@/pages/modules/manajeman-editor/institution/edit/InstitutionEditView'))
const InstitutionDetailView = lazy(() => import('@/pages/modules/manajeman-editor/institution/detail/InstitutionDetailView'))
const InstitutionDetailHistoryView = lazy(() => import('@/pages/modules/manajeman-editor/institution/detail-history/InstitutionDetailHistoryView'))
const FacultyEditView = lazy(() => import('@/pages/modules/manajeman-editor/faculty/edit/FacultyEditView'))
const FacultyDetailView = lazy(() => import('@/pages/modules/manajeman-editor/faculty/detail/FacultyDetailView'))
const FaculityDetailHistoryView = lazy(() => import('@/pages/modules/manajeman-editor/faculty/detail-history/FaculityDetailHistoryView'))
const LembagaDetailView = lazy(() => import('@/pages/modules/manajeman-editor/lembaga/detail/LembagaDetailView.tsx'))
const LembagaEditView = lazy(() => import('@/pages/modules/manajeman-editor/lembaga/edit/LembagaEditView.tsx'))
const UpdatedArticleManagementEditor = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/article/updated').then(m => ({ default: m.UpdatedArticleManagementEditor })))
const DetailArticlePage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/article/detail').then(m => ({ default: m.DetailArticlePage })))
const LogActivityArticleManagementEditorPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/article/log').then(m => ({ default: m.LogActivityArticleManagementEditorPage })))
const DetailEditorArticleCarrier = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/article-carier/detail').then(m => ({ default: m.DetailEditorArticleCarrier })))
const LogEditorArticleCarrierPage = lazy(() => import('@/pages/modules/manajeman-editor/publict-content/article-carier/log').then(m => ({ default: m.LogEditorArticleCarrierPage })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

export const EditorRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardAdminEditor />,
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
    path: 'panduan',
    element: <GuideListView />,
  },
  {
    path: 'public-content',
    children: [
      {
        path: 'slider',
        children: [
          {
            path: 'top-slider',
            children: [
              {
                path: 'detail/:id',
                element: <UseGetTopSliderDetail />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedTopSliderPage />,
              },
              {
                path: 'log/:id',
                element: <LogActivityPage />,
              },
            ],
          },
          {
            path: 'bottom-slider',
            children: [
              {
                path: 'detail/:id',
                element: <UseGetBottomSliderDetail />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedBottomSlider />,
              },
              {
                path: 'log/:id',
                element: <LogBottomActivityPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            path: 'detail/:id',
            element: <DetailNewsManagementEditorPage />,
          },
          {
            path: 'edit/:id',
            element: <NewsManagementEditorUpdated />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsManagementEditorPage />,
          },
        ],
      },
      {
        path: 'impact-innovation',
        children: [
          {
            path: 'detail/:id',
            element: <DetailImpactInnovationPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedImpactInnovationPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityImpactInnovationPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementManagementEditor />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementManagementEditorDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementManagementEditorPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            path: 'edit/:id',
            element: <UpdatedAgendaManagementEditorPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaManagementEditorDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaManagementEditorPage />,
          },
        ],
      },
      {
        path: 'facilities',
        children: [
          {
            path: 'edit/:id',
            element: <UpdatedFacilitiesPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailFacilitiesPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityFacilitiesPage />,
          },
        ],
      },
      {
        path: 'achievement',
        children: [
          {
            path: 'edit/:id',
            element: <UpdatedAchievementPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailAchievementPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAchievement />,
          },
        ],
      },
      {
        path: 'promotion',
        children: [
          {
            path: 'edit/:id',
            element: <UpdatedPromotionManagementEditor />,
          },
          {
            path: 'detail/:id',
            element: <DetailPromotionPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityPromotionManagementEditorPage />,
          },
        ],
      },
      {
        path: 'facilities-unit',
        children: [
          {
            path: 'edit/:id',
            element: <UpdatedFacilitiesUnit />,
          },
          {
            path: 'detail/:id',
            element: <DetailFacilitiesUnitPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityFacilitiesUnitPage />,
          },
        ],
      },

      {
        path: 'article',
        children: [
          {
            path: 'edit/:id',
            element: <UpdatedArticleManagementEditor />,
          },
          {
            path: 'detail/:id',
            element: <DetailArticlePage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityArticleManagementEditorPage />,
          },
        ],
      },
      {
        path: 'article-carrier',
        children: [
          {
            path: 'detail/:id',
            element: <DetailEditorArticleCarrier />,
          },
          {
            path: 'log/:id',
            element: <LogEditorArticleCarrierPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'data-university',
    children: [
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
    path: 'lembaga',
    children: [
      {
        path: 'detail/:id',
        element: <LembagaDetailView />,
      },
      {
        path: 'edit/:id',
        element: <LembagaEditView />,
      },
    ],
  },

  {
    path: 'unit',
    children: [
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
