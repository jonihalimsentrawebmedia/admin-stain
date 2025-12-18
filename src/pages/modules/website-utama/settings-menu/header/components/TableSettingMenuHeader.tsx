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
import { Button } from '@/components/ui/button'
import { FastForward } from 'lucide-react'
import ButtonAddSubMenu from './ButtonAddSubMenu'
import ButtonDelete from './ButtonDelete'
import ButtonEdit from './ButtonEdit'
import { Link } from 'react-router-dom'
import ButtonActiveMenu from './ButtonActiveMenu'
import Cookies from 'js-cookie'

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
                <TableRow key={'parent' + index} className="py-0!">
                  <TableCell className="border-b  left-0 relative">
                    <div className="">{index + 1}</div>
                  </TableCell>
                  <TableCell className="border-b">{item.nama_menu}</TableCell>
                  <TableCell className="border-b">
                    {/* <Switch checked={item.status == 'Y'} /> */}
                    <ButtonActiveMenu data={item} />
                  </TableCell>
                  <TableCell className="border-b">
                    <ButtonAddSubMenu data={item} menu_parent_name={item.nama_menu} />
                  </TableCell>
                  <TableCell className="border-b">{item.halaman ? 'Ya' : 'Tidak'}</TableCell>
                  <TableCell className="border-b">{item.urutan}</TableCell>
                  <TableCell className="border-b">
                    {item.halaman && (
                      <Link
                        to={`/modules/website-utama/pengaturan-menu/header/${item.id_menu}/content`}
                        onClick={() => {
                          Cookies.set('nama_menu', item.nama_menu)
                        }}
                      >
                        <Button
                          variant={'outline'}
                          className="border border-primary hover:text-primay text-primary"
                        >
                          <FastForward />
                          Konten
                        </Button>
                      </Link>
                    )}
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
                    <TableRow key={'subParent' + index + indexSub} className="py-0!">
                      <TableCell className="border-b relative">
                        <div className="pl-4  ">
                          {index + 1}.{indexSub + 1}
                        </div>
                        {item.children.length == 1 || indexSub == item.children.length - 1 ? (
                          <div className="h-1/2 top-0  bg-primary w-px absolute"></div>
                        ) : (
                          <div className="h-full top-0  bg-primary w-px absolute"></div>
                        )}

                        {item.children.length > 0 && (
                          <div className="h-px top-1/2  bg-primary w-2.5 absolute"></div>
                        )}
                      </TableCell>
                      <TableCell className="border-b ">{subItem.nama_menu}</TableCell>
                      <TableCell className="border-b">
                        <ButtonActiveMenu data={subItem} />
                      </TableCell>
                      <TableCell className="border-b">
                        <ButtonAddSubMenu data={subItem} menu_parent_name={subItem.nama_menu} />
                      </TableCell>
                      <TableCell className="border-b">{subItem.halaman ? 'Ya' : 'Tidak'}</TableCell>
                      <TableCell className="border-b">{subItem.urutan}</TableCell>
                      <TableCell className="border-b">
                        {subItem.halaman && (
                          <Link
                            to={`/modules/website-utama/pengaturan-menu/header/${subItem.id_menu}/content`}
                            onClick={() => {
                              Cookies.set('nama_menu', subItem.nama_menu)
                            }}
                          >
                            <Button
                              variant={'outline'}
                              className="border border-primary hover:text-primay text-primary"
                            >
                              <FastForward />
                              Konten
                            </Button>
                          </Link>
                        )}
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
                      <TableRow
                        key={'subSubparent' + index + indexSub + indexSubSub}
                        className="py-0!"
                      >
                        <TableCell className="border-b relative ">
                          <div className="pl-12  ">
                            {index + 1}.{indexSub + 1}.{indexSubSub + 1}
                          </div>

                          {subItem.children.length == 1 ||
                          indexSubSub == subItem.children.length - 1 ? (
                            <div className="h-1/2 top-0 left-8  bg-primary w-px absolute"></div>
                          ) : (
                            <div className="h-full top-0 left-8   bg-primary w-px absolute"></div>
                          )}

                          {subItem.children.length > 0 && (
                            <div className="h-px top-1/2 left-8  bg-primary w-2.5 absolute"></div>
                          )}
                        </TableCell>
                        <TableCell className="border-b ">{subSubItem.nama_menu}</TableCell>
                        <TableCell className="border-b">
                          <ButtonActiveMenu data={subSubItem} />
                        </TableCell>
                        <TableCell className="border-b"></TableCell>
                        <TableCell className="border-b">
                          {subSubItem.halaman ? 'Ya' : 'Tidak'}
                        </TableCell>
                        <TableCell className="border-b">{subSubItem.urutan}</TableCell>
                        <TableCell className="border-b">
                          {subSubItem.halaman && (
                            <Link
                              onClick={() => {
                                Cookies.set('nama_menu', subSubItem.nama_menu)
                              }}
                              to={`/modules/website-utama/pengaturan-menu/header/${subSubItem.id_menu}/content`}
                            >
                              <Button
                                variant={'outline'}
                                className="border border-primary hover:text-primay text-primary"
                              >
                                <FastForward />
                                Konten
                              </Button>
                            </Link>
                          )}
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
