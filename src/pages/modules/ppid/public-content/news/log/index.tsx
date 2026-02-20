import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetLogNews, UseGetNewsDetail } from '../hooks/index'

export const LogActivityNewsPage = () => {
  const { id } = useParams()
  const { logData } = UseGetLogNews(id ?? '')
  const { detailNews } = UseGetNewsDetail(id ?? '')
  const columns = ColumnsLog()

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <div className={'flex items-start gap-x-8 mt-5'}>
        <img src={detailNews?.gambar} className={'w-[320px] h-[240px] object-cover'} alt="imgae" />

        <div className={'flex flex-col gap-y-2 text-sm'}>
          <p className="text-gray-500">Judul</p>
          <p dangerouslySetInnerHTML={{ __html: detailNews?.judul ?? '-' }} />
          <p className="text-gray-500">Kategori Berita</p>
          <p>{detailNews?.nama_kategori_berita}</p>
          <p className="text-gray-500">Penulis</p>
          <p>{detailNews?.penulis}</p>
          <p className="text-gray-500">Diposting Oleh</p>
          <p>
            {detailNews?.nama_user_created ?? '-'},{' '}
            {detailNews?.created_at ? format(detailNews?.created_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
          </p>
          <p className="text-gray-500">Disetujui Oleh</p>
          <p>
            {detailNews?.nama_disetujui ?? '-'},{' '}
            {detailNews?.disetujui_at
              ? format(detailNews?.disetujui_at, 'dd-MM-yyyy, HH:mm:ss')
              : '-'}
          </p>
          <p className="text-gray-500">Diperbaharui Oleh</p>
          <p>
            {detailNews?.nama_user_updated ?? '-'},{' '}
            {detailNews?.updated_at ? format(detailNews?.updated_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
          </p>
        </div>
      </div>

      <p className="text-primary">History Perubahan Data</p>

      <TableCustom data={logData} columns={columns} />
    </>
  )
}
