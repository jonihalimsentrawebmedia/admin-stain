import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup'
import useGetAcreditationDetail from '../controller/useGetAcreditationDetail'
import useGetLogAcreditation from '../controller/useGetLogAcreditation'
import { formatDateTime } from '@/utils/date'
import type { ColumnDef } from '@tanstack/react-table'
import type { LogStatistic } from '../../statistic/model'
import { Skeleton } from '@/components/ui/skeleton'
import TableCustom from '@/components/common/table/TableCustom'
import SelectFilter from '@/components/common/filter/SelectFilter'
import { capitalizeTextSimple } from '../AcreditationViewModel'
function isImageUrl(url: string) {
  return /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url)
}

const AcreditationLogDetail = () => {
  const { acreditationDetail, loading } = useGetAcreditationDetail()
  const { log, loading: loadingLog, meta } = useGetLogAcreditation()
  const createdAt = formatDateTime(acreditationDetail?.created_at ?? null)
  const updatedAt = formatDateTime(acreditationDetail?.updated_at ?? null)
  const startAt = formatDateTime(acreditationDetail?.mulai_berlaku ?? null)
  const endAt = formatDateTime(acreditationDetail?.akhir_berlaku ?? null)
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
        const isImage = isImageUrl(row.original.data_lama)
        return isImage ? (
          <img width={100} height={100} src={row.original.data_lama} />
        ) : (
          row.original.data_lama
        )
      },
    },
    {
      accessorKey: 'data_baru',
      header: 'Data Hasil Perubahan',
      cell: ({ row }) => {
        const isImage = isImageUrl(row.original.data_baru)
        return isImage ? (
          <img width={100} height={100} src={row.original.data_baru} />
        ) : (
          row.original.data_baru
        )
      },
    },
  ]

  if (loading) {
    return <Skeleton className="height-[400px] w-full" />
  }
  return (
    <div className="flex  flex-col gap-4">
      <ButtonTitleGroup
        link="/modules/website-utama/acreditation"
        buttonGroup={[]}
        label="Log Data "
        isBack
      />

      <div className="flex gap-4 flex-col md:flex-row">
        <img
          src={acreditationDetail?.gambar}
          className="w-full sm:w-[340px] mx-auto h-60 object-cover"
          alt=""
        />
        <div>
          <div>
            <div className="text-[#999999] text-sm">Universitas / Prodi*</div>
            <div className="text-green-600 font-medium text-3xl">
              {acreditationDetail?.nama_satuan_organisasi_akreditas}
            </div>
            <div>
              <div className="text-[#999999] text-sm">Uraian</div>
              <div className="">{acreditationDetail?.uraian}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-[#999999] text-sm">Nilai Akreditasi*</div>
                <div className="">
                  {capitalizeTextSimple(acreditationDetail?.nilai_akreditas ?? '')}
                </div>
              </div>
              <div>
                <div className="text-[#999999] text-sm">Lembaga Penilai*</div>
                <div className="">{acreditationDetail?.lembaga_penilaian}</div>
              </div>
              <div>
                <div className="text-[#999999] text-sm">No. Surat Keputusan*</div>
                <div className="">{acreditationDetail?.no_surat_keputusan}</div>
              </div>
              <div>
                <div className="text-[#999999] text-sm">Masa Berlaku*</div>
                <div className="">
                  {startAt.date} s.d {endAt.date}
                </div>
              </div>
              <div>
                <div className="text-[#999999] text-sm">Diposting Oleh*</div>
                <div className="">
                  {acreditationDetail?.nama_user_created}, {createdAt.date}, {createdAt.time}
                </div>
              </div>
              <div>
                <div className="text-[#999999] text-sm">Diperbaharui Oleh*</div>
                <div className="">
                  {acreditationDetail?.nama_user_updated}, {updatedAt.date}, {updatedAt.time}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default AcreditationLogDetail
