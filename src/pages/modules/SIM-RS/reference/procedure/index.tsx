import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetProcedure } from './hooks/index.tsx'
import { ColumnsProcedure } from './data/columns.tsx'
import { ButtonAddProcedure } from './component/buttonAdd.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const ProcedurePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const permission = GuardCrud({ keys: 'TINDAKAN' })

  const { procedure, loading, meta } = UseGetProcedure({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsProcedure()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Tindakan (ICD-9-CM)'}
          buttonGroup={
            permission?.kelola
              ? [
                  {
                    type: 'custom',
                    element: <ButtonAddProcedure />,
                  },
                ]
              : []
          }
        />

        <TableCustom
          columnsName={permission?.kelola ? [''] : ['action']}
          data={procedure}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
