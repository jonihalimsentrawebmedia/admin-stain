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
        ],
      },
      {
        path: 'structure-organization',
        children: [
          {
            index: true,
            element: <StructureOrganizationPage />,
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
]
