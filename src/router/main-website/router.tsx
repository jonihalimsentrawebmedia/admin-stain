import { ProfilePageMainWebsite } from '@/pages/modules/website-utama/profile'
import { EditPageUniversity } from '@/pages/modules/website-utama/profile/editPage'
import { TopSliderPublicContent } from '@/pages/modules/website-utama/public-content/slider/top-slider'
import { CreateTopSlider } from '@/pages/modules/website-utama/public-content/slider/top-slider/create'
import { UpdatedTopSliderPage } from '@/pages/modules/website-utama/public-content/slider/top-slider/updated'
import { BottomSliderPublicContent } from '@/pages/modules/website-utama/public-content/slider/bottom-slider'
import { CreateBottomSlider } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/create'
import { UpdatedBottomSlider } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/updated'
import NewsPublicContentPage from '@/pages/modules/website-utama/public-content/news'
import { CreatedNewsPage } from '@/pages/modules/website-utama/public-content/news/created'
import { UpdatedNewsPage } from '@/pages/modules/website-utama/public-content/news/updated'
import { DetailNewsPage } from '@/pages/modules/website-utama/public-content/news/detail/page.tsx'
import { AnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement'
import { CreateAnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement/created'
import { UpdatedAnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement/updated'
import SettingMenuHeaderView from '@/pages/modules/website-utama/settings-menu/header/SettingMenuHeaderView'
import ContentView from '@/pages/modules/website-utama/settings-menu/header/content/ContentView'
import ContentCreateView from '@/pages/modules/website-utama/settings-menu/header/content/create/ContentCreateView'
import ContentEditView from '@/pages/modules/website-utama/settings-menu/header/content/edit/ContentEditView'
import { AnnouncementDetailPage } from '@/pages/modules/website-utama/public-content/announcement/detail'
import { AgendaPage } from '@/pages/modules/website-utama/public-content/agenda'
import { CreateAgendaPage } from '@/pages/modules/website-utama/public-content/agenda/created'
import { UpdatedAgendaPage } from '@/pages/modules/website-utama/public-content/agenda/updated'
import { DetailAgendaPage } from '@/pages/modules/website-utama/public-content/agenda/detail'
import { ImpactInnovationPage } from '@/pages/modules/website-utama/public-content/impact-innovation'
import { CreateImpactInnovationPage } from '@/pages/modules/website-utama/public-content/impact-innovation/created'
import BackgroundView from '@/pages/modules/website-utama/settings-menu/header/background/BackgroundView'
import ServicesView from '@/pages/modules/website-utama/services/ServicesView'
import LogView from '@/pages/modules/website-utama/services/log/LogView'
import { UpdatedImpactInnovationPage } from '@/pages/modules/website-utama/public-content/impact-innovation/updated'
import { DetailImpactInnovationPage } from '@/pages/modules/website-utama/public-content/impact-innovation/detail'
import { StructureOrganizationPage } from '@/pages/modules/website-utama/public-content/structure-organization'
import CalendarAcademicView from '@/pages/modules/website-utama/calendar-academic/CalendarAcademicView'
import CalendarAcademicDetailView from '@/pages/modules/website-utama/calendar-academic/detail/CalendarAcademicDetailView'
import DetailActivityView from '@/pages/modules/website-utama/calendar-academic/detail-activity/DetailActivityView'
import LogAcademicYear from '@/pages/modules/website-utama/calendar-academic/log/LogAcademicYear'
import LogActivityView from '@/pages/modules/website-utama/calendar-academic/log/LogActivityView'
import LogActivityDetailView from '@/pages/modules/website-utama/calendar-academic/log/LogActivityDetailView'
import CalendarAcademicBackgroundView from '@/pages/modules/website-utama/calendar-academic/background/CalendarAcademicBackgroundView'
import { PlacemenUser } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user'
import { FacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities'
import { CreatedFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/created'
import { UpdatedFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/updated'
import { DetailFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/detail'
import StatisticView from '@/pages/modules/website-utama/statistic/StatisticView'

import AcreditationView from '@/pages/modules/website-utama/acreditation/AcreditationView'
import LogStatisticView from '@/pages/modules/website-utama/statistic/log/LogStatisticView'
import AcreditationBackgroundView from '@/pages/modules/website-utama/acreditation/background/AcreditationBackgroundView'
import { GalleryVideoPage } from '@/pages/modules/website-utama/public-content/gallery/video'
import { GalleryPhotoPage } from '@/pages/modules/website-utama/public-content/gallery/Foto'
import { DataAlbumListPage } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album'
import { AchievementPage } from '@/pages/modules/website-utama/public-content/achievement'
import { CreatedAchievementPage } from '@/pages/modules/website-utama/public-content/achievement/created'
import { UpdatedAchievementPage } from '@/pages/modules/website-utama/public-content/achievement/updated'
import { DetailAchievementPage } from '@/pages/modules/website-utama/public-content/achievement/detail'
import { LogActivityPage } from '@/pages/modules/website-utama/public-content/slider/top-slider/log'
import AcreditationLogDetail from '@/pages/modules/website-utama/acreditation/log/AcreditationLogDetail'
import { LogBottomActivityPage } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/log'
import { LogActivityNewsPage } from '@/pages/modules/website-utama/public-content/news/log'
import { LogActivityImpactInnovationPage } from '@/pages/modules/website-utama/public-content/impact-innovation/log'
import { LogActivityAnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement/log'
import { LogActivityAgendaPage } from '@/pages/modules/website-utama/public-content/agenda/log'
import { LogActivityFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/log'
import { LogActivityAchievement } from '@/pages/modules/website-utama/public-content/achievement/log'
import { AnnouncementBackground } from '@/pages/modules/website-utama/public-content/announcement/background'
import { AgendaBackgroundPage } from '@/pages/modules/website-utama/public-content/agenda/background'
import { InnovationBackgroundPage } from '@/pages/modules/website-utama/public-content/impact-innovation/background'
import { GroupOrganizationBackgroundPage } from '@/pages/modules/website-utama/public-content/structure-organization/background'
import { FacilitiesBackgroundPage } from '@/pages/modules/website-utama/public-content/facilities/background'
import { AchievementBackgroundPage } from '@/pages/modules/website-utama/public-content/achievement/background'
import { GalleryPhotoBackgroundPage } from '@/pages/modules/website-utama/public-content/gallery/Foto/background'
import { GalleryVideoBackgroundPage } from '@/pages/modules/website-utama/public-content/gallery/video/background'
import { LogActivityVideoPage } from '@/pages/modules/website-utama/public-content/gallery/video/log'
import { LogActivityGalleryAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/log'
import { LogActivityGalleryAlbumPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/log'

export const MainWebsiteRouter = [
  {
    path: 'dashboard',
    element: <></>,
  },
  {
    path: 'profile',
    children: [
      {
        index: true,
        element: <ProfilePageMainWebsite />,
      },
      {
        path: 'edit',
        element: <EditPageUniversity />,
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
                path: 'add',
                element: <CreateTopSlider />,
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
                path: 'add',
                element: <CreateBottomSlider />,
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
            element: <NewsPublicContentPage />,
          },
          {
            path: 'add',
            element: <CreatedNewsPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedNewsPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementPage />,
          },
          {
            path: 'add',
            element: <CreateAnnouncementPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementPage />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementPage />,
          },
          {
            path: 'background',
            element: <AnnouncementBackground />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaPage />,
          },
          {
            path: 'add',
            element: <CreateAgendaPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailAgendaPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaPage />,
          },
          {
            path: 'background',
            element: <AgendaBackgroundPage />,
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
            path: 'add',
            element: <CreateImpactInnovationPage />,
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
          {
            path: 'background',
            element: <InnovationBackgroundPage />,
          },
        ],
      },
      {
        path: 'structure-organization',
        children: [
          {
            index: true,
            element: <StructureOrganizationPage />,
          },
          {
            path: 'team/:id',
            element: <PlacemenUser />,
          },
          {
            path: 'background',
            element: <GroupOrganizationBackgroundPage />,
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
            path: 'add',
            element: <CreatedFacilitiesPage />,
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
          {
            path: 'background',
            element: <FacilitiesBackgroundPage />,
          },
        ],
      },
      {
        path: 'gallery',
        children: [
          {
            path: 'photo',
            children: [
              {
                index: true,
                element: <GalleryPhotoPage />,
              },
              {
                path: 'log/:id',
                element: <LogActivityGalleryAlbum />,
              },
              {
                path: 'background',
                element: <GalleryPhotoBackgroundPage />,
              },
              {
                path: 'album/:id',
                element: <DataAlbumListPage />,
              },
              {
                path: 'album/:id/log',
                element: <LogActivityGalleryAlbumPhoto />,
              },
            ],
          },
          {
            path: 'video',
            children: [
              {
                index: true,
                element: <GalleryVideoPage />,
              },
              {
                path: 'log/:id',
                element: <LogActivityVideoPage />,
              },
              {
                path: 'background',
                element: <GalleryVideoBackgroundPage />,
              },
            ],
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
            path: 'add',
            element: <CreatedAchievementPage />,
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
          {
            path: 'background',
            element: <AchievementBackgroundPage />,
          },
        ],
      },
      {
        path: '*',
        element: <></>,
      },
    ],
  },
  {
    path: 'pengaturan-menu',
    children: [
      {
        path: 'header',
        children: [
          {
            index: true,
            element: <SettingMenuHeaderView />,
          },
          {
            path: ':id',
            children: [
              {
                path: 'content',

                children: [
                  {
                    index: true,
                    element: <ContentView />,
                  },
                  {
                    path: 'add',
                    element: <ContentCreateView />,
                  },
                  {
                    path: 'background',
                    element: <BackgroundView />,
                  },
                  {
                    path: ':idContent/edit',
                    element: <ContentEditView />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        index: true,
        element: <ServicesView />,
      },
      {
        path: ':id/log',
        element: <LogView />,
      },
    ],
  },
  {
    path: 'calendar-academic',
    children: [
      {
        index: true,
        element: <CalendarAcademicView />,
      },
      {
        path: 'background',
        element: <CalendarAcademicBackgroundView />,
      },
      {
        path: ':idAcademicYear',
        children: [
          {
            index: true,
            element: <CalendarAcademicDetailView />,
          },
          {
            path: 'log',
            element: <LogAcademicYear />,
          },

          {
            path: 'detail-activity',
            children: [
              {
                index: true,
                element: <DetailActivityView />,
              },
              {
                path: ':idActivity',
                children: [
                  {
                    index: true,
                    element: <DetailActivityView />,
                  },
                  {
                    path: 'log',
                    element: <LogActivityView />,
                  },
                  {
                    path: 'log-detail/:idActivityDetail',
                    element: <LogActivityDetailView />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'statistic',
    children: [
      {
        index: true,
        element: <StatisticView />,
      },
      {
        path: 'log',
        element: <LogStatisticView />,
      },
    ],
  },
  {
    path: 'acreditation',
    children: [
      {
        index: true,
        element: <AcreditationView />,
      },
      {
        path: 'background',
        element: <AcreditationBackgroundView />,
      },
      {
        path: ':idAcreditation/log',
        element: <AcreditationLogDetail />,
      },
    ],
  },
]
