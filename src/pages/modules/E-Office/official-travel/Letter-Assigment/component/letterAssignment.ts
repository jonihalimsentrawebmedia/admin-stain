import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { Content, ContentTable, TDocumentDefinitions } from 'pdfmake/interfaces'

import type { ILetterAssignment } from '../data/types'
import type { ILetterHeader } from '@/pages/modules/E-Office/settings/letter-header/data/types'

interface Props {
  data: ILetterAssignment
  base64Logo: string
  kop_surat: ILetterHeader
}

const GetFontStyle = (style?: string) => {
  const value = style?.toUpperCase() ?? ''

  return {
    bold: value.includes('BOLD'),
    italics: value.includes('ITALIC'),
  }
}

export const GenerateAssignmentLetter = ({
  data,
  kop_surat,
  base64Logo,
}: Props): TDocumentDefinitions => {
  const tanggalSurat = format(new Date(data.tanggal_surat), 'dd MMMM yyyy', {
    locale: id,
  })

  const tanggalMulai = format(new Date(data.tanggal_mulai), 'dd MMMM yyyy', {
    locale: id,
  })

  const tanggalAkhir = format(new Date(data.tanggal_akhir), 'dd MMMM yyyy', {
    locale: id,
  })

  const headerContent: Content[] =
    kop_surat?.pengaturan?.map((item) => ({
      text: item.isi,
      alignment: 'center',
      fontSize: item.ukuran_font,
      margin: [0, 2, 0, 0],
      ...GetFontStyle(item.gaya_font),
    })) ?? []

  const employeeRows: any[] = data.pegawai.map((pegawai, index) => [
    {
      text: String(index + 1),
      alignment: 'center',
    },
    {
      text: pegawai.nik || pegawai.nip || '-',
    },
    {
      text: pegawai.nama_lengkap,
    },
    {
      text: pegawai.jabatan_pegawai || '-',
    },
  ])

  const employeeTable: ContentTable = {
    table: {
      headerRows: 1,
      widths: [30, 120, '*', 150],
      body: [
        [
          {
            text: 'No',
            bold: true,
            fillColor: '#D9D2E9',
            alignment: 'center',
          },
          {
            text: 'NIK/NIP',
            bold: true,
            fillColor: '#D9D2E9',
          },
          {
            text: 'Nama',
            bold: true,
            fillColor: '#D9D2E9',
          },
          {
            text: 'Jabatan',
            bold: true,
            fillColor: '#D9D2E9',
          },
        ],
        ...employeeRows,
      ],
    },
    layout: {
      hLineWidth: () => 0.5,
      vLineWidth: () => 0.5,
      hLineColor: () => '#CFCFCF',
      vLineColor: () => '#CFCFCF',
      paddingTop: () => 5,
      paddingBottom: () => 5,
    },
  }

  return {
    pageSize: 'A4',
    pageMargins: [40, 25, 40, 40],

    defaultStyle: {
      fontSize: 10,
      lineHeight: 1.25,
    },

    content: [
      // ================= HEADER =================
      {
        columns: [
          {
            width: 85,
            image: 'logo',
            fit: [65, 65],
            margin: [0, 5, 0, 0],
          },
          {
            width: '*',
            stack: headerContent,
          },
          {
            width: 85,
            text: '',
          },
        ],
      },

      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 515,
            y2: 0,
            lineWidth: 1.5,
          },
        ],
        margin: [0, 8, 0, 15],
      },

      // ================= JUDUL =================
      {
        text: 'SURAT TUGAS',
        alignment: 'center',
        bold: true,
        decoration: 'underline',
        fontSize: 12,
      },

      {
        text: `Nomor : ${data.nomor_surat}`,
        alignment: 'center',
        margin: [0, 3, 0, 20],
      },

      // ================= DASAR =================
      {
        columns: [
          {
            width: 80,
            text: 'Dasar',
          },
          {
            width: 10,
            text: ':',
          },
          {
            width: '*',
            ol: data.dasar_surat_tugas,
          },
        ],
      },

      // ================= MEMBERI TUGAS =================
      {
        text: 'MEMBERI TUGAS',
        alignment: 'center',
        bold: true,
        fontSize: 12,
        margin: [0, 20, 0, 12],
      },

      // ================= KEPADA =================
      {
        columns: [
          {
            width: 80,
            text: 'Kepada',
          },
          {
            width: 10,
            text: ':',
          },
          {
            width: '*',
            stack: [employeeTable],
          },
        ],
      },

      // ================= UNTUK =================
      {
        margin: [0, 18, 0, 0],
        columns: [
          {
            width: 80,
            text: 'Untuk',
          },
          {
            width: 10,
            text: ':',
          },
          {
            width: '*',
            ol: data.kegiatan,
          },
        ],
      },

      {
        text: `Tempat Kegiatan : ${data.tempat_kegiatan}`,
        margin: [0, 15, 0, 0],
      },

      {
        text: `Pelaksanaan tugas dimulai tanggal ${tanggalMulai} sampai dengan ${tanggalAkhir}.`,
        margin: [0, 5, 0, 0],
      },

      {
        text: `Surat tugas ini berlaku sejak tanggal ${tanggalMulai} sampai dengan ${tanggalAkhir}.`,
        margin: [0, 15, 0, 0],
      },

      {
        text: 'Demikian surat tugas ini dibuat untuk dilaksanakan sebagaimana mestinya.',
        margin: [0, 20, 0, 0],
      },

      // ================= TTD =================
      {
        margin: [0, 35, 0, 0],
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 220,
            stack: [
              {
                text: tanggalSurat,
                alignment: 'center',
              },

              {
                text: data.nama_jabatan_struktural ?? 'Pejabat Yang Menugaskan',
                alignment: 'center',
                margin: [0, 5, 0, 0],
              },

              {
                text: '',
                margin: [0, 70, 0, 0],
              },

              {
                text: data.nama_disahkan_oleh,
                alignment: 'center',
                bold: true,
                decoration: 'underline',
              },

              {
                text: `NIP. ${data.nip}`,
                alignment: 'center',
                margin: [0, 2, 0, 0],
              },
            ],
          },
        ],
      },
    ],

    images: {
      logo: base64Logo,
    },
  }
}
