import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import Search from '@/components/common/table/Search.tsx'
import { UseGetStaff } from '@/pages/modules/website-fakultas/academic/program-studi/detail/staff/hooks'
import { useParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'

export const StaffDetailProdi = () => {
  const { id } = useParams()
  const { staff, loading, meta } = UseGetStaff({
    id_unit: (id as string) ?? '',
  })

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup buttonGroup={[]} label="Staff" isBack />
        <Search placeholder="Cari Staff" position={'end'} />

        <TableCustom data={staff} columns={[]} loading={loading} meta={meta} />
      </div>
    </>
  )
}
