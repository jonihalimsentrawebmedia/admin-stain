import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetUnitInstitution } from '@/pages/modules/E-Office/reference/satuan-unit/hooks.tsx'
import {
  UseGetCountDisposition,
  UseGetDisposition,
  UseGetDispositionByNature,
} from '@/pages/modules/E-Office/inbox/disposition/hooks'
import ChartNature from '@/pages/modules/E-Office/inbox/disposition/compnent/chartNature.tsx'
import { ColumnsDisposition } from '@/pages/modules/E-Office/inbox/disposition/data/columns.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { useSearchParams } from 'react-router-dom'

const DispositionListPage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_unit = searchParams.get('id_unit') ?? ''

  const { institution } = UseGetUnitInstitution()
  const { count } = UseGetCountDisposition()
  const { nature } = UseGetDispositionByNature()

  const { disposition, loading, meta } = UseGetDisposition({
    page,
    limit,
    search,
    id_unit,
  })
  const columns = ColumnsDisposition()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup label={'Disposisi Surat'} buttonGroup={[]} />

        <SelectFilter
          name={'id_unit'}
          label={'Satuan Kerja'}
          options={
            institution?.map((row) => ({
              label: row?.nama,
              value: row?.id_satuan_organisasi,
            })) ?? []
          }
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
          <div className={'space-y-2 p-3 sm:p-4 bg-white shadow drop-shadow rounded'}>
            <div className="flex items-center justify-center bg-blue-100 size-8 sm:size-10 rounded-full text-sm sm:text-base">
              <p>👀</p>
            </div>
            <p className="text-sm sm:text-base">Belum Dibaca</p>
            <p className={'text-xl sm:text-2xl text-primary font-semibold'}>{count?.belum_dibaca}</p>
          </div>
          <div className={'space-y-2 p-3 sm:p-4 bg-white shadow drop-shadow rounded'}>
            <div className="flex items-center justify-center bg-blue-100 size-8 sm:size-10 rounded-full text-sm sm:text-base">
              <p>🤔</p>
            </div>
            <p className="text-sm sm:text-base">Belum Diresponse</p>
            <p className={'text-xl sm:text-2xl text-primary font-semibold'}>{count?.belum_direspon}</p>
          </div>
          <div className={'space-y-2 p-3 sm:p-4 bg-white shadow drop-shadow rounded'}>
            <div className="flex items-center justify-center bg-blue-100 size-8 sm:size-10 rounded-full text-sm sm:text-base">
              <p>✅</p>
            </div>
            <p className="text-sm sm:text-base">Sudah Diresponse</p>
            <p className={'text-xl sm:text-2xl text-primary font-semibold'}>{count?.sudah_direspon}</p>
          </div>
          <ChartNature data={nature} />
        </div>

        <TableCustom
          tdClassName={'bg-white'}
          thClassName={'bg-primary text-white'}
          data={disposition}
          columns={columns}
          meta={meta}
          loading={loading}
        />
      </div>
    </>
  )
}
export default DispositionListPage
