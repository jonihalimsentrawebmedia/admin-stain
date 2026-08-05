import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type IMenuItem,
  UseGetMenus,
} from '@/pages/modules/settings/components/layout/hooks/getMenu.tsx'
import type { IModulesList } from '@/pages/modules/interface'
import { MdDashboard, MdOutgoingMail, MdRoomPreferences } from 'react-icons/md'
import { FaArchive, FaListUl, FaReceipt, FaRegCalendarAlt } from 'react-icons/fa'
import { IoMailUnread } from 'react-icons/io5'
import { FaGear, FaUsers } from 'react-icons/fa6'
import { RiMailAiFill } from 'react-icons/ri'
import { BiSolidPlaneAlt } from 'react-icons/bi'
import { PiStudentFill } from 'react-icons/pi'
import TreeNodeWrapper, { isActiveTree, makeGroupId, type MenuItem } from './TreeNode'

const ICON_MAP: Record<string, React.ReactNode> = {
  MdDashboard: <MdDashboard className="size-5" />,
  MdOutgoingMail: <MdOutgoingMail className="size-5" />,
  MdRoomPreferences: <MdRoomPreferences className="size-5" />,
  FaArchive: <FaArchive className="size-5" />,
  FaListUl: <FaListUl className="size-5" />,
  FaReceipt: <FaReceipt className="size-5" />,
  FaRegCalendarAlt: <FaRegCalendarAlt className="size-5" />,
  IoMailUnread: <IoMailUnread className="size-5" />,
  FaGear: <FaGear className="size-5" />,
  FaUsers: <FaUsers className="size-5" />,
  RiMailAiFill: <RiMailAiFill className="size-5" />,
  BiSolidPlaneAlt: <BiSolidPlaneAlt className="size-5" />,
  PiStudentFill: <PiStudentFill className="size-5" />,
}

interface Props {
  collapsed: boolean
}

export function SideNavEOffice({ collapsed }: Props) {
  const location = useLocation()
  const pathname = location.pathname

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const module: IModulesList = JSON.parse(window.localStorage.getItem('module') || '{}')
  const { menu } = UseGetMenus(module.id_module)

  const baseDomain = '/modules/e-office'

  const normalizePath = (link?: string) => {
    if (!link || link === '/' || link === baseDomain) return undefined
    return link.startsWith(baseDomain) ? link : `${baseDomain}${link}`
  }

  const mapMenu = (items: IMenuItem[]): MenuItem[] =>
    items.map((item) => ({
      name: item.label,
      icon: item.icon ? ICON_MAP[item.icon] : undefined,
      path: normalizePath(item.link),
      child: item.children?.length ? mapMenu(item.children) : undefined,
    }))

  const menuList = useMemo(() => (menu ? mapMenu(menu) : []), [menu])

  const isActivePath = (path?: string) => {
    if (!path) return false
    return pathname === path || pathname.startsWith(path + '/')
  }

  // Recursively collect the groupIds of every parent that has an
  // active descendant so they auto-open on the matching route.
  const collectOpenGroups = (
    item: MenuItem,
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
    menuList.forEach((row, i) => {
      collectOpenGroups(row, 'root', i, map)
    })
    return map
  }, [pathname, menuList])

  const groups = { ...defaultOpenGroups, ...openGroups }

  // Close any user-toggled groups when the sidebar is collapsed.
  useEffect(() => {
    if (collapsed) setOpenGroups({})
  }, [collapsed])

  // If the active path is not inside any group, close all groups.
  useEffect(() => {
    const activeHasParentGroup = menuList.some(
      (item) => !!item.child && isActiveTree(item, pathname)
    )
    if (!activeHasParentGroup) {
      setOpenGroups({})
    }
  }, [pathname])

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = { ...prev }
      const parentId = groupId.split('-').slice(0, -2).join('-')

      // Close siblings under the same parent.
      Object.keys(next).forEach((key) => {
        if (key.startsWith(parentId + '-') && key !== groupId) {
          next[key] = false
        }
      })

      next[groupId] = !prev[groupId]
      return next
    })
  }

  return (
    <aside
      className={cn(
        'bg-primary text-white h-full transition-all duration-300',
        'absolute z-[100] lg:relative',
        collapsed ? 'w-0 hidden lg:block lg:w-14' : 'w-72',
        collapsed ? '' : 'pl-5 pr-2',
        'pt-4 pb-3 flex flex-col'
      )}
    >
      <div className="flex-1 space-y-1 overflow-y-auto py-2 h-[calc(100vh-32px)]">
        {menuList.map((row, idx) => {
          const groupId = makeGroupId('root', idx, row.name)
          const isGroupOpen = groups[groupId] ?? false
          const isRowActive = isActiveTree(row, pathname)
          const labelVisible = !collapsed

          // Parent menu (with children)
          if (row.child && row.child.length > 0) {
            return (
              <div
                key={groupId}
                className={cn(
                  'rounded-md text-sm overflow-hidden transition-colors',
                  isRowActive || isGroupOpen ? 'bg-white/10' : 'hover:bg-white/5'
                )}
              >
                <button
                  onClick={() => !collapsed && toggleGroup(groupId)}
                  className={cn(
                    'flex w-full items-center gap-2 px-3 py-2 transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
                    isRowActive ? 'text-white font-semibold' : 'text-white/90',
                    collapsed ? 'justify-center' : 'justify-between'
                  )}
                >
                  <div className={cn('flex items-center gap-2', collapsed && 'justify-center')}>
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
                      <ChevronRight className="size-4" />
                    </span>
                  )}
                </button>

                {!collapsed && isGroupOpen && (
                  <ul className="border-l border-white/20 ml-4 pl-2 w-[calc(100%-1rem)]">
                    {row?.child?.map((child, childIdx) => (
                      <TreeNodeWrapper
                        key={makeGroupId(groupId, childIdx, child.name)}
                        item={child}
                        parentGroupId={groupId}
                        index={childIdx}
                        depth={1}
                        makeGroupId={makeGroupId}
                        groups={groups}
                        toggleGroup={toggleGroup}
                        isActivePath={isActivePath}
                        collapsed={collapsed}
                        length={row?.child?.length ?? 0}
                      />
                    ))}
                  </ul>
                )}
              </div>
            )
          }

          // Leaf menu item
          const content = (
            <div
              className={cn(
                'flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors',
                isRowActive
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/90 hover:bg-white/10',
                collapsed && 'justify-center'
              )}
            >
              {row.icon}
              {labelVisible && <span>{row.name}</span>}
            </div>
          )

          return row.path ? (
            <Link key={groupId} to={row.path}>
              {content}
            </Link>
          ) : (
            <div key={groupId}>{content}</div>
          )
        })}
      </div>
    </aside>
  )
}
