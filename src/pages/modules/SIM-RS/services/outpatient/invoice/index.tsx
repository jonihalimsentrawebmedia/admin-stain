import { useNavigate, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { UseGetInvoiceOutPatient } from '../hooks/index.tsx'
import ButtonGoToGuide from '@/pages/modules/website-utama/panduan/components/ButtonGoToGuide'
import { GeneratePdfInvoice } from './component/pdfGenerateInvoice'

const InvoiceOutPatient = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { invoice, loading } = UseGetInvoiceOutPatient(id ?? '')

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
            if (invoice) GeneratePdfInvoice(invoice).open()
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

      {/* Section 2 - Daftar Tagihan */}
      {invoice.daftar_tagihan.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full h-[30px]">
            <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
              Daftar Tagihan
            </p>
            <div className="flex-1 border border-warning" />
          </div>
          <div className="w-full border border-gray-300 bg-white">
              {/* Table Head */}
              <div className="flex flex-row items-center w-full h-[38px] bg-primary border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
                <div className="flex items-center justify-center w-[60px] px-2 text-sm text-white">
                  No
                </div>
                <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">
                  Komponen
                </div>
                <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">
                  Nama
                </div>
                <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">
                  Jumlah
                </div>
                <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">
                  Harga
                </div>
                <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">
                  Subtotal
                </div>
              </div>
              {/* Table Rows */}
              {invoice.daftar_tagihan.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words"
                >
                  <div className="flex items-center justify-center w-[60px] px-2 text-sm text-neutral">
                    {index + 1}
                  </div>
                  <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                    {item.komponen}
                  </div>
                  <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                    {item.nama}
                  </div>
                  <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                    {item.jumlah}
                  </div>
                  <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">
                    {formatRupiah(item.harga)}
                  </div>
                  <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">
                    {formatRupiah(item.subtotal)}
                  </div>
                </div>
              ))}
              {/* Total Row */}
              <div className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words">
                <div className="flex items-center justify-center flex-[4] px-2 text-sm font-semibold text-primary">
                  Total
                </div>
                <div className="flex items-center justify-end flex-[2] px-2 text-sm font-bold text-primary">
                  {formatRupiah(invoice.total_tagihan)}
                </div>
              </div>
          </div>
        </div>
      )}

      {/* Section 3 - Ringkasan Pembayaran */}
      {invoice.ringkasan.detail_pembayaran.length > 0 && (
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row items-center gap-2 w-full h-[30px]">
            <p className="text-[22px] font-medium leading-[30px] text-primary font-manrope whitespace-nowrap">
              Ringkasan Pembayaran
            </p>
            <div className="flex-1 border border-warning" />
          </div>
          <div className="w-full border border-gray-300 bg-white rounded-lg">
              {/* Table Head */}
              <div className="flex flex-row items-center w-full h-[38px] bg-primary border-b border-gray-300 rounded-t-lg [&>div]:min-w-0 [&>div]:break-words">
                <div className="flex items-center justify-center flex-1 px-2 text-sm text-white">
                  Sumber Biaya Pengobatan
                </div>
                <div className="flex items-center justify-center w-[60px] px-2 text-sm text-white">
                  (%)
                </div>
                <div className="flex items-center justify-end flex-1 px-2 text-sm text-white">
                  Jlh. Dibayar
                </div>
              </div>
              {/* Table Rows */}
              {invoice.ringkasan.detail_pembayaran.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center w-full h-[38px] border-b border-gray-300 [&>div]:min-w-0 [&>div]:break-words"
                >
                  <div className="flex items-center justify-center flex-1 px-2 text-sm text-neutral">
                    {item.nama_sumber_biaya}
                  </div>
                  <div className="flex items-center justify-center w-[60px] px-2 text-sm text-neutral">
                    {item.persentase}
                  </div>
                  <div className="flex items-center justify-end flex-1 px-2 text-sm text-neutral">
                    {formatRupiah(item.jumlah)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceOutPatient
