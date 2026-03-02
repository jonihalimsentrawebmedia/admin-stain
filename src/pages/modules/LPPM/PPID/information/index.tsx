import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddInformation } from '@/pages/modules/LPPM/PPID/information/component/buttonAdd.tsx'
import { UseGetInformationTree } from '@/pages/modules/LPPM/PPID/information/hooks'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table.tsx'
import { Fragment, useState } from 'react'
import { clsx } from 'clsx'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ButtonEditInformation } from '@/pages/modules/LPPM/PPID/information/component/buttonEdit.tsx'
import { ButtonDeleteInformation } from '@/pages/modules/LPPM/PPID/information/component/buttonDelete.tsx'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import Search from '@/components/common/table/Search.tsx'
import { MdInfo } from 'react-icons/md'

export const ListInformationPPID = () => {
  const [searchParams] = useSearchParams()
  const limit = searchParams.get('limit') ?? '10'
  const page = searchParams.get('page') ?? '1'
  const search = searchParams.get('search') ?? ''

  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const { information } = UseGetInformationTree({
    limit: limit,
    page: page,
    search: search,
  })

  const HandleSearch = (e: string) => {
    const Params = new URLSearchParams()
    Params.append('search', e)
    if (e === '') {
      Params.delete('search')
    }
    navigate(`?${Params.toString()}`)
  }

  return (
    <>
      <div className={'flex flex-col gap-5'}>
        <ButtonTitleGroup
          isBack
          link={'/modules/lppm/ppid'}
          label={'Daftar Informasi'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddInformation />,
            },
          ]}
        />

        <div className="flex items-end gap-x-4 w-full">
          <SelectFilter
            selectClassName={'w-[120px]'}
            name="limit"
            label="Jlh Data"
            options={[10, 25, 50, 100].map((item) => {
              return {
                label: item.toString(),
                value: item.toString(),
              }
            })}
          />
          <Search onSearch={HandleSearch} className={'w-full'} />
        </div>

        <p className="text-sm bg-primary flex items-center gap-1.5 w-fit p-1.5 rounded text-white">
          <MdInfo className={'size-4'} />
          Untuk Menambahkan Sub Informasi, URL Parent Wajib Kosong
        </p>
        <Table className={'w-full border'}>
          <TableHeader className={'border bg-primary'}>
            <TableRow className={'text-white hover:bg-primary'}>
              <TableHead className={'text-white w-[2rem]'}>#</TableHead>
              <TableHead className={'text-white'}>Judul Informasi</TableHead>
              <TableHead className={'text-white'}>URL</TableHead>
              <TableHead className={'text-white'}>Sub Informasi</TableHead>
              <TableHead className={'text-white'}>Urutan</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className={'bg-white'}>
            {information?.map((row, k) => (
              <Fragment key={k}>
                <TableRow>
                  <TableCell>{row.urutan}</TableCell>
                  <TableCell>{row.judul}</TableCell>
                  <TableCell>
                    {row.url ? (
                      <Link
                        className={
                          'text-sm border w-fit text-primary p-1.5 border-primary rounded font-semibold'
                        }
                        target={'_blank'}
                        to={row?.url}
                      >
                        Buka URL
                      </Link>
                    ) : (
                      'Tidak ada'
                    )}
                  </TableCell>
                  <TableCell>{!row?.url && <ButtonAddInformation data={row} />}</TableCell>
                  <TableCell>{row.urutan}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ButtonEditInformation isChild={false} data={row} />
                      <ButtonDeleteInformation isChild={false} data={row} />
                      {row?.children.length > 0 && (
                        <button
                          className={'bg-primary text-white rounded p-1.5'}
                          onClick={() => setShow(!show)}
                        >
                          {show ? (
                            <FaAngleDown className={'size-4'} />
                          ) : (
                            <FaAngleUp className={'size-4'} />
                          )}
                        </button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>

                {show &&
                  row?.children?.map((child, l) => (
                    <TableRow key={l} className={'bg-primary/10 hover:bg-primary/10'}>
                      <TableCell className={'relative'}>
                        <div
                          className={clsx(
                            row.children.length - 1 === l ? 'h-1/2' : 'h-full',
                            ' w-[1.5px] bg-primary absolute left-2.5 top-0'
                          )}
                        />
                        <div
                          className={clsx(
                            'h-[1.5px] w-[16px] bg-primary absolute left-2.5 top-0',
                            'transform -translate-y-1/2 top-1/2'
                          )}
                        />
                      </TableCell>
                      <TableCell>{child.judul}</TableCell>
                      <TableCell>
                        {child.url ? (
                          <Link
                            target={'_blank'}
                            className={
                              'text-sm border w-fit text-primary p-1.5 border-primary rounded font-semibold'
                            }
                            to={child?.url}
                          >
                            Buka URL
                          </Link>
                        ) : (
                          'Tidak ada'
                        )}
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>{child.urutan}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <ButtonEditInformation isChild={true} data={child} />
                          <ButtonDeleteInformation isChild={true} data={child} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
