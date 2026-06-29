import { lazy } from 'react'
const ProfilePageMainWebsite = lazy(() => import('@/pages/modules/website-utama/profile').then(m => ({ default: m.ProfilePageMainWebsite })))
const EditPageUniversity = lazy(() => import('@/pages/modules/website-utama/profile/editPage').then(m => ({ default: m.EditPageUniversity })))
const TopSliderPublicContent = lazy(() => import('@/pages/modules/website-utama/public-content/slider/top-slider').then(m => ({ default: m.TopSliderPublicContent })))
const CreateTopSlider = lazy(() => import('@/pages/modules/website-utama/public-content/slider/top-slider/create').then(m => ({ default: m.CreateTopSlider })))
const UpdatedTopSliderPage = lazy(() => import('@/pages/modules/website-utama/public-content/slider/top-slider/updated').then(m => ({ default: m.UpdatedTopSliderPage })))
const BottomSliderPublicContent = lazy(() => import('@/pages/modules/website-utama/public-content/slider/bottom-slider').then(m => ({ default: m.BottomSliderPublicContent })))
const CreateBottomSlider = lazy(() => import('@/pages/modules/website-utama/public-content/slider/bottom-slider/create').then(m => ({ default: m.CreateBottomSlider })))
const UpdatedBottomSlider = lazy(() => import('@/pages/modules/website-utama/public-content/slider/bottom-slider/updated').then(m => ({ default: m.UpdatedBottomSlider })))
const NewsPublicContentPage = lazy(() => import('@/pages/modules/website-utama/public-content/news'))
const CreatedNewsPage = lazy(() => import('@/pages/modules/website-utama/public-content/news/created').then(m => ({ default: m.CreatedNewsPage })))
const UpdatedNewsPage = lazy(() => import('@/pages/modules/website-utama/public-content/news/updated').then(m => ({ default: m.UpdatedNewsPage })))
const DetailNewsPage = lazy(() => import('@/pages/modules/website-utama/public-content/news/detail/page.tsx').then(m => ({ default: m.DetailNewsPage })))
const AnnouncementPage = lazy(() => import('@/pages/modules/website-utama/public-content/announcement').then(m => ({ default: m.AnnouncementPage })))
const CreateAnnouncementPage = lazy(() => import('@/pages/modules/website-utama/public-content/announcement/created').then(m => ({ default: m.CreateAnnouncementPage })))
const UpdatedAnnouncementPage = lazy(() => import('@/pages/modules/website-utama/public-content/announcement/updated').then(m => ({ default: m.UpdatedAnnouncementPage })))
const SettingMenuHeaderView = lazy(() => import('@/pages/modules/website-utama/settings-menu/header/SettingMenuHeaderView'))
const ContentView = lazy(() => import('@/pages/modules/website-utama/settings-menu/header/content/ContentView'))
const ContentCreateView = lazy(() => import('@/pages/modules/website-utama/settings-menu/header/content/create/ContentCreateView'))
const ContentEditView = lazy(() => import('@/pages/modules/website-utama/settings-menu/header/content/edit/ContentEditView'))
const AnnouncementDetailPage = lazy(() => import('@/pages/modules/website-utama/public-content/announcement/detail').then(m => ({ default: m.AnnouncementDetailPage })))
const AgendaPage = lazy(() => import('@/pages/modules/website-utama/public-content/agenda').then(m => ({ default: m.AgendaPage })))
const CreateAgendaPage = lazy(() => import('@/pages/modules/website-utama/public-content/agenda/created').then(m => ({ default: m.CreateAgendaPage })))
const UpdatedAgendaPage = lazy(() => import('@/pages/modules/website-utama/public-content/agenda/updated').then(m => ({ default: m.UpdatedAgendaPage })))
const DetailAgendaPage = lazy(() => import('@/pages/modules/website-utama/public-content/agenda/detail').then(m => ({ default: m.DetailAgendaPage })))
const ImpactInnovationPage = lazy(() => import('@/pages/modules/website-utama/public-content/impact-innovation').then(m => ({ default: m.ImpactInnovationPage })))
const CreateImpactInnovationPage = lazy(() => import('@/pages/modules/website-utama/public-content/impact-innovation/created').then(m => ({ default: m.CreateImpactInnovationPage })))
const BackgroundView = lazy(() => import('@/pages/modules/website-utama/settings-menu/header/background/BackgroundView'))
const ServicesView = lazy(() => import('@/pages/modules/website-utama/services/ServicesView'))
const LogView = lazy(() => import('@/pages/modules/website-utama/services/log/LogView'))
const UpdatedImpactInnovationPage = lazy(() => import('@/pages/modules/website-utama/public-content/impact-innovation/updated').then(m => ({ default: m.UpdatedImpactInnovationPage })))
const DetailImpactInnovationPage = lazy(() => import('@/pages/modules/website-utama/public-content/impact-innovation/detail').then(m => ({ default: m.DetailImpactInnovationPage })))
const StructureOrganizationPage = lazy(() => import('@/pages/modules/website-utama/public-content/structure-organization').then(m => ({ default: m.StructureOrganizationPage })))
const CalendarAcademicView = lazy(() => import('@/pages/modules/website-utama/calendar-academic/CalendarAcademicView'))
const CalendarAcademicDetailView = lazy(() => import('@/pages/modules/website-utama/calendar-academic/detail/CalendarAcademicDetailView'))
const DetailActivityView = lazy(() => import('@/pages/modules/website-utama/calendar-academic/detail-activity/DetailActivityView'))
const LogAcademicYear = lazy(() => import('@/pages/modules/website-utama/calendar-academic/log/LogAcademicYear'))
const LogActivityView = lazy(() => import('@/pages/modules/website-utama/calendar-academic/log/LogActivityView'))
const LogActivityDetailView = lazy(() => import('@/pages/modules/website-utama/calendar-academic/log/LogActivityDetailView'))
const CalendarAcademicBackgroundView = lazy(() => import('@/pages/modules/website-utama/calendar-academic/background/CalendarAcademicBackgroundView'))
const PlacemenUser = lazy(() => import('@/pages/modules/website-utama/public-content/structure-organization/Placeman-user').then(m => ({ default: m.PlacemenUser })))
const FacilitiesPage = lazy(() => import('@/pages/modules/website-utama/public-content/facilities').then(m => ({ default: m.FacilitiesPage })))
const CreatedFacilitiesPage = lazy(() => import('@/pages/modules/website-utama/public-content/facilities/created').then(m => ({ default: m.CreatedFacilitiesPage })))
const UpdatedFacilitiesPage = lazy(() => import('@/pages/modules/website-utama/public-content/facilities/updated').then(m => ({ default: m.UpdatedFacilitiesPage })))
const DetailFacilitiesPage = lazy(() => import('@/pages/modules/website-utama/public-content/facilities/detail').then(m => ({ default: m.DetailFacilitiesPage })))
const StatisticView = lazy(() => import('@/pages/modules/website-utama/statistic/StatisticView'))

const AcreditationView = lazy(() => import('@/pages/modules/website-utama/acreditation/AcreditationView'))
const LogStatisticView = lazy(() => import('@/pages/modules/website-utama/statistic/log/LogStatisticView'))
const AcreditationBackgroundView = lazy(() => import('@/pages/modules/website-utama/acreditation/background/AcreditationBackgroundView'))
const GalleryVideoPage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/video').then(m => ({ default: m.GalleryVideoPage })))
const GalleryPhotoPage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/Foto').then(m => ({ default: m.GalleryPhotoPage })))
const DataAlbumListPage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/Foto/data-album').then(m => ({ default: m.DataAlbumListPage })))
const AchievementPage = lazy(() => import('@/pages/modules/website-utama/public-content/achievement').then(m => ({ default: m.AchievementPage })))
const CreatedAchievementPage = lazy(() => import('@/pages/modules/website-utama/public-content/achievement/created').then(m => ({ default: m.CreatedAchievementPage })))
const UpdatedAchievementPage = lazy(() => import('@/pages/modules/website-utama/public-content/achievement/updated').then(m => ({ default: m.UpdatedAchievementPage })))
const DetailAchievementPage = lazy(() => import('@/pages/modules/website-utama/public-content/achievement/detail').then(m => ({ default: m.DetailAchievementPage })))
const LogActivityPage = lazy(() => import('@/pages/modules/website-utama/public-content/slider/top-slider/log').then(m => ({ default: m.LogActivityPage })))
const AcreditationLogDetail = lazy(() => import('@/pages/modules/website-utama/acreditation/log/AcreditationLogDetail'))
const LogBottomActivityPage = lazy(() => import('@/pages/modules/website-utama/public-content/slider/bottom-slider/log').then(m => ({ default: m.LogBottomActivityPage })))
const LogActivityNewsPage = lazy(() => import('@/pages/modules/website-utama/public-content/news/log').then(m => ({ default: m.LogActivityNewsPage })))
const LogActivityImpactInnovationPage = lazy(() => import('@/pages/modules/website-utama/public-content/impact-innovation/log').then(m => ({ default: m.LogActivityImpactInnovationPage })))
const LogActivityAnnouncementPage = lazy(() => import('@/pages/modules/website-utama/public-content/announcement/log').then(m => ({ default: m.LogActivityAnnouncementPage })))
const LogActivityAgendaPage = lazy(() => import('@/pages/modules/website-utama/public-content/agenda/log').then(m => ({ default: m.LogActivityAgendaPage })))
const LogActivityFacilitiesPage = lazy(() => import('@/pages/modules/website-utama/public-content/facilities/log').then(m => ({ default: m.LogActivityFacilitiesPage })))
const LogActivityAchievement = lazy(() => import('@/pages/modules/website-utama/public-content/achievement/log').then(m => ({ default: m.LogActivityAchievement })))
const AnnouncementBackground = lazy(() => import('@/pages/modules/website-utama/public-content/announcement/background').then(m => ({ default: m.AnnouncementBackground })))
const AgendaBackgroundPage = lazy(() => import('@/pages/modules/website-utama/public-content/agenda/background').then(m => ({ default: m.AgendaBackgroundPage })))
const InnovationBackgroundPage = lazy(() => import('@/pages/modules/website-utama/public-content/impact-innovation/background').then(m => ({ default: m.InnovationBackgroundPage })))
const GroupOrganizationBackgroundPage = lazy(() => import('@/pages/modules/website-utama/public-content/structure-organization/background').then(m => ({ default: m.GroupOrganizationBackgroundPage })))
const FacilitiesBackgroundPage = lazy(() => import('@/pages/modules/website-utama/public-content/facilities/background').then(m => ({ default: m.FacilitiesBackgroundPage })))
const AchievementBackgroundPage = lazy(() => import('@/pages/modules/website-utama/public-content/achievement/background').then(m => ({ default: m.AchievementBackgroundPage })))
const GalleryPhotoBackgroundPage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/Foto/background').then(m => ({ default: m.GalleryPhotoBackgroundPage })))
const GalleryVideoBackgroundPage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/video/background').then(m => ({ default: m.GalleryVideoBackgroundPage })))
const LogActivityVideoPage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/video/log').then(m => ({ default: m.LogActivityVideoPage })))
const LogActivityGalleryAlbum = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/Foto/log').then(m => ({ default: m.LogActivityGalleryAlbum })))
const LogActivityGalleryAlbumPhoto = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/Foto/data-album/log').then(m => ({ default: m.LogActivityGalleryAlbumPhoto })))
const DownloadFilePage = lazy(() => import('@/pages/modules/website-utama/public-content/download'))
const CategoryDownloadPage = lazy(() => import('@/pages/modules/website-utama/public-content/download/category').then(m => ({ default: m.CategoryDownloadPage })))
const CategoryDownloadLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/download/category/language').then(m => ({ default: m.CategoryDownloadLanguage })))
const AddDownloadPage = lazy(() => import('@/pages/modules/website-utama/public-content/download/components/addPage.tsx').then(m => ({ default: m.AddDownloadPage })))
const EditDownloadPage = lazy(() => import('@/pages/modules/website-utama/public-content/download/components/editPage.tsx').then(m => ({ default: m.EditDownloadPage })))
const OfficialMusicPage = lazy(() => import('@/pages/modules/website-utama/public-content/musik-resmi').then(m => ({ default: m.OfficialMusicPage })))
const AddOfficialMusicPage = lazy(() => import('@/pages/modules/website-utama/public-content/musik-resmi/components/addPage.tsx').then(m => ({ default: m.AddOfficialMusicPage })))
const EditOfficialMusicPage = lazy(() => import('@/pages/modules/website-utama/public-content/musik-resmi/components/editPage.tsx').then(m => ({ default: m.EditOfficialMusicPage })))
const CertificateStudent = lazy(() => import('@/pages/modules/website-utama/surat-keterangan-mahasiswa').then(m => ({ default: m.CertificateStudent })))
const AcademicRegulation = lazy(() => import('@/pages/modules/website-utama/peraturan-akademik').then(m => ({ default: m.AcademicRegulation })))
const AddPageAcademicRule = lazy(() => import('@/pages/modules/website-utama/peraturan-akademik/components/addPage.tsx').then(m => ({ default: m.AddPageAcademicRule })))
const PageIdentity = lazy(() => import('@/pages/modules/website-utama/Identity').then(m => ({ default: m.PageIdentity })))
const DashboardAdmin = lazy(() => import('@/pages/modules/website-utama/beranda'))
const UpdateIdentityPage = lazy(() => import('@/pages/modules/website-utama/Identity/components/update.tsx').then(m => ({ default: m.UpdateIdentityPage })))
const IdentityBackground = lazy(() => import('@/pages/modules/website-utama/Identity/background').then(m => ({ default: m.IdentityBackground })))
const AcademicRulesBackground = lazy(() => import('@/pages/modules/website-utama/peraturan-akademik/background').then(m => ({ default: m.AcademicRulesBackground })))
const StudentLetterBackground = lazy(() => import('@/pages/modules/website-utama/surat-keterangan-mahasiswa/background').then(m => ({ default: m.StudentLetterBackground })))
const CampusLifePage = lazy(() => import('@/pages/modules/website-utama/campus-life'))
const CalloborationCategoryView = lazy(() => import('@/pages/modules/website-utama/kerjasama/kategori-kerjasama/CalloborationCategoryView'))
const SubCalloborationCategoryView = lazy(() => import('@/pages/modules/website-utama/kerjasama/sub-kategori-kerjasama/SubCalloborationCategoryView'))
const TypeOfCalloborationView = lazy(() => import('@/pages/modules/website-utama/kerjasama/jenis-kerjasama/TypeOfCalloborationView'))
const FieldOfCooperationView = lazy(() => import('@/pages/modules/website-utama/kerjasama/bidang-kerjasama/FieldOfCooperationView'))
const CalloborationListView = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/CalloborationListView'))
const CalloborationCreateView = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/create/CalloborationCreateView'))
const CalloborationCategoryLogView = lazy(() => import('@/pages/modules/website-utama/kerjasama/kategori-kerjasama/log/CalloborationCategoryLogView'))
const SubCalloborationCategoryLogView = lazy(() => import('@/pages/modules/website-utama/kerjasama/sub-kategori-kerjasama/log/SubCalloborationCategoryLogView'))
const TypeOfCalloborationLogView = lazy(() => import('@/pages/modules/website-utama/kerjasama/jenis-kerjasama/log/TypeOfCalloborationLogView'))
const FieldOfCooperationLogView = lazy(() => import('@/pages/modules/website-utama/kerjasama/bidang-kerjasama/log/FieldOfCooperationLogView'))
const CalloborationEditView = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/edit/CalloborationEditView'))
const CalloborationDetailView = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/detail/CalloborationDetailView'))
const CalloborationLogView = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/log/CalloborationLogView'))
const CampusLifeBackground = lazy(() => import('@/pages/modules/website-utama/campus-life/background').then(m => ({ default: m.CampusLifeBackground })))
const ProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/ProgramStudyView'))
const AboutProgramStudiView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/tentang/AboutProgramStudiView'))
const LayoutProgramStudy = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/components/LayoutProgramStudy'))
const ManagementUnitProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/unit-pengelola/ManagementUnitProgramStudyView'))
const VisiMisiProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/visi-misi/VisiMisiProgramStudyView'))
const OrganizationalStructureView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/struktur-organisasi/OrganizationalStructureView'))
const ContactUsProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/hubungi-kami/ContactUsProgramStudyView'))
const StaffProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/staff/StaffProgramStudyView'))
const DosenProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/dosen/DosenProgramStudyView'))
const GalleryProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/gallery/GalleryProgramStudyView'))
const NewsProgramStudyView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/berita/NewsProgramStudyView.tsx'))
const DetailNewsProdiPage = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/berita/detail').then(m => ({ default: m.DetailNewsProdiPage })))
const FacultyView = lazy(() => import('@/pages/modules/website-utama/fakultas/FacultyView'))
const LayoutFaculty = lazy(() => import('@/pages/modules/website-utama/fakultas/detail/components/LayoutFaculty'))
const GalleryDetailPhotoView = lazy(() => import('@/pages/modules/website-utama/program-studi/detail/gallery/detail/GalleryDetailPhotoView'))
const InboxMessagePage = lazy(() => import('@/pages/modules/website-utama/pertayaan/kotak-masuk').then(m => ({ default: m.InboxMessagePage })))
const InboxMessageBackground = lazy(() => import('@/pages/modules/website-utama/pertayaan/kotak-masuk/background').then(m => ({ default: m.InboxMessageBackground })))
const FaqListData = lazy(() => import('@/pages/modules/website-utama/pertayaan/Faq').then(m => ({ default: m.FaqListData })))
const CategoryFAQList = lazy(() => import('@/pages/modules/website-utama/pertayaan/Faq/Category').then(m => ({ default: m.CategoryFAQList })))
const RegistrationPathPage = lazy(() => import('@/pages/modules/website-utama/jalur-pendaftaran').then(m => ({ default: m.RegistrationPathPage })))
const AddPageRegisterPath = lazy(() => import('@/pages/modules/website-utama/jalur-pendaftaran/components/addPage.tsx').then(m => ({ default: m.AddPageRegisterPath })))
const EditPageRegisterPath = lazy(() => import('@/pages/modules/website-utama/jalur-pendaftaran/components/editPage.tsx').then(m => ({ default: m.EditPageRegisterPath })))
const FooterContent = lazy(() => import('@/pages/modules/website-utama/settings-menu/Footer').then(m => ({ default: m.FooterContent })))
const UserProfilePage = lazy(() => import('@/pages/modules/website-utama/user-profile').then(m => ({ default: m.UserProfilePage })))
const ChangePassword = lazy(() => import('@/pages/modules/website-utama/change-password').then(m => ({ default: m.ChangePassword })))
const LogFooterContent = lazy(() => import('@/pages/modules/website-utama/settings-menu/Footer/log').then(m => ({ default: m.LogFooterContent })))
const ChangePrimaryAndFooterColor = lazy(() => import('@/pages/modules/website-utama/settings-menu/color').then(m => ({ default: m.ChangePrimaryAndFooterColor })))
const NewsWithLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/news/language').then(m => ({ default: m.NewsWithLanguage })))
const ImpactInnovationLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/impact-innovation/language').then(m => ({ default: m.ImpactInnovationLanguage })))
const AnnouncementLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/announcement/language').then(m => ({ default: m.AnnouncementLanguage })))
const AgendaLanguagePage = lazy(() => import('@/pages/modules/website-utama/public-content/agenda/language').then(m => ({ default: m.AgendaLanguagePage })))
const StructureOrganizationLanguagePage = lazy(() => import('@/pages/modules/website-utama/public-content/structure-organization/language').then(m => ({ default: m.StructureOrganizationLanguagePage })))
const PlacemanUserLanguagePage = lazy(() => import('@/pages/modules/website-utama/public-content/structure-organization/Placeman-user/language').then(m => ({ default: m.PlacemanUserLanguagePage })))
const FacilitiesLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/facilities/language').then(m => ({ default: m.FacilitiesLanguage })))
const GalleryVideoLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/video/language').then(m => ({ default: m.GalleryVideoLanguage })))
const GalleryAlbumLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/Foto/language').then(m => ({ default: m.GalleryAlbumLanguage })))
const GalleryPhotoLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/gallery/Foto/data-album/language').then(m => ({ default: m.GalleryPhotoLanguage })))
const AchievementLanguagePage = lazy(() => import('@/pages/modules/website-utama/public-content/achievement/language').then(m => ({ default: m.AchievementLanguagePage })))
const DownloadCategoryLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/download/category-language').then(m => ({ default: m.DownloadCategoryLanguage })))
const DownloadFileLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/download/language').then(m => ({ default: m.DownloadFileLanguage })))
const AnthemMusicLanguage = lazy(() => import('@/pages/modules/website-utama/public-content/musik-resmi/language').then(m => ({ default: m.AnthemMusicLanguage })))
const ServiceLanguagePage = lazy(() => import('@/pages/modules/website-utama/services/language').then(m => ({ default: m.ServiceLanguagePage })))
const CategoryFAQLanguagePage = lazy(() => import('@/pages/modules/website-utama/pertayaan/Faq/Category/language').then(m => ({ default: m.CategoryFAQLanguagePage })))
const FAQLanguagePage = lazy(() => import('@/pages/modules/website-utama/pertayaan/Faq/language').then(m => ({ default: m.FAQLanguagePage })))
const SubmissionSKMLanguagePage = lazy(() => import('@/pages/modules/website-utama/surat-keterangan-mahasiswa/pengajuan-language').then(m => ({ default: m.SubmissionSKMLanguagePage })))
const SKMLanguagePage = lazy(() => import('@/pages/modules/website-utama/surat-keterangan-mahasiswa/language').then(m => ({ default: m.SKMLanguagePage })))
const LogActivitySKM = lazy(() => import('@/pages/modules/website-utama/surat-keterangan-mahasiswa/log').then(m => ({ default: m.LogActivitySKM })))
const RegisteredPathLanguagePage = lazy(() => import('@/pages/modules/website-utama/jalur-pendaftaran/language').then(m => ({ default: m.RegisteredPathLanguagePage })))
const AcademicRulesLanguagePage = lazy(() => import('@/pages/modules/website-utama/peraturan-akademik/language').then(m => ({ default: m.AcademicRulesLanguagePage })))
const HeaderMenuLanguagePage = lazy(() => import('@/pages/modules/website-utama/settings-menu/header/language').then(m => ({ default: m.HeaderMenuLanguagePage })))
const FooterLanguagePage = lazy(() => import('@/pages/modules/website-utama/settings-menu/Footer/language').then(m => ({ default: m.FooterLanguagePage })))
const CorporationCategoryLanguagePage = lazy(() => import('@/pages/modules/website-utama/kerjasama/kategori-kerjasama/language').then(m => ({ default: m.CorporationCategoryLanguagePage })))
const CorporationSubCategoryLanguagePage = lazy(() => import('@/pages/modules/website-utama/kerjasama/sub-kategori-kerjasama/language').then(m => ({ default: m.CorporationSubCategoryLanguagePage })))
const TypeCollaborationLanguagePage = lazy(() => import('@/pages/modules/website-utama/kerjasama/jenis-kerjasama/language').then(m => ({ default: m.TypeCollaborationLanguagePage })))
const FieldCollaborationLanguagePage = lazy(() => import('@/pages/modules/website-utama/kerjasama/bidang-kerjasama/language').then(m => ({ default: m.FieldCollaborationLanguagePage })))
const CollaborationLanguagePage = lazy(() => import('@/pages/modules/website-utama/kerjasama/daftar-kerjasama/language').then(m => ({ default: m.CollaborationLanguagePage })))
const StatisticLanguagePage = lazy(() => import('@/pages/modules/website-utama/statistic/language').then(m => ({ default: m.StatisticLanguagePage })))
const YearAcademicLanguagePage = lazy(() => import('@/pages/modules/website-utama/calendar-academic/language').then(m => ({ default: m.YearAcademicLanguagePage })))
const YearAcademicActivityLanguagePage = lazy(() => import('@/pages/modules/website-utama/calendar-academic/detail/language').then(m => ({ default: m.YearAcademicActivityLanguagePage })))
const YearActivityDetailLanguagePage = lazy(() => import('@/pages/modules/website-utama/calendar-academic/detail-activity/language').then(m => ({ default: m.YearActivityDetailLanguagePage })))
const AccreditationLanguagePage = lazy(() => import('@/pages/modules/website-utama/acreditation/language').then(m => ({ default: m.AccreditationLanguagePage })))
const IdentityLanguagePage = lazy(() => import('@/pages/modules/website-utama/Identity/language').then(m => ({ default: m.IdentityLanguagePage })))
const TextIntroduceLanguagePage = lazy(() => import('@/pages/modules/website-utama/campus-life/language/pengantar').then(m => ({ default: m.TextIntroduceLanguagePage })))
const TextFacilitiesLanguagePage = lazy(() => import('@/pages/modules/website-utama/campus-life/language/fasilitas').then(m => ({ default: m.TextFacilitiesLanguagePage })))
const TextUnitActivityLanguagePage = lazy(() => import('@/pages/modules/website-utama/campus-life/language/ukm').then(m => ({ default: m.TextUnitActivityLanguagePage })))
const TextPerformanceLanguagePage = lazy(() => import('@/pages/modules/website-utama/campus-life/language/prestasi').then(m => ({ default: m.TextPerformanceLanguagePage })))
const TextTestimonyLanguagePage = lazy(() => import('@/pages/modules/website-utama/campus-life/language/testimoni').then(m => ({ default: m.TextTestimonyLanguagePage })))
const TextDirectUrlLanguagePage = lazy(() => import('@/pages/modules/website-utama/campus-life/language/directLink').then(m => ({ default: m.TextDirectUrlLanguagePage })))
const TopSliderLanguagePage = lazy(() => import('@/pages/modules/website-utama/public-content/slider/top-slider/language').then(m => ({ default: m.TopSliderLanguagePage })))
const BottomSliderLanguagePage = lazy(() => import('@/pages/modules/website-utama/public-content/slider/bottom-slider/language').then(m => ({ default: m.BottomSliderLanguagePage })))
const HeaderMenuContentLanguagePage = lazy(() => import('@/pages/modules/website-utama/settings-menu/header/content/language').then(m => ({ default: m.HeaderMenuContentLanguagePage })))
const CreateAccreditation = lazy(() => import('@/pages/modules/website-utama/acreditation/create').then(m => ({ default: m.CreateAccreditation })))
const UpdateAccreditation = lazy(() => import('@/pages/modules/website-utama/acreditation/update').then(m => ({ default: m.UpdateAccreditation })))
const TemplateMainWeb = lazy(() => import('@/pages/modules/website-utama/settings-menu/template').then(m => ({ default: m.TemplateMainWeb })))
const UnitInstitutionPage = lazy(() => import('@/pages/modules/website-utama/unit-lembaga'))
const DetailUnitInstitution = lazy(() => import('@/pages/modules/website-utama/unit-lembaga/detail'))
const UKKUKMPage = lazy(() => import('@/pages/modules/website-utama/UKK-UKM'))
const UnitInstitutionBackgroundPage = lazy(() => import('@/pages/modules/website-utama/unit-lembaga/background').then(m => ({ default: m.UnitInstitutionBackgroundPage })))
const DetailUkkUKMPage = lazy(() => import('@/pages/modules/website-utama/UKK-UKM/detail'))
const ThemaChangeColor = lazy(() => import('@/pages/modules/website-utama/settings-menu/template/color').then(m => ({ default: m.ThemaChangeColor })))
const CreatedEmployee = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/created').then(m => ({ default: m.CreatedEmployee })))
const LecturerStaff = lazy(() => import('@/pages/modules/website-utama/lecturer-staff'))
const StatusEmployeePage = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/status-employee'))
const UpdatedEmployee = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/updated').then(m => ({ default: m.UpdatedEmployee })))
const DetailEmployee = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/detail'))
const SetUnitEmployeePage = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/set-unit'))
const SetStatusEmployeePage = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/set-status'))
const GuideListView = lazy(() => import('@/pages/modules/website-utama/panduan/GuideListView'))
const QuotesPage = lazy(() => import('@/pages/modules/website-utama/settings-menu/qoutes').then(m => ({ default: m.QuotesPage })))
const FacultyBackground = lazy(() => import('@/pages/modules/website-utama/fakultas/background').then(m => ({ default: m.FacultyBackground })))
const ProdiBackground = lazy(() => import('@/pages/modules/website-utama/program-studi/background').then(m => ({ default: m.ProdiBackground })))
const PublicationLecturerPage = lazy(() => import('@/pages/modules/website-utama/publication').then(m => ({ default: m.PublicationLecturerPage })))
const StatusActivePage = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/status-active'))
const SetStatusActivePage = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/set-status-active').then(m => ({ default: m.SetStatusActivePage })))
const HistoryStatusPage = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/set-status-active/history-status').then(m => ({ default: m.HistoryStatusPage })))
const EditStatusActiveEmployee = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/set-status-active/edit-status').then(m => ({ default: m.EditStatusActiveEmployee })))
const AddStatusActiveEmployee = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/set-status-active/add-status').then(m => ({ default: m.AddStatusActiveEmployee })))
const ReportData = lazy(() => import('@/pages/modules/website-utama/lecturer-staff/set-status-active/reportData').then(m => ({ default: m.ReportData })))
const UKTCostEducationPage = lazy(() => import('@/pages/modules/website-utama/cost-education/ukt').then(m => ({ default: m.UKTCostEducationPage })))
const LevelUktPage = lazy(() => import('@/pages/modules/website-utama/cost-education/ukt/level-ukt').then(m => ({ default: m.LevelUktPage })))
const EntranceListUktPage = lazy(() => import('@/pages/modules/website-utama/cost-education/ukt/entrance-list').then(m => ({ default: m.EntranceListUktPage })))
const DetailUktByEntrance = lazy(() => import('@/pages/modules/website-utama/cost-education/ukt/detail-ukt').then(m => ({ default: m.DetailUktByEntrance })))
const GetDetailEntranceProdiUktPage = lazy(() => import('@/pages/modules/website-utama/cost-education/ukt/detail-ukt/detail').then(m => ({ default: m.GetDetailEntranceProdiUktPage })))
const EntranceListNonUktPage = lazy(() => import('@/pages/modules/website-utama/cost-education/non-ukt/entrance-list').then(m => ({ default: m.EntranceListNonUktPage })))
const NonUKTCostEducationPage = lazy(() => import('@/pages/modules/website-utama/cost-education/non-ukt').then(m => ({ default: m.NonUKTCostEducationPage })))
const TariffTypePage = lazy(() => import('@/pages/modules/website-utama/cost-education/non-ukt/tariff-type').then(m => ({ default: m.TariffTypePage })))
const DetailCostEducationNonUktPage = lazy(() => import('@/pages/modules/website-utama/cost-education/non-ukt/detail'))
const UKTBackground = lazy(() => import('@/pages/modules/website-utama/cost-education/ukt/background').then(m => ({ default: m.UKTBackground })))
const NONUKTBackground = lazy(() => import('@/pages/modules/website-utama/cost-education/non-ukt/background').then(m => ({ default: m.NONUKTBackground })))
const AcademicResourcePage = lazy(() => import('@/pages/modules/website-utama/services/academic-resource'))
const AcademicResourcesLanguage = lazy(() => import('@/pages/modules/website-utama/services/academic-resource/language').then(m => ({ default: m.AcademicResourcesLanguage })))
const LogActivityAcademicResource = lazy(() => import('@/pages/modules/website-utama/services/academic-resource/log').then(m => ({ default: m.LogActivityAcademicResource })))
const UkkUKMBackgroundPage = lazy(() => import('@/pages/modules/website-utama/UKK-UKM/background').then(m => ({ default: m.UkkUKMBackgroundPage })))

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
    path: 'panduan',
    element: <GuideListView />,
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
            path: 'category',
            children: [
              {
                index: true,
                element: <CategoryDownloadPage />,
              },
              {
                path: 'language/:id',
                element: <CategoryDownloadLanguage />,
              },
            ],
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
                    path: 'language/:idContent',
                    element: <HeaderMenuContentLanguagePage />,
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
      {
        path: 'template',
        children: [
          {
            index: true,
            element: <TemplateMainWeb />,
          },
          {
            path: ':id',
            element: <ThemaChangeColor />,
          },
        ],
      },
      {
        path: 'quotes',
        children: [
          {
            index: true,
            element: <QuotesPage />,
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
      {
        path: 'academic-resource',
        children: [
          {
            index: true,
            element: <AcademicResourcePage />,
          },
          {
            path: 'language/:id',
            element: <AcademicResourcesLanguage />,
          },
          {
            path: 'log/:id',
            element: <LogActivityAcademicResource />,
          },
        ],
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
        path: 'add',
        element: <CreateAccreditation />,
      },
      {
        path: 'edit/:idAcreditation',
        element: <UpdateAccreditation />,
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
    path: 'publication',
    element: <PublicationLecturerPage />,
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
      {
        path: 'background',
        element: <ProdiBackground />,
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
        element: <LayoutFaculty title={'Fakultas'} />,
        children: [
          {
            path: 'tentang',
            element: <AboutProgramStudiView title={'Fakultas'} />,
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
      {
        path: 'background',
        element: <FacultyBackground />,
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
  {
    path: 'unit-lembaga',
    children: [
      {
        index: true,
        element: <UnitInstitutionPage />,
      },
      {
        path: 'detail/:id',
        element: <DetailUnitInstitution />,
      },
      {
        path: 'background',
        element: <UnitInstitutionBackgroundPage />,
      },
    ],
  },
  {
    path: 'ukk-ukm',
    children: [
      {
        index: true,
        element: <UKKUKMPage />,
      },
      {
        path: 'detail/:id',
        element: <DetailUkkUKMPage />,
      },
      {
        path: 'background',
        element: <UkkUKMBackgroundPage />,
      },
    ],
  },
  {
    path: 'staff-lecturer',
    children: [
      {
        path: 'data',
        children: [
          {
            index: true,
            element: <LecturerStaff />,
          },
          {
            path: 'add',
            element: <CreatedEmployee />,
          },
          {
            path: 'edit/:id',
            element: <UpdatedEmployee />,
          },
          {
            path: 'detail/:id',
            element: <DetailEmployee />,
          },
        ],
      },
      {
        path: 'status',
        element: <StatusEmployeePage />,
      },
      {
        path: 'status-active',
        element: <StatusActivePage />,
      },
      {
        path: 'set-status-active',
        children: [
          {
            index: true,
            element: <SetStatusActivePage />,
          },
          {
            path: 'report',
            element: <ReportData />,
          },
          {
            path: 'history/:id',
            children: [
              {
                index: true,
                element: <HistoryStatusPage />,
              },
              {
                path: 'add',
                element: <AddStatusActiveEmployee />,
              },
              {
                path: 'edit/:id_status',
                element: <EditStatusActiveEmployee />,
              },
            ],
          },
        ],
      },
      {
        path: 'set-unit',
        element: <SetUnitEmployeePage />,
      },
      {
        path: 'set-status',
        element: <SetStatusEmployeePage />,
      },
    ],
  },
  {
    path: 'biaya-pendidikan',
    children: [
      {
        path: 'ukt',
        children: [
          {
            index: true,
            element: <UKTCostEducationPage />,
          },
          {
            path: 'level-ukt',
            element: <LevelUktPage />,
          },
          {
            path: 'list-entrance',
            element: <EntranceListUktPage />,
          },
          {
            path: ':id_prodi',
            children: [
              {
                index: true,
                element: <DetailUktByEntrance />,
              },
              {
                path: 'entrance/:id_entrance',
                element: <GetDetailEntranceProdiUktPage />,
              },
            ],
          },
          {
            path: 'background',
            element: <UKTBackground />,
          },
        ],
      },
      {
        path: 'non-ukt',
        children: [
          {
            index: true,
            element: <NonUKTCostEducationPage />,
          },
          {
            path: 'tariff-type',
            element: <TariffTypePage />,
          },
          {
            path: 'list-entrance',
            element: <EntranceListNonUktPage />,
          },
          {
            path: ':id',
            element: <DetailCostEducationNonUktPage />,
          },
          {
            path: 'background',
            element: <NONUKTBackground />,
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
