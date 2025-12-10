import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import useGetImpactInnovation from '@/pages/modules/settings/reference/impact-innovation/controller/useGetImpactInnovation.tsx'
import { DraftColumnsImpactInnovation } from './draftColumns.tsx'
import { UseGetImpactInnovation } from '@/pages/modules/website-utama/public-content/impact-innovation/hooks'

export const DraftSectionImpactInnovation = () => {
  const { loading, meta, impactInnovation: list } = UseGetImpactInnovation()
  const { impactInnovation } = useGetImpactInnovation({ isGetAll: true })
  const columns = DraftColumnsImpactInnovation()

  return (
    <>
      <TableCustom
        tdClassName={'border'}
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
            <SelectFilter
              selectClassName={'min-w-[18rem]'}
              label="kategori"
              name={'id_category'}
              options={
                impactInnovation?.map((row) => ({
                  label: row?.nama_inovasi,
                  value: row?.id_inovasi,
                })) ?? []
              }
            />
          </div>
        }
        columns={columns}
        data={list}
        loading={loading}
        meta={meta}
      />
    </>
  )
}
