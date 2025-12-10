import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetServicesDetail from '../controller/useGetServicesDetail'
import { Link } from 'react-router-dom'
import { formatDateTime } from '@/utils/date'

const LogView = () => {
  const { service } = useGetServicesDetail()
  const createdAt = formatDateTime(service?.created_at ?? null)
  const updatedAt = formatDateTime(service?.updated_at ?? null)
  return (
    <div className="flex flex-col gap-4">
      <ButtonTitleGroup buttonGroup={[]} isBack label="Log Data" />
      <div>
        <div className="text-[#999999] text-sm">Nama Layanan</div>
        <div className="text-green-600 font-medium text-3xl">{service?.nama_layanan}</div>
      </div>
      <div>
        <div className="text-[#999999] text-sm">URL</div>
        <Link to={service?.url_layanan ?? '#'} className="text-blue-600 underline font-medium ">
          {service?.nama_layanan}
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <div className="text-[#999999] text-sm">Posisi Header</div>
          <div className="">{service?.header == 'Y' ? 'Aktif' : 'Tidak Aktif'}</div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Posisi Bawah Slider</div>
          <div className=" ">{service?.slider == 'Y' ? 'Aktif' : 'Tidak Aktif'}</div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">Posisi Footer</div>
          <div className=" ">{service?.footer == 'Y' ? 'Aktif' : 'Tidak Aktif'}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="text-[#999999] text-sm">Diposting Oleh</div>
          <div className=" ">
            {createdAt.date} , {createdAt.time}
          </div>
        </div>
        <div>
          <div className="text-[#999999] text-sm">DiPerbaharui Oleh</div>
          <div className=" ">
            {updatedAt.date} , {updatedAt.time}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogView
