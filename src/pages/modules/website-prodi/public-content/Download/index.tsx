import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { Link, useNavigate } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetCategoryDownloadProdi, UseGetDownloadProdi } from './hooks/index'
import { DownloadFileProdiColumns } from './data/columns'
import { Button } from '@/components/ui/button.tsx'
import { IoList } from 'react-icons/io5'

const DownloadFileProdiPage = () => {
  const navigate = useNavigate()
  const { categoryDownload, meta: metaCategory, loading: load1 } = UseGetCategoryDownloadProdi()
  const { downloadProdi, meta, loading: load2 } = UseGetDownloadProdi()
  const columns = DownloadFileProdiColumns()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Link to={'category'}>
                  <Button
                    variant={'outline'}
                    className={'border-primary text-primary hover:text-primary'}
                  >
                    <IoList /> Tambah Kategori ({metaCategory?.total})
                  </Button>
                </Link>
              ),
            },
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => {
                navigate('add')
              },
            },
          ]}
          label="Download"
        />

        <SelectFilter
          zIndex={'z-20'}
          loading={load1 || load2}
          label={'Kategori Berkas'}
          options={
            categoryDownload?.map((item) => ({
              label: item.nama_kategori,
              value: item.id_kategori_berkas,
            })) || []
          }
          name={'category'}
          selectClassName={'w-[20rem]'}
        />

        <TableCustom
          classNameSearch={'p-1.5 pl-[36px] justify-end w-full'}
          placeHolderSearch={'Cari Berkas'}
          addFilter={
            <SelectFilter
              label={'Limit'}
              options={[
                { label: '10', value: '10' },
                { label: '25', value: '25' },
                { label: '50', value: '50' },
                { label: '100', value: '100' },
              ]}
              zIndex={'z-10'}
              name={'limit'}
              selectClassName={'w-[10rem] border-primary'}
            />
          }
          isShowLimit={true}
          columns={columns}
          data={downloadProdi}
          loading={load2 || load1}
          meta={meta}
          thClassName={'bg-primary-foreground'}
        />
      </div>
    </>
  )
}
export default DownloadFileProdiPage
