import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetFacilitiesDetail, UseGetLogFacilities } from '../hooks/index'

export const LogActivityFacilitiesPage = () => {
  const { id } = useParams()
  const columns = ColumnsLog()
  const { logData } = UseGetLogFacilities(id ?? '')
  const { detailFacilities: detail } = UseGetFacilitiesDetail(id ?? '')

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <div className={'flex items-start gap-x-8 mt-5'}>
        <img src={detail?.gambar} className={'w-[320px] h-[240px] object-contain'} alt="imgae" />
        <div className={'flex flex-col gap-y-2 text-sm'}>
          <p className="text-gray-500">Nama Fasilitas</p>
          <p>{detail?.nama_fasilitas}</p>
          <p className="text-gray-500">Alamat</p>
          <p>{detail?.alamat}</p>
          <p className="text-gray-500">HP</p>
          <p>{detail?.no_hp_pembantu}</p>
          <p className="text-gray-500">Email</p>
          <p>{detail?.email_pembantu}</p>

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
