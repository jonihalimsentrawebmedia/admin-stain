import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/ui/menubar.tsx'
import { ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { UseGetMenus } from '@/pages/modules/settings/components/layout/hooks/getMenu.tsx'
import type { IMenuItem } from '@/pages/modules/settings/components/layout/hooks/getMenu.tsx'
import type { IModulesList } from '@/pages/modules/interface'

const baseUrl = '/modules/website-lembaga'

export type MenuItem = {
  label: string
  link: string
  children?: MenuItem[]
}

const normalizeLink = (link?: string) => {
  if (!link || link === '/' || link === baseUrl) return ''
  return link.startsWith(baseUrl) ? link : `${baseUrl}${link}`
}

const mapMenus = (items: IMenuItem[]): MenuItem[] =>
  items.map((item) => ({
    label: item.label,
    link: normalizeLink(item.link),
    children: item.children?.length ? mapMenus(item.children) : undefined,
  }))

export const useHeaderMenus = () => {
  const module: IModulesList = JSON.parse(window.localStorage.getItem('module') || '{}')
  const { menu } = UseGetMenus(module.id_module)
  return menu ? mapMenus(menu) : []
}

export const HeaderMenu = () => {
  const location = useLocation()
  const pathname = location.pathname
  const menus = useHeaderMenus()
  function isActive(link: string) {
    if (link && pathname.includes(link)) {
      return 'border-b rounded-b-none border-white data-[state=open]:rounded-b-sm!'
    }
  }
  return (
    <>
      <div className="bg-white shadow drop-shadow py-1.5">
        <div className={'max-w-[1280px] px-4 mx-auto'}>
          <Menubar className={'border-none  group  hidden lg:flex bg-transparent shadow-none p-0'}>
            {menus.map((menu, i) => (
              <MenubarMenu key={i}>
                {menu?.children ? (
                  <MenubarTrigger className={isActive(menu.link)}>
                    {menu.label}{' '}
                    <ChevronDown
                      className="h-4 w-4 transition-transform duration-200 
               data-[state=open]:rotate-180"
                    />
                  </MenubarTrigger>
                ) : (
                  <Link to={menu.link}>
                    <MenubarTrigger className={isActive(menu.link)}>{menu.label}</MenubarTrigger>
                  </Link>
                )}

                {menu.children && (
                  <MenubarContent>
                    <MenubarGroup>
                      {menu.children.map((child, j) =>
                        child.children ? (
                          // 🔽 LEVEL 3
                          <MenubarSub key={j}>
                            <MenubarSubTrigger>{child.label}</MenubarSubTrigger>
                            <MenubarSubContent>
                              {child.children.map((sub, k) => (
                                <Link to={sub?.link} key={k}>
                                  <MenubarItem>{sub.label}</MenubarItem>
                                </Link>
                              ))}
                            </MenubarSubContent>
                          </MenubarSub>
                        ) : (
                          // 🔹 LEVEL 2 biasa
                          <Link to={child?.link} key={j}>
                            <MenubarItem>{child.label}</MenubarItem>
                          </Link>
                        )
                      )}
                    </MenubarGroup>
                  </MenubarContent>
                )}
              </MenubarMenu>
            ))}
          </Menubar>
        </div>
      </div>
    </>
  )
}
