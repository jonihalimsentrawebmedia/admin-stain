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
