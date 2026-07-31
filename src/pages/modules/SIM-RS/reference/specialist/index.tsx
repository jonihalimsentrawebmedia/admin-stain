import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetSpecialist } from './hooks/index.tsx'
import { ColumnsSpecialist } from './data/columns.tsx'
import { ButtonAddSpecialist } from './component/buttonAdd.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const SpecialistPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const permission = GuardCrud({ keys: 'SPESIALIS' })

  const { specialist, loading, meta } = UseGetSpecialist({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsSpecialist()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Spesialis Dokter'}
          buttonGroup={
            permission?.kelola
              ? [
                  { type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_REFERENCE" /> },
                  {
                    type: 'custom',
                    element: <ButtonAddSpecialist />,
                  },
                ]
              : []
          }
        />

        <TableCustom
          columnsName={permission?.kelola ? [] : ['action']}
          data={specialist}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
