import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetPoli } from './hooks/index.tsx'
import { ColumnsPoli } from './data/columns.tsx'
import { ButtonAddPoli } from './component/buttonAdd.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const PoliPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const permission = GuardCrud({ keys: 'POLI' })

  const { poli, loading, meta } = UseGetPoli({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsPoli()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Data Poli'}
          buttonGroup={
            permission?.kelola
              ? [
                  { type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_REFERENCE" /> },
                  {
                    type: 'custom',
                    element: <ButtonAddPoli />,
                  },
                ]
              : []
          }
        />

        <TableCustom data={poli} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
