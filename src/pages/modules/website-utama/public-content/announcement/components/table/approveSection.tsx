import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetAnnouncement } from '../../hooks/index'
import { ApproveAnnouncementColumns } from '@/pages/modules/website-utama/public-content/announcement/components/table/approveColumns.tsx'

export const ApproveAnnouncementSection = () => {
  const { announcement, meta, loading } = UseGetAnnouncement()
  const columns = ApproveAnnouncementColumns()
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
        data={announcement}
        loading={loading}
        meta={meta}
      />
    </>
  )
}
