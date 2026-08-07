import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UseGetInvoiceInPatient } from './hooks.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { GeneratePdfInvoiceInPatient } from './component/pdfGenerateInvoice'

const InvoiceInPatient = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { invoice, loading } = UseGetInvoiceInPatient(id ?? '')

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)

  const statusLabel =
    invoice?.status === 'SELESAI'
      ? 'Selesai'
      : invoice?.status === 'MENUNGGU'
        ? 'Menunggu'
        : invoice?.status === 'DIPANGGIL'
          ? 'Dipanggil'
          : 'Dibatalkan'

  const badgeColor =
    invoice?.status === 'SELESAI'
      ? 'bg-green-100 text-green-700'
      : invoice?.status === 'MENUNGGU'
        ? 'bg-yellow-100 text-yellow-700'
        : invoice?.status === 'DIPANGGIL'
          ? 'bg-blue-100 text-blue-700'
          : 'bg-red-100 text-red-700'

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Memuat data...</p>
      </div>
    )
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Data tidak ditemukan</p>
      </div>
    )
  }

  const totalRuangan = (invoice.informasi_ruangan ?? []).reduce(
    (sum, r) => sum + (r.lama_dirawat ?? 0) * r.harga_per_hari,
    0
  )
  const totalTindakan = (invoice.daftar_tindakan ?? []).reduce(
    (sum, t) => sum + (t.harga ?? 0),
    0
  )
  const totalObat = (invoice.daftar_obat ?? []).reduce(
    (sum, o) => sum + (o.total ?? 0),
    0
  )
  const totalRingkasan = (invoice.ringkasan_perawatan ?? []).reduce(
    (sum, r) => sum + (r.harga ?? 0),
    0
  )
  const grandTotal = totalRuangan + totalRingkasan + totalTindakan + totalObat

  return (
    <div className="flex flex-col p-6 gap-6 min-h-[824px]">
      {/* Top Bar */}
      <div className="flex flex-row items-center gap-4 w-full h-10">
        <button
          className="flex items-center justify-center w-10 h-10 bg-white border border-primary rounded-lg hover:bg-primary/5 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="#278374"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="flex-1 text-[28px] font-semibold leading-9 text-neutral font-manrope">
          Lihat Tagihan
        </p>
        <ButtonGoToGuide titleGuide={'Lihat Tagihan'} valueGuide="SIM_RS_SERVICES" />
        <Button
          variant="outline"
          className="bg-white text-primary border-primary hover:text-primary"
          onClick={() => {
            if (invoice) GeneratePdfInvoiceInPatient(invoice).open()
          }}
        >
          <Printer />
          Cetak Tagihan
        </Button>
      </div>

      {/* Section 1 - Informasi Registrasi */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row items-center gap-2 w-full h-[30px]">
          <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
            Informasi Registrasi
          </p>
          <div className="flex-1 border border-warning" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
          <div>
            <p className="text-sm text-gray-500">No. Pendaftaran</p>
            <p className="text-base font-medium">{invoice.no_pendaftaran}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">No. Rekam Medis</p>
            <p className="text-base font-medium">{invoice.no_rekam_medis}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Nama Pasien</p>
            <p className="text-base font-medium">{invoice.nama_pasien}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Poli</p>
            <p className="text-base font-medium">{invoice.nama_poli}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Pendaftaran</p>
            <p className="text-base font-medium">
              {format(new Date(invoice.tanggal_pendaftaran), 'dd-MM-yyyy HH:mm')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor}`}>
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Section 2 - Informasi Ruangan */}
      {(invoice.informasi_ruangan ?? []).length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full h-[30px]">
            <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
              Informasi Ruangan
            </p>
            <div className="flex-1 border border-warning" />
          </div>
          <div className="w-full border border-gray-300 bg-white">
          <div className="flex flex-row items-center w-full h-[38px] bg-primary border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center w-[60px] px-2 text-sm text-white">No</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Ruangan</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Jenis</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Tanggal Masuk</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Tanggal Keluar</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Lama (Hari)</div>
            <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">Harga/Hari</div>
            <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">Total Biaya</div>
          </div>
          {(invoice.informasi_ruangan ?? []).map((item, index) => (
            <div key={index} className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
              <div className="flex items-center justify-center w-[60px] px-2 text-sm text-neutral">{index + 1}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                {item.nama_ruangan} ({item.nomor_ruangan})
              </div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.nama_jenis_ruangan}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                {format(new Date(item.tanggal_masuk), 'dd-MM-yyyy HH:mm')}
              </div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                {item.tanggal_keluar ? format(new Date(item.tanggal_keluar), 'dd-MM-yyyy HH:mm') : '-'}
              </div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.lama_dirawat ?? '-'}</div>
              <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">{formatRupiah(item.harga_per_hari)}</div>
              <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">
                {formatRupiah((item.lama_dirawat ?? 0) * item.harga_per_hari)}
              </div>
            </div>
          ))}
          <div className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center flex-[6] px-2 text-sm font-semibold text-primary">Total Ruangan</div>
            <div className="flex items-center justify-end flex-[2] px-2 text-sm font-bold text-primary">
              {formatRupiah((invoice.informasi_ruangan ?? []).reduce(
                (sum, r) => sum + (r.lama_dirawat ?? 0) * r.harga_per_hari, 0
              ))}
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Section 3 - Ringkasan Perawatan (Diagnosa) */}
      {(invoice.ringkasan_perawatan ?? []).length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full h-[30px]">
            <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
              Ringkasan Perawatan
            </p>
            <div className="flex-1 border border-warning" />
          </div>
          <div className="w-full border border-gray-300 bg-white">
          <div className="flex flex-row items-center w-full h-[38px] bg-primary border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center w-[60px] px-2 text-sm text-white">No</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Tanggal</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Kode</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Nama</div>
            <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">Harga</div>
          </div>
          {(invoice.ringkasan_perawatan ?? []).map((item, index) => (
            <div key={index} className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
              <div className="flex items-center justify-center w-[60px] px-2 text-sm text-neutral">{index + 1}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                {format(new Date(item.tanggal), 'dd-MM-yyyy HH:mm')}
              </div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.kode}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.nama}</div>
              <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">{formatRupiah(item.harga)}</div>
            </div>
          ))}
          <div className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center flex-[4] px-2 text-sm font-semibold text-primary">Total Ringkasan Perawatan</div>
            <div className="flex items-center justify-end flex-[1] px-2 text-sm font-bold text-primary">{formatRupiah(totalRingkasan)}</div>
          </div>
          </div>
        </div>
      )}

      {/* Section 4 - Daftar Tindakan */}
      {(invoice.daftar_tindakan ?? []).length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full h-[30px]">
            <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
              Daftar Tindakan
            </p>
            <div className="flex-1 border border-warning" />
          </div>
          <div className="w-full border border-gray-300 bg-white">
          <div className="flex flex-row items-center w-full h-[38px] bg-primary border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center w-[60px] px-2 text-sm text-white">No</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Tanggal</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Kode</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Nama Tindakan</div>
            <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">Harga</div>
          </div>
          {(invoice.daftar_tindakan ?? []).map((item, index) => (
            <div key={index} className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
              <div className="flex items-center justify-center w-[60px] px-2 text-sm text-neutral">{index + 1}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                {format(new Date(item.tanggal), 'dd-MM-yyyy HH:mm')}
              </div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.kode}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.nama}</div>
              <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">{formatRupiah(item.harga)}</div>
            </div>
          ))}
          <div className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center flex-[4] px-2 text-sm font-semibold text-primary">Total Tindakan</div>
            <div className="flex items-center justify-end flex-[1] px-2 text-sm font-bold text-primary">{formatRupiah(totalTindakan)}</div>
          </div>
          </div>
        </div>
      )}

      {/* Section 5 - Daftar Obat */}
      {(invoice.daftar_obat ?? []).length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full h-[30px]">
            <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
              Daftar Obat
            </p>
            <div className="flex-1 border border-warning" />
          </div>
          <div className="w-full border border-gray-300 bg-white">
          <div className="flex flex-row items-center w-full h-[38px] bg-primary border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center w-[60px] px-2 text-sm text-white">No</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Nama Obat</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Satuan</div>
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Jumlah</div>
            <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">Harga Satuan</div>
            <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">Total</div>
          </div>
          {(invoice.daftar_obat ?? []).map((item, index) => (
            <div key={index} className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
              <div className="flex items-center justify-center w-[60px] px-2 text-sm text-neutral">{index + 1}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.nama_obat}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.satuan}</div>
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.jumlah}</div>
              <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">{formatRupiah(item.harga_satuan)}</div>
              <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">{formatRupiah(item.total)}</div>
            </div>
          ))}
          <div className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center flex-[4] px-2 text-sm font-semibold text-primary">Total Obat</div>
            <div className="flex items-center justify-end flex-[2] px-2 text-sm font-bold text-primary">{formatRupiah(totalObat)}</div>
          </div>
          </div>
        </div>
      )}

      {/* Section 6 - Ringkasan Pembayaran */}
      {(invoice.ringkasan?.detail_pembayaran ?? []).length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full h-[30px]">
            <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
              Ringkasan Pembayaran
            </p>
            <div className="flex-1 border border-warning" />
          </div>
          <div className="w-full border border-gray-300 bg-white">
          <div className="flex flex-row items-center w-full h-[38px] bg-primary border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">Sumber Biaya Pengobatan</div>
            <div className="flex items-center justify-center w-[60px] px-2 text-sm text-white">(%)</div>
            <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">Jlh. Dibayar</div>
          </div>
          {(invoice.ringkasan?.detail_pembayaran ?? []).map((item, index) => (
            <div key={index} className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
              <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">{item.nama_sumber_biaya}</div>
              <div className="flex items-center justify-center w-[60px] px-2 text-sm text-neutral">{item.persentase}</div>
              <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">{formatRupiah(item.jumlah)}</div>
            </div>
          ))}
          <div className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
            <div className="flex items-center justify-center flex-[2] px-2 text-sm font-semibold text-primary">Grand Total</div>
            <div className="flex items-center justify-end flex-[1] px-2 text-sm font-bold text-primary">
              {formatRupiah(invoice.ringkasan?.total_tagihan ?? grandTotal)}
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceInPatient
