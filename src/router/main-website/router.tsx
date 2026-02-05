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
import CalendarAcademicView from '@/pages/modules/website-utama/calendar-academic/CalendarAcademicView'
import CalendarAcademicDetailView from '@/pages/modules/website-utama/calendar-academic/detail/CalendarAcademicDetailView'
import DetailActivityView from '@/pages/modules/website-utama/calendar-academic/detail-activity/DetailActivityView'
import LogAcademicYear from '@/pages/modules/website-utama/calendar-academic/log/LogAcademicYear'
import LogActivityView from '@/pages/modules/website-utama/calendar-academic/log/LogActivityView'
import LogActivityDetailView from '@/pages/modules/website-utama/calendar-academic/log/LogActivityDetailView'
import CalendarAcademicBackgroundView from '@/pages/modules/website-utama/calendar-academic/background/CalendarAcademicBackgroundView'
import { PlacemenUser } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user'
import { FacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities'
import { CreatedFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/created'
import { UpdatedFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/updated'
import { DetailFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/detail'
import StatisticView from '@/pages/modules/website-utama/statistic/StatisticView'

import AcreditationView from '@/pages/modules/website-utama/acreditation/AcreditationView'
import LogStatisticView from '@/pages/modules/website-utama/statistic/log/LogStatisticView'
import AcreditationBackgroundView from '@/pages/modules/website-utama/acreditation/background/AcreditationBackgroundView'
import { GalleryVideoPage } from '@/pages/modules/website-utama/public-content/gallery/video'
import { GalleryPhotoPage } from '@/pages/modules/website-utama/public-content/gallery/Foto'
import { DataAlbumListPage } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album'
import { AchievementPage } from '@/pages/modules/website-utama/public-content/achievement'
import { CreatedAchievementPage } from '@/pages/modules/website-utama/public-content/achievement/created'
import { UpdatedAchievementPage } from '@/pages/modules/website-utama/public-content/achievement/updated'
import { DetailAchievementPage } from '@/pages/modules/website-utama/public-content/achievement/detail'
import { LogActivityPage } from '@/pages/modules/website-utama/public-content/slider/top-slider/log'
import AcreditationLogDetail from '@/pages/modules/website-utama/acreditation/log/AcreditationLogDetail'
import { LogBottomActivityPage } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/log'
import { LogActivityNewsPage } from '@/pages/modules/website-utama/public-content/news/log'
import { LogActivityImpactInnovationPage } from '@/pages/modules/website-utama/public-content/impact-innovation/log'
import { LogActivityAnnouncementPage } from '@/pages/modules/website-utama/public-content/announcement/log'
import { LogActivityAgendaPage } from '@/pages/modules/website-utama/public-content/agenda/log'
import { LogActivityFacilitiesPage } from '@/pages/modules/website-utama/public-content/facilities/log'
import { LogActivityAchievement } from '@/pages/modules/website-utama/public-content/achievement/log'
import { AnnouncementBackground } from '@/pages/modules/website-utama/public-content/announcement/background'
import { AgendaBackgroundPage } from '@/pages/modules/website-utama/public-content/agenda/background'
import { InnovationBackgroundPage } from '@/pages/modules/website-utama/public-content/impact-innovation/background'
import { GroupOrganizationBackgroundPage } from '@/pages/modules/website-utama/public-content/structure-organization/background'
import { FacilitiesBackgroundPage } from '@/pages/modules/website-utama/public-content/facilities/background'
import { AchievementBackgroundPage } from '@/pages/modules/website-utama/public-content/achievement/background'
import { GalleryPhotoBackgroundPage } from '@/pages/modules/website-utama/public-content/gallery/Foto/background'
import { GalleryVideoBackgroundPage } from '@/pages/modules/website-utama/public-content/gallery/video/background'
import { LogActivityVideoPage } from '@/pages/modules/website-utama/public-content/gallery/video/log'
import { LogActivityGalleryAlbum } from '@/pages/modules/website-utama/public-content/gallery/Foto/log'
import { LogActivityGalleryAlbumPhoto } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/log'
import DownloadFilePage from '@/pages/modules/website-utama/public-content/download'
import { AddDownloadPage } from '@/pages/modules/website-utama/public-content/download/components/addPage.tsx'
import { EditDownloadPage } from '@/pages/modules/website-utama/public-content/download/components/editPage.tsx'
import { OfficialMusicPage } from '@/pages/modules/website-utama/public-content/musik-resmi'
import { AddOfficialMusicPage } from '@/pages/modules/website-utama/public-content/musik-resmi/components/addPage.tsx'
import { EditOfficialMusicPage } from '@/pages/modules/website-utama/public-content/musik-resmi/components/editPage.tsx'
import { CertificateStudent } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa'
import { AcademicRegulation } from '@/pages/modules/website-utama/peraturan-akademik'
import { AddPageAcademicRule } from '@/pages/modules/website-utama/peraturan-akademik/components/addPage.tsx'
import { PageIdentity } from '@/pages/modules/website-utama/Identity'
import DashboardAdmin from '@/pages/modules/website-utama/beranda'
import { UpdateIdentityPage } from '@/pages/modules/website-utama/Identity/components/update.tsx'
import { IdentityBackground } from '@/pages/modules/website-utama/Identity/background'
import { AcademicRulesBackground } from '@/pages/modules/website-utama/peraturan-akademik/background'
import { StudentLetterBackground } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/background'
import CampusLifePage from '@/pages/modules/website-utama/campus-life'
import CalloborationCategoryView from '@/pages/modules/website-utama/kerjasama/kategori-kerjasama/CalloborationCategoryView'
import SubCalloborationCategoryView from '@/pages/modules/website-utama/kerjasama/sub-kategori-kerjasama/SubCalloborationCategoryView'
import TypeOfCalloborationView from '@/pages/modules/website-utama/kerjasama/jenis-kerjasama/TypeOfCalloborationView'
import FieldOfCooperationView from '@/pages/modules/website-utama/kerjasama/bidang-kerjasama/FieldOfCooperationView'
import CalloborationListView from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/CalloborationListView'
import CalloborationCreateView from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/create/CalloborationCreateView'
import CalloborationCategoryLogView from '@/pages/modules/website-utama/kerjasama/kategori-kerjasama/log/CalloborationCategoryLogView'
import SubCalloborationCategoryLogView from '@/pages/modules/website-utama/kerjasama/sub-kategori-kerjasama/log/SubCalloborationCategoryLogView'
import TypeOfCalloborationLogView from '@/pages/modules/website-utama/kerjasama/jenis-kerjasama/log/TypeOfCalloborationLogView'
import FieldOfCooperationLogView from '@/pages/modules/website-utama/kerjasama/bidang-kerjasama/log/FieldOfCooperationLogView'
import CalloborationEditView from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/edit/CalloborationEditView'
import CalloborationDetailView from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/detail/CalloborationDetailView'
import CalloborationLogView from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/log/CalloborationLogView'
import { CampusLifeBackground } from '@/pages/modules/website-utama/campus-life/background'
import ProgramStudyView from '@/pages/modules/website-utama/program-studi/ProgramStudyView'
import AboutProgramStudiView from '@/pages/modules/website-utama/program-studi/detail/tentang/AboutProgramStudiView'
import LayoutProgramStudy from '@/pages/modules/website-utama/program-studi/detail/components/LayoutProgramStudy'
import ManagementUnitProgramStudyView from '@/pages/modules/website-utama/program-studi/detail/unit-pengelola/ManagementUnitProgramStudyView'
import VisiMisiProgramStudyView from '@/pages/modules/website-utama/program-studi/detail/visi-misi/VisiMisiProgramStudyView'
import OrganizationalStructureView from '@/pages/modules/website-utama/program-studi/detail/struktur-organisasi/OrganizationalStructureView'
import ContactUsProgramStudyView from '@/pages/modules/website-utama/program-studi/detail/hubungi-kami/ContactUsProgramStudyView'
import StaffProgramStudyView from '@/pages/modules/website-utama/program-studi/detail/staff/StaffProgramStudyView'
import DosenProgramStudyView from '@/pages/modules/website-utama/program-studi/detail/dosen/DosenProgramStudyView'
import GalleryProgramStudyView from '@/pages/modules/website-utama/program-studi/detail/gallery/GalleryProgramStudyView'
import NewsProgramStudyView from '@/pages/modules/website-utama/program-studi/detail/berita/NewsProgramStudyView.tsx'
import { DetailNewsProdiPage } from '@/pages/modules/website-utama/program-studi/detail/berita/detail'
import FacultyView from '@/pages/modules/website-utama/fakultas/FacultyView'
import LayoutFaculty from '@/pages/modules/website-utama/fakultas/detail/components/LayoutFaculty'
import GalleryDetailPhotoView from '@/pages/modules/website-utama/program-studi/detail/gallery/detail/GalleryDetailPhotoView'
import { InboxMessagePage } from '@/pages/modules/website-utama/pertayaan/kotak-masuk'
import { InboxMessageBackground } from '@/pages/modules/website-utama/pertayaan/kotak-masuk/background'
import { FaqListData } from '@/pages/modules/website-utama/pertayaan/Faq'
import { CategoryFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/Category'
import { RegistrationPathPage } from '@/pages/modules/website-utama/jalur-pendaftaran'
import { AddPageRegisterPath } from '@/pages/modules/website-utama/jalur-pendaftaran/components/addPage.tsx'
import { EditPageRegisterPath } from '@/pages/modules/website-utama/jalur-pendaftaran/components/editPage.tsx'
import { FooterContent } from '@/pages/modules/website-utama/settings-menu/Footer'
import { UserProfilePage } from '@/pages/modules/website-utama/user-profile'
import { ChangePassword } from '@/pages/modules/website-utama/change-password'
import { LogFooterContent } from '@/pages/modules/website-utama/settings-menu/Footer/log'
import { ChangePrimaryAndFooterColor } from '@/pages/modules/website-utama/settings-menu/color'
import { NewsWithLanguage } from '@/pages/modules/website-utama/public-content/news/language'
import { ImpactInnovationLanguage } from '@/pages/modules/website-utama/public-content/impact-innovation/language'
import { AnnouncementLanguage } from '@/pages/modules/website-utama/public-content/announcement/language'
import { AgendaLanguagePage } from '@/pages/modules/website-utama/public-content/agenda/language'
import { StructureOrganizationLanguagePage } from '@/pages/modules/website-utama/public-content/structure-organization/language'
import { PlacemanUserLanguagePage } from '@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/language'
import { FacilitiesLanguage } from '@/pages/modules/website-utama/public-content/facilities/language'
import { GalleryVideoLanguage } from '@/pages/modules/website-utama/public-content/gallery/video/language'
import { GalleryAlbumLanguage } from '@/pages/modules/website-utama/public-content/gallery/Foto/language'
import { GalleryPhotoLanguage } from '@/pages/modules/website-utama/public-content/gallery/Foto/data-album/language'
import { AchievementLanguagePage } from '@/pages/modules/website-utama/public-content/achievement/language'
import { DownloadCategoryLanguage } from '@/pages/modules/website-utama/public-content/download/category-language'
import { DownloadFileLanguage } from '@/pages/modules/website-utama/public-content/download/language'
import { AnthemMusicLanguage } from '@/pages/modules/website-utama/public-content/musik-resmi/language'
import { ServiceLanguagePage } from '@/pages/modules/website-utama/services/language'
import { CategoryFAQLanguagePage } from '@/pages/modules/website-utama/pertayaan/Faq/Category/language'
import { FAQLanguagePage } from '@/pages/modules/website-utama/pertayaan/Faq/language'
import { SubmissionSKMLanguagePage } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/pengajuan-language'
import { SKMLanguagePage } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/language'
import { LogActivitySKM } from '@/pages/modules/website-utama/surat-keterangan-mahasiswa/log'
import { RegisteredPathLanguagePage } from '@/pages/modules/website-utama/jalur-pendaftaran/language'
import { AcademicRulesLanguagePage } from '@/pages/modules/website-utama/peraturan-akademik/language'
import { HeaderMenuLanguagePage } from '@/pages/modules/website-utama/settings-menu/header/language'
import { FooterLanguagePage } from '@/pages/modules/website-utama/settings-menu/Footer/language'
import { CorporationCategoryLanguagePage } from '@/pages/modules/website-utama/kerjasama/kategori-kerjasama/language'
import { CorporationSubCategoryLanguagePage } from '@/pages/modules/website-utama/kerjasama/sub-kategori-kerjasama/language'
import { TypeCollaborationLanguagePage } from '@/pages/modules/website-utama/kerjasama/jenis-kerjasama/language'
import { FieldCollaborationLanguagePage } from '@/pages/modules/website-utama/kerjasama/bidang-kerjasama/language'
import { CollaborationLanguagePage } from '@/pages/modules/website-utama/kerjasama/daftar-kerjasama/language'
import { StatisticLanguagePage } from '@/pages/modules/website-utama/statistic/language'
import { YearAcademicLanguagePage } from '@/pages/modules/website-utama/calendar-academic/language'
import { YearAcademicActivityLanguagePage } from '@/pages/modules/website-utama/calendar-academic/detail/language'
import { YearActivityDetailLanguagePage } from '@/pages/modules/website-utama/calendar-academic/detail-activity/language'
import { AccreditationLanguagePage } from '@/pages/modules/website-utama/acreditation/language'
import { IdentityLanguagePage } from '@/pages/modules/website-utama/Identity/language'
import { TextIntroduceLanguagePage } from '@/pages/modules/website-utama/campus-life/language/pengantar'
import { TextFacilitiesLanguagePage } from '@/pages/modules/website-utama/campus-life/language/fasilitas'
import { TextUnitActivityLanguagePage } from '@/pages/modules/website-utama/campus-life/language/ukm'
import { TextPerformanceLanguagePage } from '@/pages/modules/website-utama/campus-life/language/prestasi'
import { TextTestimonyLanguagePage } from '@/pages/modules/website-utama/campus-life/language/testimoni'
import { TextDirectUrlLanguagePage } from '@/pages/modules/website-utama/campus-life/language/directLink'
import { TopSliderLanguagePage } from '@/pages/modules/website-utama/public-content/slider/top-slider/language'
import { BottomSliderLanguagePage } from '@/pages/modules/website-utama/public-content/slider/bottom-slider/language'

export const MainWebsiteRouter = [
  {
    path: 'dashboard',
    children: [
      {
        index: true,
        element: <DashboardAdmin />,
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
                path: 'language/:id',
                element: <TopSliderLanguagePage />,
              },
              {
                path: 'add',
                element: <CreateTopSlider />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedTopSliderPage />,
              },
              {
                path: 'log/:id',
                element: <LogActivityPage />,
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
                path: 'language/:id',
                element: <BottomSliderLanguagePage />,
              },
              {
                path: 'add',
                element: <CreateBottomSlider />,
              },
              {
                path: 'edit/:id',
                element: <UpdatedBottomSlider />,
              },
              {
                path: 'log/:id',
                element: <LogBottomActivityPage />,
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
          {
            path: 'log/:id',
            element: <LogActivityNewsPage />,
          },
          {
            path: 'language/:id',
            element: <NewsWithLanguage />,
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
          {
            path: 'log/:id',
            element: <LogActivityAnnouncementPage />,
          },
          {
            path: 'background',
            element: <AnnouncementBackground />,
          },
          {
            path: 'language/:id',
            element: <AnnouncementLanguage />,
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
          {
            path: 'log/:id',
            element: <LogActivityAgendaPage />,
          },
          {
            path: 'background',
            element: <AgendaBackgroundPage />,
          },
          {
            path: 'language/:id',
            element: <AgendaLanguagePage />,
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
          {
            path: 'log/:id',
            element: <LogActivityImpactInnovationPage />,
          },
          {
            path: 'background',
            element: <InnovationBackgroundPage />,
          },
          {
            path: 'language/:id',
            element: <ImpactInnovationLanguage />,
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
          {
            path: 'language/:id',
            element: <StructureOrganizationLanguagePage />,
          },
          {
            path: 'team/:id',
            element: <PlacemenUser />,
          },
          {
            path: 'team/:id/:userId',
            element: <PlacemanUserLanguagePage />,
          },
          {
            path: 'background',
            element: <GroupOrganizationBackgroundPage />,
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
            element: <CreatedFacilitiesPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedFacilitiesPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailFacilitiesPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityFacilitiesPage />,
          },
          {
            path: 'background',
            element: <FacilitiesBackgroundPage />,
          },
          {
            path: 'language/:id',
            element: <FacilitiesLanguage />,
          },
        ],
      },
      {
        path: 'gallery',
        children: [
          {
            path: 'photo',
            children: [
              {
                index: true,
                element: <GalleryPhotoPage />,
              },
              {
                path: 'log/:id',
                element: <LogActivityGalleryAlbum />,
              },
              {
                path: 'background',
                element: <GalleryPhotoBackgroundPage />,
              },
              {
                path: 'album/:id',
                element: <DataAlbumListPage />,
              },
              {
                path: 'album/:id/:photoId',
                element: <GalleryPhotoLanguage />,
              },
              {
                path: 'album/:id/log',
                element: <LogActivityGalleryAlbumPhoto />,
              },
              {
                path: 'language/:id',
                element: <GalleryAlbumLanguage />,
              },
            ],
          },
          {
            path: 'video',
            children: [
              {
                index: true,
                element: <GalleryVideoPage />,
              },
              {
                path: 'log/:id',
                element: <LogActivityVideoPage />,
              },
              {
                path: 'background',
                element: <GalleryVideoBackgroundPage />,
              },
              {
                path: 'language/:id',
                element: <GalleryVideoLanguage />,
              },
            ],
          },
        ],
      },
      {
        path: 'achievement',
        children: [
          {
            index: true,
            element: <AchievementPage />,
          },
          {
            path: 'add',
            element: <CreatedAchievementPage />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedAchievementPage />,
          },
          {
            path: 'detail/:id',
            element: <DetailAchievementPage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAchievement />,
          },
          {
            path: 'language/:id',
            element: <AchievementLanguagePage />,
          },
          {
            path: 'background',
            element: <AchievementBackgroundPage />,
          },
        ],
      },
      {
        path: 'download',
        children: [
          {
            index: true,
            element: <DownloadFilePage />,
          },
          {
            path: 'category-language/:id',
            element: <DownloadCategoryLanguage />,
          },
          {
            path: 'language/:id',
            element: <DownloadFileLanguage />,
          },
          {
            path: 'add',
            element: <AddDownloadPage />,
          },
          {
            path: 'edit/:id',
            element: <EditDownloadPage />,
          },
        ],
      },
      {
        path: 'music',
        children: [
          {
            index: true,
            element: <OfficialMusicPage />,
          },
          {
            path: 'add',
            element: <AddOfficialMusicPage />,
          },
          {
            path: 'edit/:id',
            element: <EditOfficialMusicPage />,
          },
          {
            path: 'language/:id',
            element: <AnthemMusicLanguage />,
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
            path: 'language/:id',
            element: <HeaderMenuLanguagePage />,
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
      {
        path: 'footer',
        children: [
          {
            index: true,
            element: <FooterContent />,
          },
          {
            path: 'language',
            element: <FooterLanguagePage />,
          },
          {
            path: 'log',
            element: <LogFooterContent />,
          },
        ],
      },
      {
        path: 'primary-color',
        children: [
          {
            index: true,
            element: <ChangePrimaryAndFooterColor />,
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
      {
        path: 'language/:id',
        element: <ServiceLanguagePage />,
      },
    ],
  },
  {
    path: 'calendar-academic',
    children: [
      {
        index: true,
        element: <CalendarAcademicView />,
      },
      {
        path: 'language/:id',
        element: <YearAcademicLanguagePage />,
      },
      {
        path: 'background',
        element: <CalendarAcademicBackgroundView />,
      },
      {
        path: ':idAcademicYear',
        children: [
          {
            index: true,
            element: <CalendarAcademicDetailView />,
          },
          {
            path: 'language/:id',
            element: <YearAcademicActivityLanguagePage />,
          },
          {
            path: 'log',
            element: <LogAcademicYear />,
          },
          {
            path: 'detail-activity',
            children: [
              {
                index: true,
                element: <DetailActivityView />,
              },
              {
                path: ':idActivity',
                children: [
                  {
                    index: true,
                    element: <DetailActivityView />,
                  },
                  {
                    path: 'language/:id',
                    element: <YearActivityDetailLanguagePage />,
                  },
                  {
                    path: 'log',
                    element: <LogActivityView />,
                  },
                  {
                    path: 'log-detail/:idActivityDetail',
                    element: <LogActivityDetailView />,
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
    path: 'statistic',
    children: [
      {
        index: true,
        element: <StatisticView />,
      },
      {
        path: 'language',
        element: <StatisticLanguagePage />,
      },
      {
        path: 'log',
        element: <LogStatisticView />,
      },
    ],
  },
  {
    path: 'acreditation',
    children: [
      {
        index: true,
        element: <AcreditationView />,
      },
      {
        path: 'language/:id',
        element: <AccreditationLanguagePage />,
      },
      {
        path: 'background',
        element: <AcreditationBackgroundView />,
      },
      {
        path: ':idAcreditation/log',
        element: <AcreditationLogDetail />,
      },
    ],
  },
  {
    path: 'surat-keterangan',
    children: [
      {
        index: true,
        element: <CertificateStudent />,
      },
      {
        path: 'pengajuan/language',
        element: <SubmissionSKMLanguagePage />,
      },
      {
        path: 'language/:id',
        element: <SKMLanguagePage />,
      },
      {
        path: 'log/:id',
        element: <LogActivitySKM />,
      },
      {
        path: 'background',
        element: <StudentLetterBackground />,
      },
    ],
  },
  {
    path: 'identity',
    children: [
      {
        index: true,
        element: <PageIdentity />,
      },
      {
        path: 'language',
        element: <IdentityLanguagePage />,
      },
      {
        path: 'update',
        element: <UpdateIdentityPage />,
      },
      {
        path: 'background',
        element: <IdentityBackground />,
      },
    ],
  },
  {
    path: 'academic-rules',
    children: [
      {
        index: true,
        element: <AcademicRegulation />,
      },
      {
        path: 'background',
        element: <AcademicRulesBackground />,
      },
      {
        path: 'language',
        element: <AcademicRulesLanguagePage />,
      },
      {
        path: 'update',
        element: <AddPageAcademicRule />,
      },
    ],
  },
  {
    path: 'campus-life',
    children: [
      {
        index: true,
        element: <CampusLifePage />,
      },
      {
        path: 'pengantar/language',
        element: <TextIntroduceLanguagePage />,
      },
      {
        path: 'fasilitas/language',
        element: <TextFacilitiesLanguagePage />,
      },
      {
        path: 'ukm/language',
        element: <TextUnitActivityLanguagePage />,
      },
      {
        path: 'prestasi/language',
        element: <TextPerformanceLanguagePage />,
      },
      {
        path: 'testimoni/language/:id',
        element: <TextTestimonyLanguagePage />,
      },
      {
        path: 'link/language',
        element: <TextDirectUrlLanguagePage />,
      },
      {
        path: 'background',
        element: <CampusLifeBackground />,
      },
    ],
  },
  {
    path: 'kerjasama',
    children: [
      {
        path: 'kategori-kerjasama',
        children: [
          {
            index: true,
            element: <CalloborationCategoryView />,
          },
          {
            path: 'language/:id',
            element: <CorporationCategoryLanguagePage />,
          },
          {
            path: ':idCalloborationCategory',
            children: [
              {
                path: 'log',
                element: <CalloborationCategoryLogView />,
              },
            ],
          },
        ],
      },
      {
        path: 'sub-kategori-kerjasama',
        children: [
          {
            index: true,
            element: <SubCalloborationCategoryView />,
          },
          {
            path: 'language/:id',
            element: <CorporationSubCategoryLanguagePage />,
          },
          {
            path: ':idSubCalloborationCategory',
            children: [
              {
                path: 'log',
                element: <SubCalloborationCategoryLogView />,
              },
            ],
          },
        ],
      },
      {
        path: 'jenis-kerjasama',
        children: [
          {
            index: true,
            element: <TypeOfCalloborationView />,
          },
          {
            path: 'language/:id',
            element: <TypeCollaborationLanguagePage />,
          },
          {
            path: ':idTypeOfCalloboration',
            children: [
              {
                path: 'log',
                element: <TypeOfCalloborationLogView />,
              },
            ],
          },
        ],
      },
      {
        path: 'bidang-kerjasama',
        children: [
          {
            index: true,
            element: <FieldOfCooperationView />,
          },
          {
            path: 'language/:id',
            element: <FieldCollaborationLanguagePage />,
          },
          {
            path: ':idFieldOfCooperation',
            children: [
              {
                path: 'log',
                element: <FieldOfCooperationLogView />,
              },
            ],
          },
        ],
      },
      {
        path: 'daftar-kerjasama',
        children: [
          { index: true, element: <CalloborationListView /> },
          {
            path: 'add',
            element: <CalloborationCreateView />,
          },
          {
            path: 'language/:id',
            element: <CollaborationLanguagePage />,
          },
          {
            path: ':idCalloboration',
            children: [
              {
                path: 'edit',
                element: <CalloborationEditView />,
              },
              {
                path: 'detail',
                element: <CalloborationDetailView />,
              },
              {
                path: 'log',
                element: <CalloborationLogView />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: 'program-studi',
    children: [
      {
        index: true,
        element: <ProgramStudyView />,
      },
      {
        path: ':id',
        element: <LayoutProgramStudy />,
        children: [
          {
            path: 'tentang',
            element: <AboutProgramStudiView />,
          },
          {
            path: 'unit-pengelola',
            element: <ManagementUnitProgramStudyView />,
          },
          {
            path: 'visi-misi',
            element: <VisiMisiProgramStudyView />,
          },
          {
            path: 'struktur-organisasi',
            element: <OrganizationalStructureView />,
          },
          {
            path: 'hubungi-kami',
            element: <ContactUsProgramStudyView />,
          },
          {
            path: 'staff',
            element: <StaffProgramStudyView />,
          },
          {
            path: 'dosen',
            element: <DosenProgramStudyView />,
          },
          {
            path: 'galeri',
            element: <GalleryProgramStudyView />,
          },
          {
            path: 'berita',
            element: <NewsProgramStudyView />,
          },
          {
            path: '*',
            element: <></>,
          },
        ],
      },
    ],
  },
  {
    path: 'fakultas',
    children: [
      {
        index: true,
        element: <FacultyView />,
      },
      {
        path: ':id',
        element: <LayoutFaculty />,
        children: [
          {
            path: 'tentang',
            element: <AboutProgramStudiView />,
          },
          {
            path: 'unit-pengelola',
            element: <ManagementUnitProgramStudyView />,
          },
          {
            path: 'visi-misi',
            element: <VisiMisiProgramStudyView />,
          },
          {
            path: 'struktur-organisasi',
            element: <OrganizationalStructureView />,
          },
          {
            path: 'hubungi-kami',
            element: <ContactUsProgramStudyView />,
          },
          {
            path: 'staff',
            element: <StaffProgramStudyView />,
          },
          {
            path: 'dosen',
            element: <DosenProgramStudyView />,
          },
          {
            path: 'galeri',
            element: <GalleryProgramStudyView />,
          },
          {
            path: 'berita',
            element: <NewsProgramStudyView />,
          },
          {
            path: '*',
            element: <></>,
          },
        ],
      },
    ],
  },
  {
    path: 'program-studi/:id/berita/detail/:detail_id',
    element: <DetailNewsProdiPage />,
  },
  {
    path: 'fakultas/:id/berita/detail/:detail_id',
    element: <DetailNewsProdiPage />,
  },
  {
    path: 'fakultas/:id/galeri/:idGallery/detail',
    element: <GalleryDetailPhotoView />,
  },
  {
    path: 'program-studi/:id/galeri/:idGallery/detail',
    element: <GalleryDetailPhotoView />,
  },
  {
    path: 'pertanyaan',
    children: [
      {
        path: 'kotak-masuk',
        children: [
          {
            index: true,
            element: <InboxMessagePage />,
          },
          {
            path: 'background',
            element: <InboxMessageBackground />,
          },
        ],
      },
      {
        path: 'faq',
        children: [
          {
            index: true,
            element: <FaqListData />,
          },
          {
            path: 'language/:id',
            element: <FAQLanguagePage />,
          },
          {
            path: 'kategori',
            element: <CategoryFAQList />,
          },
          {
            path: 'kategori/language/:id',
            element: <CategoryFAQLanguagePage />,
          },
          {
            path: 'background',
            element: <InboxMessageBackground />,
          },
        ],
      },
    ],
  },
  {
    path: 'jalur-pendaftaran',
    children: [
      {
        index: true,
        element: <RegistrationPathPage />,
      },
      {
        path: 'add',
        element: <AddPageRegisterPath />,
      },
      {
        path: 'edit/:id',
        element: <EditPageRegisterPath />,
      },
      {
        path: 'language/:id',
        element: <RegisteredPathLanguagePage />,
      },
    ],
  },
]
