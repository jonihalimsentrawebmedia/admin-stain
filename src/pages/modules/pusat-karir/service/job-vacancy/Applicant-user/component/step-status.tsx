import type { Dispatch, SetStateAction } from 'react'
import type { IApplicant } from '../data/types.tsx'
import { useParams, useSearchParams } from 'react-router-dom'
import { TableBasic } from '@/components/common/table/tableBasic.tsx'
import { UseGetApplicant } from '../hooks/index.tsx'
import type { StatusApplicant } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'
import { ColumnsApplicant } from '../data/columns.tsx'

interface PropsState {
  setSelectedApplicants: Dispatch<SetStateAction<IApplicant[]>>
}

export const StepStatus = (props: PropsState) => {
  const { setSelectedApplicants } = props
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const status = searchParams.get('status') ?? ''

  const { applicant, loading } = UseGetApplicant({
    id_lowongan: id as string,
    page: page,
    limit: limit,
    search: search,
    status: status as StatusApplicant,
  })
  const columns = ColumnsApplicant()

  return [
    {
      value: 'MASUK',
      label: 'Lamaran Masuk',
      element: (
        <TableBasic
          rowIdKey={'id_pelamar'}
          onSelectedRowsChange={setSelectedApplicants}
          data={applicant}
          loading={loading}
          columns={columns}
        />
      ),
    },
    {
      value: 'DIPROSES',
      label: 'Sedang Diproses',
      element: (
        <TableBasic
          rowIdKey={'id_pelamar'}
          onSelectedRowsChange={setSelectedApplicants}
          data={applicant}
          loading={loading}
          columns={columns}
        />
      ),
    },
    {
      value: 'DITERIMA',
      label: 'Diterima',
      element: (
        <TableBasic
          rowIdKey={'id_pelamar'}
          onSelectedRowsChange={setSelectedApplicants}
          data={applicant}
          loading={loading}
          columns={columns}
        />
      ),
    },
    {
      value: 'DITOLAK',
      label: 'Ditolak',
      element: (
        <TableBasic
          rowIdKey={'id_pelamar'}
          onSelectedRowsChange={setSelectedApplicants}
          data={applicant}
          loading={loading}
          columns={columns}
        />
      ),
    },
    {
      value: 'DIBATALKAN',
      label: 'Dibatalkan',
      element: (
        <TableBasic
          rowIdKey={'id_pelamar'}
          onSelectedRowsChange={setSelectedApplicants}
          data={applicant}
          loading={loading}
          columns={columns}
        />
      ),
    },
  ]
}
