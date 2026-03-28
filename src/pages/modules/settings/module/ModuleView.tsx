import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import ModuleViewModel from './ModuleViewModel'
import TableCustom from '@/components/common/table/TableCustom'
import ButtonAddModule from './components/ButtonAddModule'
import useGetModules from './conntroller/useGetModules'
import { useSearchParams } from 'react-router-dom'

const ModuleView = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { columns } = ModuleViewModel()
  const { loading, modules, meta } = useGetModules({
    page: page,
    limit: limit,
    search: search,
  })

  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup
        label="Modul"
        buttonGroup={[
          {
            label: 'Tambah Data',
            onClick: () => {},
            type: 'add',
            element: <ButtonAddModule />,
          },
        ]}
      />

      <TableCustom
        columns={columns}
        data={modules}
        loading={loading}
        columnsName={['gambar']}
        meta={meta}
        placeHolderSearch="Cari Modul"
        tdClassName="whitespace-pre-line"
        thClassName="whitespace-pre-line"
      />
    </div>
  )
}

export default ModuleView
