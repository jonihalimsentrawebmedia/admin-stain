import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetMedicine } from './hooks/index.tsx'
import { ColumnsMedicine } from './data/columns.tsx'
import { ButtonAddMedicine } from './component/buttonAdd.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const MedicinePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const permission = GuardCrud({ keys: 'OBAT' })

  const { medicine, loading, meta } = UseGetMedicine({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsMedicine()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Obat'}
          buttonGroup={[
            { type: 'custom' as const, element: <ButtonGoToGuide titleGuide={'Obat'} valueGuide="SIM_RS_PHARMACY" /> },
            ...(permission?.kelola
              ? [
                  {
                    type: 'custom' as const,
                    element: <ButtonAddMedicine />,
                  },
                ]
              : []),
          ]}
        />

        <TableCustom
          columnsName={permission?.kelola ? [] : ['action']}
          data={medicine}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
