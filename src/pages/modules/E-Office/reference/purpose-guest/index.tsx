import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonAddPurposeGuest from '@/pages/modules/E-Office/reference/purpose-guest/component/buttonAdd.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetPurposeGuest } from '@/pages/modules/E-Office/reference/purpose-guest/hooks'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsPurposeGuest } from '@/pages/modules/E-Office/reference/purpose-guest/data/columns.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

const PurposeGuestPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { purposeGuest, meta, loading } = UseGetPurposeGuest({
    limit,
    page,
    search,
  })

  const columns = ColumnsPurposeGuest()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup
          label={'Tujuan Bertamu'}
          buttonGroup={[
            {
              type: 'custom',
              element: <ButtonAddPurposeGuest />,
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
          data={purposeGuest}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
export default PurposeGuestPage
