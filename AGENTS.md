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
