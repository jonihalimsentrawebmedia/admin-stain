import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UseGetDoctor } from './hooks/index.tsx'
import { UseGetPoli } from '@/pages/modules/SIM-RS/reference/poli/hooks/index.tsx'
import { UseGetSpecialist } from '@/pages/modules/SIM-RS/reference/specialist/hooks/index.tsx'
import { ColumnsDoctor } from './data/columns.tsx'
import { Button } from '@/components/ui/button.tsx'
import { HiPlus } from 'react-icons/hi'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { GuardCrud } from '@/pages/modules/SIM-RS/component/auth/helper'

export const DoctorPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_poli = searchParams.get('id_poli') ?? ''
  const id_spesialis = searchParams.get('id_spesialis') ?? ''
  const navigate = useNavigate()
  const permission = GuardCrud({ keys: 'DOKTER' })

  const { doctor, loading, meta } = UseGetDoctor({
    page: page,
    limit: limit,
    search: search,
    id_poli: id_poli,
    id_spesialis: id_spesialis,
  })

  const { poli } = UseGetPoli({ limit: '100' })
  const { specialist } = UseGetSpecialist({ limit: '100' })

  const poliData =
    poli?.map((row) => ({
      label: row.nama,
      value: row.id_poli,
    })) ?? []

  const specialistData =
    specialist?.map((row) => ({
      label: row.nama,
      value: row.id_spesialis,
    })) ?? []

  const columns = ColumnsDoctor()

  return (
    <>
      <div className={'space-y-5'}>
        <ButtonTitleGroup
          label={'Data Dokter'}
          buttonGroup={
            permission?.kelola
              ? [
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
                ]
              : []
          }
        />

        <TableCustom
          addFilter={
            <div className="flex flex-col sm:flex-row gap-4">
              <SelectFilter
                name="id_poli"
                label="Poli"
                options={poliData}
                selectClassName="w-full sm:min-w-[200px]"
              />
              <SelectFilter
                name="id_spesialis"
                label="Spesialis"
                options={specialistData}
                selectClassName="w-full sm:min-w-[200px]"
              />
            </div>
          }
          data={doctor}
          columns={columns}
          loading={loading}
          meta={meta}
        />
      </div>
    </>
  )
}
