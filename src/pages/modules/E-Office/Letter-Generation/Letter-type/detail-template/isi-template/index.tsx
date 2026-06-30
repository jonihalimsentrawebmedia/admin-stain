import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import ButtonAddIsiTemplate from './component/buttonAdd.tsx'
import { UseGetIsiTemplateSurat } from './hooks/index.tsx'
import { IMailIsiTemplateColumns } from './data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListIsiTemplateSurat = () => {
  const { id_template_surat } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { isiTemplate, loading, meta } = UseGetIsiTemplateSurat({
    page,
    limit,
    search,
    id_template_surat: id_template_surat as string,
  })
  const columns = IMailIsiTemplateColumns()

  return (
    <div className={'space-y-5'}>
      <ButtonTitleGroup
        isBack
        label={'Daftar Isi Template Surat'}
        buttonGroup={[
          {
            type: 'custom',
            element: <ButtonAddIsiTemplate />,
          },
        ]}
      />
      <TableCustom
        columnsName={['']}
        data={isiTemplate}
        columns={columns}
        loading={loading}
        meta={meta}
      />
    </div>
  )
}

export default ListIsiTemplateSurat
