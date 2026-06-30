import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { UseGetDetailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/hooks'
import ButtonAddTypeTemplate from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/component/buttonAdd.tsx'
import { UseGetTypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ColumnsCreateLetter from './data/columns.tsx'

const ListDetailGroupLetter = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letter } = UseGetDetailTypeLetter(id as string)
  const { loading, typeTemplate, meta } = UseGetTypeTemplateLetter({
    page,
    search,
    limit,
    id_jenis_surat: id as string,
  })
  const { columns } = ColumnsCreateLetter()
  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={`Detail ${letter?.nama_jenis_surat} - (${letter?.kategori_jenis_surat})`}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddTypeTemplate />,
            },
          ]}
        />
        <TableCustom
          isShowFilter={false}
          data={typeTemplate}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default ListDetailGroupLetter
