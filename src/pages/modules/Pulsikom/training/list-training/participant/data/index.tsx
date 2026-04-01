import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'

export interface IParticipant {
  id_peserta: string
  id_satuan_organisasi: string
  id_training: string
  id_biaya_pendaftaran: string
  id_rekening: string
  nama_biaya_pendaftaran: string
  harga_biaya_pendaftaran: number
  nama_rekening_pembayaran: string
  no_rekening_pembayaran: string
  atas_nama_pembayaran: string
  url_gambar_training: string
  nama_lengkap: string
  email: string
  no_handphone: string
  institusi: string
  alasan_mengikuti: string
  asal_kampus: string
  jenjang_pendidikan: string
  tanggal_bayar: string
  file_upload_pembayaran: string
  key_upload_pembayaran: string
  status_peserta: 'PENDING' | 'DITERIMA' | 'DITOLAK' | 'BATAL'
  KonfirmasiAt: string | null
  KonfirmasiUser: string | null
  is_valid_pembayaran: boolean
  batal_at: string | null
  batal_user: string | null
  alasan_batal: string | null
  is_refund_pembayaran: boolean
  refund_at: string | null
  refund_user: string | null
  nama_bank: string | null
  no_rekening: string | null
  atas_nama_rekening: string | null
  jumlah_refund: number | null
  url_file_refund: string | null
  key_file_refund: string | null
  ditolak_at: string | null
  ditolak_user: string | null
  alasan_ditolak: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string | null
  nama_user_updated: string | null
}

export const ColumnsParticipant: ColumnDef<IParticipant>[] = [
  {
    accessorKey: 'no',
    header: '#',
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: 'nama_lengkap',
    header: 'Nama Lengkap',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p className="font-medium">{row.original.nama_lengkap}</p>
      </div>
    ),
  },

  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <p className="text-sm">{row.original.email}</p>

        <div className="flex gap-1">
          <button className="border px-2 py-1 rounded text-xs">Kirim Email</button>
          <button className="border px-2 py-1 rounded text-xs">Riwayat Email</button>
        </div>
      </div>
    ),
  },

  {
    accessorKey: 'no_handphone',
    header: 'No. Handphone',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <p>{row.original.no_handphone}</p>
        <Link
          to={`https://wa.me/+62${row?.original.no_handphone}`}
          target={'_blank'}
          className="border border-green-600 text-green-500 w-fit px-2 py-1 rounded text-xs"
        >
          Kirim WhatsApp
        </Link>
      </div>
    ),
  },

  {
    accessorKey: 'nama_biaya_pendaftaran',
    header: 'Paket Biaya',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p>{row.original.nama_biaya_pendaftaran}</p>
        <p className="text-sm text-gray-600">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(row.original.harga_biaya_pendaftaran)}
        </p>
      </div>
    ),
  },

  {
    accessorKey: 'nama_rekening_pembayaran',
    header: 'Rek. Penerimaan',
    cell: ({ row }) => (
      <div className="flex flex-col text-sm">
        <p>{row.original.nama_rekening_pembayaran}</p>
        <p className="font-semibold">{row.original.no_rekening}</p>
        <p className="text-gray-600">A.N {row.original.atas_nama_pembayaran}</p>
      </div>
    ),
  },

  {
    accessorKey: 'file_upload_pembayaran',
    header: 'Bukti Pembayaran',
    cell: ({ row }) => (
      <img
        src={row?.original?.file_upload_pembayaran || '/bukti.png'}
        alt="bukti"
        className="w-[80px] h-[100px] object-cover rounded border"
      />
    ),
  },

  {
    accessorKey: 'tanggal_bayar',
    header: 'Waktu Bayar',
    cell: ({ row }) => {
      const date = new Date(row.original.tanggal_bayar)

      return (
        <div className="text-sm">
          <p>{date.toLocaleDateString('id-ID')}</p>
          <p>{date.toLocaleTimeString('id-ID')}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'action',
    header: '',
  },
]
