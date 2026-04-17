import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ColumnsSetStatus } from './data/columns.tsx'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { useState } from 'react'
import TablePaginate from '@/components/common/table/TablePagination.tsx'
import { UseGetStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/hooks'
import { MultipleStatus } from '@/pages/modules/website-utama/lecturer-staff/set-status/component/multipleUnit.tsx'

const SetStatusEmployeePage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const [selected, setSelected] = useState<string[]>([])
  const { status } = UseGetStatusEmployee({
    page: '0',
    limit: '0',
  })
  const { loading, employee, meta } = UseGetEmployee({
    page: page,
    limit: limit,
    search: search,
  })
  const columns = ColumnsSetStatus({
    status: status,
  })
  const navigate = useNavigate()

  return (
    <>
      <div className={'space-y-4'}>
        <ButtonTitleGroup
          buttonGroup={[
            {
              type: 'add',
              label: 'Tambah Data',
              onClick: () => navigate('add'),
            },
          ]}
          label="Data Dosen dan Staff"
        />

        {selected.length > 0 && (
          <>
            <MultipleStatus
              employee={employee}
              setSelected={setSelected}
              status={status}
              selected={selected}
            />
          </>
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

export default SetStatusEmployeePage
