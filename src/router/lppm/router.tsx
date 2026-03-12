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
import { UpdateStaffMember } from '@/pages/modules/LPPM/about/staff/member/component/update.tsx'
import { MainResearch } from '@/pages/modules/LPPM/research/main'
import { SchemaDoctoralResearch } from '@/pages/modules/LPPM/research/schema/doctoral'
import { SchemaInternalResearch } from '@/pages/modules/LPPM/research/schema/internal'
import { PlanMainResearch } from '@/pages/modules/LPPM/research/plan'
import { DocumentPLanResearch } from '@/pages/modules/LPPM/research/plan/document'
import { GuideCategoryResearch } from '@/pages/modules/LPPM/research/guide'
import { DocumentGuideCategory } from '@/pages/modules/LPPM/research/guide/document'
import { StudyCenterList } from '@/pages/modules/LPPM/research/study-center/study-list'
import { CreatedStudyCenter } from '@/pages/modules/LPPM/research/study-center/study-list/component/created.tsx'
import { UpdateStudyCenter } from '@/pages/modules/LPPM/research/study-center/study-list/component/updated.tsx'
import { DetailStudyCenter } from '@/pages/modules/LPPM/research/study-center/study-list/component/detail.tsx'
import { StandardOperationalStudy } from '@/pages/modules/LPPM/research/study-center/operational-standard'
import { MainDevotion } from '@/pages/modules/LPPM/devotion/main'
import { DevotionInternalSchema } from '@/pages/modules/LPPM/devotion/schema/internal'
import { ActivityProgramSchema } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program'
import { CreatedActivityProgram } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/component/created.tsx'
import { UpdatedActivityProgram } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/component/updated.tsx'
import { DetailActivityProgram } from '@/pages/modules/LPPM/devotion/schema/internal/activity-program/component/detail.tsx'
import { SchemaDataDRTPM } from '@/pages/modules/LPPM/devotion/schema/drtpm'
import { CreatedDRTPM } from '@/pages/modules/LPPM/devotion/schema/drtpm/component/created.tsx'
import { UpdatedDataDRTPM } from '@/pages/modules/LPPM/devotion/schema/drtpm/component/updated.tsx'
import { DetailDataDRTPM } from '@/pages/modules/LPPM/devotion/schema/drtpm/component/detail.tsx'
import { SchemaDataBRIN } from '@/pages/modules/LPPM/devotion/schema/brin'
import { CreatedBRIN } from '@/pages/modules/LPPM/devotion/schema/brin/component/created.tsx'
import { UpdatedDataBRIN } from '@/pages/modules/LPPM/devotion/schema/brin/component/updated.tsx'
import { DetailDataBRIN } from '@/pages/modules/LPPM/devotion/schema/brin/component/detail.tsx'
import { SchemaFundingOther } from '@/pages/modules/LPPM/devotion/schema/other'
import { CreatedOtherFunding } from '@/pages/modules/LPPM/devotion/schema/other/component/created.tsx'
import { UpdatedOtherFunding } from '@/pages/modules/LPPM/devotion/schema/other/component/updated.tsx'
import { DetailOtherFunding } from '@/pages/modules/LPPM/devotion/schema/other/component/detail.tsx'
import { MainDevotionHub } from '@/pages/modules/LPPM/devotion/stain-hub'
import { BookPublisherPage } from '@/pages/modules/LPPM/publication-hki/book/publisher'
import { BookMediaPage } from '@/pages/modules/LPPM/publication-hki/book/media'
import { BookCenterPage } from '@/pages/modules/LPPM/publication-hki/book/book-center'
import { UserManagementBook } from '@/pages/modules/LPPM/publication-hki/book/book-center/manangement'
import { CreatedUserManagementContext } from '@/pages/modules/LPPM/publication-hki/book/book-center/manangement/component/created.tsx'
import { UpdatedUserManagementContext } from '@/pages/modules/LPPM/publication-hki/book/book-center/manangement/component/Updated.tsx'
import { HKICenterPage } from '@/pages/modules/LPPM/publication-hki/hki/hki-center'
import { UserManagementHKI } from '@/pages/modules/LPPM/publication-hki/hki/hki-center/management'
import { CreatedUserManagementHKI } from '@/pages/modules/LPPM/publication-hki/hki/hki-center/management/component/created.tsx'
import { UpdatedUserManagementHKI } from '@/pages/modules/LPPM/publication-hki/hki/hki-center/management/component/Updated.tsx'
import { HKIDescriptionPage } from '@/pages/modules/LPPM/publication-hki/hki/description'
import { HKIRegistrationPage } from '@/pages/modules/LPPM/publication-hki/hki/registration'
import { JourNalPLPPage } from '@/pages/modules/LPPM/publication-hki/journal/plp'
import { UserManagementPLP } from '@/pages/modules/LPPM/publication-hki/journal/plp/management'
import { CreatedUserManagementPLP } from '@/pages/modules/LPPM/publication-hki/journal/plp/management/component/created.tsx'
import { UpdatedUserManagementPLP } from '@/pages/modules/LPPM/publication-hki/journal/plp/management/component/Updated.tsx'
import { JourNalPPJSPage } from '@/pages/modules/LPPM/publication-hki/journal/ppjs'
import { UserManagementPPJS } from '@/pages/modules/LPPM/publication-hki/journal/ppjs/management'
import { CreatedUserManagementPPJS } from '@/pages/modules/LPPM/publication-hki/journal/ppjs/management/component/created.tsx'
import { UpdatedUserManagementPPJS } from '@/pages/modules/LPPM/publication-hki/journal/ppjs/management/component/Updated.tsx'
import { PPIDInformationPage } from '@/pages/modules/LPPM/PPID'
import { ServicesListPage } from '@/pages/modules/LPPM/services'
import LPPMLandingPageView from '@/pages/modules/LPPM/settings/landing-page/LandingPageView'
import ColorSettingService from '@/pages/modules/LPPM/settings/warna/ColorSettingService'
import SettingTemplateServiceView from '@/pages/modules/LPPM/settings/template/SettingTemplateServiceView'
import { NewsLppmPublicContentPage } from '@/pages/modules/LPPM/public-content/news'
import { NewsLppmCreated } from '@/pages/modules/LPPM/public-content/news/created'
import { NewsLppmUpdated } from '@/pages/modules/LPPM/public-content/news/updated'
import { DetailNewsLppmPage } from '@/pages/modules/LPPM/public-content/news/detail'
import { LogActivityNewsLppmPage } from '@/pages/modules/LPPM/public-content/news/log-data'
import { AnnouncementLppmPublicContent } from '@/pages/modules/LPPM/public-content/announcement'
import { CreatedAnnouncementLppm } from '@/pages/modules/LPPM/public-content/announcement/created'
import { UpdatedAnnouncementLppm } from '@/pages/modules/LPPM/public-content/announcement/updated'
import { AnnouncementLppmDetailPage } from '@/pages/modules/LPPM/public-content/announcement/detail'
import { LogActivityAnnouncementProdiPage } from '@/pages/modules/website-prodi/public-content/announcement/log'
import { AgendaLppmPublicContent } from '@/pages/modules/LPPM/public-content/agenda'
import { CreateAgendaLppmPage } from '@/pages/modules/LPPM/public-content/agenda/created'
import { UpdatedAgendaLppmPage } from '@/pages/modules/LPPM/public-content/agenda/updated'
import { AgendaLppmDetailPage } from '@/pages/modules/LPPM/public-content/agenda/detail'
import { LogActivityAgendaLppmPage } from '@/pages/modules/LPPM/public-content/agenda/log'
import { ArticleLppmPage } from '@/pages/modules/LPPM/public-content/article'
import { CreatedArticleLppm } from '@/pages/modules/LPPM/public-content/article/created'
import { UpdatedArticleLppm } from '@/pages/modules/LPPM/public-content/article/updated'
import { DetailArticlePage } from '@/pages/modules/LPPM/public-content/article/detail'
import { LogActivityArticleLppmPage } from '@/pages/modules/LPPM/public-content/article/log'
import DownloadFileLppmPage from '@/pages/modules/LPPM/public-content/Download'
import { CategoryDownloadLppmPage } from '@/pages/modules/LPPM/public-content/Download/category'
import { AddDownloadLppmPage } from '@/pages/modules/LPPM/public-content/Download/created'
import { UpdatedDownloadLppmPage } from '@/pages/modules/LPPM/public-content/Download/updated'
import { ListInformationPPID } from '@/pages/modules/LPPM/PPID/information'
import DashboardLPPM from '@/pages/modules/LPPM/dashboard'
import { ActivityProgramPage } from '@/pages/modules/LPPM/research/schema/internal/activity'
import { CreatedFormActivity } from '@/pages/modules/LPPM/research/schema/internal/activity/component/created.tsx'
import { UpdatedFormActivity } from '@/pages/modules/LPPM/research/schema/internal/activity/component/updated.tsx'
import { DetailActivityProgramInternal } from '@/pages/modules/LPPM/research/schema/internal/activity/component/detail.tsx'
import { ListJournalPage } from '@/pages/modules/LPPM/publication-hki/journal/list'

export const routesLPPM = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardLPPM />,
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
          {
            path: 'member/:id/edit/:memberId',
            element: <UpdateStaffMember />,
          },
        ],
      },
    ],
  },
  {
    path: 'research',
    children: [
      {
        path: 'main',
        element: <MainResearch />,
      },
      {
        path: 'schema',
        children: [
          {
            path: 'doctoral',
            element: <SchemaDoctoralResearch />,
          },
          {
            path: 'internal',
            children: [
              {
                index: true,
                element: <SchemaInternalResearch />,
              },
              {
                path: 'activity',
                children: [
                  {
                    index: true,
                    element: <ActivityProgramPage />,
                  },
                  {
                    path: 'add',
                    element: <CreatedFormActivity />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedFormActivity />,
                  },
                  {
                    path: 'detail/:id',
                    element: <DetailActivityProgramInternal />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'plan',
        children: [
          {
            index: true,
            element: <PlanMainResearch />,
          },
          {
            path: 'document/:id',
            element: <DocumentPLanResearch />,
          },
        ],
      },
      {
        path: 'guide',
        children: [
          {
            index: true,
            element: <GuideCategoryResearch />,
          },
          {
            path: 'document/:id',
            element: <DocumentGuideCategory />,
          },
        ],
      },
      {
        path: 'study-center',
        children: [
          {
            path: 'study-list',
            children: [
              {
                index: true,
                element: <StudyCenterList />,
              },
              {
                path: 'add',
                element: <CreatedStudyCenter />,
              },
              {
                path: 'edit/:id',
                element: <UpdateStudyCenter />,
              },
              {
                path: 'detail/:id',
                element: <DetailStudyCenter />,
              },
            ],
          },
          {
            path: 'operational-standard',
            children: [
              {
                index: true,
                element: <StandardOperationalStudy />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'devotion',
    children: [
      {
        path: 'main',
        element: <MainDevotion />,
      },
      {
        path: 'schema',
        children: [
          {
            path: 'internal',
            children: [
              {
                index: true,
                element: <DevotionInternalSchema />,
              },
              {
                path: 'activity-program',
                children: [
                  {
                    index: true,
                    element: <ActivityProgramSchema />,
                  },
                  {
                    path: 'add',
                    element: <CreatedActivityProgram />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedActivityProgram />,
                  },
                  {
                    path: 'detail/:id',
                    element: <DetailActivityProgram />,
                  },
                ],
              },
            ],
          },
          {
            path: 'drtpm',
            children: [
              {
                index: true,
                element: <SchemaDataDRTPM />,
              },
              {
                path: 'add',
                element: <CreatedDRTPM />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedDataDRTPM />,
              },
              {
                path: 'detail/:id',
                element: <DetailDataDRTPM />,
              },
            ],
          },
          {
            path: 'brin',
            children: [
              {
                index: true,
                element: <SchemaDataBRIN />,
              },
              {
                path: 'add',
                element: <CreatedBRIN />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedDataBRIN />,
              },
              {
                path: 'detail/:id',
                element: <DetailDataBRIN />,
              },
            ],
          },
          {
            path: 'other',
            children: [
              {
                index: true,
                element: <SchemaFundingOther />,
              },
              {
                path: 'add',
                element: <CreatedOtherFunding />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedOtherFunding />,
              },
              {
                path: 'detail/:id',
                element: <DetailOtherFunding />,
              },
            ],
          },
        ],
      },
      {
        path: 'stain-hub',
        element: <MainDevotionHub />,
      },
    ],
  },
  {
    path: 'publication-hki',
    children: [
      {
        path: 'book',
        children: [
          {
            path: 'book-center',
            children: [
              {
                index: true,
                element: <BookCenterPage />,
              },
              {
                path: 'management',
                children: [
                  {
                    index: true,
                    element: <UserManagementBook />,
                  },
                  {
                    path: 'add',
                    element: <CreatedUserManagementContext />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedUserManagementContext />,
                  },
                ],
              },
            ],
          },
          {
            path: 'publisher',
            element: <BookPublisherPage />,
          },
          {
            path: 'media',
            element: <BookMediaPage />,
          },
        ],
      },
      {
        path: 'hki',
        children: [
          {
            path: 'hki-center',
            children: [
              {
                index: true,
                element: <HKICenterPage />,
              },
              {
                path: 'management',
                children: [
                  {
                    index: true,
                    element: <UserManagementHKI />,
                  },
                  {
                    path: 'add',
                    element: <CreatedUserManagementHKI />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedUserManagementHKI />,
                  },
                ],
              },
            ],
          },
          {
            path: 'description',
            element: <HKIDescriptionPage />,
          },
          {
            path: 'registration',
            element: <HKIRegistrationPage />,
          },
        ],
      },
      {
        path: 'journal',
        children: [
          {
            path: 'plp',
            children: [
              {
                index: true,
                element: <JourNalPLPPage />,
              },
              {
                path: 'management',
                children: [
                  {
                    index: true,
                    element: <UserManagementPLP />,
                  },
                  {
                    path: 'add',
                    element: <CreatedUserManagementPLP />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedUserManagementPLP />,
                  },
                ],
              },
            ],
          },
          {
            path: 'PPJS',
            children: [
              {
                index: true,
                element: <JourNalPPJSPage />,
              },
              {
                path: 'management',
                children: [
                  {
                    index: true,
                    element: <UserManagementPPJS />,
                  },
                  {
                    path: 'add',
                    element: <CreatedUserManagementPPJS />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedUserManagementPPJS />,
                  },
                ],
              },
            ],
          },
          {
            path: 'list',
            element: <ListJournalPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'ppid',
    children: [
      {
        index: true,
        element: <PPIDInformationPage />,
      },
      {
        path: 'information',
        element: <ListInformationPPID />,
      },
    ],
  },
  {
    path: 'services',
    element: <ServicesListPage />,
  },
  {
    path: 'settings',
    children: [
      {
        path: 'landing-page',
        element: <LPPMLandingPageView />,
      },
      {
        path: 'primary-color',
        element: <ColorSettingService />,
      },
      {
        path: 'template',
        element: <SettingTemplateServiceView />,
      },
    ],
  },
  {
    path: 'public-content',
    children: [
      {
        path: 'news',
        children: [
          {
            index: true,
            element: <NewsLppmPublicContentPage />,
          },
          {
            path: 'add',
            element: <NewsLppmCreated />,
          },
          {
            path: 'edit/:id',
            element: <NewsLppmUpdated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsLppmPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsLppmPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementLppmPublicContent />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementLppm />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementLppm />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementLppmDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementProdiPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaLppmPublicContent />,
          },
          {
            path: 'add',
            element: <CreateAgendaLppmPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaLppmPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaLppmDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaLppmPage />,
          },
        ],
      },
      {
        path: 'article',
        children: [
          {
            index: true,
            element: <ArticleLppmPage />,
          },
          {
            path: 'add',
            element: <CreatedArticleLppm />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedArticleLppm />,
          },
          {
            path: 'detail/:id',
            element: <DetailArticlePage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityArticleLppmPage />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFileLppmPage />,
          },
          {
            path: 'category',
            element: <CategoryDownloadLppmPage />,
          },
          {
            path: 'add',
            element: <AddDownloadLppmPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedDownloadLppmPage />,
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
