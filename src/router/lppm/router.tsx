import { lazy } from 'react'
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const DetailProfileLPPM = lazy(() => import('@/pages/modules/LPPM/data-lppm').then(m => ({ default: m.DetailProfileLPPM })))
const UpdatedDataLPPM = lazy(() => import('@/pages/modules/LPPM/data-lppm/updated').then(m => ({ default: m.UpdatedDataLPPM })))
const AboutProfile = lazy(() => import('@/pages/modules/LPPM/about/profile').then(m => ({ default: m.AboutProfile })))
const StructureOrganizationProfile = lazy(() => import('@/pages/modules/LPPM/about/structure').then(m => ({ default: m.StructureOrganizationProfile })))
const VisionMissionAbout = lazy(() => import('@/pages/modules/LPPM/about/vision-mission').then(m => ({ default: m.VisionMissionAbout })))
const ProfileLeaderPage = lazy(() => import('@/pages/modules/LPPM/about/leader').then(m => ({ default: m.ProfileLeaderPage })))
const ProfileSecretaryPage = lazy(() => import('@/pages/modules/LPPM/about/secretary').then(m => ({ default: m.ProfileSecretaryPage })))
const ProfileStaffLPPM = lazy(() => import('@/pages/modules/LPPM/about/staff').then(m => ({ default: m.ProfileStaffLPPM })))
const StaffMemberList = lazy(() => import('@/pages/modules/LPPM/about/staff/member').then(m => ({ default: m.StaffMemberList })))
const CreateStaffMember = lazy(() => import('@/pages/modules/LPPM/about/staff/member/component/create.tsx').then(m => ({ default: m.CreateStaffMember })))
const UpdateStaffMember = lazy(() => import('@/pages/modules/LPPM/about/staff/member/component/update.tsx').then(m => ({ default: m.UpdateStaffMember })))
const MainResearch = lazy(() => import('@/pages/modules/LPPM/research/main').then(m => ({ default: m.MainResearch })))
const SchemaDoctoralResearch = lazy(() => import('@/pages/modules/LPPM/research/schema/doctoral').then(m => ({ default: m.SchemaDoctoralResearch })))
const SchemaInternalResearch = lazy(() => import('@/pages/modules/LPPM/research/schema/internal').then(m => ({ default: m.SchemaInternalResearch })))
const PlanMainResearch = lazy(() => import('@/pages/modules/LPPM/research/plan').then(m => ({ default: m.PlanMainResearch })))
const DocumentPLanResearch = lazy(() => import('@/pages/modules/LPPM/research/plan/document').then(m => ({ default: m.DocumentPLanResearch })))
const GuideCategoryResearch = lazy(() => import('@/pages/modules/LPPM/research/guide').then(m => ({ default: m.GuideCategoryResearch })))
const DocumentGuideCategory = lazy(() => import('@/pages/modules/LPPM/research/guide/document').then(m => ({ default: m.DocumentGuideCategory })))
const StudyCenterList = lazy(() => import('@/pages/modules/LPPM/research/study-center/study-list').then(m => ({ default: m.StudyCenterList })))
const CreatedStudyCenter = lazy(() => import('@/pages/modules/LPPM/research/study-center/study-list/component/created.tsx').then(m => ({ default: m.CreatedStudyCenter })))
const UpdateStudyCenter = lazy(() => import('@/pages/modules/LPPM/research/study-center/study-list/component/updated.tsx').then(m => ({ default: m.UpdateStudyCenter })))
const DetailStudyCenter = lazy(() => import('@/pages/modules/LPPM/research/study-center/study-list/component/detail.tsx').then(m => ({ default: m.DetailStudyCenter })))
const StandardOperationalStudy = lazy(() => import('@/pages/modules/LPPM/research/study-center/operational-standard').then(m => ({ default: m.StandardOperationalStudy })))
const MainDevotion = lazy(() => import('@/pages/modules/LPPM/devotion/main').then(m => ({ default: m.MainDevotion })))
const DevotionInternalSchema = lazy(() => import('@/pages/modules/LPPM/devotion/schema/internal').then(m => ({ default: m.DevotionInternalSchema })))
const ActivityProgramSchema = lazy(() => import('@/pages/modules/LPPM/devotion/schema/internal/activity-program').then(m => ({ default: m.ActivityProgramSchema })))
const CreatedActivityProgram = lazy(() => import('@/pages/modules/LPPM/devotion/schema/internal/activity-program/component/created.tsx').then(m => ({ default: m.CreatedActivityProgram })))
const UpdatedActivityProgram = lazy(() => import('@/pages/modules/LPPM/devotion/schema/internal/activity-program/component/updated.tsx').then(m => ({ default: m.UpdatedActivityProgram })))
const DetailActivityProgram = lazy(() => import('@/pages/modules/LPPM/devotion/schema/internal/activity-program/component/detail.tsx').then(m => ({ default: m.DetailActivityProgram })))
const SchemaDataDRTPM = lazy(() => import('@/pages/modules/LPPM/devotion/schema/drtpm').then(m => ({ default: m.SchemaDataDRTPM })))
const CreatedDRTPM = lazy(() => import('@/pages/modules/LPPM/devotion/schema/drtpm/component/created.tsx').then(m => ({ default: m.CreatedDRTPM })))
const UpdatedDataDRTPM = lazy(() => import('@/pages/modules/LPPM/devotion/schema/drtpm/component/updated.tsx').then(m => ({ default: m.UpdatedDataDRTPM })))
const DetailDataDRTPM = lazy(() => import('@/pages/modules/LPPM/devotion/schema/drtpm/component/detail.tsx').then(m => ({ default: m.DetailDataDRTPM })))
const SchemaDataBRIN = lazy(() => import('@/pages/modules/LPPM/devotion/schema/brin').then(m => ({ default: m.SchemaDataBRIN })))
const CreatedBRIN = lazy(() => import('@/pages/modules/LPPM/devotion/schema/brin/component/created.tsx').then(m => ({ default: m.CreatedBRIN })))
const UpdatedDataBRIN = lazy(() => import('@/pages/modules/LPPM/devotion/schema/brin/component/updated.tsx').then(m => ({ default: m.UpdatedDataBRIN })))
const DetailDataBRIN = lazy(() => import('@/pages/modules/LPPM/devotion/schema/brin/component/detail.tsx').then(m => ({ default: m.DetailDataBRIN })))
const SchemaFundingOther = lazy(() => import('@/pages/modules/LPPM/devotion/schema/other').then(m => ({ default: m.SchemaFundingOther })))
const CreatedOtherFunding = lazy(() => import('@/pages/modules/LPPM/devotion/schema/other/component/created.tsx').then(m => ({ default: m.CreatedOtherFunding })))
const UpdatedOtherFunding = lazy(() => import('@/pages/modules/LPPM/devotion/schema/other/component/updated.tsx').then(m => ({ default: m.UpdatedOtherFunding })))
const DetailOtherFunding = lazy(() => import('@/pages/modules/LPPM/devotion/schema/other/component/detail.tsx').then(m => ({ default: m.DetailOtherFunding })))
const MainDevotionHub = lazy(() => import('@/pages/modules/LPPM/devotion/stain-hub').then(m => ({ default: m.MainDevotionHub })))
const BookPublisherPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/book/publisher').then(m => ({ default: m.BookPublisherPage })))
const BookMediaPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/book/media').then(m => ({ default: m.BookMediaPage })))
const BookCenterPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/book/book-center').then(m => ({ default: m.BookCenterPage })))
const UserManagementBook = lazy(() => import('@/pages/modules/LPPM/publication-hki/book/book-center/manangement').then(m => ({ default: m.UserManagementBook })))
const CreatedUserManagementContext = lazy(() => import('@/pages/modules/LPPM/publication-hki/book/book-center/manangement/component/created.tsx').then(m => ({ default: m.CreatedUserManagementContext })))
const UpdatedUserManagementContext = lazy(() => import('@/pages/modules/LPPM/publication-hki/book/book-center/manangement/component/Updated.tsx').then(m => ({ default: m.UpdatedUserManagementContext })))
const HKICenterPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/hki/hki-center').then(m => ({ default: m.HKICenterPage })))
const UserManagementHKI = lazy(() => import('@/pages/modules/LPPM/publication-hki/hki/hki-center/management').then(m => ({ default: m.UserManagementHKI })))
const CreatedUserManagementHKI = lazy(() => import('@/pages/modules/LPPM/publication-hki/hki/hki-center/management/component/created.tsx').then(m => ({ default: m.CreatedUserManagementHKI })))
const UpdatedUserManagementHKI = lazy(() => import('@/pages/modules/LPPM/publication-hki/hki/hki-center/management/component/Updated.tsx').then(m => ({ default: m.UpdatedUserManagementHKI })))
const HKIDescriptionPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/hki/description').then(m => ({ default: m.HKIDescriptionPage })))
const HKIRegistrationPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/hki/registration').then(m => ({ default: m.HKIRegistrationPage })))
const JourNalPLPPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/plp').then(m => ({ default: m.JourNalPLPPage })))
const UserManagementPLP = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/plp/management').then(m => ({ default: m.UserManagementPLP })))
const CreatedUserManagementPLP = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/plp/management/component/created.tsx').then(m => ({ default: m.CreatedUserManagementPLP })))
const UpdatedUserManagementPLP = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/plp/management/component/Updated.tsx').then(m => ({ default: m.UpdatedUserManagementPLP })))
const JourNalPPJSPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/ppjs').then(m => ({ default: m.JourNalPPJSPage })))
const UserManagementPPJS = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/ppjs/management').then(m => ({ default: m.UserManagementPPJS })))
const CreatedUserManagementPPJS = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/ppjs/management/component/created.tsx').then(m => ({ default: m.CreatedUserManagementPPJS })))
const UpdatedUserManagementPPJS = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/ppjs/management/component/Updated.tsx').then(m => ({ default: m.UpdatedUserManagementPPJS })))
const PPIDInformationPage = lazy(() => import('@/pages/modules/LPPM/PPID').then(m => ({ default: m.PPIDInformationPage })))
const ServicesListPage = lazy(() => import('@/pages/modules/LPPM/services').then(m => ({ default: m.ServicesListPage })))
const LPPMLandingPageView = lazy(() => import('@/pages/modules/LPPM/settings/landing-page/LandingPageView'))
const ColorSettingService = lazy(() => import('@/pages/modules/LPPM/settings/warna/ColorSettingService'))
const SettingTemplateServiceView = lazy(() => import('@/pages/modules/LPPM/settings/template/SettingTemplateServiceView'))
const NewsLppmPublicContentPage = lazy(() => import('@/pages/modules/LPPM/public-content/news').then(m => ({ default: m.NewsLppmPublicContentPage })))
const NewsLppmCreated = lazy(() => import('@/pages/modules/LPPM/public-content/news/created').then(m => ({ default: m.NewsLppmCreated })))
const NewsLppmUpdated = lazy(() => import('@/pages/modules/LPPM/public-content/news/updated').then(m => ({ default: m.NewsLppmUpdated })))
const DetailNewsLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/news/detail').then(m => ({ default: m.DetailNewsLppmPage })))
const LogActivityNewsLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/news/log-data').then(m => ({ default: m.LogActivityNewsLppmPage })))
const AnnouncementLppmPublicContent = lazy(() => import('@/pages/modules/LPPM/public-content/announcement').then(m => ({ default: m.AnnouncementLppmPublicContent })))
const CreatedAnnouncementLppm = lazy(() => import('@/pages/modules/LPPM/public-content/announcement/created').then(m => ({ default: m.CreatedAnnouncementLppm })))
const UpdatedAnnouncementLppm = lazy(() => import('@/pages/modules/LPPM/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementLppm })))
const AnnouncementLppmDetailPage = lazy(() => import('@/pages/modules/LPPM/public-content/announcement/detail').then(m => ({ default: m.AnnouncementLppmDetailPage })))
const LogActivityAnnouncementProdiPage = lazy(() => import('@/pages/modules/website-prodi/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementProdiPage })))
const AgendaLppmPublicContent = lazy(() => import('@/pages/modules/LPPM/public-content/agenda').then(m => ({ default: m.AgendaLppmPublicContent })))
const CreateAgendaLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/agenda/created').then(m => ({ default: m.CreateAgendaLppmPage })))
const UpdatedAgendaLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaLppmPage })))
const AgendaLppmDetailPage = lazy(() => import('@/pages/modules/LPPM/public-content/agenda/detail').then(m => ({ default: m.AgendaLppmDetailPage })))
const LogActivityAgendaLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaLppmPage })))
const ArticleLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/article').then(m => ({ default: m.ArticleLppmPage })))
const CreatedArticleLppm = lazy(() => import('@/pages/modules/LPPM/public-content/article/created').then(m => ({ default: m.CreatedArticleLppm })))
const UpdatedArticleLppm = lazy(() => import('@/pages/modules/LPPM/public-content/article/updated').then(m => ({ default: m.UpdatedArticleLppm })))
const DetailArticlePage = lazy(() => import('@/pages/modules/LPPM/public-content/article/detail').then(m => ({ default: m.DetailArticlePage })))
const LogActivityArticleLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/article/log').then(m => ({ default: m.LogActivityArticleLppmPage })))
const DownloadFileLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/Download'))
const CategoryDownloadLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/Download/category').then(m => ({ default: m.CategoryDownloadLppmPage })))
const AddDownloadLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/Download/created').then(m => ({ default: m.AddDownloadLppmPage })))
const UpdatedDownloadLppmPage = lazy(() => import('@/pages/modules/LPPM/public-content/Download/updated').then(m => ({ default: m.UpdatedDownloadLppmPage })))
const ListInformationPPID = lazy(() => import('@/pages/modules/LPPM/PPID/information').then(m => ({ default: m.ListInformationPPID })))
const DashboardLPPM = lazy(() => import('@/pages/modules/LPPM/dashboard'))
const ActivityProgramPage = lazy(() => import('@/pages/modules/LPPM/research/schema/internal/activity').then(m => ({ default: m.ActivityProgramPage })))
const CreatedFormActivity = lazy(() => import('@/pages/modules/LPPM/research/schema/internal/activity/component/created.tsx').then(m => ({ default: m.CreatedFormActivity })))
const UpdatedFormActivity = lazy(() => import('@/pages/modules/LPPM/research/schema/internal/activity/component/updated.tsx').then(m => ({ default: m.UpdatedFormActivity })))
const DetailActivityProgramInternal = lazy(() => import('@/pages/modules/LPPM/research/schema/internal/activity/component/detail.tsx').then(m => ({ default: m.DetailActivityProgramInternal })))
const ListJournalPage = lazy(() => import('@/pages/modules/LPPM/publication-hki/journal/list').then(m => ({ default: m.ListJournalPage })))
const ThemaChangeColorInstitutionLppm = lazy(() => import('@/pages/modules/LPPM/settings/template/color').then(m => ({ default: m.ThemaChangeColorInstitutionLppm })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))

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
    path:"panduan",
    element:<GuideListView/>
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
        // element: <SettingTemplateServiceView />,
        children: [
          {
            index: true,
            element: <SettingTemplateServiceView />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorInstitutionLppm />,
          },
        ],
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
