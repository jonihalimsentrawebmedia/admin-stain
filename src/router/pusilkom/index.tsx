import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import DashboardPulsikom from '@/pages/modules/Pulsikom/dashboard'
import { DetailProfilePuslikom } from '@/pages/modules/Pulsikom/data-pulsikom'
import { UpdatedDataPulsikom } from '@/pages/modules/Pulsikom/data-pulsikom/updated'
import { HistoryAboutPulsikom } from '@/pages/modules/Pulsikom/about/history'
import { VisionMissionPulsikom } from '@/pages/modules/Pulsikom/about/vision-mission'
import { ChiefOfficer } from '@/pages/modules/Pulsikom/about/chief-officer'
import { OfficiallyData } from '@/pages/modules/Pulsikom/about/chief-officer/officialy'
import { ServicesPulsikom } from '@/pages/modules/Pulsikom/services'
import { CreatedService } from '@/pages/modules/Pulsikom/services/created'
import { UpdatedService } from '@/pages/modules/Pulsikom/services/updated'
import { DetailServicePulsikom } from '@/pages/modules/Pulsikom/services/detail'
import { ProductListPage } from '@/pages/modules/Pulsikom/product'
import { CreatedProduct } from '@/pages/modules/Pulsikom/product/created'
import { UpdatedProduct } from '@/pages/modules/Pulsikom/product/updated'
import { DetailProduct } from '@/pages/modules/Pulsikom/product/detail'
import { ReferenceBankAccount } from '@/pages/modules/Pulsikom/reference/bank-account'
import { LandingPagePulsikom } from '@/pages/modules/Pulsikom/settings/landing-page'
import { WebsiteCarrierPage } from '@/pages/modules/Pulsikom/website-carrier'
import { NewsPusilkomPublicContentPage } from '@/pages/modules/Pulsikom/public-content/news'
import { NewsPusilkomCreated } from '@/pages/modules/Pulsikom/public-content/news/created'
import { NewsPulsikomUpdated } from '@/pages/modules/Pulsikom/public-content/news/updated'
import { DetailNewsPulsikomPage } from '@/pages/modules/Pulsikom/public-content/news/detail'
import { LogActivityNewsPulsikomPage } from '@/pages/modules/Pulsikom/public-content/news/log-data'
import { AgendaPulsikomPublicContent } from '@/pages/modules/Pulsikom/public-content/agenda'
import { CreateAgendaPulsikomPage } from '@/pages/modules/Pulsikom/public-content/agenda/created'
import { AgendaPulsikomDetailPage } from '@/pages/modules/Pulsikom/public-content/agenda/detail'
import { UpdatedAgendaPulsikomPage } from '@/pages/modules/Pulsikom/public-content/agenda/updated'
import { LogActivityAgendaPulsikomPage } from '@/pages/modules/Pulsikom/public-content/agenda/log'
import { AnnouncementPulsikom } from '@/pages/modules/Pulsikom/public-content/announcement'
import { CreatedAnnouncementPulsikom } from '@/pages/modules/Pulsikom/public-content/announcement/created'
import { AnnouncementPulsikomDetailPage } from '@/pages/modules/Pulsikom/public-content/announcement/detail'
import { UpdatedAnnouncementPulsikom } from '@/pages/modules/Pulsikom/public-content/announcement/updated'
import { LogActivityAnnouncementPulsikom } from '@/pages/modules/Pulsikom/public-content/announcement/log'
import DownloadFilePulsikom from '@/pages/modules/Pulsikom/public-content/Download'
import { CategoryDownloadPulsikom } from '@/pages/modules/Pulsikom/public-content/Download/category'
import { AddDownloadPage } from '@/pages/modules/Pulsikom/public-content/Download/created'
import { UpdatedDownload } from '@/pages/modules/Pulsikom/public-content/Download/updated'
import ColorSettingPulsikom from '@/pages/modules/Pulsikom/settings/color/ColorSettingService.tsx'
import { TemplateWebPulsikomSettings } from '@/pages/modules/Pulsikom/settings/template-web'
import { ListTraining } from '@/pages/modules/Pulsikom/training/list-training'
import { CreatedTraining } from '@/pages/modules/Pulsikom/training/list-training/created'
import { DetailTraining } from '@/pages/modules/Pulsikom/training/list-training/detail'
import { Participant } from '@/pages/modules/Pulsikom/training/list-training/participant'
import { CalendarTrainingCollect } from '@/pages/modules/Pulsikom/training/Calendar'
import { CreditEarningPage } from '@/pages/modules/Pulsikom/training/credit-earning'
import { DetailParticipant } from '@/pages/modules/Pulsikom/training/list-training/participant/detail'
import { HistoryEmail } from '@/pages/modules/Pulsikom/training/list-training/participant/history-email'
import { ListProgram } from '@/pages/modules/Pulsikom/training/credit-earning/Program'
import { CreatedProgram } from '@/pages/modules/Pulsikom/training/credit-earning/Program/created'
import { DetailProgramEarning } from '@/pages/modules/Pulsikom/training/credit-earning/Program/detail'
import { ParticipantProgram } from '@/pages/modules/Pulsikom/training/credit-earning/Program/participant'
import { DetailParticipantProgram } from '@/pages/modules/Pulsikom/training/credit-earning/Program/participant/detail'
import { VerifyRegistration } from '@/pages/modules/Pulsikom/training/verify-registration'
import { HistoryEmailProgram } from '@/pages/modules/Pulsikom/training/credit-earning/Program/participant/history-email'
import { AdvantagePage } from '@/pages/modules/Pulsikom/advantage'
import { CreatedAdvantage } from '@/pages/modules/Pulsikom/advantage/created'
import { UpdatedAdvantage } from '@/pages/modules/Pulsikom/advantage/updated'
import { SettingsBackground } from '@/pages/modules/Pulsikom/settings/background'
import { InboxMessage } from '@/pages/modules/Pulsikom/inbox'

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
        element: <TemplateWebPulsikomSettings />,
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
