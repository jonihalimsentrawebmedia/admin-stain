import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { IResponseReportLetter } from '../data/types.ts'

interface Props {
  data: IResponseReportLetter
}

export default function DetailSuratTugasTable({ data }: Props) {
  const formatDate = (date?: string | null) => {
    if (!date) return '-'

    return format(new Date(date), 'dd MMMM yyyy', {
      locale: id,
    })
  }

  return (
    <div className="overflow-hidden rounded-lg border border-[#CDCDCD]">
      {/* Row 1 */}
      <div className="grid grid-cols-4 border-b border-[#CDCDCD] bg-[#F0F8FF]">
        <CellLabel>No. Surat Tugas</CellLabel>
        <CellValue>{data.nomor_surat}</CellValue>

        <CellLabel>Tanggal</CellLabel>
        <CellValue>{formatDate(data.tanggal_surat)}</CellValue>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-4 border-b border-[#CDCDCD] bg-[#F4F9F6]">
        <CellLabel>No. SPPD</CellLabel>
        <CellValue>{data.nomor_surat_sppd}</CellValue>

        <CellLabel>Tanggal</CellLabel>
        <CellValue>{formatDate(data.tanggal_surat_sppd)}</CellValue>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-4 border-b border-[#CDCDCD] bg-[#F0F8FF]">
        <CellLabel>Tanggal Mulai Kegiatan</CellLabel>
        <CellValue>{formatDate(data.tanggal_mulai_kegiatan)}</CellValue>

        <CellLabel>Tanggal Selesai Kegiatan</CellLabel>
        <CellValue>{formatDate(data.tanggal_selesai_kegiatan)}</CellValue>
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-[25%_75%] border-b border-[#CDCDCD] bg-[#F4F9F6]">
        <CellLabel>Maksud Perjalanan Dinas</CellLabel>
        <CellValue>{data.maksud_perjalanan_dinas || '-'}</CellValue>
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-[25%_75%] border-b border-[#CDCDCD] bg-[#F0F8FF]">
        <CellLabel>Tempat Kegiatan</CellLabel>
        <CellValue>{data.tempat_kegiatan || '-'}</CellValue>
      </div>

      {/* Row 6 */}
      <div className="grid grid-cols-[25%_75%] border-b border-[#CDCDCD] bg-[#F4F9F6]">
        <CellLabel>Penandatangan Surat</CellLabel>
        <CellValue>{data.nama_disahkan_oleh || '-'}</CellValue>
      </div>

      {/* Row 7 */}
      <div className="grid grid-cols-[25%_75%] bg-[#F0F8FF]">
        <div className="p-3 text-xs font-bold leading-4 tracking-[0.004em] text-[#0F2942]">
          Yang Ditugaskan
        </div>

        <div className="p-3 text-xs leading-4 tracking-[0.004em] text-[#0F2942]">
          <ol className="list-decimal pl-5 space-y-1">
            {data.pegawai.map((pegawai, index) => (
              <li key={pegawai.id_mail_surat_tugas_pegawai ?? index}>{pegawai.nama_lengkap}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function CellLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-3 text-xs font-bold leading-4 tracking-[0.004em] text-[#0F2942]">
      {children}
    </div>
  )
}

function CellValue({ children }: { children: React.ReactNode }) {
  return <div className="p-3 text-xs leading-4 tracking-[0.004em] text-[#0F2942]">{children}</div>
}
