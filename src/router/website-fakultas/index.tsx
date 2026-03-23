import { DetailProfileFaculty } from '@/pages/modules/website-fakultas/data-fakultas'
import { UpdatedDataFaculty } from '@/pages/modules/website-fakultas/data-fakultas/updated'
import { NewsCarrierPublicContentPage } from '@/pages/modules/website-fakultas/public-content/news'
import { NewsFacultyCreated } from '@/pages/modules/website-fakultas/public-content/news/created'
import { DetailNewsFacultyPage } from '@/pages/modules/website-fakultas/public-content/news/detail'
import { NewsFacultyUpdated } from '@/pages/modules/website-fakultas/public-content/news/updated'
import { LogActivityNewsFacultyPage } from '@/pages/modules/website-fakultas/public-content/news/log-data'
import { AgendaFacultyPublicContent } from '@/pages/modules/website-fakultas/public-content/agenda'
import { CreateAgendaFacultyPage } from '@/pages/modules/website-fakultas/public-content/agenda/created'
import { UpdatedAgendaFacultyPage } from '@/pages/modules/website-fakultas/public-content/agenda/updated'
import { AgendaFacultyDetailPage } from '@/pages/modules/website-fakultas/public-content/agenda/detail'
import { LogActivityAgendaFacultyPage } from '@/pages/modules/website-fakultas/public-content/agenda/log'
import { AnnouncementFacultyPublicContent } from '@/pages/modules/website-fakultas/public-content/announcement'
import { CreatedAnnouncementFaculty } from '@/pages/modules/website-fakultas/public-content/announcement/created'
import { UpdatedAnnouncementFaculty } from '@/pages/modules/website-fakultas/public-content/announcement/updated'
import { AnnouncementFacultyDetailPage } from '@/pages/modules/website-fakultas/public-content/announcement/detail'
import { LogActivityAnnouncementFaculty } from '@/pages/modules/website-fakultas/public-content/announcement/log'
import DownloadFileFacultyPage from '@/pages/modules/website-fakultas/public-content/Download'
import { CategoryDownloadFacultyPage } from '@/pages/modules/website-fakultas/public-content/Download/category'
import { AddDownloadCarrierPage } from '@/pages/modules/website-fakultas/public-content/Download/created'
import { UpdatedDownloadFacultyPage } from '@/pages/modules/website-fakultas/public-content/Download/updated'
import { LandingPageCarrier } from '@/pages/modules/website-fakultas/settings/landing-page'
import ColorSettingFaculty from '@/pages/modules/website-fakultas/settings/color/ColorSettingService.tsx'
import { TemplateWebFacultySettings } from '@/pages/modules/website-fakultas/settings/template-web'
import LayoutFaculty from '@/pages/modules/website-fakultas/about-faculty/component/layout'
import AboutFacultyView from '@/pages/modules/website-fakultas/about-faculty'
import UserFacultyView from '@/pages/modules/website-fakultas/about-faculty/unit-pengelola'
import VisionMissionFaculty from '@/pages/modules/website-fakultas/about-faculty/vision-mission'
import OrganizationalStructureView from '@/pages/modules/website-fakultas/about-faculty/organization'
import ContactUsView from '@/pages/modules/website-fakultas/about-faculty/contact-us'
import ProgramStudyView from '@/pages/modules/website-fakultas/academic/program-studi'
import LayoutStudyProgram from '@/pages/modules/website-fakultas/academic/program-studi/component/layout'
import AboutProdiView from '@/pages/modules/website-fakultas/academic/program-studi/detail/about'
import UserProdiView from '@/pages/modules/website-fakultas/academic/program-studi/unit-pengelola'
import VisionMissionProdi from '@/pages/modules/website-fakultas/academic/program-studi/detail/vision-mission'
import ProdiOrganizationalStructureView from '@/pages/modules/website-fakultas/academic/program-studi/detail/organization'
import ProdiContactUsView from '@/pages/modules/website-fakultas/academic/program-studi/detail/contact-us'
import ProdiCurriculumView from '@/pages/modules/website-fakultas/academic/curriculum'
import { AcademicPPSMPage } from '@/pages/modules/website-fakultas/academic/ppsm'
import DashboardFaculty from '@/pages/modules/website-fakultas/dashboard'
import { AlumniStoriesPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story'
import { CreatedStoryAlumni } from '@/pages/modules/website-fakultas/academic/ppsm/story/create'
import { ProdiGallery } from '@/pages/modules/website-fakultas/academic/program-studi/detail/gallery'
import { StaffDetailProdi } from '@/pages/modules/website-fakultas/academic/program-studi/detail/staff'
import { LecturerDetailProfile } from '@/pages/modules/website-fakultas/academic/program-studi/detail/lecturer'
import { CurriculumPerProdi } from '@/pages/modules/website-fakultas/academic/curriculum/per-prodi'
import { UpdateStoryPPSM } from '@/pages/modules/website-fakultas/academic/ppsm/story/update'
import { AcademicInternationalMobility } from '@/pages/modules/website-fakultas/academic/international-mobility'
import { AlumniStoriesMobility } from '@/pages/modules/website-fakultas/academic/international-mobility/story'
import { CreatedStoryAlumniMobility } from '@/pages/modules/website-fakultas/academic/international-mobility/story/create'
import { UpdateStoryMobility } from '@/pages/modules/website-fakultas/academic/international-mobility/story/update'
import { AcademicInternationalUnderGraduated } from '@/pages/modules/website-fakultas/academic/undergraduate-program'
import { AlumniStoriesUnderGraduated } from '@/pages/modules/website-fakultas/academic/undergraduate-program/story'
import { CreatedStoryUnderGraduated } from '@/pages/modules/website-fakultas/academic/undergraduate-program/story/create'
import { UnderGraduatedProgram } from '@/pages/modules/website-fakultas/academic/undergraduate-program/program'
import { DetailProgram } from '@/pages/modules/website-fakultas/academic/undergraduate-program/program/detail'
import { ResearchGroupPage } from '@/pages/modules/website-fakultas/research/research-group'
import { GroupSkillResearch } from '@/pages/modules/website-fakultas/research/research-group/group-skill'
import { CreatedGroupSkill } from '@/pages/modules/website-fakultas/research/research-group/group-skill/created'
import { OurPartnerPage } from '@/pages/modules/website-fakultas/research/collaboration'
import { MitraOurPartners } from '@/pages/modules/website-fakultas/research/collaboration/mitra'
import { TypeOurPartners } from '@/pages/modules/website-fakultas/research/collaboration/type'
import { CommunityCollegeSystem } from '@/pages/modules/website-fakultas/community/study-faculty/college-system'
import { CommunityStudyProgram } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/study-program'
import { AccreditationFacultyCommunity } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/accreditation'
import { CarrierProspectCommunity } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect'
import { SectorCarrierProspect } from '@/pages/modules/website-fakultas/community/study-faculty/college-system/carrier-prospect/sector'
import { AccommodationStudentLife } from '@/pages/modules/website-fakultas/community/student-life/accommodation'
import { StudentOrganizationCommunity } from '@/pages/modules/website-fakultas/community/student-life/student-organization'
import { ListOrganizationStudentLife } from '@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization'
import { CreatedStudentOrganization } from '@/pages/modules/website-fakultas/community/student-life/student-organization/list-Organization/created'
import { EntertainmentCommunity } from '@/pages/modules/website-fakultas/community/student-life/entertainment'
import { ListPlaceStudentOrganization } from '@/pages/modules/website-fakultas/community/student-life/entertainment/list-place'
import { CreatedStudentListOrganization } from '@/pages/modules/website-fakultas/community/student-life/entertainment/list-place/created'
import { CommunityAlumniStory } from '@/pages/modules/website-fakultas/community/alumni/story'
import { CreatedStoryAlumniCommunity } from '@/pages/modules/website-fakultas/community/alumni/story/create'
import { FacilitiesPage } from '@/pages/modules/website-fakultas/facilities'
import { CreatedFacilities } from '@/pages/modules/website-fakultas/facilities/created'
import { DescriptionPMBText } from '@/pages/modules/website-fakultas/pmb'
import { ZoneIntegrityPage } from '@/pages/modules/website-fakultas/zone-integrity'
import { DetailZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/detail'
import { CreatedSubCategory } from '@/pages/modules/website-fakultas/zone-integrity/detail/created'

export const RouterFaculty = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardFaculty />,
      },
    ],
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
        element: <></>,
      },
      {
        path: 'dosen',
        element: <></>,
      },
      {
        path: 'berita',
        element: <></>,
      },
      {
        path: 'galeri',
        element: <></>,
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
                element: <></>,
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
                path: ':id',
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
            element: <CarrierProspectCommunity />,
          },
          {
            path: 'carrier-prospect/sector',
            element: <SectorCarrierProspect />,
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
                element: <ListPlaceStudentOrganization />,
              },
              {
                path: 'list-place/add',
                element: <CreatedStudentListOrganization />,
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
            ],
          },
          {
            path: 'inbox',
            children: [],
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
        path: ':id/detail',
        element: <DetailZoneIntegrity />,
      },
      {
        path: ':id/detail/add',
        element: <CreatedSubCategory />,
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
        element: <LandingPageCarrier />,
      },
      {
        path: 'color',
        element: <ColorSettingFaculty />,
      },
      {
        path: 'template',
        element: <TemplateWebFacultySettings />,
      },
    ],
  },
  {
    path: '*',
    element: <></>,
  },
]
