import { lazy } from 'react'
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const DashboardPulsikom = lazy(() => import('@/pages/modules/Pulsikom/dashboard'))
const DetailProfilePuslikom = lazy(() => import('@/pages/modules/Pulsikom/data-pulsikom').then(m => ({ default: m.DetailProfilePuslikom })))
const UpdatedDataPulsikom = lazy(() => import('@/pages/modules/Pulsikom/data-pulsikom/updated').then(m => ({ default: m.UpdatedDataPulsikom })))
const HistoryAboutPulsikom = lazy(() => import('@/pages/modules/Pulsikom/about/history').then(m => ({ default: m.HistoryAboutPulsikom })))
const VisionMissionPulsikom = lazy(() => import('@/pages/modules/Pulsikom/about/vision-mission').then(m => ({ default: m.VisionMissionPulsikom })))
const ChiefOfficer = lazy(() => import('@/pages/modules/Pulsikom/about/chief-officer').then(m => ({ default: m.ChiefOfficer })))
const OfficiallyData = lazy(() => import('@/pages/modules/Pulsikom/about/chief-officer/officialy').then(m => ({ default: m.OfficiallyData })))
const ServicesPulsikom = lazy(() => import('@/pages/modules/Pulsikom/services').then(m => ({ default: m.ServicesPulsikom })))
const CreatedService = lazy(() => import('@/pages/modules/Pulsikom/services/created').then(m => ({ default: m.CreatedService })))
const UpdatedService = lazy(() => import('@/pages/modules/Pulsikom/services/updated').then(m => ({ default: m.UpdatedService })))
const DetailServicePulsikom = lazy(() => import('@/pages/modules/Pulsikom/services/detail').then(m => ({ default: m.DetailServicePulsikom })))
const ProductListPage = lazy(() => import('@/pages/modules/Pulsikom/product').then(m => ({ default: m.ProductListPage })))
const CreatedProduct = lazy(() => import('@/pages/modules/Pulsikom/product/created').then(m => ({ default: m.CreatedProduct })))
const UpdatedProduct = lazy(() => import('@/pages/modules/Pulsikom/product/updated').then(m => ({ default: m.UpdatedProduct })))
const DetailProduct = lazy(() => import('@/pages/modules/Pulsikom/product/detail').then(m => ({ default: m.DetailProduct })))
const ReferenceBankAccount = lazy(() => import('@/pages/modules/Pulsikom/reference/bank-account').then(m => ({ default: m.ReferenceBankAccount })))
const LandingPagePulsikom = lazy(() => import('@/pages/modules/Pulsikom/settings/landing-page').then(m => ({ default: m.LandingPagePulsikom })))
const WebsiteCarrierPage = lazy(() => import('@/pages/modules/Pulsikom/website-carrier').then(m => ({ default: m.WebsiteCarrierPage })))
const NewsPusilkomPublicContentPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/news').then(m => ({ default: m.NewsPusilkomPublicContentPage })))
const NewsPusilkomCreated = lazy(() => import('@/pages/modules/Pulsikom/public-content/news/created').then(m => ({ default: m.NewsPusilkomCreated })))
const NewsPulsikomUpdated = lazy(() => import('@/pages/modules/Pulsikom/public-content/news/updated').then(m => ({ default: m.NewsPulsikomUpdated })))
const DetailNewsPulsikomPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/news/detail').then(m => ({ default: m.DetailNewsPulsikomPage })))
const LogActivityNewsPulsikomPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/news/log-data').then(m => ({ default: m.LogActivityNewsPulsikomPage })))
const AgendaPulsikomPublicContent = lazy(() => import('@/pages/modules/Pulsikom/public-content/agenda').then(m => ({ default: m.AgendaPulsikomPublicContent })))
const CreateAgendaPulsikomPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/agenda/created').then(m => ({ default: m.CreateAgendaPulsikomPage })))
const AgendaPulsikomDetailPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/agenda/detail').then(m => ({ default: m.AgendaPulsikomDetailPage })))
const UpdatedAgendaPulsikomPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaPulsikomPage })))
const LogActivityAgendaPulsikomPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaPulsikomPage })))
const AnnouncementPulsikom = lazy(() => import('@/pages/modules/Pulsikom/public-content/announcement').then(m => ({ default: m.AnnouncementPulsikom })))
const CreatedAnnouncementPulsikom = lazy(() => import('@/pages/modules/Pulsikom/public-content/announcement/created').then(m => ({ default: m.CreatedAnnouncementPulsikom })))
const AnnouncementPulsikomDetailPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/announcement/detail').then(m => ({ default: m.AnnouncementPulsikomDetailPage })))
const UpdatedAnnouncementPulsikom = lazy(() => import('@/pages/modules/Pulsikom/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementPulsikom })))
const LogActivityAnnouncementPulsikom = lazy(() => import('@/pages/modules/Pulsikom/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementPulsikom })))
const DownloadFilePulsikom = lazy(() => import('@/pages/modules/Pulsikom/public-content/Download'))
const CategoryDownloadPulsikom = lazy(() => import('@/pages/modules/Pulsikom/public-content/Download/category').then(m => ({ default: m.CategoryDownloadPulsikom })))
const AddDownloadPage = lazy(() => import('@/pages/modules/Pulsikom/public-content/Download/created').then(m => ({ default: m.AddDownloadPage })))
const UpdatedDownload = lazy(() => import('@/pages/modules/Pulsikom/public-content/Download/updated').then(m => ({ default: m.UpdatedDownload })))
const ColorSettingPulsikom = lazy(() => import('@/pages/modules/Pulsikom/settings/color/ColorSettingService.tsx'))
const TemplateWebPulsikomSettings = lazy(() => import('@/pages/modules/Pulsikom/settings/template-web').then(m => ({ default: m.TemplateWebPulsikomSettings })))
const ListTraining = lazy(() => import('@/pages/modules/Pulsikom/training/list-training').then(m => ({ default: m.ListTraining })))
const CreatedTraining = lazy(() => import('@/pages/modules/Pulsikom/training/list-training/created').then(m => ({ default: m.CreatedTraining })))
const DetailTraining = lazy(() => import('@/pages/modules/Pulsikom/training/list-training/detail').then(m => ({ default: m.DetailTraining })))
const Participant = lazy(() => import('@/pages/modules/Pulsikom/training/list-training/participant').then(m => ({ default: m.Participant })))
const CalendarTrainingCollect = lazy(() => import('@/pages/modules/Pulsikom/training/Calendar').then(m => ({ default: m.CalendarTrainingCollect })))
const CreditEarningPage = lazy(() => import('@/pages/modules/Pulsikom/training/credit-earning').then(m => ({ default: m.CreditEarningPage })))
const DetailParticipant = lazy(() => import('@/pages/modules/Pulsikom/training/list-training/participant/detail').then(m => ({ default: m.DetailParticipant })))
const HistoryEmail = lazy(() => import('@/pages/modules/Pulsikom/training/list-training/participant/history-email').then(m => ({ default: m.HistoryEmail })))
const ListProgram = lazy(() => import('@/pages/modules/Pulsikom/training/credit-earning/Program').then(m => ({ default: m.ListProgram })))
const CreatedProgram = lazy(() => import('@/pages/modules/Pulsikom/training/credit-earning/Program/created').then(m => ({ default: m.CreatedProgram })))
const DetailProgramEarning = lazy(() => import('@/pages/modules/Pulsikom/training/credit-earning/Program/detail').then(m => ({ default: m.DetailProgramEarning })))
const ParticipantProgram = lazy(() => import('@/pages/modules/Pulsikom/training/credit-earning/Program/participant').then(m => ({ default: m.ParticipantProgram })))
const DetailParticipantProgram = lazy(() => import('@/pages/modules/Pulsikom/training/credit-earning/Program/participant/detail').then(m => ({ default: m.DetailParticipantProgram })))
const VerifyRegistration = lazy(() => import('@/pages/modules/Pulsikom/training/verify-registration').then(m => ({ default: m.VerifyRegistration })))
const HistoryEmailProgram = lazy(() => import('@/pages/modules/Pulsikom/training/credit-earning/Program/participant/history-email').then(m => ({ default: m.HistoryEmailProgram })))
const AdvantagePage = lazy(() => import('@/pages/modules/Pulsikom/advantage').then(m => ({ default: m.AdvantagePage })))
const CreatedAdvantage = lazy(() => import('@/pages/modules/Pulsikom/advantage/created').then(m => ({ default: m.CreatedAdvantage })))
const UpdatedAdvantage = lazy(() => import('@/pages/modules/Pulsikom/advantage/updated').then(m => ({ default: m.UpdatedAdvantage })))
const SettingsBackground = lazy(() => import('@/pages/modules/Pulsikom/settings/background').then(m => ({ default: m.SettingsBackground })))
const InboxMessage = lazy(() => import('@/pages/modules/Pulsikom/inbox').then(m => ({ default: m.InboxMessage })))
const ThemaChangeColorPusilkom = lazy(() => import('@/pages/modules/Pulsikom/settings/template-web/color').then(m => ({ default: m.ThemaChangeColorPusilkom })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

export const PusilkomRoutes = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardPulsikom />,
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
    path: 'data-pulsikom',
    children: [
      {
        index: true,
        element: <DetailProfilePuslikom />,
      },
      {
        path: 'edit',
        element: <UpdatedDataPulsikom />,
      },
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: 'History',
        element: <HistoryAboutPulsikom />,
      },
      {
        path: 'vision-mission',
        element: <VisionMissionPulsikom />,
      },
      {
        path: 'chief-officer',
        children: [
          {
            index: true,
            element: <ChiefOfficer />,
          },
          {
            path: 'official/:id',
            element: <OfficiallyData />,
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
        element: <ServicesPulsikom />,
      },
      {
        path: 'add',
        element: <CreatedService />,
      },
      {
        path: 'edit/:id',
        element: <UpdatedService />,
      },
      {
        path: 'detail/:id',
        element: <DetailServicePulsikom />,
      },
    ],
  },
  {
    path: 'advantage',
    children: [
      {
        index: true,
        element: <AdvantagePage />,
      },
      {
        path: 'add',
        element: <CreatedAdvantage />,
      },
      {
        path: 'edit/:id',
        element: <UpdatedAdvantage />,
      },
    ],
  },
  {
    path: 'products',
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: 'add',
        element: <CreatedProduct />,
      },
      {
        path: 'edit/:id',
        element: <UpdatedProduct />,
      },
      {
        path: 'detail/:id',
        element: <DetailProduct />,
      },
    ],
  },
  {
    path: 'reference',
    children: [
      {
        path: 'bank-account',
        element: <ReferenceBankAccount />,
      },
    ],
  },
  {
    path: 'carrier-website',
    element: <WebsiteCarrierPage />,
  },
  {
    path: 'inbox',
    element: <InboxMessage />,
  },
  {
    path: 'public-content',
    children: [
      {
        path: 'news',
        children: [
          {
            index: true,
            element: <NewsPusilkomPublicContentPage />,
          },
          {
            path: 'add',
            element: <NewsPusilkomCreated />,
          },
          {
            path: 'edit/:id',
            element: <NewsPulsikomUpdated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsPulsikomPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsPulsikomPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaPulsikomPublicContent />,
          },
          {
            path: 'add',
            element: <CreateAgendaPulsikomPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaPulsikomDetailPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaPulsikomPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaPulsikomPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementPulsikom />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementPulsikom />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementPulsikom />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementPulsikomDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementPulsikom />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFilePulsikom />,
          },
          {
            path: 'category',
            element: <CategoryDownloadPulsikom />,
          },
          {
            path: 'add',
            element: <AddDownloadPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedDownload />,
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
        element: <LandingPagePulsikom />,
      },
      {
        path: 'background-image',
        element: <SettingsBackground />,
      },
      {
        path: 'color',
        element: <ColorSettingPulsikom />,
      },
      {
        path: 'template',
        // element: <TemplateWebPulsikomSettings />,
        children: [
          {
            index: true,
            element: <TemplateWebPulsikomSettings />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorPusilkom />,
          },
        ],
      },
    ],
  },
  {
    path: 'training',
    children: [
      {
        path: 'list-training',
        children: [
          {
            index: true,
            element: <ListTraining />,
          },
          {
            path: 'add',
            element: <CreatedTraining />,
          },
          {
            path: 'edit/:id',
            element: <CreatedTraining />,
          },
          {
            path: 'detail/:id',
            element: <DetailTraining />,
          },
          {
            path: 'detail/:id/participant',
            element: <Participant />,
          },
          {
            path: 'detail/:id/participant/detail/:participant_id',
            element: <DetailParticipant />,
          },
          {
            path: 'detail/:id/participant/email/:participant_id',
            element: <HistoryEmail />,
          },
        ],
      },
      {
        path: 'calendar',
        element: <CalendarTrainingCollect />,
      },
      {
        path: 'credit-earning',
        children: [
          {
            index: true,
            element: <CreditEarningPage />,
          },
          {
            path: 'program',
            children: [
              {
                index: true,
                element: <ListProgram />,
              },
              {
                path: 'add',
                element: <CreatedProgram />,
              },
              {
                path: 'edit/:id',
                element: <CreatedProgram />,
              },
              {
                path: 'detail/:id',
                children: [
                  {
                    index: true,
                    element: <DetailProgramEarning />,
                  },
                  {
                    path: 'participant',
                    children: [
                      {
                        index: true,
                        element: <ParticipantProgram />,
                      },
                      {
                        path: 'detail/:participant_id',
                        element: <DetailParticipantProgram />,
                      },
                      {
                        path: 'email/:participant_id',
                        element: <HistoryEmailProgram />,
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
        path: 'verify-registration',
        children: [
          {
            index: true,
            element: <VerifyRegistration />,
          },
          {
            path: 'training/:id',
            children: [
              {
                index: true,
                element: <Participant />,
              },
              {
                path: 'detail/:participant_id',
                element: <DetailParticipant />,
              },
              {
                path: 'email/:participant_id',
                element: <HistoryEmail />,
              },
            ],
          },
          {
            path: 'program/:id',
            children: [
              {
                index: true,
                element: <ParticipantProgram />,
              },
              {
                path: 'detail/:participant_id',
                element: <DetailParticipantProgram />,
              },
              {
                path: 'email/:participant_id',
                element: <HistoryEmailProgram />,
              },
            ],
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
