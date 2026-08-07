---
name: create-module-sidebar-nav
description: Use when creating or fixing a module sidebar (side nav) in this project — wiring menu data from the API (UseGetMenus) into the expandable/collapsible tree sidebar, matching the open/close + active behavior used by all other modules (PMB, E-Office, website-utama, settings, etc.).
---

# Module Sidebar Navigation (Side Nav) Pattern

Use this skill when building or repairing the sidebar navigation of a module layout. Every module in this project must follow the SAME open/close + active behavior:

- Menu data comes from the API via the `UseGetMenus` hook.
- Children are **closed by default**; a group opens only when its menu/path **matches the current URL** (auto-open for the active chain), or when the user clicks the parent to toggle.
- Clicking a parent toggles it and closes sibling groups under the same parent (accordion).

## 1. Menu Data Hook (`UseGetMenus`)

Place a hook like this under `.../layout/hooks/getMenu.tsx`:

```tsx
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IMenuItem {
  id_menu: string
  id_module: string
  parent_id: string
  label: string
  link: string
  icon?: string
  urutan: number
  is_active: boolean
  children?: IMenuItem[]
}

export const UseGetMenus = (idModules: string) => {
  const { data, isLoading, isFetching } = useQuery<IMenuItem[]>({
    queryKey: ['menu', idModules],
    enabled: !!idModules,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pengaturan/menu/${idModules}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { menu: data, loading }
}
```

- `idModules` comes from the module stored in localStorage: `JSON.parse(window.localStorage.getItem('module') || '{}').id_module`.

## 2. Core Sidebar Behavior (identical across all modules)

State + logic skeleton every sidebar must have:

```tsx
const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

// MUST be the same function used when building defaultOpenGroups AND during render
const makeGroupId = (parentId: string, index: number, name: string) =>
  `${parentId}-${index}-${name}`

const isActivePath = (path?: string) => {
  if (!path) return false
  return pathname === path || pathname.startsWith(path + '/')
}

// mark every ancestor group of the active leaf as open
const collectOpenGroups = (item, parentGroupId, index, map) => {
  const id = makeGroupId(parentGroupId, index, item.name)
  if (isActiveTree(item, pathname)) map[id] = true
  if (item.child) item.child.forEach((child, idx) => collectOpenGroups(child, id, idx, map))
}

const defaultOpenGroups = useMemo(() => {
  const map = {}
  MenuList.forEach((row, i) => collectOpenGroups(row, 'root', i, map))
  return map
}, [pathname, MenuList])

const groups = { ...defaultOpenGroups, ...openGroups }

// children closed by default: reset manual toggles on every navigation
useEffect(() => {
  setOpenGroups({})
}, [pathname])

// close all groups when the sidebar collapses
useEffect(() => {
  if (collapsed) setOpenGroups({})
}, [collapsed])

const toggleGroup = (groupId: string) => {
  setOpenGroups((prev) => {
    const next = { ...prev }
    const parentId = groupId.split('-').slice(0, -2).join('-')
    Object.keys(next).forEach((key) => {
      if (key.startsWith(parentId + '-') && key !== groupId) next[key] = false
    })
    next[groupId] = !prev[groupId]
    return next
  })
}

// recursive active check (exact match or prefix)
function isActiveTree(item, pathname): boolean {
  if (item.path && (pathname === item.path || pathname.startsWith(item.path + '/'))) return true
  if (item.child) return item.child.some((child) => isActiveTree(child, pathname))
  return false
}
```

Render with a recursive `TreeNodeWrapper`/`TreeNode` pair (see `src/pages/modules/website-utama/component/layout/sidebar.tsx` or `src/pages/modules/E-Office/component/layout/TreeNode.tsx`). Keep styling per-module (settings = green theme, website-utama = primary theme, etc.).

## 3. Mapping API Data → MenuItem (CRITICAL)

Map `IMenuItem` → internal `{ name, icon, path, child }`:

```tsx
type MenuItem = {
  name: string
  icon?: React.ReactNode
  path?: string
  child?: MenuItem[]
}

const mapMenu = (items: IMenuItem[]): MenuItem[] =>
  items.map((item) => ({
    name: item.label,
    icon: item.icon ? ICON_MAP[item.icon] : undefined, // icon is a STRING from API
    path: normalizePath(item.link),
    child: item.children?.length ? mapMenu(item.children) : undefined,
  }))
```

- `label` → `name`, `link` → `path`, `children` → `child`.
- `icon` from the API is a string (e.g. `"CiGrid42"`, `"MdDashboard"`). Map it through an `ICON_MAP: Record<string, React.ReactNode>`.

### Base URL per module

- **Settings module**: use the link as-is from the API (full path already, e.g. `/modules/settings/dashboard`). Do NOT prefix.
- **Other modules** (e.g. website-utama): prefix with the module base URL:

```tsx
const baseDomain = '/modules/website-utama'
const normalizePath = (link?: string) => {
  if (!link || link === '/' || link === baseDomain) return undefined
  return link.startsWith(baseDomain) ? link : `${baseDomain}${link}`
}
```

### ⚠️ PITFALL #1 — group parents without a link become a universal prefix

If a parent/group item has no `link` (empty string, `"/"`, or just a grouping node), doing
`baseDomain + item.link` produces `"/modules/website-utama"` or `"/modules/website-utama/"`.
That string is a **prefix of EVERY page under the module**, so `isActiveTree` returns true on
every route → the whole menu opens everywhere (e.g. "Konten Publik" opened when visiting Profile).

**Fix:** only assign `path` when the item truly has a valid, non-root link (see `normalizePath` above).
Groups with no real link get `path: undefined`; `isActiveTree` will then only match via descendants.

### ⚠️ PITFALL #2 — makeGroupId must be identical everywhere

The same `makeGroupId` must be used when building `defaultOpenGroups` AND when rendering the tree,
otherwise the expand-state keys won't line up and the active group won't auto-open.

### ⚠️ PITFALL #3 — don't make active "sticky"

Do NOT keep user-toggled groups open across navigation. Reset `openGroups` on `pathname` change so
the sidebar returns to the default state (all closed except the URL-matching chain).

## 4. Verification

1. `npx tsc --noEmit` — must pass with no errors in the edited files.
2. Check manually: navigate to a leaf route → only its ancestor chain opens; navigate to a top-level
   leaf (like Profile) → NO group with children opens.
3. Confirm parent groups without a link never open on unrelated pages.
4. Confirm clicking a parent opens it and closes sibling parents (accordion).
