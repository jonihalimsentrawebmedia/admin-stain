# Project Memory — admin_web_stain

## What Has Been Done

### 1. Redundant State / Derived State Anti-Pattern Fix — PPID Module (7 files, 13 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Types were kept on `useQuery<T>` (no `any`).

| File | Hooks Fixed |
|---|---|
| `information-public/standart-service/controller/useGetStandartService.tsx` | `useGetStandartService` |
| `information-public/information-regular/controller/useGetInformationRegularDocument.tsx` | `useGetInformationRegularDocument` |
| `public-content/news/hooks/index.tsx` | `UseGetNews`, `UseGetNewsDetail`, `UseGetNewsStatus`, `UseGetLogNews`, `UseGetNewsYear` |
| `reports/access/hooks/index.tsx` | `useGetYearReportAccess`, `useGetReportAccessChart` |
| `reports/survey/controller/useGetReportsSurvey.tsx` | `useGetReportsSurvey` |
| `reports/services/controller/useGetReportsService.tsx` | `useGetReportsService` |
| `admission-application/information-public/hooks/index.tsx` | `useGetAdmissionInformationPublicLog` |

### 1b. Redundant State / Derived State Anti-Pattern Fix — Website Fakultas Module (4 files, 8 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`).

| File | Hooks Fixed |
|---|---|
| `website-fakultas/about-faculty/hooks/index.tsx` | `UseGetFacultyAbout`, `UseGetVisionMission`, `UseGetFacultyOrganization`, `UseGetContactUs` |
| `website-fakultas/about-faculty/lecturer/hooks/index.tsx` | `UseGetLecturerFaculty` |
| `website-fakultas/about-faculty/staff/hooks/index.tsx` | `UseGetStaffFaculty` |
| `website-fakultas/about-faculty/unit-pengelola/hooks/index.tsx` | `UseGetFacultyUnit` |

### 2. Redundant State Check — Pulsikom Module (27 hooks)

All 27 hooks checked. **No anti-pattern found** — Pulsikom hooks already follow clean patterns.

### 3. TypeScript Deploy Fix — Case Sensitivity

Fixed import case mismatch in `src/pages/modules/Pulsikom/about/chief-officer/officially/index.tsx`:
- **Before**: `import { ButtonAddOfficially } from './component/buttonadd.tsx'`
- **After**: `import { ButtonAddOfficially } from './component/buttonAdd.tsx'`

File on git is `buttonAdd.tsx` (camelCase). Windows ignores case, but Linux CI/CD does not.

### 4. Skill Created — fix-derived-state-anti-pattern

Created `.opencode/skills/fix-derived-state-anti-pattern/SKILL.md` to automate detection and fixing of Redundant State / Derived State Anti-Pattern in React hooks.

### 5. OpenCode Config

Created `opencode.json` with:
- `build` agent → `deepseek/deepseek-chat`
- `plan` agent → `opencode/mimo-v2.5-free`
- Auto compaction enabled (tail 15 turns)

### 6. Redundant State / Derived State Anti-Pattern Fix — Website Fakultas Public Content & Refarence (5 files, 19 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`).

| File | Hooks Fixed |
|---|---|
| `website-fakultas/public-content/agenda/hooks/index.tsx` | `UseGetAgendaFaculty`, `UseGetAgendaFacultyDetail`, `UseGetAgendaFacultyStatus`, `UseGetLogAgendaFaculty`, `UseGetAgendaYear` |
| `website-fakultas/public-content/announcement/hooks/index.tsx` | `UseGetFacultyAnnouncement`, `UseGetFacultyAnnouncementDetail`, `UseGetFacultyAnnouncementStatus`, `UseGetLogAnnouncementFaculty`, `UseGetAnnouncementYear` |
| `website-fakultas/public-content/Download/hooks/index.tsx` | `UseGetCategoryDownloadFaculty`, `UseGetDownloadFaculty`, `UseGetDownloadFacultyDetail` |
| `website-fakultas/public-content/news/hooks/index.tsx` | `UseGetFacultyNews`, `UseGetFacultyNewsDetail`, `UseGetFacultyNewsStatus`, `UseGetLogNewsFaculty`, `UseGetNewsYear` |
| `website-fakultas/refarence/prodi.tsx` | `UseGetProdiFaculty` |

### 6. Redundant State / Derived State Anti-Pattern Fix — Website Fakultas Research Module (6 files, 8 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`).

| File | Hooks Fixed |
|---|---|
| `website-fakultas/research/collaboration/hooks/index.tsx` | `UseGetDetailCollaboration` |
| `website-fakultas/research/collaboration/mitra/hooks/index.tsx` | `UseGetPartnerMitra` |
| `website-fakultas/research/collaboration/type/hooks/index.tsx` | `UseGetTypeCollaboration` |
| `website-fakultas/research/research-group/group-skill/hooks/index.tsx` | `UseGetListGroupSkills`, `UseGetDetailGroupSkills` |
| `website-fakultas/research/research-group/hooks/index.tsx` | `UseGetDetailGroupSKill` |
| `website-fakultas/research/study-research/hooks/index.tsx` | `UseGetDetailStudyResearch` |

### 7. Redundant State / Derived State Anti-Pattern Fix — Website Fakultas Dashboard, Data, Facilities, Gallery, PMB (7 files, 10 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`). Converted `UseGetTotalVisitor` status to `useMemo`.

| File | Hooks Fixed |
|---|---|
| `website-fakultas/dashboard/hooks/index.tsx` | `UseGetTotalVisitor` (useState→useMemo for status), `UseGetApprovedList`, `UseGetTrentVisitor` (added type, direct return) |
| `website-fakultas/data-fakultas/hooks/index.tsx` | `UseGetDetailDataCarrierCenter` |
| `website-fakultas/facilities/hooks/index.tsx` | `UseGetFacilitiesList`, `UseGetDetailFacilities` (removed unused zod `meta` import) |
| `website-fakultas/gallery/album/hooks/index.tsx` | `UseGetGalleryAlbum`, `UseGetGalleryAlbumDetail` |
| `website-fakultas/gallery/photo/hooks/index.tsx` | `UseGetGalleryPhoto` |
| `website-fakultas/gallery/video/hooks/index.tsx` | `UseGetGalleryVideo` |
| `website-fakultas/pmb/hooks/index.tsx` | `UseGetDetailPmb` |

### 8. Redundant State / Derived State Anti-Pattern Fix — Website Fakultas Academic (8 files, 16 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Removed unused `useState`/`useEffect` imports. TypeScript check passes cleanly.

| File | Hooks Fixed |
|---|---|
| `website-fakultas/academic/curriculum/hooks/index.tsx` | `UseGetCurriculumPerProdi` (list+meta), `UseGetCurriculumDetail` |
| `website-fakultas/academic/curriculum/subject/hooks/index.tsx` | `UseGetSubjectDetail` |
| `website-fakultas/academic/international-mobility/hooks/index.tsx` | `UseGetDetailMobilityFaculty` |
| `website-fakultas/academic/international-mobility/story/hooks/index.tsx` | `UseGetStoryInternationalMobility` (list+meta), `UseGetStoryDetailInternationalMobility` |
| `website-fakultas/academic/ppsm/hooks/index.tsx` | `UseGetDetailPPSM` |
| `website-fakultas/academic/ppsm/story/hooks/index.tsx` | `UseGetStoryPPSM` (list+meta), `UseGetStoryPPSMDetail` |
| `website-fakultas/academic/program-studi/detail/gallery/hooks/index.tsx` | `UseGetGalleryAlbum`, `UseGetGalleryPhoto`, `UseGetGalleryVideo` (all list+meta) |
| `website-fakultas/academic/program-studi/detail/hooks/index.tsx` | `UseGetProdiAbout`, `UseGetProdiVisionMission`, `UseGetProdiOrganization`, `UseGetProdiContactUs` |

### 9. Redundant State / Derived State Anti-Pattern Fix — Pusat Karir Module (28 files, 56 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`). Converted `UseGetTotalVisitor` status to `useMemo`, `UseGetTrentVisitor` to direct return with interface.

| File | Hooks Fixed |
|---|---|
| `tracer-study/hooks/index.tsx` | `UseGetTracerStudy` |
| `survey/hooks/index.tsx` | `UseGetUUID`, `UseGetSurvey`, `UseGetDetailSurvey`, `UseGetSurveyResult` |
| `settings/warna/hooks/index.tsx` | `UseGetColorAdminCarrier`, `UseGetAdminThemeCarrier` |
| `settings/template-web/hooks/index.tsx` | `UseGetTemplateUnit`, `UseGetTemplateDetail` |
| `dashboard/hooks/index.tsx` | `UseGetTotalVisitor` (useState+useEffect→useMemo), `UseGetApprovedList`, `UseGetTrentVisitor` (added interface, direct return) |
| `management-user/user-verification/partnership/hooks/index.tsx` | `UseGetVerificationPartnership`, `UseGetDetailVerificationPartnership` |
| `about/vision-mission/hooks/index.tsx` | `UseGetVisionMissionCarrier` |
| `about/profile/hooks/index.tsx` | `UseGetAboutProfileCarrier` |
| `about/structure/hooks/index.tsx` | `UseGetStructureOrganization` |
| `about/greeting-leader/hooks/index.tsx` | `UseGetGreetingLeader` |
| `management-user/user-verification/job-seeker/hooks/index.tsx` | `UseGetVerificationJobSeeker`, `UseGetDetailVerificationJobSeeker` |
| `service/portal-cv/hooks/index.tsx` | `UseGetUrlPortalCV` |
| `data-unit/hooks/index.tsx` | `UseGetDetailDataCarrierCenter` |
| `management-user/list-user/Partnership/hooks/index.tsx` | `UseGetDetailStatusForm`, `UseGetPartnership`, `UseGetPartnershipDetail`, `UseGetCompanyInformation`, `UseGetCompanyContact`, `UseGetCompanyBranding`, `UseGetCompanyLegality`, `UseGetCompanyMediaSocial`, `UseGetStatusStep` |
| `management-user/procedure/partnership/hooks/index.tsx` | `UseGetProcedurePartnership` |
| `management-user/procedure/job-seeker/hooks/index.tsx` | `UseGetProcedureJobseeker` |
| `service/main/hooks/index.tsx` | `UseGetMainService` |
| `service/carrier-consultation/hooks/index.tsx` | `UseGetConsultationCarrier` |
| `management-user/list-user/jobs-seekers/hooks/index.tsx` | `UseGetJobsSeekers`, `UseGetDetailJobsSeekers` |
| `service/Footer/hooks/index.tsx` | `UseGetFooterService` |
| `public-content/news/hooks/index.tsx` | `UseGetCarrierNews`, `UseGetCarrierNewsDetail`, `UseGetCarrierNewsStatus`, `UseGetLogNewsCarrier`, `UseGetNewsYear` |
| `reference/specialization/hooks/index.tsx` | `UseGetSpecialization`, `USeGetDetailSpecialization` |
| `reference/specialization/sub-specialization/hooks/index.tsx` | `UseGetSubSpecialization` |
| `reference/industry-category/hooks/index.tsx` | `UseGetIndustryCategory` |
| `reference/company-size/hooks/index.tsx` | `UseGetCompanySize`, `USeGetDetailCompanySize` |
| `service/job-vacancy/Applicant-user/hooks/index.tsx` | `UseGetApplicant` |
| `public-content/article/hooks/index.tsx` | `UseGetCarrierArticle`, `UseGetCarrierArticleDetail`, `UseGetCarrierArticleStatus`, `UseGetLogArticleCarrier` |
| `public-content/agenda/hooks/index.tsx` | `UseGetAgendaCarrier`, `UseGetAgendaCarrierDetail`, `UseGetAgendaCarrierStatus`, `UseGetLogAgendaCarrier`, `UseGetAgendaYear` |
| `public-content/Download/hooks/index.tsx` | `UseGetCategoryDownloadCarrier`, `UseGetDownloadCarrier`, `UseGetDownloadCarrierDetail` |
| `service/internship-vacancy/hooks/index.tsx` | `UseGetListInternshipVacancy`, `UseGetDetailInternshipVacancy` |

### 10. Redundant State / Derived State Anti-Pattern Fix — PMB Module (10 files, 19 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`). Converted `UseGetTotalVisitor` status to `useMemo`, `UseGetTrentVisitor` to interface + direct return.

| File | Hooks Fixed |
|---|---|
| `settings/template-web/hooks/index.tsx` | `UseGetTemplatePMB`, `UseGetTemplateDetail` |
| `settings/landing/hooks/index.tsx` | `UseGetUnitLandingPage` |
| `settings/color/hooks/index.tsx` | `UseGetColorAdminPMB`, `UseGetAdminThemePMB` |
| `session/hooks/index.tsx` | `UseGetSessionPMB` |
| `public-content/announcement/hooks/index.tsx` | `UseGetAnnouncement`, `UseGetAnnouncementDetail`, `UseGetAnnouncementStatus`, `UseGetLogAnnouncement`, `UseGetAnnouncementYear` |
| `FAQ/hooks/index.tsx` | `UseGetListFAQUnit` |
| `FAQ/category/hooks/index.tsx` | `UseGetFaqCategoryPMB` |
| `entrance/hooks/index.tsx` | `UseGetEntrance`, `UseGetEntranceDetail` |
| `data-pmb/hooks/index.tsx` | `UseGetDetailDataPMB` |
| `dashboard/hooks/index.tsx` | `UseGetTotalVisitor` (useState+useEffect→useMemo), `UseGetApprovedList`, `UseGetTrentVisitor` (added interface, direct return) |

### 11. Redundant State / Derived State Anti-Pattern Fix — LPPM Module (28 files, 39 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`). List hooks return `data?.data ?? []` and `data?.meta`. Detail/single hooks return `data` directly. `UseGetTotalVisitor` status → `useMemo`, `UseGetTrentVisitor` → interface + direct return.

| File | Hooks Fixed |
|---|---|
| `settings/warna/hooks/index.tsx` | `UseGetColorAdmin`, `UseGetAdminThemeUUID` |
| `settings/template/hooks/index.tsx` | `UseGetTemplateDetail` |
| `settings/template/controller/useGetTemplateLPPM.tsx` | `useGetTemplateLPPM` |
| `settings/landing-page/controller/useGetLandingPage.tsx` | `useGetLandingPage` |
| `services/hooks/index.tsx` | `UseGetServices` |
| `hooks/index.tsx` | `UseGetSessionLPPM` |
| `data-lppm/hooks/index.tsx` | `UseGetDetailDataLPPM` |
| `about/vision-mission/hooks/index.tsx` | `UseGetProfileVisionMission` |
| `about/structure/hooks/index.tsx` | `UseGetStructureOrganization` |
| `about/staff/hooks/index.tsx` | `UseGetStaff`, `UseGetStaffDetail` |
| `about/staff/member/hooks/index.tsx` | `UseGetMemberStaff`, `UseGetMemberDetail` |
| `about/secretary/hooks/index.tsx` | `UseGetSecretary` |
| `about/profile/hooks/index.tsx` | `UseGetAboutProfile` |
| `about/leader/hooks/index.tsx` | `UseGetProfileLeader` |
| `public-content/news/hooks/index.tsx` | `UseGetLPPMNews`, `UseGetLppmNewsDetail`, `UseGetLppmNewsStatus`, `UseGetLogNewsLppm`, `UseGetNewsYear` |
| `public-content/Download/hooks/index.tsx` | `UseGetCategoryDownloadLppm`, `UseGetDownloadLppm`, `UseGetDownloadLppmDetail` |
| `public-content/article/hooks/index.tsx` | `UseGetArticleLppm`, `UseGetArticleLppmDetail`, `UseGetArticleLppmStatus`, `UseGetLogArticleLppm` |
| `public-content/announcement/hooks/index.tsx` | `UseGetLppmAnnouncement`, `UseGetLppmAnnouncementDetail`, `UseGetLppmAnnouncementStatus`, `UseGetLogAnnouncementLppm`, `UseGetAnnouncementYear` |
| `public-content/agenda/hooks/index.tsx` | `UseGetAgendaLppm`, `UseGetAgendaLppmDetail`, `UseGetAgendaLppmStatus`, `UseGetLogAgendaLppm`, `UseGetAgendaYear` |
| `dashboard/hooks/index.tsx` | `UseGetTotalVisitor` (useState+useEffect→useMemo), `UseGetApprovedList`, `UseGetTrentVisitor` (added interface, direct return) |
| `components/notification/hooks/index.tsx` | `UseGetNotificationLPPM` |
| `PPID/hooks/index.tsx` | `UseGetInformationPPID` |
| `PPID/information/hooks/index.tsx` | `UseGetInformationTree` |
| `research/study-center/operational-standard/hooks/index.tsx` | `UseGetDocumentStandardOperational` |
| `research/schema/internal/hooks/index.tsx` | `UseGetSchemaInternalResearch` |
| `research/schema/internal/activity/hooks/index.tsx` | `UseGetActivityProgram`, `UseGetActivityProgramDetail` |
| `research/schema/doctoral/hooks/index.tsx` | `UseGetSchemaDoctoralResearch` |
| `research/plan/hooks/index.tsx` | `UseGetResearchPlan`, `UseGetResearchPlanDetail` |
| `research/plan/document/hooks/index.tsx` | `UseGetPlanResearchDocument` |
| `research/main/hooks/index.tsx` | `UseGetMainResearch` |
| `research/guide/hooks/index.tsx` | `UseGetGuideCategory`, `UseGetGuideCategoryDetail` |
| `research/guide/document/hooks/index.tsx` | `UseGetDocumentGuideCategory` |
| `devotion/stain-hub/hooks/index.tsx` | `UseGetMainDevotion` |
| `devotion/schema/other/hooks/index.tsx` | `UseGetOtherFunding`, `UseGetDetailOtherFunding` |
| `devotion/schema/internal/hooks/index.tsx` | `UseGetSchemaDevotion` |
| `devotion/schema/internal/activity-program/hooks/index.tsx` | `UseGetActivityProgram`, `UseGetActivityProgramDetail` |
| `devotion/schema/drtpm/hooks/index.tsx` | `UseGetListDRTPM`, `UseGetDetailDRTPM` |
| `devotion/schema/brin/hooks/index.tsx` | `UseGetListBRIN`, `UseGetDetailBRIN` |
| `devotion/main/hooks/index.tsx` | `UseGetMainDevotion` |
| `publication-hki/journal/list/hooks/index.tsx` | `UseGetListJournal` |
| `publication-hki/hki/registration/hooks/index.tsx` | `UseGetBookPublisher` |
| `publication-hki/hki/description/hooks/index.tsx` | `UseGetBookPublisher` |
| `publication-hki/book/hooks/index.tsx` | `UseGetUserManagementContext`, `UseGetDetailUserManagement` |
| `publication-hki/book/publisher/hooks/index.tsx` | `UseGetBookPublisher` |
| `publication-hki/book/media/hooks/index.tsx` | `UseGetBookPublisher` |
| `publication-hki/book/book-center/hooks/index.tsx` | `UseGetPublicationCenter` |

### 12. Redundant State / Derived State Anti-Pattern Fix — Website Unit Module (38 files, 69 hooks)

Removed `useState` + `useEffect` that merely copied `useQuery` data into local state. Added type parameters to `useQuery<T>` (no `any`). `UseGetTotalVisitorUnit` status → `useMemo`. `UseGetTrentVisitorUnit` → interface + direct return. Fixed `interface props` → `interface Props` (PascalCase). Fixed `interface colorPrimary` → `IColorPrimary`. Fixed `interface notification` → `INotification`. Fixed `metta` typo → `meta`. Removed dead `totalVisitor` state. Removed unused `Params` dead code in template-web. Added proper log interfaces (`ILogNews`, `ILogAnnouncement`, `ILogAgenda`, `ILogFacilities`) replacing `any[]`. TS check clean (exit code 0).

| File | Hooks Fixed |
|---|---|
| `hooks/index.tsx` | `UseGetSessionUnit` |
| `dashboard/hooks/index.tsx` | `UseGetTotalVisitorUnit` (useState+useEffect→useMemo), `UseGetApprovedListUnit`, `UseGetTrentVisitorUnit` (added interface, direct return) |
| `settings/template-web/hooks/index.tsx` | `UseGetTemplateUnit`, `UseGetTemplateDetail` |
| `settings/landing-page/hooks/index.tsx` | `UseGetUnitLandingPage` |
| `settings/color/hooks/index.tsx` | `UseGetUnitPrimary` |
| `settings/background/hooks/index.tsx` | `UseGetUnitBackground` |
| `profile/hooks/index.tsx` | `UseGetProfileUnit` |
| `profile/about/hooks/index.tsx` | `UseGetAboutUnit` |
| `profile/vission/hooks/index.tsx` | `UseGetVisionMissionUnit` |
| `profile/task-purpose/hooks/index.tsx` | `UseGetTaskPurpose` |
| `profile/our-team/hooks/index.tsx` | `UseGetDivisionUnit`, `UseGetDivisionDetail` |
| `profile/our-team/division-team/hooks/index.tsx` | `UseGetDivisionTeam` |
| `profile/collaboration/hooks/index.tsx` | `UseGetUnitCollaboration`, `UseGetUnitCollaborationDetail`, `UseGetAreaCollaboration`, `UseGetTypeCollaboration`, `UseGetCategoryCollaboration`, `UseGetSubCategoryCollaboration` |
| `profile/organization-structure/hooks/index.tsx` | `UseGetOrganizationStructure` |
| `profile/history/hooks/index.tsx` | `UseGetHistoryUnit` |
| `profile/achievement/hooks/index.tsx` | `UseGetCategoryAchievement`, `UseGetAchievementDetail` |
| `profile/achievement/reward/hooks/index.tsx` | `UseGetReward` |
| `public-content/news/hooks/index.tsx` | `UseGetUnitNews`, `UseGetUnitNewsDetail`, `UseGetUnitNewsStatus`, `UseGetLogNewsUnit`, `UseGetNewsYear` |
| `public-content/announcement/hooks/index.tsx` | `UseGetUnitAnnouncement`, `UseGetUnitAnnouncementDetail`, `UseGetUnitAnnouncementStatus`, `UseGetLogAnnouncementUnit`, `UseGetAnnouncementYear` |
| `public-content/agenda/hooks/index.tsx` | `UseGetAgendaUnit`, `UseGetAgendaUnitDetail`, `UseGetAgendaUnitStatus`, `UseGetLogAgendaUnit`, `UseGetAgendaYear` |
| `public-content/Download/hooks/index.tsx` | `UseGetCategoryDownloadUnit`, `UseGetDownloadUnit`, `UseGetDownloadUnitDetail` |
| `public-content/Facilities/hooks/index.tsx` | `UseGetFacilitiesUnit`, `UseGetFacilitiesUnitDetail`, `UseGetFacilitiesUnitStatus`, `UseGetLogFacilitiesUnit` |
| `collection/hooks/index.tsx` | `UseGetUnitCollection`, `UseGetUnitCollectionDetail` |
| `collection/listCollection/hooks/index.tsx` | `UseGetCollectionCategory` |
| `components/layout/notification/hooks/index.tsx` | `UseGetNotificationUnit` |
| `data-unit/hooks/index.tsx` | `UseGetDetailDataUnit` |
| `floor-plan/hooks/index.tsx` | `UseGetFloorPlan` |
| `gallery/album/hooks/index.tsx` | `UseGetGalleryAlbumUnit`, `UseGetGalleryAlbumUnitById`, `UseGetGalleryAlbumUnitLog` |
| `gallery/photo/hooks/index.tsx` | `UseGetPhotoAlbumUnit` |
| `gallery/video/hooks/index.tsx` | `UseGetGalleryVideoUnit` |
| `question/inbox/hooks/index.tsx` | `UseGetInboxUnit` |
| `question/FAQ/hooks/index.tsx` | `UseGetListFAQUnit` |
| `question/FAQ/category/hooks/index.tsx` | `UseGetFaqCategoryUnit` |
| `select-unit/hook/index.tsx` | `UseGetUnitList` |
| `services/category/hooks/index.tsx` | `UseGetListServices`, `UseGetDetailServices` |
| `services/header-footer/hooks/index.tsx` | `UseGetHeaderFooterService` |
| `services/list/hooks/index.tsx` | `UseGetListService` |
| `services/main/hooks/index.tsx` | `UseGetMainListService` |
| `services/operational-hour/hooks/index.tsx` | `UseGetOperationalHour` |
