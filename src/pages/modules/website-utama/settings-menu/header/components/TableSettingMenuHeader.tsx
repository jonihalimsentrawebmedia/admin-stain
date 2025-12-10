import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useGetSettingsMenu from '../controller/useGetSettingsMenu'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { FastForward } from 'lucide-react'
import ButtonAddSubMenu from './ButtonAddSubMenu'
import ButtonDelete from './ButtonDelete'
import ButtonEdit from './ButtonEdit'
import { Link } from 'react-router-dom'

const TableSettingMenuHeader = () => {
  const { loading, menuList } = useGetSettingsMenu()
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="border bg-[#F5FFFA] text-primary">#</TableHead>
          <TableHead className="border bg-[#F5FFFA] text-primary">Nama Menu</TableHead>
          <TableHead className="border bg-[#F5FFFA] text-primary">Status</TableHead>
          <TableHead className="border bg-[#F5FFFA] text-primary"></TableHead>
          <TableHead className="border bg-[#F5FFFA] text-primary">Halaman?</TableHead>
          <TableHead className="border bg-[#F5FFFA] text-primary">No. Urut</TableHead>
          <TableHead className="border bg-[#F5FFFA] text-primary">Konten</TableHead>
          <TableHead className="border bg-[#F5FFFA] text-primary"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array(5)
              .fill('sett')
              .map((item, index) => (
                <TableRow key={'loading' + index + item}>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                  <TableCell>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              ))
          : menuList.map((item, index) => (
              <>
                <TableRow className="py-0!">
                  <TableCell className="border-b h-[60px] left-0 relative">
                    <div className='pl-2'>
                      {index + 1}
                    </div>

              
                  </TableCell>
                  <TableCell className="border-b">{item.nama_menu}</TableCell>
                  <TableCell className="border-b">
                    <Switch checked={item.status == 'Y'} />
                  </TableCell>
                  <TableCell className="border-b">
                    <ButtonAddSubMenu data={item} menu_parent_name={item.nama_menu} />
                  </TableCell>
                  <TableCell className="border-b">
                    {item.status == 'Y' ? 'Ya' : 'Tidak'}
                  </TableCell>
                  <TableCell className="border-b">{item.urutan}</TableCell>
                  <TableCell className="border-b">
                    <Link
                      to={`/modules/website-utama/pengaturan-menu/header/${item.id_menu}/content`}
                    >
                      <Button
                        variant={'outline'}
                        className="border border-primary hover:text-primay text-primary"
                      >
                        <FastForward />
                        Konten
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell className="border-b">
                    <div className="flex gap-2 items-center">
                      <ButtonEdit data={item} />
                      <ButtonDelete data={item} />
                    </div>
                  </TableCell>
                </TableRow>
                {item.children.map((subItem, indexSub) => (
                  <>
                    <TableRow className="py-0!">
                      <TableCell className="border-b ">
                        <div className="pl-4  ">
                          {index + 1}.{indexSub + 1}
                        </div>
                      </TableCell>
                      <TableCell className="border-b ">{subItem.nama_menu}</TableCell>
                      <TableCell className="border-b">
                        <Switch checked={subItem.status == 'Y'} />
                      </TableCell>
                      <TableCell className="border-b">
                        <ButtonAddSubMenu data={subItem} menu_parent_name={subItem.nama_menu} />
                      </TableCell>
                      <TableCell className="border-b">
                        {item.status == 'Y' ? 'Ya' : 'Tidak'}
                      </TableCell>
                      <TableCell className="border-b">{subItem.urutan}</TableCell>
                      <TableCell className="border-b">
                        <Link
                          to={`/modules/website-utama/pengaturan-menu/header/${item.id_menu}/content`}
                        >
                          <Button
                            variant={'outline'}
                            className="border border-primary hover:text-primay text-primary"
                          >
                            <FastForward />
                            Konten
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell className="border-b">
                        <div className="flex gap-2 items-center">
                          <ButtonEdit data={subItem} />

                          <ButtonDelete
                            data={subItem}
                            isSubMenu
                            menu_parent_name={item.nama_menu}
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {subItem.children.map((subSubItem, indexSubSub) => (
                      <TableRow className="py-0!">
                        <TableCell className="border-b relative ">
                          <div className="pl-8  ">
                            {index + 1}.{indexSub + 1}.{indexSubSub + 1}
                          </div>
                        </TableCell>
                        <TableCell className="border-b ">{subSubItem.nama_menu}</TableCell>
                        <TableCell className="border-b">
                          <Switch checked={subSubItem.status == 'Y'} />
                        </TableCell>
                        <TableCell className="border-b">
                          <ButtonAddSubMenu
                            data={subSubItem}
                            menu_parent_name={subSubItem.nama_menu}
                          />
                        </TableCell>
                        <TableCell className="border-b">
                          {item.status == 'Y' ? 'Ya' : 'Tidak'}
                        </TableCell>
                        <TableCell className="border-b">{subSubItem.urutan}</TableCell>
                        <TableCell className="border-b">
                          <Link
                            to={`/modules/website-utama/pengaturan-menu/header/${item.id_menu}/content`}
                          >
                            <Button
                              variant={'outline'}
                              className="border border-primary hover:text-primay text-primary"
                            >
                              <FastForward />
                              Konten
                            </Button>
                          </Link>
                        </TableCell>
                        <TableCell className="border-b">
                          <div className="flex gap-2 items-center">
                            <ButtonEdit data={subSubItem} />
                            <ButtonDelete
                              data={subSubItem}
                              isSubMenu
                              menu_parent_name={subItem.nama_menu}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
              </>
            ))}
      </TableBody>
    </Table>
  )
}

export default TableSettingMenuHeader
