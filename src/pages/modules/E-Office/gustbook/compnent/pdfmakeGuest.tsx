import { format } from 'date-fns'
import { id } from 'date-fns/locale'

import type { TableCell, TDocumentDefinitions } from 'pdfmake/interfaces'

interface IGuestBook {
  id_buku_tamu: string
  tanggal_kunjungan: string
  nik: string
  nama_lengkap: string
  no_hp: string
  kota: string
  alamat_lengkap: string
  keterangan_bertamu: string

  nama_unit: string
  nama_jenis_keperluan: string
  nama_tujuan_bertamu: string
}

export const generateGuestBookPdf = (data: IGuestBook[]): TDocumentDefinitions => {
  const body: TableCell[][] = []

  body.push([
    {
      text: 'No',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'Tgl Bertamu',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'NIK',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'Nama Lengkap',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'Asal Lembaga',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'Kota',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'Alamat',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'Jenis Keperluan',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
    {
      text: 'Tujuan Bertamu',
      fillColor: '#d9d9d9',
      alignment: 'center',
    },
  ])

  data.forEach((row, index) => {
    body.push([
      {
        text: String(index + 1),
        alignment: 'center',
      },
      {
        text: row.tanggal_kunjungan ? format(new Date(row.tanggal_kunjungan), 'dd/MM/yyyy') : '-',
      },
      {
        text: row.nik || '-',
      },
      {
        text: row.nama_lengkap || '-',
      },
      {
        text: row.nama_unit || '-',
      },
      {
        text: row.kota || '-',
      },
      {
        text: row.alamat_lengkap || '-',
      },
      {
        text: row.nama_jenis_keperluan || '-',
      },
      {
        text: row.nama_tujuan_bertamu || '-',
      },
    ])
  })

  return {
    pageSize: 'A4',
    pageOrientation: 'landscape',

    pageMargins: [30, 40, 30, 40],

    footer: (currentPage, pageCount) => ({
      margin: [30, 10, 30, 10],
      columns: [
        {
          text: `Dicetak pada ${format(new Date(), 'dd MMMM yyyy HH:mm', { locale: id })}`,
          fontSize: 8,
        },
        {
          text: `Halaman ${currentPage} dari ${pageCount}`,
          alignment: 'right',
          fontSize: 8,
        },
      ],
    }),

    content: [
      {
        text: 'DAFTAR TAMU',
        alignment: 'center',
        fontSize: 14,
        margin: [0, 0, 0, 15],
      },

      {
        table: {
          headerRows: 1,
          widths: [20, 'auto', 'auto', '*', '*', '*', '*', 80, 80],
          body,
        },

        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
          paddingTop: () => 4,
          paddingBottom: () => 4,
          paddingLeft: () => 4,
          paddingRight: () => 4,
        },
      },
    ],

    defaultStyle: {
      fontSize: 8,
    },
  }
}
