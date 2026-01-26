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
import { AchievementPage } from '@/pages/modules/manajeman-editor/public-content/achievement'
import { DetailAchievementPage } from '@/pages/modules/manajeman-editor/public-content/achievement/detail'
import { LogActivityAchievement } from '@/pages/modules/manajeman-editor/public-content/achievement/log'
import { UpdatedAchievementPage } from '@/pages/modules/manajeman-editor/public-content/achievement/updated'
import { AgendaManagementEditorPublicContent } from '@/pages/modules/manajeman-editor/public-content/agenda'
import { AgendaManagementEditorDetailPage } from '@/pages/modules/manajeman-editor/public-content/agenda/detail'
import { LogActivityAgendaManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/agenda/log'
import { UpdatedAgendaManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/agenda/updated'
import { AnnouncementManagementEditorPublicContent } from '@/pages/modules/manajeman-editor/public-content/announcement'
import { AnnouncementManagementEditorDetailPage } from '@/pages/modules/manajeman-editor/public-content/announcement/detail'
import { LogActivityAnnouncementManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/announcement/log'
import { UpdatedAnnouncementManagementEditor } from '@/pages/modules/manajeman-editor/public-content/announcement/updated'
import { FacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities'
import { FacilitiesUnitEditor } from '@/pages/modules/manajeman-editor/public-content/facilities-unit'
import { DetailFacilitiesUnitPage } from '@/pages/modules/manajeman-editor/public-content/facilities-unit/detail'
import { LogActivityFacilitiesUnitPage } from '@/pages/modules/manajeman-editor/public-content/facilities-unit/log'
import { UpdatedFacilitiesUnit } from '@/pages/modules/manajeman-editor/public-content/facilities-unit/updated'
import { DetailFacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities/detail'
import { LogActivityFacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities/log'
import { UpdatedFacilitiesPage } from '@/pages/modules/manajeman-editor/public-content/facilities/updated'
import { ImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation'
import { DetailImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation/detail'
import { LogActivityImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation/log'
import { UpdatedImpactInnovationPage } from '@/pages/modules/manajeman-editor/public-content/impact-innovation/updated'
import { NewsManagementEditorPublicContentPage } from '@/pages/modules/manajeman-editor/public-content/news'
import { DetailNewsManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/news/detail'
import { LogActivityNewsManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/news/log-data'
import { NewsManagementEditorUpdated } from '@/pages/modules/manajeman-editor/public-content/news/updated'
import { PromotionManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/promotion'
import { DetailPromotionPage } from '@/pages/modules/manajeman-editor/public-content/promotion/detail'
import { LogActivityPromotionManagementEditorPage } from '@/pages/modules/manajeman-editor/public-content/promotion/log'
import { UpdatedPromotionMangementEditor } from '@/pages/modules/manajeman-editor/public-content/promotion/updated'
import { BottomSliderPublicContent } from '@/pages/modules/manajeman-editor/public-content/slider/bottom-slider'
import { LogBottomActivityPage } from '@/pages/modules/manajeman-editor/public-content/slider/bottom-slider/log'
import { UpdatedBottomSlider } from '@/pages/modules/manajeman-editor/public-content/slider/bottom-slider/updated'
import { TopSliderPublicContent } from '@/pages/modules/manajeman-editor/public-content/slider/top-slider'
import { LogActivityPage } from '@/pages/modules/manajeman-editor/public-content/slider/top-slider/log'
import { UpdatedTopSliderPage } from '@/pages/modules/manajeman-editor/public-content/slider/top-slider/updated'
import UnitDetailHistoryView from '@/pages/modules/manajeman-editor/unit/detail-history/UnitDetailHistoryView'
import UnitDetailView from '@/pages/modules/manajeman-editor/unit/detail/UnitDetailView'
import UnitEditView from '@/pages/modules/manajeman-editor/unit/edit/UnitEditView'
import UnitView from '@/pages/modules/manajeman-editor/unit/UnitView'

import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import DashboardAdminEditor from '@/pages/modules/manajeman-editor/beranda'

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
                index: true,
                element: <TopSliderPublicContent />,
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
                index: true,
                element: <BottomSliderPublicContent />,
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
            index: true,
            element: <NewsManagementEditorPublicContentPage />,
          },

          {
            path: 'edit/:id',
            element: <NewsManagementEditorUpdated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsManagementEditorPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsManagementEditorPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementManagementEditorPublicContent />,
          },

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
            index: true,
            element: <AgendaManagementEditorPublicContent />,
          },

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
        path: 'impact-innovation',
        children: [
          {
            index: true,
            element: <ImpactInnovationPage />,
          },

          {
            path: 'edit/:id',
            element: <UpdatedImpactInnovationPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailImpactInnovationPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityImpactInnovationPage />,
          },
        ],
      },

      {
        path: 'facilities',
        children: [
          {
            index: true,
            element: <FacilitiesPage />,
          },

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
            index: true,
            element: <AchievementPage />,
          },
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
            index: true,
            element: <PromotionManagementEditorPage />,
          },

          {
            path: 'edit/:id',
            element: <UpdatedPromotionMangementEditor />,
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
            index: true,
            element: <FacilitiesUnitEditor />,
          },
         
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
    ],
  },
]
