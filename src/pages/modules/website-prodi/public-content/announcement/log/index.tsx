import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetProdiAnnouncementDetail, UseGetLogAnnouncementProdi } from '../hooks/index'

export const LogActivityAnnouncementProdiPage = () => {
  const { id } = useParams()
  const columns = ColumnsLog()
  const { logData } = UseGetLogAnnouncementProdi(id ?? '')
  const { prodiAnnouncementDetail: detail } = UseGetProdiAnnouncementDetail(id ?? '')

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <div className={'mt-5 p-3 sm:p-5 bg-white border rounded-lg shadow-sm'}>
        <div className={'flex flex-col gap-y-3 text-sm'}>
          <div>
            <p className="text-gray-500 text-xs">Judul</p>
            <p className={'font-medium'}>{detail?.judul_pengumuman}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Isi</p>
            <div className={'p-3 sm:p-5 max-h-[250px] overflow-auto border bg-gray-50 rounded'}>
              <div
                className={'tiptap ProseMirror simple-editor'}
                dangerouslySetInnerHTML={{ __html: detail?.isi_pengumuman ?? '-' }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <p className="text-gray-500 text-xs">Penulis</p>
              <p className={'font-medium'}>{detail?.penulis}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Diposting Oleh</p>
              <p className={'font-medium'}>
                {detail?.nama_user_created ?? '-'},{' '}
                {detail?.created_at ? format(detail?.created_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Disetujui Oleh</p>
              <p className={'font-medium'}>
                {detail?.nama_disetujui ?? '-'},{' '}
                {detail?.disetujui_at ? format(detail?.disetujui_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-xs">Diperbaharui Oleh</p>
              <p className={'font-medium'}>
                {detail?.nama_user_updated ?? '-'},{' '}
                {detail?.updated_at ? format(detail?.updated_at, 'dd-MM-yyyy, HH:mm:ss') : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-primary mt-5">History Perubahan Data</p>

      <TableCustom data={logData} columns={columns} />
    </>
  )
}
