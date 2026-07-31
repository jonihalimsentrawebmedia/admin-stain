import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'
import { UseGetDiagnosis } from './hooks/index.tsx'
import { ColumnsDiagnosis } from './data/columns.tsx'
import { ButtonAddDiagnosis } from './component/buttonAdd.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'

export const DiagnosisRefPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const permission = GuardCrud({ keys: 'DIAGNOSIS' })

  const { diagnosis, loading, meta } = UseGetDiagnosis({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsDiagnosis()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Diagnosis (ICD-10)'}
          buttonGroup={
            permission?.kelola
              ? [
                  { type: 'custom', element: <ButtonGoToGuide titleGuide="Panduan" valueGuide="SIM_RS_REFERENCE" /> },
                  {
                    type: 'custom',
                    element: <ButtonAddDiagnosis />,
                  },
                ]
              : []
          }
        />

        <TableCustom
          columnsName={permission?.kelola ? [''] : ['action']}
          data={diagnosis}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
