import { lazy } from 'react'
const DetailProfileFaculty = lazy(() => import('@/pages/modules/website-fakultas/data-fakultas').then(m => ({ default: m.DetailProfileFaculty })))
const UpdatedDataFaculty = lazy(() => import('@/pages/modules/website-fakultas/data-fakultas/updated').then(m => ({ default: m.UpdatedDataFaculty })))
const NewsCarrierPublicContentPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/news').then(m => ({ default: m.NewsCarrierPublicContentPage })))
const NewsFacultyCreated = lazy(() => import('@/pages/modules/website-fakultas/public-content/news/created').then(m => ({ default: m.NewsFacultyCreated })))
const DetailNewsFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/news/detail').then(m => ({ default: m.DetailNewsFacultyPage })))
const NewsFacultyUpdated = lazy(() => import('@/pages/modules/website-fakultas/public-content/news/updated').then(m => ({ default: m.NewsFacultyUpdated })))
const LogActivityNewsFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/news/log-data').then(m => ({ default: m.LogActivityNewsFacultyPage })))
const AgendaFacultyPublicContent = lazy(() => import('@/pages/modules/website-fakultas/public-content/agenda').then(m => ({ default: m.AgendaFacultyPublicContent })))
const CreateAgendaFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/agenda/created').then(m => ({ default: m.CreateAgendaFacultyPage })))
const UpdatedAgendaFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaFacultyPage })))
const AgendaFacultyDetailPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/agenda/detail').then(m => ({ default: m.AgendaFacultyDetailPage })))
const LogActivityAgendaFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaFacultyPage })))
const AnnouncementFacultyPublicContent = lazy(() => import('@/pages/modules/website-fakultas/public-content/announcement').then(m => ({ default: m.AnnouncementFacultyPublicContent })))
const CreatedAnnouncementFaculty = lazy(() => import('@/pages/modules/website-fakultas/public-content/announcement/created').then(m => ({ default: m.CreatedAnnouncementFaculty })))
const UpdatedAnnouncementFaculty = lazy(() => import('@/pages/modules/website-fakultas/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementFaculty })))
const AnnouncementFacultyDetailPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/announcement/detail').then(m => ({ default: m.AnnouncementFacultyDetailPage })))
const LogActivityAnnouncementFaculty = lazy(() => import('@/pages/modules/website-fakultas/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementFaculty })))
const DownloadFileFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/Download'))
const CategoryDownloadFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/Download/category').then(m => ({ default: m.CategoryDownloadFacultyPage })))
const AddDownloadCarrierPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/Download/created').then(m => ({ default: m.AddDownloadCarrierPage })))
const UpdatedDownloadFacultyPage = lazy(() => import('@/pages/modules/website-fakultas/public-content/Download/updated').then(m => ({ default: m.UpdatedDownloadFacultyPage })))
const ColorSettingFaculty = lazy(() => import('@/pages/modules/website-fakultas/settings/color/ColorSettingService.tsx'))
const TemplateWebFacultySettings = lazy(() => import('@/pages/modules/website-fakultas/settings/template-web').then(m => ({ default: m.TemplateWebFacultySettings })))
const LayoutFaculty = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/component/layout'))
const AboutFacultyView = lazy(() => import('@/pages/modules/website-fakultas/about-faculty'))
const UserFacultyView = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/unit-pengelola'))
const VisionMissionFaculty = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/vision-mission'))
const OrganizationalStructureView = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/organization'))
const ContactUsView = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/contact-us'))
const ProgramStudyView = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi'))
const LayoutStudyProgram = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/component/layout'))
const AboutProdiView = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/about'))
const UserProdiView = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola'))
const VisionMissionProdi = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/vision-mission'))
const ProdiOrganizationalStructureView = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/organization'))
const ProdiContactUsView = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/contact-us'))
const ProdiCurriculumView = lazy(() => import('@/pages/modules/website-fakultas/academic/curriculum'))
const AcademicPPSMPage = lazy(() => import('@/pages/modules/website-fakultas/academic/ppsm').then(m => ({ default: m.AcademicPPSMPage })))
const DashboardFaculty = lazy(() => import('@/pages/modules/website-fakultas/dashboard'))
const AlumniStoriesPPSM = lazy(() => import('@/pages/modules/website-fakultas/academic/ppsm/story').then(m => ({ default: m.AlumniStoriesPPSM })))
const CreatedStoryAlumni = lazy(() => import('@/pages/modules/website-fakultas/academic/ppsm/story/create').then(m => ({ default: m.CreatedStoryAlumni })))
const ProdiGallery = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/gallery').then(m => ({ default: m.ProdiGallery })))
const StaffDetailProdi = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/staff').then(m => ({ default: m.StaffDetailProdi })))
const LecturerDetailProfile = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/lecturer').then(m => ({ default: m.LecturerDetailProfile })))
const CurriculumPerProdi = lazy(() => import('@/pages/modules/website-fakultas/academic/curriculum/per-prodi').then(m => ({ default: m.CurriculumPerProdi })))
const UpdateStoryPPSM = lazy(() => import('@/pages/modules/website-fakultas/academic/ppsm/story/update').then(m => ({ default: m.UpdateStoryPPSM })))
const AcademicInternationalMobility = lazy(() => import('@/pages/modules/website-fakultas/academic/international-mobility').then(m => ({ default: m.AcademicInternationalMobility })))
const AlumniStoriesMobility = lazy(() => import('@/pages/modules/website-fakultas/academic/international-mobility/story').then(m => ({ default: m.AlumniStoriesMobility })))
const CreatedStoryAlumniMobility = lazy(() => import('@/pages/modules/website-fakultas/academic/international-mobility/story/create').then(m => ({ default: m.CreatedStoryAlumniMobility })))
const UpdateStoryMobility = lazy(() => import('@/pages/modules/website-fakultas/academic/international-mobility/story/update').then(m => ({ default: m.UpdateStoryMobility })))
const AcademicInternationalUnderGraduated = lazy(() => import('@/pages/modules/website-fakultas/academic/undergraduate-program').then(m => ({ default: m.AcademicInternationalUnderGraduated })))
const AlumniStoriesUnderGraduated = lazy(() => import('@/pages/modules/website-fakultas/academic/undergraduate-program/story').then(m => ({ default: m.AlumniStoriesUnderGraduated })))
const CreatedStoryUnderGraduated = lazy(() => import('@/pages/modules/website-fakultas/academic/undergraduate-program/story/create').then(m => ({ default: m.CreatedStoryUnderGraduated })))
const UnderGraduatedProgram = lazy(() => import('@/pages/modules/website-fakultas/academic/undergraduate-program/program').then(m => ({ default: m.UnderGraduatedProgram })))
const DetailProgram = lazy(() => import('@/pages/modules/website-fakultas/academic/undergraduate-program/program/detail').then(m => ({ default: m.DetailProgram })))
const ResearchGroupPage = lazy(() => import('@/pages/modules/website-fakultas/research/research-group').then(m => ({ default: m.ResearchGroupPage })))
const GroupSkillResearch = lazy(() => import('@/pages/modules/website-fakultas/research/research-group/group-skill').then(m => ({ default: m.GroupSkillResearch })))
const CreatedGroupSkill = lazy(() => import('@/pages/modules/website-fakultas/research/research-group/group-skill/created').then(m => ({ default: m.CreatedGroupSkill })))
const OurPartnerPage = lazy(() => import('@/pages/modules/website-fakultas/research/collaboration').then(m => ({ default: m.OurPartnerPage })))
const MitraOurPartners = lazy(() => import('@/pages/modules/website-fakultas/research/collaboration/mitra').then(m => ({ default: m.MitraOurPartners })))
const TypeOurPartners = lazy(() => import('@/pages/modules/website-fakultas/research/collaboration/type').then(m => ({ default: m.TypeOurPartners })))
const CommunityCollegeSystem = lazy(() => import('@/pages/modules/website-fakultas/community/study-faculty/college-system').then(m => ({ default: m.CommunityCollegeSystem })))
const CommunityStudyProgram = lazy(() => import('@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program').then(m => ({ default: m.CommunityStudyProgram })))
const AccreditationFacultyCommunity = lazy(() => import('@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation').then(m => ({ default: m.AccreditationFacultyCommunity })))
const CarrierProspectCommunity = lazy(() => import('@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect').then(m => ({ default: m.CarrierProspectCommunity })))
const AccommodationStudentLife = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/accommodation').then(m => ({ default: m.AccommodationStudentLife })))
const StudentOrganizationCommunity = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/student-organization').then(m => ({ default: m.StudentOrganizationCommunity })))
const ListOrganizationStudentLife = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization').then(m => ({ default: m.ListOrganizationStudentLife })))
const CreatedStudentOrganization = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization/created').then(m => ({ default: m.CreatedStudentOrganization })))
const EntertainmentCommunity = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/entertainment').then(m => ({ default: m.EntertainmentCommunity })))
const ListPlaceStudentOrganization = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/entertainment/list-place').then(m => ({ default: m.ListPlaceStudentOrganization })))
const CreatedStudentListOrganization = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/entertainment/list-place/created').then(m => ({ default: m.CreatedStudentListOrganization })))
const CommunityAlumniStory = lazy(() => import('@/pages/modules/website-fakultas/community/alumni/story').then(m => ({ default: m.CommunityAlumniStory })))
const CreatedStoryAlumniCommunity = lazy(() => import('@/pages/modules/website-fakultas/community/alumni/story/create').then(m => ({ default: m.CreatedStoryAlumniCommunity })))
const FacilitiesPage = lazy(() => import('@/pages/modules/website-fakultas/facilities').then(m => ({ default: m.FacilitiesPage })))
const CreatedFacilities = lazy(() => import('@/pages/modules/website-fakultas/facilities/created').then(m => ({ default: m.CreatedFacilities })))
const DescriptionPMBText = lazy(() => import('@/pages/modules/website-fakultas/pmb').then(m => ({ default: m.DescriptionPMBText })))
const ZoneIntegrityPage = lazy(() => import('@/pages/modules/website-fakultas/zone-integrity').then(m => ({ default: m.ZoneIntegrityPage })))
const CreatedSubCategory = lazy(() => import('@/pages/modules/website-fakultas/zone-integrity/detail/created').then(m => ({ default: m.CreatedSubCategory })))
const StaffProfileFaculty = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/staff').then(m => ({ default: m.StaffProfileFaculty })))
const LecturerProfileFaculty = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/lecturer').then(m => ({ default: m.LecturerProfileFaculty })))
const NewsFaculty = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/news').then(m => ({ default: m.NewsFaculty })))
const CurriculumSubjectDetail = lazy(() => import('@/pages/modules/website-fakultas/academic/curriculum/subject').then(m => ({ default: m.CurriculumSubjectDetail })))
const NewsProdiFaculty = lazy(() => import('@/pages/modules/website-fakultas/academic/program-studi/detail/news').then(m => ({ default: m.NewsProdiFaculty })))
const UpdateStoryUnderGraduated = lazy(() => import('@/pages/modules/website-fakultas/academic/undergraduate-program/story/update').then(m => ({ default: m.UpdateStoryUnderGraduated })))
const UpdatedGroupSkill = lazy(() => import('@/pages/modules/website-fakultas/research/research-group/group-skill/updated').then(m => ({ default: m.UpdatedGroupSkill })))
const DetailGroupSkillPage = lazy(() => import('@/pages/modules/website-fakultas/research/research-group/group-skill/detail'))
const ProdiSectorCarrier = lazy(() => import('@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect/prodi'))
const SectorCarrierProspect = lazy(() => import('@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect/sector').then(m => ({ default: m.SectorCarrierProspect })))
const UpdatedStudentOrganization = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization/updated').then(m => ({ default: m.UpdatedStudentOrganization })))
const DetailStudentOrganization = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization/detail').then(m => ({ default: m.DetailStudentOrganization })))
const UpdatedStudentListOrganization = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/entertainment/list-place/updated').then(m => ({ default: m.UpdatedStudentListOrganization })))
const DetailStudentEntertainment = lazy(() => import('@/pages/modules/website-fakultas/community/student-life/entertainment/list-place/detail').then(m => ({ default: m.DetailStudentEntertainment })))
const UpdateStoryAlumni = lazy(() => import('@/pages/modules/website-fakultas/community/alumni/story/update').then(m => ({ default: m.UpdateStoryAlumni })))
const UpdatedFacilities = lazy(() => import('@/pages/modules/website-fakultas/facilities/updated').then(m => ({ default: m.UpdatedFacilities })))
const DetailFacilitiesPage = lazy(() => import('@/pages/modules/website-fakultas/facilities/detail').then(m => ({ default: m.DetailFacilitiesPage })))
const DetailZoneIntegrity = lazy(() => import('@/pages/modules/website-fakultas/zone-integrity/detail').then(m => ({ default: m.DetailZoneIntegrity })))
const UpdatedSubCategory = lazy(() => import('@/pages/modules/website-fakultas/zone-integrity/detail/updated').then(m => ({ default: m.UpdatedSubCategory })))
const ServiceListPage = lazy(() => import('@/pages/modules/website-fakultas/service').then(m => ({ default: m.ServiceListPage })))
const ListAlbumVideo = lazy(() => import('@/pages/modules/website-fakultas/gallery/video').then(m => ({ default: m.ListAlbumVideo })))
const ListGalleryAlbum = lazy(() => import('@/pages/modules/website-fakultas/gallery/album').then(m => ({ default: m.ListGalleryAlbum })))
const ListGalleryPhoto = lazy(() => import('@/pages/modules/website-fakultas/gallery/photo').then(m => ({ default: m.ListGalleryPhoto })))
const StudyResearchPage = lazy(() => import('@/pages/modules/website-fakultas/research/study-research').then(m => ({ default: m.StudyResearchPage })))
const InboxStoryPage = lazy(() => import('@/pages/modules/website-fakultas/community/alumni/inbox').then(m => ({ default: m.InboxStoryPage })))
const AlumniMessageInbox = lazy(() => import('@/pages/modules/website-fakultas/community/alumni/inbox/message').then(m => ({ default: m.AlumniMessageInbox })))
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const FacultyGalleryProfile = lazy(() => import('@/pages/modules/website-fakultas/about-faculty/gallery').then(m => ({ default: m.FacultyGalleryProfile })))
const ThemaChangeColorFaculty = lazy(() => import('@/pages/modules/website-fakultas/settings/template-web/color').then(m => ({ default: m.ThemaChangeColorFaculty })))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))
const LandingPageFaculty = lazy(() => import('@/pages/modules/website-fakultas/settings/Slider-landing').then(m => ({ default: m.LandingPageFaculty })))

export const RouterFaculty = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardFaculty />,
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
    path: 'data-faculty',
    children: [
      {
        index: true,
        element: <DetailProfileFaculty />,
      },
      {
        path: 'edit',
        element: <UpdatedDataFaculty />,
      },
    ],
  },
  {
    path: 'about-faculty',
    element: <LayoutFaculty />,
    children: [
      {
        index: true,
        element: <AboutFacultyView />,
      },
      {
        path: 'unit-pengelola',
        element: <UserFacultyView />,
      },
      {
        path: 'visi-misi',
        element: <VisionMissionFaculty />,
      },
      {
        path: 'struktur-organisasi',
        element: <OrganizationalStructureView />,
      },
      {
        path: 'staff',
        element: <StaffProfileFaculty />,
      },
      {
        path: 'dosen',
        element: <LecturerProfileFaculty />,
      },
      {
        path: 'berita',
        element: <NewsFaculty />,
      },
      {
        path: 'galeri',
        element: <FacultyGalleryProfile />,
      },
      {
        path: 'hubungi-kami',
        element: <ContactUsView />,
      },
    ],
  },
  {
    path: 'academic',
    children: [
      {
        path: 'study-program',
        children: [
          {
            index: true,
            element: <ProgramStudyView />,
          },
          {
            path: ':id',
            element: <LayoutStudyProgram />,
            children: [
              {
                path: 'tentang',
                element: <AboutProdiView />,
              },
              {
                path: 'unit-pengelola',
                element: <UserProdiView />,
              },
              {
                path: 'visi-misi',
                element: <VisionMissionProdi />,
              },
              {
                path: 'struktur-organisasi',
                element: <ProdiOrganizationalStructureView />,
              },
              {
                path: 'staff',
                element: <StaffDetailProdi />,
              },
              {
                path: 'dosen',
                element: <LecturerDetailProfile />,
              },
              {
                path: 'berita',
                element: <NewsProdiFaculty />,
              },
              {
                path: 'galeri',
                element: <ProdiGallery />,
              },
              {
                path: 'hubungi-kami',
                element: <ProdiContactUsView />,
              },
            ],
          },
        ],
      },
      {
        path: 'curriculum',
        children: [
          {
            index: true,
            element: <ProdiCurriculumView />,
          },
          {
            path: ':id',
            children: [
              {
                index: true,
                element: <CurriculumPerProdi />,
              },
              {
                path: 'subject',
                children: [
                  {
                    path: ':id_subject',
                    element: <CurriculumSubjectDetail />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'ppsm',
        children: [
          {
            index: true,
            element: <AcademicPPSMPage />,
          },
          {
            path: 'story',
            children: [
              {
                index: true,
                element: <AlumniStoriesPPSM />,
              },
              {
                path: 'add',
                element: <CreatedStoryAlumni />,
              },
              {
                path: 'edit/:id',
                element: <UpdateStoryPPSM />,
              },
            ],
          },
        ],
      },
      {
        path: 'international-mobility',
        children: [
          {
            index: true,
            element: <AcademicInternationalMobility />,
          },
          {
            path: 'story',
            children: [
              {
                index: true,
                element: <AlumniStoriesMobility />,
              },
              {
                path: 'add',
                element: <CreatedStoryAlumniMobility />,
              },
              {
                path: 'edit/:id',
                element: <UpdateStoryMobility />,
              },
            ],
          },
        ],
      },
      {
        path: 'undergraduate-program',
        children: [
          {
            index: true,
            element: <AcademicInternationalUnderGraduated />,
          },
          {
            path: 'story',
            children: [
              {
                index: true,
                element: <AlumniStoriesUnderGraduated />,
              },
              {
                path: 'add',
                element: <CreatedStoryUnderGraduated />,
              },
              {
                path: 'edit/:id',
                element: <UpdateStoryUnderGraduated />,
              },
            ],
          },
          {
            path: 'program',
            children: [
              {
                index: true,
                element: <UnderGraduatedProgram />,
              },
              {
                path: 'detail/:id',
                element: <DetailProgram />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'research',
    children: [
      {
        path: 'research-group',
        children: [
          {
            index: true,
            element: <ResearchGroupPage />,
          },
          {
            path: 'group-skill',
            children: [
              {
                index: true,
                element: <GroupSkillResearch />,
              },
              {
                path: 'add',
                element: <CreatedGroupSkill />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedGroupSkill />,
              },
              {
                path: 'detail/:id',
                element: <DetailGroupSkillPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'collaboration',
        children: [
          {
            index: true,
            element: <OurPartnerPage />,
          },
          {
            path: 'mitra',
            element: <MitraOurPartners />,
          },
          {
            path: 'type',
            element: <TypeOurPartners />,
          },
        ],
      },
      {
        path: 'study-research',
        element: <StudyResearchPage />,
      },
    ],
  },
  {
    path: 'community',
    children: [
      {
        path: 'study-faculty',
        children: [
          {
            path: 'college-system',
            children: [
              {
                index: true,
                element: <CommunityCollegeSystem />,
              },
              {
                path: 'study-program',
                element: <CommunityStudyProgram />,
              },
            ],
          },
          {
            path: 'accreditation',
            element: <AccreditationFacultyCommunity />,
          },
          {
            path: 'carrier-prospect',
            children: [
              {
                index: true,
                element: <CarrierProspectCommunity />,
              },
              {
                path: 'sector',
                element: <ProdiSectorCarrier />,
              },
              {
                path: 'sector/:id/detail',
                element: <SectorCarrierProspect />,
              },
            ],
          },
        ],
      },
      {
        path: 'student-life',
        children: [
          {
            path: 'accommodation',
            children: [
              {
                index: true,
                element: <AccommodationStudentLife />,
              },
            ],
          },
          {
            path: 'student-organization',
            children: [
              {
                index: true,
                element: <StudentOrganizationCommunity />,
              },
              {
                path: 'list-organization',
                children: [
                  {
                    index: true,
                    element: <ListOrganizationStudentLife />,
                  },
                  {
                    path: 'add',
                    element: <CreatedStudentOrganization />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedStudentOrganization />,
                  },
                  {
                    path: 'detail/:id',
                    element: <DetailStudentOrganization />,
                  },
                ],
              },
            ],
          },
          {
            path: 'entertainment',
            children: [
              {
                index: true,
                element: <EntertainmentCommunity />,
              },
              {
                path: 'list-place',
                children: [
                  {
                    index: true,
                    element: <ListPlaceStudentOrganization />,
                  },
                  {
                    path: 'add',
                    element: <CreatedStudentListOrganization />,
                  },
                  {
                    path: 'edit/:id',
                    element: <UpdatedStudentListOrganization />,
                  },
                  {
                    path: 'detail/:id',
                    element: <DetailStudentEntertainment />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'Alumni',
        children: [
          {
            path: 'story',
            children: [
              {
                index: true,
                element: <CommunityAlumniStory />,
              },
              {
                path: 'add',
                element: <CreatedStoryAlumniCommunity />,
              },
              {
                path: 'edit/:id',
                element: <UpdateStoryAlumni />,
              },
            ],
          },
          {
            path: 'inbox',
            children: [
              {
                index: true,
                element: <InboxStoryPage />,
              },
              {
                path: 'message/:id',
                element: <AlumniMessageInbox />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'facilities',
    children: [
      {
        index: true,
        element: <FacilitiesPage />,
      },
      {
        path: 'add',
        element: <CreatedFacilities />,
      },
      {
        path: 'edit/:id',
        element: <UpdatedFacilities />,
      },
      {
        path: 'detail/:id',
        element: <DetailFacilitiesPage />,
      },
    ],
  },
  {
    path: 'services',
    children: [
      {
        index: true,
        element: <ServiceListPage />,
      },
    ],
  },
  {
    path: 'gallery',
    children: [
      {
        path: 'video',
        element: <ListAlbumVideo />,
      },
      {
        path: 'photo',
        children: [
          {
            index: true,
            element: <ListGalleryAlbum />,
          },
          {
            path: 'album',
            children: [
              {
                path: ':id',
                element: <ListGalleryPhoto />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'pmb',
    children: [
      {
        index: true,
        element: <DescriptionPMBText />,
      },
    ],
  },
  {
    path: 'zone-integrity',
    children: [
      {
        index: true,
        element: <ZoneIntegrityPage />,
      },
      {
        path: 'detail/:id',
        children: [
          {
            index: true,
            element: <DetailZoneIntegrity />,
          },
          {
            path: 'add',
            element: <CreatedSubCategory />,
          },
          {
            path: 'edit/:id_sub',
            element: <UpdatedSubCategory />,
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
            element: <NewsCarrierPublicContentPage />,
          },
          {
            path: 'add',
            element: <NewsFacultyCreated />,
          },
          {
            path: 'detail/:id',
            element: <DetailNewsFacultyPage />,
          },
          {
            path: 'edit/:id',
            element: <NewsFacultyUpdated />,
          },
          {
            path: 'log/:id',
            element: <LogActivityNewsFacultyPage />,
          },
        ],
      },
      {
        path: 'agenda',
        children: [
          {
            index: true,
            element: <AgendaFacultyPublicContent />,
          },
          {
            path: 'add',
            element: <CreateAgendaFacultyPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAgendaFacultyPage />,
          },
          {
            path: 'detail/:id',
            element: <AgendaFacultyDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAgendaFacultyPage />,
          },
        ],
      },
      {
        path: 'announcement',
        children: [
          {
            index: true,
            element: <AnnouncementFacultyPublicContent />,
          },
          {
            path: 'add',
            element: <CreatedAnnouncementFaculty />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAnnouncementFaculty />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementFacultyDetailPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementFaculty />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFileFacultyPage />,
          },
          {
            path: 'category',
            element: <CategoryDownloadFacultyPage />,
          },
          {
            path: 'add',
            element: <AddDownloadCarrierPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedDownloadFacultyPage />,
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
        element: <LandingPageFaculty />,
      },
      {
        path: 'color',
        element: <ColorSettingFaculty />,
      },
      {
        path: 'template',
        children: [
          {
            index: true,
            element: <TemplateWebFacultySettings />,
          },
          {
            path: ':id',
            element: <ThemaChangeColorFaculty />,
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
