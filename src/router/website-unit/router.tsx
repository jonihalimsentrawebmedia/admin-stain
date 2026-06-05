import { lazy } from 'react'

const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const DetailProfileUnit = lazy(() => import('@/pages/modules/website-unit/data-unit').then(m => ({ default: m.DetailProfileUnit })))
const UpdatedDataUnit = lazy(() => import('@/pages/modules/website-unit/data-unit/updated').then(m => ({ default: m.UpdatedDataUnit })))
const LayoutProfileUnit = lazy(() => import('@/pages/modules/website-unit/profile/components/layout.tsx').then(m => ({ default: m.LayoutProfileUnit })))
const AboutProfileUnit = lazy(() => import('@/pages/modules/website-unit/profile/about').then(m => ({ default: m.AboutProfileUnit })))
const HistoryUnit = lazy(() => import('@/pages/modules/website-unit/profile/history').then(m => ({ default: m.HistoryUnit })))
const OurTeamUnit = lazy(() => import('@/pages/modules/website-unit/profile/our-team').then(m => ({ default: m.OurTeamUnit })))
const DivisionTeamUnit = lazy(() => import('@/pages/modules/website-unit/profile/our-team/division-team').then(m => ({ default: m.DivisionTeamUnit })))
const VisionMission = lazy(() => import('@/pages/modules/website-unit/profile/vission').then(m => ({ default: m.VisionMission })))
const TaskPurposeUnit = lazy(() => import('@/pages/modules/website-unit/profile/task-purpose').then(m => ({ default: m.TaskPurposeUnit })))
const OrganizationStructure = lazy(() => import('@/pages/modules/website-unit/profile/organization-structure').then(m => ({ default: m.OrganizationStructure })))
const Collaboration = lazy(() => import('@/pages/modules/website-unit/profile/collaboration').then(m => ({ default: m.Collaboration })))
const AchievementUnitPage = lazy(() => import('@/pages/modules/website-unit/profile/achievement').then(m => ({ default: m.AchievementUnitPage })))
const RewardAchievement = lazy(() => import('@/pages/modules/website-unit/profile/achievement/reward').then(m => ({ default: m.RewardAchievement })))
const CreatedCollaborationUnit = lazy(() => import('@/pages/modules/website-unit/profile/collaboration/created').then(m => ({ default: m.CreatedCollaborationUnit })))
const UpdatedCollaborationUnit = lazy(() => import('@/pages/modules/website-unit/profile/collaboration/updated').then(m => ({ default: m.UpdatedCollaborationUnit })))
const CalloborationDetailView = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/detail/CalloborationDetailView.tsx'))
const CalloborationLogView = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/log/CalloborationLogView.tsx'))
const ServicesList = lazy(() => import('@/pages/modules/website-unit/services/category').then(m => ({ default: m.ServicesList })))
const ListServiceCategory = lazy(() => import('@/pages/modules/website-unit/services/list').then(m => ({ default: m.ListServiceCategory })))
const MainServiceList = lazy(() => import('@/pages/modules/website-unit/services/main').then(m => ({ default: m.MainServiceList })))
const HeaderFooterServices = lazy(() => import('@/pages/modules/website-unit/services/header-footer').then(m => ({ default: m.HeaderFooterServices })))
const OperationalHourPage = lazy(() => import('@/pages/modules/website-unit/services/operational-hour').then(m => ({ default: m.OperationalHourPage })))
const CategoryCollection = lazy(() => import('@/pages/modules/website-unit/collection').then(m => ({ default: m.CategoryCollection })))
const ListCollectionCategory = lazy(() => import('@/pages/modules/website-unit/collection/listCollection').then(m => ({ default: m.ListCollectionCategory })))
const FloorPlanUnitPage = lazy(() => import('@/pages/modules/website-unit/floor-plan').then(m => ({ default: m.FloorPlanUnitPage })))
const InboxMessageUnit = lazy(() => import('@/pages/modules/website-unit/question/inbox').then(m => ({ default: m.InboxMessageUnit })))
const QuestionFAQUnitPage = lazy(() => import('@/pages/modules/website-unit/question/FAQ').then(m => ({ default: m.QuestionFAQUnitPage })))
const CategoryFAQUnitPage = lazy(() => import('@/pages/modules/website-unit/question/FAQ/category').then(m => ({ default: m.CategoryFAQUnitPage })))
const GalleryVideoUnitPage = lazy(() => import('@/pages/modules/website-unit/gallery/video').then(m => ({ default: m.GalleryVideoUnitPage })))
const GalleryAlbumUnitPage = lazy(() => import('@/pages/modules/website-unit/gallery/album').then(m => ({ default: m.GalleryAlbumUnitPage })))
const LogActivityGalleryAlbum = lazy(() => import('@/pages/modules/website-unit/gallery/album/log').then(m => ({ default: m.LogActivityGalleryAlbum })))
const GalleryPhotoUnitPage = lazy(() => import('@/pages/modules/website-unit/gallery/photo').then(m => ({ default: m.GalleryPhotoUnitPage })))
const LandingPageUnit = lazy(() => import('@/pages/modules/website-unit/settings/landing-page').then(m => ({ default: m.LandingPageUnit })))
const BackgroundWebsiteUnitSettings = lazy(() => import('@/pages/modules/website-unit/settings/background').then(m => ({ default: m.BackgroundWebsiteUnitSettings })))
const NewsUnitPublicContentPage = lazy(() => import('@/pages/modules/website-unit/public-content/news').then(m => ({ default: m.NewsUnitPublicContentPage })))
const NewsUnitCreated = lazy(() => import('@/pages/modules/website-unit/public-content/news/created').then(m => ({ default: m.NewsUnitCreated })))
const NewsUnitUpdated = lazy(() => import('@/pages/modules/website-unit/public-content/news/updated').then(m => ({ default: m.NewsUnitUpdated })))
const DetailNewsUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/news/detail').then(m => ({ default: m.DetailNewsUnitPage })))
const LogActivityNewsUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/news/log-data').then(m => ({ default: m.LogActivityNewsUnitPage })))
const AnnouncementUnitPublicContent = lazy(() => import('@/pages/modules/website-unit/public-content/announcement').then(m => ({ default: m.AnnouncementUnitPublicContent })))
const CreatedAnnouncementUnit = lazy(() => import('@/pages/modules/website-unit/public-content/announcement/created').then(m => ({ default: m.CreatedAnnouncementUnit })))
const UpdatedAnnouncementUnit = lazy(() => import('@/pages/modules/website-unit/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementUnit })))
const AnnouncementProdiDetailUnit = lazy(() => import('@/pages/modules/website-unit/public-content/announcement/detail').then(m => ({ default: m.AnnouncementProdiDetailUnit })))
const LogActivityAnnouncementUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementUnitPage })))
const AgendaUnitPublicContent = lazy(() => import('@/pages/modules/website-unit/public-content/agenda').then(m => ({ default: m.AgendaUnitPublicContent })))
const CreateAgendaUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/agenda/created').then(m => ({ default: m.CreateAgendaUnitPage })))
const UpdatedAgendaUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaUnitPage })))
const LogActivityAgendaUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaUnitPage })))
const AgendaUnitDetailPage = lazy(() => import('@/pages/modules/website-unit/public-content/agenda/detail').then(m => ({ default: m.AgendaUnitDetailPage })))
const DownloadFileUNitPage = lazy(() => import('@/pages/modules/website-unit/public-content/Download'))
const AddDownloadUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/Download/created').then(m => ({ default: m.AddDownloadUnitPage })))
const CategoryDownloadProdiPage = lazy(() => import('@/pages/modules/website-unit/public-content/Download/category').then(m => ({ default: m.CategoryDownloadProdiPage })))
const UpdatedDownloadUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/Download/updated').then(m => ({ default: m.UpdatedDownloadUnitPage })))
const FacilitiesUnitPublicContent = lazy(() => import('@/pages/modules/website-unit/public-content/Facilities').then(m => ({ default: m.FacilitiesUnitPublicContent })))
const CreatedFacilitiesUnit = lazy(() => import('@/pages/modules/website-unit/public-content/Facilities/created').then(m => ({ default: m.CreatedFacilitiesUnit })))
const UpdatedFacilitiesUnit = lazy(() => import('@/pages/modules/website-unit/public-content/Facilities/updated').then(m => ({ default: m.UpdatedFacilitiesUnit })))
const DetailFacilitiesUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/Facilities/detail').then(m => ({ default: m.DetailFacilitiesUnitPage })))
const DashboardAdminUnit = lazy(() => import('@/pages/modules/website-unit/dashboard'))
const LogActivityFacilitiesUnitPage = lazy(() => import('@/pages/modules/website-unit/public-content/Facilities/log').then(m => ({ default: m.LogActivityFacilitiesUnitPage })))
const PrimaryAndFooterColorUnit = lazy(() => import('@/pages/modules/website-unit/settings/color').then(m => ({ default: m.PrimaryAndFooterColorUnit })))
const TemplateWebSettings = lazy(() => import('@/pages/modules/website-unit/settings/template-web').then(m => ({ default: m.TemplateWebSettings })))
const ThemaChangeColorUnit = lazy(() => import('@/pages/modules/website-unit/settings/template-web/color').then(m => ({ default: m.ThemaChangeColorUnit })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

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
    path:"panduan",
    element:<GuideListView/>
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
      {
        path: 'template',
        // element: <TemplateWebSettings />,
        children: [
          {
            index: true,
            element: <TemplateWebSettings />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorUnit />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
