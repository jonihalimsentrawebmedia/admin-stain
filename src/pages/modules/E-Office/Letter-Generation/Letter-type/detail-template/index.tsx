import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailTypeTemplateLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail/hooks'
import { useParams, useSearchParams } from 'react-router-dom'
import ButtonAddTemplateLetterType from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/component/buttonAdd.tsx'
import { UseGetTemplateLetter } from './hooks/index.tsx'
import { IMailTemplateTypeColumns } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'

const ListTemplateLetterType = () => {
  const { id_template } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { typeTemplate } = UseGetDetailTypeTemplateLetter(id_template as string)
  const { templateLetter, loading, meta } = UseGetTemplateLetter({
    page,
    limit,
    search,
    id_jenis_template_surat: id_template as string,
  })
  const columns = IMailTemplateTypeColumns()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          isBack
          label={`Daftar Jenis Template ${typeTemplate?.nama_jenis_template}`}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddTemplateLetterType />,
            },
          ]}
        />
        <TableCustom
          columnsName={['']}
          data={templateLetter}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}

export default ListTemplateLetterType
