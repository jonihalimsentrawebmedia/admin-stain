import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useSearchParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetLetterOrigin } from './hooks'
import { ColumnsLetterOrigin } from './data/columns.tsx'
import ButtonAddLetterOrigin from './component/buttonAdd.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const ListLetterOrigin = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { letterOrigin, meta, loading } = UseGetLetterOrigin({
    page,
    limit,
    search,
  })
  const columns = ColumnsLetterOrigin()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Asal Surat'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddLetterOrigin />,
            },
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Referensi'} valueGuide="E_OFFICE_REFERENCE" />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={letterOrigin}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListLetterOrigin
