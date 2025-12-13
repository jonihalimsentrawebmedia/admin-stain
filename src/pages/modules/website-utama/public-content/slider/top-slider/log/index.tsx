import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import {
  UseGetLogData,
  UseGetSliderDetail,
} from '@/pages/modules/website-utama/public-content/slider/top-slider/hooks'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'

export const LogActivityPage = () => {
  const { id } = useParams()
  const { detailSlider } = UseGetSliderDetail(id ?? '')
  const { logData } = UseGetLogData(id ?? '')
  const columns = ColumnsLog()
  
  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />
      
      <div className={'flex items-start gap-x-8'}>
        <img
          src={detailSlider?.gambar}
          className={'w-[320px] h-[240px] object-cover'}
          alt="imgae"
        />

        <div className={'flex flex-col gap-y-2'}>
          <p className="text-gray-500">Keterangan</p>
          <p dangerouslySetInnerHTML={{ __html: detailSlider?.keterangan ?? '-' }} />
          <p className="text-gray-500">URL</p>
          <Link
            to={detailSlider?.url ?? '#'}
            className={'text-blue-600 underline underline-offset-2'}
          >
            {detailSlider?.url}
          </Link>
          <p className="text-gray-500">Diposting Oleh</p>
          <p>
            {detailSlider?.published_user ?? '-'},{' '}
            {detailSlider?.published_at
              ? format(detailSlider?.published_at, 'dd-MM-yyyy, HH:mm:ss')
              : '-'}
          </p>
          <p className="text-gray-500">Disetujui Oleh</p>
          <p>
            {detailSlider?.disetujui_user ?? '-'},{' '}
            {detailSlider?.disetujui_at
              ? format(detailSlider?.disetujui_at, 'dd-MM-yyyy, HH:mm:ss')
              : '-'}
          </p>
          <p className="text-gray-500">Diperbaharui Oleh</p>
          <p>
            {detailSlider?.updated_user ?? '-'},{' '}
            {detailSlider?.updated_at
              ? format(detailSlider?.updated_at, 'dd-MM-yyyy, HH:mm:ss')
              : '-'}
          </p>
        </div>
      </div>

      <p className="text-primary">History Perubahan Data</p>

      <TableCustom data={logData} columns={columns} />
    </>
  )
}
