import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import DashboardSPI from '@/pages/modules/SPI/dashboard'
import { DetailProfileSPI } from '@/pages/modules/SPI/data-spi'
import { UpdatedDataSPI } from '@/pages/modules/SPI/data-spi/updated'
import { ProfileHistoryPage } from '@/pages/modules/SPI/about/history'
import { VisionMissionSPIPage } from '@/pages/modules/SPI/about/vision-mission'
import { ProfileStructurePage } from '@/pages/modules/SPI/about/structure'
import { ShortProfilePage } from '@/pages/modules/SPI/about/short-profile'
import { AuthoritySPIPage } from '@/pages/modules/SPI/about/authority'
import { ProfileCodeEthicsPage } from '@/pages/modules/SPI/about/ethics'
import { ServicesSPI } from '@/pages/modules/SPI/services'
import { CreatedService } from '@/pages/modules/SPI/services/created'
import { UpdatedService } from '@/pages/modules/SPI/services/updated'
import { DetailServiceSPI } from '@/pages/modules/SPI/services/detail'
import { RegulationPage } from '@/pages/modules/SPI/regulation'
import { HumanResourcePage } from '@/pages/modules/SPI/about/human-resource'
import { OfficiallyDataSPI } from '@/pages/modules/SPI/about/human-resource/officialy'
import { ELHKPNDetailPage } from '@/pages/modules/SPI/e-lhkpn'
import { AwardListPage } from '@/pages/modules/SPI/award'

export const SPI_ROUTES = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardSPI />,
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
    path: 'data-spi',
    children: [
      {
        index: true,
        element: <DetailProfileSPI />,
      },
      {
        path: 'edit',
        element: <UpdatedDataSPI />,
      },
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: 'profile',
        element: <ShortProfilePage />,
      },
      {
        path: 'history',
        element: <ProfileHistoryPage />,
      },
      {
        path: 'vision-mission',
        element: <VisionMissionSPIPage />,
      },
      {
        path: 'organization',
        element: <ProfileStructurePage />,
      },
      {
        path: 'human-resource',
        children: [
          {
            index: true,
            element: <HumanResourcePage />,
          },
          {
            path: 'official/:id',
            element: <OfficiallyDataSPI />,
          },
        ],
      },
      {
        path: 'authority',
        element: <AuthoritySPIPage />,
      },
      {
        path: 'ethics',
        element: <ProfileCodeEthicsPage />,
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        index: true,
        element: <ServicesSPI />,
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
        element: <DetailServiceSPI />,
      },
    ],
  },
  {
    path: 'regulation',
    children: [
      {
        index: true,
        element: <RegulationPage />,
      },
    ],
  },
  {
    path: 'award',
    element: <AwardListPage />,
  },
  {
    path: 'e-lhkpn',
    element: <ELHKPNDetailPage />,
  },
  {
    path: '*',
    element: <></>,
  },
]
