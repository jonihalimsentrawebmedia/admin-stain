import { useParams } from 'react-router-dom'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { UseGetDetailPrescription } from '../hooks/index.tsx'
import { format, isValid, parseISO } from 'date-fns'
import { ButtonStatusObat } from './ButtonStatusObat.tsx'

const safeFormatDate = (value: string | null | undefined, fmt: string) => {
  if (!value) return '-'
  const date = parseISO(value)
  return isValid(date) ? format(date, fmt) : '-'
}

const DetailPrescription = () => {
  const { id } = useParams<{ id: string }>()
  const { detail, loading } = UseGetDetailPrescription(id ?? '')

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (!detail) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    )
  }

  const statusBadgeColor =
    detail.status_resep === 'MENUNGGU'
      ? 'bg-yellow-100 text-yellow-700'
      : detail.status_resep === 'DISERAHKAN'
        ? 'bg-green-100 text-green-700'
        : 'bg-red-100 text-red-700'

  const statusLabel =
    detail.status_resep === 'MENUNGGU'
      ? 'Menunggu'
      : detail.status_resep === 'DISERAHKAN'
        ? 'Diserahkan'
        : 'Dibatalkan'

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)

  return (
    <div className="space-y-5">
      <ButtonTitleGroup isBack label="Detail Resep" buttonGroup={[]} />

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Informasi Registrasi</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">No. Registrasi</p>
            <p className="text-base font-medium">{detail.pendaftaran.no_pendaftaran}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Registrasi</p>
            <p className="text-base font-medium">
              {safeFormatDate(detail.pendaftaran.tanggal_pendaftaran, 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">No. Rekam Medis</p>
            <p className="text-base font-medium">{detail.pasien.no_rekam_medis}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nama Pasien</p>
            <p className="text-base font-medium">{detail.pasien.nama_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Poli</p>
            <p className="text-base font-medium">{detail.pendaftaran.nama_poli}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dokter</p>
            <p className="text-base font-medium">{detail.dokter.nama_dokter}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status Obat</p>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeColor}`}>
                {statusLabel}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Resep</p>
            <p className="text-base font-medium">
              {safeFormatDate(detail.tanggal_resep, 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          {detail.alasan_pembatalan && (
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Alasan Pembatalan</p>
              <p className="text-base font-medium text-red-600">{detail.alasan_pembatalan}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <p className="text-lg font-semibold text-primary mb-4">Resep Obat</p>
        {detail.daftar_obat && detail.daftar_obat.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary">
                  <th className="border text-white px-3 py-2 text-left w-10">#</th>
                  <th className="border text-white px-3 py-2 text-left">Nama Obat</th>
                  <th className="border text-white px-3 py-2 text-left">Satuan</th>
                  <th className="border text-white px-3 py-2 text-right">Harga Satuan</th>
                  <th className="border text-white px-3 py-2 text-center">Frekuensi</th>
                  <th className="border text-white px-3 py-2 text-center">Durasi</th>
                  <th className="border text-white px-3 py-2 text-center">Jumlah</th>
                  <th className="border text-white px-3 py-2 text-right">Sub Total</th>
                  <th className="border text-white px-3 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {detail?.daftar_obat?.map((item, idx) => (
                  <tr key={item.id_resep_obat} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{idx + 1}</td>
                    <td className="border px-3 py-2 font-medium">{item.nama_obat}</td>
                    <td className="border px-3 py-2">{item.satuan}</td>
                    <td className="border px-3 py-2 text-right">
                      {formatRupiah(item.harga_satuan)}
                    </td>
                    <td className="border px-3 py-2 text-center">{item.frekuensi}x/hari</td>
                    <td className="border px-3 py-2 text-center">{item.durasi} hari</td>
                    <td className="border px-3 py-2 text-center">{item.jumlah}</td>
                    <td className="border px-3 py-2 text-right font-medium">
                      {formatRupiah(item.sub_total)}
                    </td>
                    <td className="border px-3 py-2 text-center">
                      <ButtonStatusObat idResep={detail.id_resep} item={item} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">Belum ada data obat</p>
        )}
      </div>
    </div>
  )
}

export default DetailPrescription
