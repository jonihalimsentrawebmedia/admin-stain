import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { DetailProfileLPPM } from '@/pages/modules/LPPM/data-lppm'
import { UpdatedDataLPPM } from '@/pages/modules/LPPM/data-lppm/updated'
import { AboutProfile } from '@/pages/modules/LPPM/about/profile'
import { StructureOrganizationProfile } from '@/pages/modules/LPPM/about/structure'
import { VisionMissionAbout } from '@/pages/modules/LPPM/about/vision-mission'
import { ProfileLeaderPage } from '@/pages/modules/LPPM/about/leader'
import { ProfileSecretaryPage } from '@/pages/modules/LPPM/about/secretary'
import { ProfileStaffLPPM } from '@/pages/modules/LPPM/about/staff'
import { StaffMemberList } from '@/pages/modules/LPPM/about/staff/member'
import { CreateStaffMember } from '@/pages/modules/LPPM/about/staff/member/component/create.tsx'

export const routesLPPM = [
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
    path: 'data-lppm',
    children: [
      {
        index: true,
        element: <DetailProfileLPPM />,
      },
      {
        path: 'edit',
        element: <UpdatedDataLPPM />,
      },
    ],
  },
  {
    path: 'about',
    children: [
      {
        path: 'profile',
        element: <AboutProfile />,
      },
      {
        path: 'vision-mission',
        element: <VisionMissionAbout />,
      },
      {
        path: 'structure',
        element: <StructureOrganizationProfile />,
      },
      {
        path: 'leader',
        element: <ProfileLeaderPage />,
      },
      {
        path: 'secretary',
        element: <ProfileSecretaryPage />,
      },
      {
        path: 'staff',
        children: [
          {
            index: true,
            element: <ProfileStaffLPPM />,
          },
          {
            path: 'member/:id',
            element: <StaffMemberList />,
          },
          {
            path: 'member/:id/add',
            element: <CreateStaffMember />,
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
