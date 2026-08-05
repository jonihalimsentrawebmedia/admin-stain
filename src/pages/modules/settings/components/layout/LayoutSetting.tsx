import { useEffect, useMemo, useState } from 'react'
import { ChevronRight, Menu } from 'lucide-react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { IconSettings } from '../icon'
import { UseGetUserProfile } from '@/pages/modules/settings/components/layout/hooks/getProfile.tsx'
import { UseGetMenus } from '@/pages/modules/settings/components/layout/hooks/getMenu.tsx'
import ButtonProfile from '../button/ButtonProfile'
import { IconModules } from '@/pages/modules/website-utama/component/layout/header'
import type { IModulesList } from '@/pages/modules/interface'
import { cn } from '@/lib/utils.ts'
import { ICON_MAP } from '@/pages/modules/settings/Side-Menu/data/icons'

type SideMenuItem = {
  name: string
  icon?: React.ReactNode
  path?: string
  child?: SideMenuItem[]
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarSmall, setSideBarSmall] = useState(false)
  const location = useLocation()
  const { pathname } = location

  const { profileUser } = UseGetUserProfile()
  const module: IModulesList = JSON.parse(window.localStorage.getItem('module') || '{}')

  const { menu } = UseGetMenus(module.id_module)

  const MenuList = useMemo(
    () =>
      (menu ?? []).map((item) => ({
        name: item.label,
        icon: item.icon ? ICON_MAP[item.icon] : undefined,
        path: item.link,
        child: (item.children ?? []).map((child) => ({
          name: child.label,
          icon: child.icon ? ICON_MAP[child.icon] : undefined,
          path: child.link,
          child: (child.children ?? []).map((subChild) => ({
            name: subChild.label,
            icon: subChild.icon ? ICON_MAP[subChild.icon] : undefined,
            path: subChild.link,
          })),
        })),
      })),
    [menu]
  )

  const makeGroupId = (parentId: string, index: number, name: string) =>
    `${parentId}-${index}-${name}`

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const isActivePath = (path?: string) => {
    if (!path) return false
    return pathname === path || pathname.startsWith(path + '/')
  }

  const collectOpenGroups = (
    item: SideMenuItem,
    parentGroupId: string,
    index: number,
    map: Record<string, boolean>
  ) => {
    const id = makeGroupId(parentGroupId, index, item.name)
    if (isActiveTree(item, pathname)) {
      map[id] = true
    }
    if (item.child) {
      item.child.forEach((child, idx) => collectOpenGroups(child, id, idx, map))
    }
  }

  const defaultOpenGroups = useMemo(() => {
    const map: Record<string, boolean> = {}
    MenuList.forEach((row, i) => {
      collectOpenGroups(row, 'root', i, map)
    })
    return map
  }, [pathname, MenuList])

  const groups = { ...defaultOpenGroups, ...openGroups }

  useEffect(() => {
    if (sidebarSmall) setOpenGroups({})
  }, [sidebarSmall])

  useEffect(() => {
    const activeHasParentGroup = MenuList.some((item) => {
      if (!item.child || item.child.length === 0) return false
      return isActiveTree(item, pathname)
    })

    if (!activeHasParentGroup) {
      setOpenGroups({})
    }
  }, [pathname])

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = { ...prev }

      const parentId = groupId.split('-').slice(0, -2).join('-')

      Object.keys(next).forEach((key) => {
        if (key.startsWith(parentId + '-') && key !== groupId) {
          next[key] = false
        }
      })

      next[groupId] = !prev[groupId]

      return next
    })
  }

  const handleNavigate = () => setSidebarOpen(false)

  return (
    <div className="flex flex-col h-dvh bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-green-50 px-3 sm:px-6 py-2 sm:py-3 border-b border-green-100 shrink-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            className="text-green-700 sm:hidden shrink-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="size-6" />
          </button>
          <IconSettings />
          <div className="min-w-0">
            <h1 className="text-[10px] sm:text-sm text-green-700 font-medium truncate">
              Manajemen Pengelolaan Website
            </h1>
            <h2 className="text-sm sm:text-lg font-semibold text-green-900 truncate">Pengaturan</h2>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link to={'/modules'}>
            <IconModules />
          </Link>
          <ButtonProfile profileUser={profileUser} module={module} />
          <button
            className="text-green-700 hidden sm:block shrink-0"
            onClick={() => setSideBarSmall(!sidebarSmall)}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Overlay untuk mobile — geser sidebar agar tidak nutup header */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            'fixed sm:static z-40 top-0 left-0 h-full overflow-y-auto sm:h-auto border-r border-green-700 bg-green-700 text-white flex flex-col justify-between',
            'transform transition-all duration-300 ease-in-out',
            sidebarSmall ? 'w-16' : 'w-60',
            sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
          )}
        >
          <div className="space-y-1 overflow-y-auto pb-4 sm:pb-6 pt-16 sm:pt-4 px-2 sm:px-3">
            {MenuList.map((row, idx) => {
              const groupId = makeGroupId('root', idx, row.name)
              const isGroupOpen = groups[groupId] ?? false
              const isRowActive = isActiveTree(row, pathname)
              const labelVisible = !sidebarSmall

              if (row.child && row.child.length > 0) {
                return (
                  <div
                    key={groupId}
                    className={cn(
                      'text-sm',
                      (isRowActive || isGroupOpen) && 'bg-[#F5FFFA] text-primary rounded-md'
                    )}
                  >
                    <button
                      onClick={() => !sidebarSmall && toggleGroup(groupId)}
                      className={cn(
                        'flex w-full items-center gap-2 px-2 py-2 transition-colors',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                        isRowActive || isGroupOpen ? 'text-primary font-medium' : 'text-green-50',
                        sidebarSmall ? 'justify-center' : 'justify-between'
                      )}
                    >
                      <span
                        className={cn(
                          'flex items-center gap-2 text-xs sm:text-sm',
                          sidebarSmall && 'justify-center'
                        )}
                      >
                        {row.icon && <span className="shrink-0">{row.icon}</span>}
                        {labelVisible && <span className="truncate">{row.name}</span>}
                      </span>

                      {labelVisible && (
                        <span
                          className={cn(
                            'ml-auto text-xs transition-transform',
                            isGroupOpen ? 'rotate-90' : ''
                          )}
                        >
                          <ChevronRight className="size-4" />
                        </span>
                      )}
                    </button>

                    {!sidebarSmall && isGroupOpen && (
                      <ul className="border-green-500/30 pl-4 w-full">
                        {row.child.map((child, childIdx) => (
                          <div
                            key={makeGroupId(groupId, childIdx, child.name)}
                            onClick={handleNavigate}
                          >
                            <TreeNodeWrapper
                              length={row.child!.length}
                              item={child}
                              parentGroupId={groupId}
                              index={childIdx}
                              depth={1}
                              makeGroupId={makeGroupId}
                              groups={groups}
                              toggleGroup={toggleGroup}
                              isActivePath={isActivePath}
                              collapsed={sidebarSmall}
                            />
                          </div>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              }

              const content = (
                <div
                  className={cn(
                    'flex items-center gap-2 px-2 py-2 text-xs sm:text-sm transition-colors my-1 text-green-50',
                    'hover:bg-green-600 hover:text-white',
                    isRowActive && 'text-primary bg-[#F5FFFA] font-medium rounded-md',
                    sidebarSmall && 'justify-center'
                  )}
                >
                  {row.icon && <span className="shrink-0">{row.icon}</span>}
                  {labelVisible && <span className="truncate">{row.name}</span>}
                </div>
              )

              return row.path ? (
                <Link key={groupId} to={row.path} onClick={handleNavigate}>
                  {content}
                </Link>
              ) : (
                <div key={groupId}>{content}</div>
              )
            })}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white p-3 sm:p-6 overflow-y-auto">
          <div className="min-h-full pb-24">
            <Outlet />
          </div>
        </main>
      </div>

      <footer className="text-center bg-white w-full text-primary text-[10px] sm:text-xs z-50 fixed bottom-0 py-1.5 sm:py-2 border-t border-green-400 shrink-0">
        Admin Website © 2025
      </footer>
    </div>
  )
}

function TreeNodeWrapper({
  item,
  parentGroupId,
  index,
  depth,
  makeGroupId,
  groups,
  toggleGroup,
  isActivePath,
  collapsed,
  length,
}: any) {
  const groupId = makeGroupId(parentGroupId, index, item.name)
  return (
    <div className="relative pl-2 py-1 w-full" key={groupId}>
      <div
        className={`absolute w-px bg-green-500 left-0 top-0 ${index === length - 1 ? 'h-1/2' : 'h-full'}`}
      />
      <div className="absolute w-2 h-px bg-green-500 left-0 top-5" />
      <TreeNode
        item={item}
        depth={depth}
        parentGroupId={parentGroupId}
        index={index}
        groupId={groupId}
        makeGroupId={makeGroupId}
        groups={groups}
        toggleGroup={toggleGroup}
        isActivePath={isActivePath}
        collapsed={collapsed}
      />
    </div>
  )
}

function TreeNode({
  item,
  depth,
  groupId,
  makeGroupId,
  groups,
  toggleGroup,
  isActivePath,
  collapsed,
}: any) {
  const hasChildren = !!item.child && item.child.length > 0
  const isOpen = groups[groupId] ?? false
  const pathname = useLocation().pathname
  const isActive = isActiveTree(item, pathname)
  const labelVisible = !collapsed

  if (hasChildren) {
    return (
      <li className="w-full">
        <button
          type="button"
          onClick={() => toggleGroup(groupId)}
          className={cn(
            'flex w-full items-center gap-1.5 px-1.5 py-1.5 text-xs sm:text-sm transition-colors',
            'hover:bg-green-600 hover:text-white',
            isActive ? 'font-semibold text-primary' : 'text-green-50'
          )}
        >
          {item.icon && <span className="shrink-0">{item.icon}</span>}
          {labelVisible && <span>{item.name}</span>}
          {labelVisible && (
            <span
              className={cn('ml-auto text-[10px] transition-transform', isOpen ? 'rotate-90' : '')}
            >
              <ChevronRight className="size-4" />
            </span>
          )}
        </button>

        {labelVisible && isOpen && (
          <ul className="border-green-500/30 pl-3 w-full">
            {item.child!.map((child: SideMenuItem, childIdx: number) => (
              <TreeNodeWrapper
                key={makeGroupId(groupId, childIdx, child.name)}
                item={child}
                parentGroupId={groupId}
                index={childIdx}
                depth={depth + 1}
                makeGroupId={makeGroupId}
                groups={groups}
                toggleGroup={toggleGroup}
                isActivePath={isActivePath}
                collapsed={collapsed}
                length={item.child!.length}
              />
            ))}
          </ul>
        )}
      </li>
    )
  }

  const itemContent = (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded px-1.5 py-1.5 text-xs sm:text-sm transition-colors text-primary',
        'hover:bg-green-600 hover:text-white',
        isActive || isActivePath(item.path) ? 'bg-[#F5FFFA] font-medium' : 'text-primary'
      )}
      style={{ marginLeft: depth }}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {labelVisible && <span>{item.name}</span>}
    </div>
  )

  return <li>{item.path ? <Link to={item.path}>{itemContent}</Link> : itemContent}</li>
}

export function isActiveTree(item: SideMenuItem, pathname: string): boolean {
  if (item.path && (pathname === item.path || pathname.startsWith(item.path + '/'))) {
    return true
  }
  if (item.child) {
    return item.child.some((child) => isActiveTree(child, pathname))
  }
  return false
}
