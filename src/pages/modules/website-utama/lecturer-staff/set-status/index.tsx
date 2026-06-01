import { UseGetEmployee } from '@/pages/modules/website-utama/lecturer-staff/hooks'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ColumnsSetStatus } from './data/columns.tsx'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { useState } from 'react'
import TablePaginate from '@/components/common/table/TablePagination.tsx'
import { UseGetStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/hooks'
import { MultipleStatus } from '@/pages/modules/website-utama/lecturer-staff/set-status/component/multipleUnit.tsx'
import ButtonGoToGuide from '../../panduan/components/ButtonGoToGuide.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import Search from '@/components/common/table/Search.tsx'

const SetStatusEmployeePage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const filter = searchParams.get('filter') ?? ''

  const [selected, setSelected] = useState<string[]>([])
  const { status } = UseGetStatusEmployee({
    page: '0',
    limit: '0',
  })
  const { loading, employee, meta } = UseGetEmployee({
    page: page,
    limit: limit,
    search: search,
    filter: filter,
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
              type: 'custom',
              element: (
                <ButtonGoToGuide
                  titleGuide="Data Dosen dan Staff"
                  valueGuide="WEBSITE_UTAMA_DOSEN_STAFF_SET_STATUS"
                />
              ),
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
          <>
            <MultipleStatus
              employee={employee}
              setSelected={setSelected}
              status={status}
              selected={selected}
            />
          </>
        )}

        <SelectFilter
          label={'Dosen / Staff'}
          selectClassName={'max-w-[250px]'}
          options={[
            { label: 'Dosen', value: 'DOSEN' },
            { label: 'Staff', value: 'STAFF' },
          ]}
          name={'filter'}
        />

        <div className="flex items-end gap-4">
          <SelectFilter
            label={'Jumlah Data'}
            selectClassName={'min-w-[150px]'}
            options={[
              { label: '10', value: '10' },
              { label: '25', value: '25' },
              { label: '50', value: '50' },
              { label: '100', value: '100' },
            ]}
            name={'limit'}
          />
          <Search
            className={'w-full'}
            onSearch={(e) => {
              const params = new URLSearchParams()
              params.append('search', e)
              setSearchParams(params)
            }}
          />
        </div>

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
