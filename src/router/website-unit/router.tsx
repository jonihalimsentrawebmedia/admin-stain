import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { DetailProfileUnit } from '@/pages/modules/website-unit/data-unit'
import { UpdatedDataUnit } from '@/pages/modules/website-unit/data-unit/updated'
import { LayoutProfileUnit } from '@/pages/modules/website-unit/profile/components/layout.tsx'
import { AboutProfileUnit } from '@/pages/modules/website-unit/profile/about'
import { HistoryUnit } from '@/pages/modules/website-unit/profile/history'
import { OurTeamUnit } from '@/pages/modules/website-unit/profile/our-team'
import { DivisionTeamUnit } from '@/pages/modules/website-unit/profile/our-team/division-team'
import { VisionMission } from '@/pages/modules/website-unit/profile/vission'
import { TaskPurposeUnit } from '@/pages/modules/website-unit/profile/task-purpose'
import { OrganizationStructure } from '@/pages/modules/website-unit/profile/organization-structure'
import { Collaboration } from '@/pages/modules/website-unit/profile/collaboration'
import { AchievementUnitPage } from '@/pages/modules/website-unit/profile/achievement'
import { RewardAchievement } from '@/pages/modules/website-unit/profile/achievement/reward'
import { CreatedCollaborationUnit } from '@/pages/modules/website-unit/profile/collaboration/created'
import { UpdatedCollaborationUnit } from '@/pages/modules/website-unit/profile/collaboration/updated'
import CalloborationDetailView from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/detail/CalloborationDetailView.tsx'
import CalloborationLogView from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/log/CalloborationLogView.tsx'
import { ServicesList } from '@/pages/modules/website-unit/services/category'
import { ListServiceCategory } from '@/pages/modules/website-unit/services/list'
import { MainServiceList } from '@/pages/modules/website-unit/services/main'
import { HeaderFooterServices } from '@/pages/modules/website-unit/services/header-footer'
import { OperationalHourPage } from '@/pages/modules/website-unit/services/operational-hour'
import { CategoryCollection } from '@/pages/modules/website-unit/collection'
import { ListCollectionCategory } from '@/pages/modules/website-unit/collection/listCollection'
import { FloorPlanUnitPage } from '@/pages/modules/website-unit/floor-plan'
import { InboxMessageUnit } from '@/pages/modules/website-unit/question/inbox'
import { QuestionFAQUnitPage } from '@/pages/modules/website-unit/question/FAQ'
import { CategoryFAQUnitPage } from '@/pages/modules/website-unit/question/FAQ/category'
import { GalleryVideoUnitPage } from '@/pages/modules/website-unit/gallery/video'
import { GalleryAlbumUnitPage } from '@/pages/modules/website-unit/gallery/album'
import { LogActivityGalleryAlbum } from '@/pages/modules/website-unit/gallery/album/log'
import { GalleryPhotoUnitPage } from '@/pages/modules/website-unit/gallery/photo'
import { LandingPageUnit } from '@/pages/modules/website-unit/settings/landing-page'
import { BackgroundWebsiteUnitSettings } from '@/pages/modules/website-unit/settings/background'
import { NewsUnitPublicContentPage } from '@/pages/modules/website-unit/public-content/news'
import { NewsUnitCreated } from '@/pages/modules/website-unit/public-content/news/created'
import { NewsUnitUpdated } from '@/pages/modules/website-unit/public-content/news/updated'
import { DetailNewsUnitPage } from '@/pages/modules/website-unit/public-content/news/detail'
import { LogActivityNewsUnitPage } from '@/pages/modules/website-unit/public-content/news/log-data'
import { AnnouncementUnitPublicContent } from '@/pages/modules/website-unit/public-content/announcement'
import { CreatedAnnouncementUnit } from '@/pages/modules/website-unit/public-content/announcement/created'
import { UpdatedAnnouncementUnit } from '@/pages/modules/website-unit/public-content/announcement/updated'
import { AnnouncementProdiDetailUnit } from '@/pages/modules/website-unit/public-content/announcement/detail'
import { LogActivityAnnouncementUnitPage } from '@/pages/modules/website-unit/public-content/announcement/log'
import { AgendaUnitPublicContent } from '@/pages/modules/website-unit/public-content/agenda'
import { CreateAgendaUnitPage } from '@/pages/modules/website-unit/public-content/agenda/created'
import { UpdatedAgendaUnitPage } from '@/pages/modules/website-unit/public-content/agenda/updated'
import { LogActivityAgendaUnitPage } from '@/pages/modules/website-unit/public-content/agenda/log'
import { AgendaUnitDetailPage } from '@/pages/modules/website-unit/public-content/agenda/detail'
import DownloadFileUNitPage from '@/pages/modules/website-unit/public-content/Download'
import { AddDownloadUnitPage } from '@/pages/modules/website-unit/public-content/Download/created'
import { CategoryDownloadProdiPage } from '@/pages/modules/website-unit/public-content/Download/category'
import { UpdatedDownloadUnitPage } from '@/pages/modules/website-unit/public-content/Download/updated'
import { FacilitiesUnitPublicContent } from '@/pages/modules/website-unit/public-content/Facilities'
import { CreatedFacilitiesUnit } from '@/pages/modules/website-unit/public-content/Facilities/created'
import { UpdatedFacilitiesUnit } from '@/pages/modules/website-unit/public-content/Facilities/updated'
import { DetailFacilitiesUnitPage } from '@/pages/modules/website-unit/public-content/Facilities/detail'
import DashboardAdminUnit from '@/pages/modules/website-unit/dashboard'
import { LogActivityFacilitiesUnitPage } from '@/pages/modules/website-unit/public-content/Facilities/log'
import { PrimaryAndFooterColorUnit } from '@/pages/modules/website-unit/settings/color'

export const WebsiteUnitRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardAdminUnit />,
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
    path: 'data-unit',
    children: [
      {
        index: true,
        element: <DetailProfileUnit />,
      },
      {
        path: 'edit',
        element: <UpdatedDataUnit />,
      },
    ],
  },
  {
    path: 'profile',
    element: <LayoutProfileUnit />,
    children: [
      {
        path: 'about',
        element: <AboutProfileUnit />,
      },
      {
        path: 'history',
        element: <HistoryUnit />,
      },
      {
        path: 'our-team',
        children: [
          {
            index: true,
            element: <OurTeamUnit />,
          },
          {
            path: ':id/team',
            element: <DivisionTeamUnit />,
          },
        ],
      },
      {
        path: 'vision',
        element: <VisionMission />,
      },
      {
        path: 'goals-task',
        element: <TaskPurposeUnit />,
      },
      {
        path: 'achievement',
        children: [
          {
            index: true,
            element: <AchievementUnitPage />,
          },
          {
            path: ':id/reward',
            element: <RewardAchievement />,
          },
        ],
      },
      {
        path: 'collaboration',
        children: [
          {
            index: true,
            element: <Collaboration />,
          },
          {
            path: 'add',
            element: <CreatedCollaborationUnit />,
          },
          {
            path: 'edit/:idCalloboration',
            element: <UpdatedCollaborationUnit />,
          },
          {
            path: 'detail/:idCalloboration',
            element: <CalloborationDetailView />,
          },
          {
            path: 'log/:idCalloboration',
            element: <CalloborationLogView />,
          },
        ],
      },
      {
        path: 'organization-structure',
        element: <OrganizationStructure />,
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        path: 'list',
        children: [
          {
            index: true,
            element: <ServicesList />,
          },
          {
            path: ':id',
            element: <ListServiceCategory />,
          },
        ],
      },
      {
        path: 'main',
        element: <MainServiceList />,
      },
      {
        path: 'header-footer',
        element: <HeaderFooterServices />,
      },
      {
        path: 'operational-hours',
        element: <OperationalHourPage />,
      },
    ],
  },
  {
    path: 'collection',
    children: [
      {
        index: true,
        element: <CategoryCollection />,
      },
      {
        path: ':id/list',
        element: <ListCollectionCategory />,
      },
    ],
  },
  {
    path: 'floor-plan',
    element: <FloorPlanUnitPage />,
  },
  {
    path: 'public-content',
    children: [
      {
        path: 'news',
        children: [
          {
            index: true,
            element: <NewsUnitPublicContentPage />,
          },
          {
            path: 'add',
            element: <NewsUnitCreated />,
          },
          {
            path: 'edit/:id',
            element: <NewsUnitUpdated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsUnitPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsUnitPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementUnitPublicContent />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementUnit />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementUnit />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementProdiDetailUnit />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementUnitPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaUnitPublicContent />,
          },
          {
            path: 'add',
            element: <CreateAgendaUnitPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaUnitPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaUnitDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaUnitPage />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFileUNitPage />,
          },
          {
            path: 'category',
            element: <CategoryDownloadProdiPage />,
          },
          {
            path: 'add',
            element: <AddDownloadUnitPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedDownloadUnitPage />,
          },
        ],
      },
      {
        path: 'facilities-unit',
        children: [
          {
            index: true,
            element: <FacilitiesUnitPublicContent />,
          },
          {
            path: 'add',
            element: <CreatedFacilitiesUnit />,
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
  {
    path: 'question',
    children: [
      {
        path: 'inbox',
        element: <InboxMessageUnit />,
      },
      {
        path: 'faq',
        children: [
          {
            index: true,
            element: <QuestionFAQUnitPage />,
          },
          {
            path: 'category',
            element: <CategoryFAQUnitPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'gallery',
    children: [
      {
        path: 'video',
        element: <GalleryVideoUnitPage />,
      },
      {
        path: 'photo',
        children: [
          {
            index: true,
            element: <GalleryAlbumUnitPage />,
          },
          {
            path: 'album/:id',
            element: <GalleryPhotoUnitPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityGalleryAlbum />,
          },
        ],
      },
    ],
  },
  {
    path: 'settings',
    children: [
      {
        path: 'landing-page',
        element: <LandingPageUnit />,
      },
      {
        path: 'background',
        element: <BackgroundWebsiteUnitSettings />,
      },
      {
        path: 'primary-color',
        element: <PrimaryAndFooterColorUnit />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
