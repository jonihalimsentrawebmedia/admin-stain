import { UseGetMemberStaff } from '@/pages/modules/LPPM/about/staff/member/hooks'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import SelectFilter from '@/components/common/filter/SelectFilter.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetStaffDetail } from '@/pages/modules/LPPM/about/staff/hooks'
import { ColumnsMemberStaff } from '@/pages/modules/LPPM/about/staff/member/hooks/columns.tsx'

export const StaffMemberList = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const {
    member,
    meta,
    loading: load1,
  } = UseGetMemberStaff({
    limit: limit,
    page: page,
    search: search,
    id_staff: id ?? '',
  })

  const { detail, loading: load2 } = UseGetStaffDetail(id ?? '')
  const columns = ColumnsMemberStaff()

  const loading = load1 || load2

  return (
    <>
      <ButtonTitleGroup
        label={`Daftar Staff - ${detail?.nama_kelompok}`}
        buttonGroup={[
          {
            type: 'add',
            label: 'Tambah Anggota',
            onClick: () => navigate('add'),
          },
        ]}
      />

      <TableCustom
        data={member}
        columns={columns}
        loading={loading}
        meta={meta}
        addFilter={
          <SelectFilter
            selectClassName={'w-[120px]'}
            name="limit"
            label="Jlh Data"
            options={[10, 25, 50, 100].map((item) => {
              return {
                label: item.toString(),
                value: item.toString(),
              }
            })}
          />
        }
      />
    </>
  )
}
