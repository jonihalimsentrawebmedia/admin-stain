import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetGalleryPhotoDetail, UseGetLogAlbum } from '../hooks/index'

export const LogActivityGalleryAlbum = () => {
  const { id } = useParams()
  const columns = ColumnsLog()
  const { logData } = UseGetLogAlbum(id ?? '')
  const { detailGalleryPhoto: detail } = UseGetGalleryPhotoDetail(id ?? '')

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <div className={'flex items-start gap-x-8 mt-5'}>
        <div className={'flex flex-col gap-y-2 text-sm'}>
          <p className="text-gray-500">Judul</p>
          <p>{detail?.judul}</p>
          <p className="text-gray-500">Jumlah Foto</p>
          <p>{detail?.jumlah_foto}</p>

          <p className="text-gray-500">Diposting Oleh</p>
          <p>
            {detail?.nama_user_created ?? '-'},{' '}
            {detail?.created_at ? format(detail?.created_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
          </p>
          <p className="text-gray-500">Disetujui Oleh</p>
          <p>
            {detail?.nama_disetujui ?? '-'},{' '}
            {detail?.disetujui_at ? format(detail?.disetujui_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
          </p>
          <p className="text-gray-500">Diperbaharui Oleh</p>
          <p>
            {detail?.nama_user_updated ?? '-'},{' '}
            {detail?.updated_at ? format(detail?.updated_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
          </p>
        </div>
      </div>

      <p className="text-primary mt-5">History Perubahan Data</p>

      <TableCustom data={logData} columns={columns} />
    </>
  )
}
