import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { Link, useParams } from 'react-router-dom'
import TableCustom from '@/components/common/table/TableCustom.tsx'
import { ColumnsLog } from '@/pages/modules/website-utama/public-content/slider/top-slider/create/data/columns.tsx'
import { UseGetAcademicResourceDetail, UseGetLogAcademicResource } from '../hooks/index'

export const LogActivityAcademicResource = () => {
  const { id } = useParams()
  const { logData } = UseGetLogAcademicResource(id ?? '')
  const { academicResource: detail } = UseGetAcademicResourceDetail(id ?? '')
  const columns = ColumnsLog()

  return (
    <>
      <ButtonTitleGroup label={'Log Data'} buttonGroup={[]} isBack />

      <div className={'my-5 grid gap-2.5 grid-cols-[12rem_1fr]'}>
        <p className="text-gray-500">Icon</p>
        <img src={detail?.icon_url} alt="icon" className={'size-20 w-20 h-20'} />
        <p className="text-gray-500">Judul</p>
        <p>{detail?.judul}</p>
        <p className="text-gray-500">Url</p>
        <Link
          to={detail?.url_layanan ?? '#'}
          target={'_blank'}
          className={'p-1.5 px-3 w-fit rounded text-primary border border-primary'}
        >
          Buka Link
        </Link>
      </div>

      <p className="text-primary">History Perubahan Data</p>

      <TableCustom data={logData} columns={columns} />
    </>
  )
}
