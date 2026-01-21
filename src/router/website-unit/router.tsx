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
        element: <AchievementUnitPage />,
      },
      {
        path: 'collaboration',
        element: <Collaboration />,
      },
      {
        path: 'organization-structure',
        element: <OrganizationStructure />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
