import { Link } from 'react-router-dom'
import type { ColumnDef } from '@tanstack/react-table'

export const DummyParticipant = [
  {
    id: 1,
    nama: 'Karvin Halim',
    email: 'karvin@gmail.com',
    phone: '081234567890',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'Bank Central Asia',
    no_rekening: '1234567890',
    atas_nama: 'Karvin Halim',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-01 08:00:00',
  },
  {
    id: 2,
    nama: 'Maya Sari',
    email: 'maya.sari@gmail.com',
    phone: '082345678901',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'Bank Central Asia',
    no_rekening: '1234567890',
    atas_nama: 'Maya Sari',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-02 08:00:00',
  },
  {
    id: 3,
    nama: 'Rizki Pratama',
    email: 'rizki.pratama@gmail.com',
    phone: '083456789012',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'Bank Central Asia',
    no_rekening: '1234567890',
    atas_nama: 'Rizki Pratama',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-03 08:00:00',
  },
  {
    id: 4,
    nama: 'Dewi Lestari',
    email: 'dewi.lestari@gmail.com',
    phone: '084567890123',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'Bank Mandiri',
    no_rekening: '9876543210',
    atas_nama: 'Dewi Lestari',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-04 09:00:00',
  },
  {
    id: 5,
    nama: 'Andi Saputra',
    email: 'andi.saputra@gmail.com',
    phone: '085678901234',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'BNI',
    no_rekening: '1122334455',
    atas_nama: 'Andi Saputra',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-05 10:00:00',
  },
  {
    id: 6,
    nama: 'Siti Rahma',
    email: 'siti.rahma@gmail.com',
    phone: '086789012345',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'BRI',
    no_rekening: '2233445566',
    atas_nama: 'Siti Rahma',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-06 11:00:00',
  },
  {
    id: 7,
    nama: 'Fajar Nugroho',
    email: 'fajar.nugroho@gmail.com',
    phone: '087890123456',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'CIMB Niaga',
    no_rekening: '3344556677',
    atas_nama: 'Fajar Nugroho',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-07 12:00:00',
  },
  {
    id: 8,
    nama: 'Lina Kartika',
    email: 'lina.kartika@gmail.com',
    phone: '088901234567',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'Permata Bank',
    no_rekening: '4455667788',
    atas_nama: 'Lina Kartika',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-08 13:00:00',
  },
  {
    id: 9,
    nama: 'Agus Setiawan',
    email: 'agus.setiawan@gmail.com',
    phone: '089012345678',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'Danamon',
    no_rekening: '5566778899',
    atas_nama: 'Agus Setiawan',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-09 14:00:00',
  },
  {
    id: 10,
    nama: 'Putri Ayu',
    email: 'putri.ayu@gmail.com',
    phone: '081122334455',
    paket: 'Pelatihan',
    harga: 750000,
    bank: 'Bank Syariah Indonesia',
    no_rekening: '6677889900',
    atas_nama: 'Putri Ayu',
    bukti: '/bukti.png',
    waktu_bayar: '2026-04-10 15:00:00',
  },
]

export const ColumnsParticipant: ColumnDef<any>[] = [
  {
    header: '#',
    cell: ({ row }) => row.index + 1,
  },

  {
    accessorKey: 'nama',
    header: 'Nama Lengkap',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p className="font-medium">{row.original.nama}</p>
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
    accessorKey: 'phone',
    header: 'No. Handphone',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <p>{row.original.phone}</p>
        <Link
          to={`https://wa.me/+62${row?.original.phone}`}
          target={'_blank'}
          className="border border-green-600 text-green-500 w-fit px-2 py-1 rounded text-xs"
        >
          Kirim WhatsApp
        </Link>
      </div>
    ),
  },

  {
    header: 'Paket Biaya',
    cell: ({ row }) => (
      <div className="flex flex-col">
        <p>{row.original.paket}</p>
        <p className="text-sm text-gray-600">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
          }).format(row.original.harga)}
        </p>
      </div>
    ),
  },

  {
    header: 'Rek. Penerimaan',
    cell: ({ row }) => (
      <div className="flex flex-col text-sm">
        <p>{row.original.bank}</p>
        <p className="font-semibold">{row.original.no_rekening}</p>
        <p className="text-gray-600">A.N {row.original.atas_nama}</p>
      </div>
    ),
  },

  {
    header: 'Bukti Pembayaran',
    cell: ({ row }) => (
      <img
        src={row?.original?.bukti || '/bukti.png'}
        alt="bukti"
        className="w-[80px] h-[100px] object-cover rounded border"
      />
    ),
  },

  {
    header: 'Waktu Bayar',
    cell: ({ row }) => {
      const date = new Date(row.original.waktu_bayar)

      return (
        <div className="text-sm">
          <p>{date.toLocaleDateString('id-ID')}</p>
          <p>{date.toLocaleTimeString('id-ID')}</p>
        </div>
      )
    },
  },

  {
    id: 'action',
    header: '',
  },
]
