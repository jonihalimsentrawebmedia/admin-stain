import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import useGetImpactInnovation from '@/pages/modules/settings/reference/impact-innovation/controller/useGetImpactInnovation.tsx'
import { UseGetImpactInnovation } from '../../hooks/index'
import { SubmissionColumnsImpactInnovation } from './submissionColumns'

export const SubmissionSectionImpactInnovation = () => {
  const { loading, meta, impactInnovation: list } = UseGetImpactInnovation()
  const { impactInnovation } = useGetImpactInnovation({ isGetAll: true })
  const columns = SubmissionColumnsImpactInnovation()

  return (
    <>
      <TableCustom
        tdClassName={'[&>td:nth-child(1)]:w-fit border'}
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
