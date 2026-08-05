import type { IMenu } from './types'

export interface IMenuFlatten {
  id_menu: string
  parent_id: string | null
  label: string
  depth: number
}

export const flattenMenu = (
  items: IMenu[],
  depth = 0,
  parentId: string | null = null
): IMenuFlatten[] => {
  const result: IMenuFlatten[] = []
  items.forEach((item) => {
    result.push({
      id_menu: item.id_menu,
      parent_id: parentId,
      label: item.label,
      depth,
    })
    if (item.children?.length) {
      result.push(...flattenMenu(item.children, depth + 1, item.id_menu))
    }
  })
  return result
}

export const collectMenuIds = (items: IMenu[], ids: Set<string> = new Set()): Set<string> => {
  items.forEach((item) => {
    ids.add(item.id_menu)
    if (item.children?.length) {
      collectMenuIds(item.children, ids)
    }
  })
  return ids
}
