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

export const WebsiteUnitRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <></>,
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
    path: 'question',
    children: [
      {
        path: 'inbox',
        element: <InboxMessageUnit />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
