import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { UseGetPatient } from './hooks/index.tsx'
import { ColumnsPatient } from './data/columns.tsx'
import { BiPlus } from 'react-icons/bi'

export const PatientPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const navigate = useNavigate()

  const { patient, loading, meta } = UseGetPatient({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsPatient()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Data Pasien'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <button
                  onClick={() => navigate('/modules/sim-rs/reference/patient/add')}
                  className={'border-primary text-primary hover:text-primary flex items-center gap-1.5 px-3 py-1.5 rounded border'}
                >
                  <BiPlus />
                  Tambah
                </button>
              ),
            },
          ]}
        />

        <TableCustom data={patient} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
