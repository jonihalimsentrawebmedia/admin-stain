import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddReligion from './component/buttonAdd.tsx'
import { UseGetReligion } from './hooks'
import { useSearchParams } from 'react-router-dom'
import { ColumnsReligion } from './data/columns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const ListReligion = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { religion, meta, loading } = UseGetReligion({
    page,
    limit,
    search,
  })
  const columns = ColumnsReligion()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Agama'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddReligion />,
            },
            {
              type: 'custom',
              element: <ButtonGoToGuide titleGuide={'Mahasiswa'} valueGuide="E_OFFICE_STUDENTS" />,
            },
          ]}
        />

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={religion}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default ListReligion
