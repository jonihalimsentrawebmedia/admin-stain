import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { UseGetDoctor } from './hooks/index.tsx'
import { ColumnsDoctor } from './data/columns.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPlus } from 'react-icons/hi'

export const DoctorPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const navigate = useNavigate()

  const { doctor, loading, meta } = UseGetDoctor({
    page: page,
    limit: limit,
    search: search,
  })

  const columns = ColumnsDoctor()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Data Dokter'}
          buttonGroup={[
            {
              type: 'custom',
              element: (
                <Button
                  onClick={() => navigate('/modules/sim-rs/reference/doctor/add')}
                  className={'border-primary text-primary hover:text-primary'}
                  variant={'outline'}
                >
                  <HiPlus />
                  Tambah
                </Button>
              ),
            },
          ]}
        />

        <TableCustom data={doctor} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
