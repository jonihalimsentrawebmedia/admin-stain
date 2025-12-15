import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetServicesDetail from '../controller/useGetServicesDetail'
import { Link } from 'react-router-dom'
import { formatDateTime } from '@/utils/date'
import useGetLogServices from '../controller/useGetLogServices'
import type { ColumnDef } from '@tanstack/react-table'
import type { LogStatistic } from '../../statistic/model'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const LogView = () => {
  const { service } = useGetServicesDetail()
  const createdAt = formatDateTime(service?.created_at ?? null)
  const updatedAt = formatDateTime(service?.updated_at ?? null)
  const { log, loading, meta } = useGetLogServices()
  const columns: ColumnDef<LogStatistic>[] = [
    {
      accessorKey: 'No',
      header: '#',
      cell: ({ row }) => {
        const i = row?.index
        return <>{i + 1}</>
      },
    },
    {
      accessorKey: 'jenis_data',
      header: 'Jenis Data',
    },
    {
      accessorKey: 'diubah_pada',
      header: 'Diperbaharui Oleh',
      cell: ({ row }) => {
        const createdAt = formatDateTime(row.original.diubah_pada)
        return (
          <div>
            {row.original.nama_user},
            <br />
            <span className="text-primary">
              {createdAt.date}, {createdAt.time}
            </span>
          </div>
        )
      },
    },
    {
      accessorKey: 'data_lama',
      header: 'Data Sebelumnya',
      cell: ({ row }) => {
        return (
          <div>
            {row.original.data_lama == 'Y'
              ? 'Aktif'
              : row.original.data_lama == 'N'
                ? 'Tidak Aktif'
                : row.original.data_lama}
          </div>
        )
      },
    },
    {
      accessorKey: 'data_baru',
      header: 'Data Hasil Perubahan',
      cell: ({ row }) => {
        return (
          <div>
            {row.original.data_baru == 'Y'
              ? 'Aktif'
              : row.original.data_baru == 'N'
                ? 'Tidak Aktif'
                : row.original.data_baru}
          </div>
        )
      },
    },
  ]
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
      <TableCustom
        meta={meta}
        addFilter={
          <SelectFilter
            selectClassName={'min-w-[8rem]'}
            label="Tampilkan"
            name={'limit'}
            options={[
              { label: '10 Data', value: '10' },
              { label: '25 Data', value: '25' },
              { label: '50 Data', value: '50' },
              { label: '100 Data', value: '100' },
            ]}
          />
        }
        data={log}
        isShowLimit={false}
        columns={columns}
        loading={loading}
      />
    </div>
  )
}

export default LogView
