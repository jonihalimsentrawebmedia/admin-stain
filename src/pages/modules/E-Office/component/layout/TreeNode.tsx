import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type MenuItem = {
  id?: number
  name: string
  icon?: React.ReactNode
  path?: string
  child?: MenuItem[]
}

type MakeGroupIdFn = (parentId: string, index: number, name: string) => string

type TreeNodeWrapperProps = {
  item: MenuItem
  parentGroupId: string
  index: number
  depth: number
  makeGroupId: MakeGroupIdFn
  groups: Record<string, boolean>
  toggleGroup: (groupId: string) => void
  isActivePath: (path?: string) => boolean
  collapsed: boolean
  length: number
}

type TreeNodeProps = Omit<TreeNodeWrapperProps, 'length'> & { groupId: string }

/**
 * Recursively check if the current pathname matches the menu item
 * or any of its descendants.
 */
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

/**
 * Build a deterministic id for each tree node so that
 * `defaultOpenGroups` and the renderer use the same keys.
 */
export const makeGroupId: MakeGroupIdFn = (parentId, index, name) =>
  `${parentId}-${index}-${name}`

/**
 * TreeNodeWrapper: container for the connector line and child node.
 * Calculates the groupId so it stays in sync with `collectOpenGroups`.
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
  length,
}: TreeNodeWrapperProps) {
  const groupId = makeGroupId(parentGroupId, index, item.name)
  return (
    <div className="relative pl-2 py-1 w-full" key={groupId}>
      <div
        className={cn(
          'absolute w-px bg-white/60 left-0 top-0',
          index === length - 1 ? 'h-1/2' : 'h-full'
        )}
      />
      <div className="absolute w-2 h-px bg-white/60 left-0 top-5" />
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

/**
 * TreeNode: recursive renderer for a menu item (could be a parent or leaf).
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
}: TreeNodeProps) {
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
            'flex w-full items-center gap-1.5 px-1.5 py-1.5 text-sm transition-colors',
            'hover:bg-white/10',
            isActive ? 'font-semibold text-white' : 'text-white/90'
          )}
        >
          {item.icon && <span className="text-xs">{item.icon}</span>}
          {labelVisible && <span>{item.name}</span>}
          {labelVisible && (
            <span
              className={cn(
                'ml-auto text-[10px] transition-transform',
                isOpen ? 'rotate-90' : ''
              )}
            >
              <ChevronRight className="size-4" />
            </span>
          )}
        </button>

        {labelVisible && isOpen && (
          <ul className="border-white/30 pl-3 w-full">
            {item.child!.map((child, childIdx) => (
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
        'flex items-center gap-1.5 rounded px-1.5 py-1.5 text-sm transition-colors',
        'hover:bg-white/15',
        isActive || isActivePath(item.path)
          ? 'bg-white/15 text-white font-semibold'
          : 'text-white/90'
      )}
      style={{ marginLeft: depth }}
    >
      {item.icon && <span className="text-xs">{item.icon}</span>}
      {labelVisible && <span>{item.name}</span>}
    </div>
  )

  return <li>{item.path ? <Link to={item.path}>{itemContent}</Link> : itemContent}</li>
}

export default TreeNodeWrapper
