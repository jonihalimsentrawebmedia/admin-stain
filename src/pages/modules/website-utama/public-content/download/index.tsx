import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { ButtonAddCategory } from '@/pages/modules/website-utama/public-content/download/components/buttonAdd.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { useNavigate } from 'react-router-dom'
import {
  UseGetCategoryDownload,
  UseGetDownload,
} from '@/pages/modules/website-utama/public-content/download/hooks'
import { DownloadFileColumns } from '@/pages/modules/website-utama/public-content/download/types/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const DownloadFilePage = () => {
  const navigate = useNavigate()
  const { categoryDownload, loading: load1 } = UseGetCategoryDownload({ isGetAll: true })
  const { download, loading: load2, meta } = UseGetDownload()
  const columns = DownloadFileColumns()

  return (
    <>
      <div className="flex flex-col gap-5">
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddCategory />,
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
              selectClassName={'w-[10rem]'}
            />
          }
          isShowLimit={true}
          columns={columns}
          data={download}
          loading={load2 || load1}
          meta={meta}
          thClassName={'bg-primary-foreground'}
        />
      </div>
    </>
  )
}
export default DownloadFilePage
