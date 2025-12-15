import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetLogAlbumPhoto } from '../hooks/index'

export const LogActivityGalleryAlbumPhoto = () => {
  const { id } = useParams()
  const columns = ColumnsLog()
  const { logData } = UseGetLogAlbumPhoto(id ?? '')

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <p className="text-primary mt-5">History Perubahan Data</p>

      <TableCustom data={logData} columns={columns} />
    </>
  )
}
