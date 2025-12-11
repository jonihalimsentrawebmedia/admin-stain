import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetFacilities } from '../../hooks/index'
import { RejectColumnsFacilities } from './rejectColumns.tsx'

export const RejectSectionSection = () => {
  const { loading, meta, listFacilities } = UseGetFacilities()
  const columns = RejectColumnsFacilities()
  return (
    <>
      <TableCustom
        tdClassName={'whitespace-pre-line border'}
        addFilter={
          <div className={'flex items-center gap-1.5'}>
            <SelectFilter
              selectClassName={'min-w-[8rem]'}
              label="Tampilkan"
              name={'limit'}
              options={[
                { label: '10 Data', value: '10' },
                { label: '25 Data', value: '25' },
                { label: '50 Data', value: '50' },
                { label: '100 Data', value: '100' },
              ]}
            />
          </div>
        }
        columns={columns}
        data={listFacilities}
        loading={loading}
        meta={meta}
      />
    </>
  )
}
