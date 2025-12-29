import type { ColumnDef } from '@tanstack/react-table'
import type { LogStatistic } from '../../../statistic/model'
import useGetFieldOfCooperationDetail from '../controller/useGetFieldOfCooperationDetail'
import useGetLogFieldOfCooperation from '../controller/useGetLogFieldOfCooperation'
import { formatDateTime } from '@/utils/date'
import { Skeleton } from '@/components/ui/skeleton'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'

const FieldOfCooperationLogView = () => {
  const { fieldOfCooperationDetail, loading } = useGetFieldOfCooperationDetail()
  const { log, loading: loadingLog, meta } = useGetLogFieldOfCooperation()

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
      // cell: ({ row }) => {
      //   const isImage = isImageUrl(row.original.data_lama)
      //   return isImage ? (
      //     <img width={100} height={100} src={row.original.data_lama} />
      //   ) : (
      //     row.original.data_lama
      //   )
      // },
    },
    {
      accessorKey: 'data_baru',
      header: 'Data Hasil Perubahan',
      // cell: ({ row }) => {
      //   const isImage = isImageUrl(row.original.data_baru)
      //   return isImage ? (
      //     <img width={100} height={100} src={row.original.data_baru} />
      //   ) : (
      //     row.original.data_baru
      //   )
      // },
    },
  ]

  if (loading) {
    return <Skeleton className="height-[400px] w-full" />
  }
  return (
    <div className="flex  flex-col gap-4">
      <ButtonTitleGroup
        link="/modules/website-utama/kerjasama/kategori-kerjasama"
        buttonGroup={[]}
        label="Log Data "
        isBack
      />

      <div className="flex gap-4 flex-col md:flex-row">
        <div>
          <div>
            <div className="text-[#999999] text-sm">Nama Bidang Kerjasama</div>
            <div className="text-green-600 font-medium text-3xl">
              {fieldOfCooperationDetail?.nama_bidang_kerjasama}
            </div>
            <div>
              <div className="text-[#999999] text-sm">Jumlah Kerjama</div>
              <div className=""> {fieldOfCooperationDetail?.jumlah_kerjasama}</div>
            </div>
          </div>
        </div>
      </div>
 <div className="text-primary">Histori Perubahan Data</div>
      <TableCustom
        tdClassName="whitespace-pre-line"
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
        loading={loadingLog}
      />
    </div>
  )
}

export default FieldOfCooperationLogView
