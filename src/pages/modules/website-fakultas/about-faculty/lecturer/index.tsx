import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import Search from '@/components/common/table/Search.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { UseGetLecturerFaculty } from './hooks/index.tsx'
import LecturerColumnsFaculty from './data/columns.tsx'
import { useSearchParams } from 'react-router-dom'

export const LecturerProfileFaculty = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const { lecturer, loading, meta } = UseGetLecturerFaculty({
    page: page,
    limit: limit,
    search: search,
  })

  const { columns } = LecturerColumnsFaculty()

  return (
    <>
      <div className="space-y-5">
        <ButtonTitleGroup buttonGroup={[]} label="Dosen" />
        <Search placeholder="Cari Dosen" position={'end'} />

        <TableCustom data={lecturer} columns={columns} loading={loading} meta={meta} />
      </div>
    </>
  )
}
