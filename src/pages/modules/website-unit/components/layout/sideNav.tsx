import { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UseGetMenus } from '@/pages/modules/settings/components/layout/hooks/getMenu.tsx'
import type { IMenuItem } from '@/pages/modules/settings/components/layout/hooks/getMenu.tsx'
import type { IModulesList } from '@/pages/modules/interface'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import {
  MdBusiness,
  MdDashboard,
  MdInfo,
  MdLibraryBooks,
  MdMapsHomeWork,
  MdMiscellaneousServices,
} from 'react-icons/md'
import { FaGraduationCap } from 'react-icons/fa'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import { IoMdImage, IoMdSettings } from 'react-icons/io'

const ICON_MAP: Record<string, React.ReactNode> = {
  FaGraduationCap: <FaGraduationCap className="size-5" />,
  IoMdImage: <IoMdImage className="size-5" />,
  IoMdSettings: <IoMdSettings className="size-5" />,
  MdBusiness: <MdBusiness className="size-5" />,
  MdDashboard: <MdDashboard className="size-5" />,
  MdInfo: <MdInfo className="size-5" />,
  MdLibraryBooks: <MdLibraryBooks className="size-5" />,
  MdMapsHomeWork: <MdMapsHomeWork className="size-5" />,
  MdMiscellaneousServices: <MdMiscellaneousServices className="size-5" />,
  RiQuestionAnswerFill: <RiQuestionAnswerFill className="size-5" />,
}

interface Props {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
}

type MenuItem = {
  name: string
  icon?: React.ReactNode
  path?: string
  child?: MenuItem[]
}

/**
 * IMPORTANT
 * - makeGroupId harus dipakai SAMA saat membuat defaultOpenGroups dan saat render.
 * - collectOpenGroups akan menandai semua parent groupId yang punya child aktif.
 */

export function SideNavUnit({ collapsed, setCollapsed }: Props) {
  const location = useLocation()
  const pathname = location.pathname

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  const module: IModulesList = JSON.parse(window.localStorage.getItem('module') || '{}')
  const { menu } = UseGetMenus(module.id_module)

  const baseDomain = '/modules/website-unit'

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

  const MenuList = useMemo(() => (menu ? mapMenu(menu) : []), [menu])

  const makeGroupId = (parentId: string, index: number, name: string) =>
    `${parentId}-${index}-${name}`

  const isActivePath = (path?: string) => {
    if (!path) return false
    return pathname === path || pathname.startsWith(path + '/')
  }

  // recursive helper: collect groupIds yang harus di-open karena ada active descendant
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
    MenuList.forEach((row, i) => {
      collectOpenGroups(row, 'root', i, map)
    })
    return map
  }, [pathname, MenuList])

  const groups = { ...defaultOpenGroups, ...openGroups }

  // const toggleGroup = (groupId: string) => {
  //   setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }))
  // }

  useEffect(() => {
    if (collapsed) setOpenGroups({})
  }, [collapsed])

  useEffect(() => {
    // by default children tertutup; hanya group yang url-nya match pathname yang terbuka (via defaultOpenGroups)
    setOpenGroups({})
  }, [pathname])

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = { ...prev }

      // ambil parentId (semua sebelum "-index-name")
      const parentId = groupId.split('-').slice(0, -2).join('-')

      // tutup semua group yang parent-nya sama
      Object.keys(next).forEach((key) => {
        if (key.startsWith(parentId + '-') && key !== groupId) {
          next[key] = false
        }
      })

      // toggle group yg diklik
      next[groupId] = !prev[groupId]

      return next
    })
  }

  return (
    <div
      className={cn(
        `bg-primary text-white h-full transition-all duration-300 absolute z-50 lg:relative ${collapsed ? '' : 'pl-[20px] pr-2'}`,
        collapsed ? 'w-0 hidden lg:block lg:w-14' : 'w-72'
      )}
    >
      <div className="space-y-2 overflow-y-auto py-4 overflow-auto h-[calc(100vh-110px)]">
        {MenuList.map((row, idx) => {
          const groupId = makeGroupId('root', idx, row.name)
          const isGroupOpen = groups[groupId] ?? false
          const isRowActive = isActiveTree(row, pathname)
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
                    `focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                      !isGroupOpen ? 'text-white' : 'text-black'
                    }`,
                    isRowActive ? 'text-black font-semibold' : '',
                    collapsed ? 'justify-center' : 'justify-between'
                  )}
                >
                  <div
                    className={cn(
                      'flex items-center gap-1.5 text-sm',
                      collapsed && 'justify-center'
                    )}
                  >
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
                    {row.child.map((child, childIdx) => (
                      <TreeNodeWrapper
                        length={row?.child?.length}
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
                        setCollapsed={setCollapsed}
                      />
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
                'hover:bg-white hover:text-black',
                isRowActive ? 'text-black bg-white font-semibold' : '',
                collapsed && 'justify-center'
              )}
            >
              {row.icon}
              {labelVisible && <span>{row.name}</span>}
            </div>
          )

          return row.path ? (
            <Link key={groupId} to={row.path} onClick={() => setCollapsed(true)}>
              {content}
            </Link>
          ) : (
            <div key={groupId}>{content}</div>
          )
        })}
      </div>
    </div>
  )
}

/**
 * TreeNodeWrapper:
 * - buat container garis + hitung groupId
 * - panggil recursive TreeNode
 */
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
  setCollapsed,
  length,
}: any) {
  const groupId = makeGroupId(parentGroupId, index, item.name)
  return (
    <div className="relative pl-2 py-1 w-full" key={groupId}>
      <div
        className={`absolute w-px bg-primary left-0 top-0 ${index === length - 1 ? 'h-1/2' : 'h-full'}`}
      />
      <div className="absolute w-2 h-px bg-primary left-0 top-5" />
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
        setCollapsed={setCollapsed}
      />
    </div>
  )
}

/**
 * TreeNode: recursive renderer for an item (could be leaf or parent)
 * - groupId prop is passed from wrapper to ensure IDs match the collector
 */
function TreeNode({
  item,
  depth,
  groupId,
  makeGroupId,
  groups,
  toggleGroup,
  isActivePath,
  collapsed,
  setCollapsed,
}: any) {
  const hasChildren = !!item.child && item.child.length > 0
  const isOpen = groups[groupId] ?? false
  const pathname = useLocation().pathname
  const isActive = isActiveTree(item, pathname)
  const labelVisible = !collapsed

  if (hasChildren) {
    return (
      <li className={'w-full'}>
        <button
          type="button"
          onClick={() => toggleGroup(groupId)}
          className={cn(
            `flex w-full items-center gap-1.5 px-1.5 py-1.5 text-sm transition-colors text-white`,
            'hover:bg-white/10',
            isActive ? 'font-semibold text-black' : 'text-black'
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
            {item.child!.map((child: MenuItem, childIdx: number) => (
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
                setCollapsed={setCollapsed}
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
        'flex items-center gap-1.5 rounded px-1.5 py-1.5 text-sm transition-colors text-white',
        'hover:bg-white hover:text-black',
        isActive || isActivePath(item.path) ? 'text-black font-semibold' : 'text-black'
      )}
      style={{ marginLeft: depth }}
    >
      {item.icon && <span className="text-xs">{item.icon}</span>}
      {labelVisible && <span>{item.name}</span>}
    </div>
  )

  return (
    <li>
      {item.path ? (
        <Link to={item.path} onClick={() => setCollapsed(true)}>
          {itemContent}
        </Link>
      ) : (
        itemContent
      )}
    </li>
  )
}

/* ---------------------------
   Active helpers (unchanged)
   - isActiveTree: returns true if item or any descendant matches pathname
----------------------------*/
export function isActiveTree(item: MenuItem, pathname: string): boolean {
  if (item.path && (pathname === item.path || pathname.startsWith(item.path + '/'))) {
    return true
  }
  if (item.child) {
    return item.child.some((child) => isActiveTree(child, pathname))
  }
  return false
}

export function hasActiveInTree(item: MenuItem, pathname: string): boolean {
  return isActiveTree(item, pathname)
}
