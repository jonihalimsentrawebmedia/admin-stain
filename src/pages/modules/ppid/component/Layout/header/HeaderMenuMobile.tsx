import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ChevronRightIcon, Menu, X } from 'lucide-react'
import { Menus } from './HeaderMenu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Link } from 'react-router-dom'
interface MenuItem {
  label: string
  link: string
  children?: MenuItem[]
}
const HeaderMenuMobile = () => {
  const renderMenuItem = (item: MenuItem) => {
    const hasChildren = item.children && item.children.length > 0

    if (hasChildren) {
      return (
        <Collapsible key={item.link} className="w-full">
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="group w-full justify-between hover:bg-accent transition-none"
            >
              <div className="flex items-center gap-2">
                <span>{item.label}</span>
              </div>
              <ChevronRightIcon className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-90" />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="ml-4 mt-1 border-l pl-2 flex flex-col gap-1">
            {/* Memanggil dirinya sendiri untuk anak menu (Rekursif) */}
            {item.children?.map((child) => renderMenuItem(child))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    // Jika tidak punya anak, render Link biasa
    return (
      <Button
        key={item.link}
        variant="ghost"
        size="sm"
        asChild
        className="w-full justify-start gap-2 font-normal"
      >
        <Link to={item.link}>{item.label}</Link>
      </Button>
    )
  }
  return (
    <>
      <Drawer direction="right">
        <DrawerTrigger asChild>
          <Button className="bg-white lg:hidden hover:bg-white/80">
            <Menu className="text-primary" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerClose asChild>
              <Button variant="ghost" className="w-fit ml-auto p-0!">
                <X />
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <div className="no-scrollbar overflow-y-auto px-4">
            {Menus.map((item) => renderMenuItem(item))}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default HeaderMenuMobile
