import { UseGetEmployee, UseGetReFUnit } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ColumnsSetUnit } from './data/columns.tsx'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { useState } from 'react'
import TablePaginate from '@/components/common/table/TablePagination.tsx'
import MultipleUnit from '@/pages/modules/website-utama/lecturer-staff/set-unit/component/multipleUnit.tsx'
import ButtonGoToGuide from '../../panduan/components/ButtonGoToGuide.tsx'

const SetUnitEmployeePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const [selected, setSelected] = useState<string[]>([])
  const { workUnit } = UseGetReFUnit()
  const { loading, employee, meta } = UseGetEmployee({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsSetUnit({
    unit: workUnit,
  })
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          buttonGroup={[
             {
              type: 'custom',
              element: <ButtonGoToGuide valueGuide="WEBSITE_UTAMA_DOSEN_STAFF_SET_UNIT_KERJA" />,
            },
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => navigate('add'),
            },
          ]}
          label="Data Dosen dan Staff"
        />

        {selected.length > 0 && (
          <MultipleUnit setSelected={setSelected} workUnit={workUnit} selected={selected} />
        )}

        <TableBasic
          onSelectedRowsChange={setSelected}
          columns={columns as any}
          data={employee as any}
          loading={loading}
          rowIdKey={'id_sdm'}
        />

        <div className="flex items-center justify-between">
          <div>
            Tampilkan {limit ?? '10'} dari {meta?.total ?? 10} Data
          </div>
          <TablePaginate length={meta?.total ?? 10} meta={meta} />
        </div>
      </div>
    </>
  )
}

export default SetUnitEmployeePage
