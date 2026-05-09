import { useParams } from 'react-router-dom'
import { UseGetPublication } from '@/pages/modules/website-utama/lecturer-staff/detail/hooks'
import { publicationColumns } from '@/pages/modules/website-utama/lecturer-staff/detail/data/columns/publication.tsx'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ButtonSyncLecturerDetail } from '@/pages/modules/website-utama/lecturer-staff/detail/components/ButtonSyncDetail.tsx'
import { ButtonAddPublication } from '@/pages/modules/website-utama/lecturer-staff/detail/components/publication/buttonAdd.tsx'

const NewSectionPublication = () => {
  const { id } = useParams()
  const { publication } = UseGetPublication({
    id_sdm: id,
  })
  const column = publicationColumns()
  return (
    <>
      <div className="flex gap-2 justify-end w-full">
        <ButtonSyncLecturerDetail
          link={`/website-utama/sdm/${id}/publikasi/sync`}
          topik="fcm_sync_sdm_publikasi"
        />

        <ButtonAddPublication id_sdm={id as string} />
      </div>
      <TableCustom isShowFilter={false} columns={column} data={publication} />
    </>
  )
}

export default NewSectionPublication
