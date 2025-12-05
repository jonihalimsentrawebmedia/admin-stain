import { useState, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MENULIST } from './menu'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface Props {
  collapsed: boolean
}

interface Props {
  collapsed: boolean
}

type MenuItem = {
  name: string
  icon?: React.ReactNode
  path?: string
  child?: MenuItem[]
}

export function Sidebar(props: Props) {
  const { collapsed } = props
  const location = useLocation()

  // state untuk simpan group yang sedang open (berdasarkan "id" unik)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  // buat id unik untuk setiap row berdasarkan index + nama
  const makeGroupId = (prefix: string, index: number, name: string) => `${prefix}-${index}-${name}`

  const isActivePath = (path?: string) => {
    if (!path) return false
    // sesuaikan jika pattern URL berbeda
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  const defaultOpenGroups = useMemo(() => {
    const map: Record<string, boolean> = {}

    MENULIST.forEach((row: MenuItem, i: number) => {
      const groupId = makeGroupId('root', i, row.name)
      // auto-open kalau ada anak yang aktif
      if (row.child && hasActiveInTree(row, location.pathname)) {
        map[groupId] = true
      }
    })

    return map
  }, [location.pathname])

  // merge default + user toggle
  const groups = { ...defaultOpenGroups, ...openGroups }

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }))
  }

  return (
    <div
      className={cn(
        'bg-[#0D7C46] text-white h-full transition-all duration-300 px-0.5',
        collapsed ? 'w-14' : 'w-60'
      )}
    >
      <div className="space-y-2 overflow-y-auto py-4">
        {MENULIST.map((row: MenuItem, k: number) => {
          const groupId = makeGroupId('root', k, row.name)
          const isGroupOpen = groups[groupId] ?? false
          const isRowActive = isActiveTree(row, location.pathname)

          // hanya icon saat collapsed
          const labelVisible = !collapsed

          if (row.child && row.child.length > 0) {
            return (
              <div
                key={groupId}
                className={`text-base ${isRowActive || isGroupOpen ? 'bg-white' : ''}`}
              >
                <button
                  onClick={() => !collapsed && toggleGroup(groupId)}
                  className={cn(
                    'flex w-full items-center gap-1.5 px-2 py-2 transition-colors',
                    ` focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${!isGroupOpen ? 'text-white' : 'text-primary'}`,
                    isRowActive ? 'text-primary font-semibold' : '',
                    collapsed ? 'justify-center' : 'justify-between'
                  )}
                >
                  <div className={cn('flex items-center gap-1.5', collapsed && 'justify-center')}>
                    {row.icon}
                    {labelVisible && <span>{row.name}</span>}
                  </div>

                  {labelVisible && (
                    <span
                      className={cn(
                        'ml-auto text-xs transition-transform',
                        isGroupOpen ? 'rotate-90' : ''
                      )}
                    >
                      <ChevronRight className={'size-4'} />
                    </span>
                  )}
                </button>

                {!collapsed && isGroupOpen && (
                  <ul className="border-white/30 pl-4 w-full">
                    {row.child.map((child, l) => (
                      <div className={'relative pl-2 py-1 w-full'} key={l}>
                        <div
                          className={`absolute w-px bg-primary left-0 top-0 ${l === (row.child?.length ?? 0) - 1 ? 'h-1/2' : 'h-full'}`}
                        />
                        <div className={'absolute w-2 h-px bg-primary left-0 top-5'} />
                        <SidebarItemTree
                          key={makeGroupId(groupId, l, child.name)}
                          item={child}
                          depth={1}
                          parentId={groupId}
                          makeGroupId={makeGroupId}
                          groups={groups}
                          toggleGroup={toggleGroup}
                          isActivePath={isActivePath}
                          collapsed={collapsed}
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
                'flex items-center gap-1.5 px-2 py-2 text-sm transition-colors my-1 text-white',
                'hover:bg-white hover:text-primary',
                isRowActive ? 'text-primary bg-white font-semibold' : '',
                collapsed && 'justify-center'
              )}
            >
              {row.icon}
              {labelVisible && <span>{row.name}</span>}
            </div>
          )

          return row.path ? (
            <Link key={k} to={row.path}>
              {content}
            </Link>
          ) : (
            <div key={k}>{content}</div>
          )
        })}
      </div>
    </div>
  )
}

interface SidebarItemTreeProps {
  item: MenuItem
  depth: number
  parentId: string
  makeGroupId: (prefix: string, index: number, name: string) => string
  groups: Record<string, boolean>
  toggleGroup: (id: string) => void
  isActivePath: (path?: string) => boolean
  collapsed: boolean
}

function SidebarItemTree(props: SidebarItemTreeProps) {
  const { item, depth, parentId, makeGroupId, groups, toggleGroup, isActivePath, collapsed } = props

  const hasChildren = !!item.child && item.child.length > 0
  const groupId = makeGroupId(parentId, depth, item.name)
  const isOpen = groups[groupId] ?? false
  const isActive = isActiveTree(item, window.location.pathname)

  const labelVisible = !collapsed

  const baseIndent = depth

  if (hasChildren) {
    return (
      <li className={'w-full'}>
        <button
          type="button"
          onClick={() => toggleGroup(groupId)}
          className={cn(
            `flex w-full items-center gap-1.5 px-1.5 py-1.5 text-sm transition-colors text-white`,
            'hover:bg-white/10',
            isActive ? 'font-semibold text-primary' : 'text-primary'
          )}
        >
          {item.icon && <span className="text-xs">{item.icon}</span>}
          {labelVisible && <span>{item.name}</span>}
          {labelVisible && (
            <span
              className={cn('ml-auto text-[10px] transition-transform', isOpen ? 'rotate-90' : '')}
            >
              <ChevronRight className={'size-4'} />
            </span>
          )}
        </button>

        {labelVisible && isOpen && (
          <ul className="border-white/30 pl-3 w-full">
            {item.child!.map((child, l) => (
              <div className={'relative pl-2 py-1 w-full'} key={l}>
                <div
                  className={`absolute w-px bg-white left-0 top-0 ${l === (item.child?.length ?? 0) - 1 ? 'h-1/2' : 'h-full'}`}
                />
                <div className={'absolute w-2 h-px bg-white left-0 top-5'} />
                <SidebarItemTree
                  key={makeGroupId(groupId, l, child.name)}
                  item={child}
                  depth={1}
                  parentId={groupId}
                  makeGroupId={makeGroupId}
                  groups={groups}
                  toggleGroup={toggleGroup}
                  isActivePath={isActivePath}
                  collapsed={collapsed}
                />
              </div>
            ))}
          </ul>
        )}
      </li>
    )
  }

  const itemContent = (
    <div
      className={cn(
        'flex items-center gap-1.5 rounded px-1.5 py-1.5 text-sm transition-colors text-white',
        'hover:bg-white hover:text-primary',
        isActive || isActivePath(item.path) ? 'text-primary font-semibold' : 'text-primary'
      )}
      style={{ marginLeft: baseIndent }}
    >
      {item.icon && <span className="text-xs">{item.icon}</span>}
      {labelVisible && <span>{item.name}</span>}
    </div>
  )

  return <li>{item.path ? <Link to={item.path}>{itemContent}</Link> : itemContent}</li>
}

// helper: cek apakah di tree ada path yang aktif
function isActiveTree(item: MenuItem, pathname: string): boolean {
  if (item.path && (pathname === item.path || pathname.startsWith(item.path + '/'))) {
    return true
  }
  if (item.child) {
    return item.child.some((child) => isActiveTree(child, pathname))
  }
  return false
}

// helper: cek apakah ada anak yang aktif
function hasActiveInTree(item: MenuItem, pathname: string): boolean {
  return isActiveTree(item, pathname)
}
