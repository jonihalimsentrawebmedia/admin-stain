import TableCustom from '@/components/common/table/TableCustom.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import { UseGetAchievement } from '../../hooks/index.tsx'
import { SubmissionColumnsAchievement } from './submissionColumns'

export const SubmissionSectionAchievement = () => {
  const { loading, meta, listAchievement } = UseGetAchievement()
  const columns = SubmissionColumnsAchievement()
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
          </div>
        }
        columns={columns}
        data={listAchievement}
        loading={loading}
        meta={meta}
      />
    </>
  )
}
