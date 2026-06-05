import { useNavigate, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetTemplateSurat } from './hooks'
import { ColumnsTemplateSurat } from './data/columns.tsx'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'

const ListTemplateSurat = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { templateSurat, meta, loading } = UseGetTemplateSurat({
    page,
    limit,
    search,
  })
  const columns = ColumnsTemplateSurat()
  const navigate = useNavigate()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Template Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  className={'rounded-full text-white hover:text-white'}
                  onClick={() => navigate('create')}
                >
                  <BiPlus />
                  Tambah Template Surat
                </Button>
              ),
            },
          ]}
        />

        <TableCustom
          data={templateSurat}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}

export default ListTemplateSurat
