import { UseGetAuthRole } from '../hooks/index.tsx'
import type { IAuthMenuItem } from '../data/types.ts'

export const findAuthMenuItem = (
  authMenus: IAuthMenuItem[],
  key: string
): IAuthMenuItem | undefined => {
  for (const item of authMenus) {
    if (item.menu === key) return item
    if (item.children) {
      const found = findAuthMenuItem(item.children, key)
      if (found) return found
    }
  }
  return undefined
}

export const canView = (item: IAuthMenuItem | undefined): boolean => {
  if (!item) return false
  return item.akses && item.melihat
}

export const canManage = (item: IAuthMenuItem | undefined): boolean => {
  if (!item) return false
  return item.kelola
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterMenusByAuth = <T extends Record<string, any>>(
  menuList: T[],
  authMenus: IAuthMenuItem[]
): T[] => {
  return menuList
    .filter((menu) => {
      if (!menu.key) return true
      const authItem = findAuthMenuItem(authMenus, menu.key)
      return canView(authItem)
    })
    .map((menu) => {
      if (menu.child) {
        return {
          ...menu,
          child: filterMenusByAuth(menu.child, authMenus),
        }
      }
      return menu
    })
}

export const UseMenuCRUD = () => {
  const { menus } = UseGetAuthRole()
  return { menu: menus ?? [] }
}

interface GuardCrudProps {
  keys: string
}

export const GuardCrud = (prop: GuardCrudProps) => {
  const { keys } = prop
  const { menu } = UseMenuCRUD()
  return findAuthMenuItem(menu, keys)
}
