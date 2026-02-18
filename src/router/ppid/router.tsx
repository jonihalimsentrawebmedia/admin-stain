import DashboardPPID from '@/pages/modules/ppid/dashboard'
import ServiceCommitmentAddView from '@/pages/modules/ppid/profile/service-commitment/add/ServiceCommitmentAddView'
import ServiceCommitmentEditView from '@/pages/modules/ppid/profile/service-commitment/edit/ServiceCommitmentEditView'
import ServiceCommitmentView from '@/pages/modules/ppid/profile/service-commitment/ServiceCommitmentView'
import ShortDescriptionView from '@/pages/modules/ppid/profile/short-description/ShortDescriptionView'
import StructureOrganitationPPIDView from '@/pages/modules/ppid/profile/structure-organization/StructureOrganitationPPIDView'
import VisiMisiUnitAddView from '@/pages/modules/ppid/profile/visi-misi/add/VisiMisiUnitAddView'
import VisiMisiUnitEditView from '@/pages/modules/ppid/profile/visi-misi/edit/VisiMisiUnitEditView'
import VisiMisiPPIDView from '@/pages/modules/ppid/profile/visi-misi/VisiMisiView'
import WorkResponsibilitiesAddView from '@/pages/modules/ppid/profile/work-responsibilities/add/WorkResponsibilitiesAddView'
import WorkResponsibilitiesEditView from '@/pages/modules/ppid/profile/work-responsibilities/edit/WorkResponsibilitiesEditView'
import WorkResponsibilitiesView from '@/pages/modules/ppid/profile/work-responsibilities/WorkResponsibilitiesView'
import UnitView from '@/pages/modules/ppid/unit/UnitView'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'

export const routesPPID = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardPPID />,
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
    path: 'unit',
    element: <UnitView />,
  },
  {
    path: 'profile',
    children: [
      {
        path: 'visi-misi',
        children: [
          {
            index: true,
            element: <VisiMisiPPIDView />,
          },
          {
            path: 'add',
            element: <VisiMisiUnitAddView />,
          },
          {
            path: 'edit/:id',
            element: <VisiMisiUnitEditView />,
          },
        ],
      },
      {
        path: 'work-responsibilities',
        children: [
          {
            index: true,
            element: <WorkResponsibilitiesView />,
          },
          {
            path: 'add',
            element: <WorkResponsibilitiesAddView />,
          },
          {
            path: 'edit/:id',
            element: <WorkResponsibilitiesEditView />,
          },
        ],
      },
      {
        path: 'service-commitment',
        children: [
          {
            index: true,
            element: <ServiceCommitmentView />,
          },
          {
            path: 'add',
            element: <ServiceCommitmentAddView />,
          },
          {
            path: 'edit/:id',
            element: <ServiceCommitmentEditView />,
          },
        ],
      },
      {
        path: 'short-description',
        element: <ShortDescriptionView />,
      },
      {
        path: 'structure-organization',
        element: <StructureOrganitationPPIDView />,
      },
    ],
  },
]
