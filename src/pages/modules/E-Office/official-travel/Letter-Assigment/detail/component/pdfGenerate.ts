import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'

const formatTanggal = (date?: string) => {
  if (!date) return '-'

  return format(new Date(date), 'dd MMMM yyyy', {
    locale: id,
  })
}

export const GeneratePDFSPD = (data: any, logoBase64: string): TDocumentDefinitions => {
  const sppd = data?.sppd?.[0]
  console.log(data)
  console.log(sppd)

  const lamaPerjalanan =
    sppd?.tanggal_surat && data?.tanggal_akhir
      ? differenceInDays(new Date(data.tanggal_akhir), new Date(data.tanggal_mulai)) + 1
      : 0

  return {
    pageSize: 'A4',

    pageMargins: [25, 20, 25, 30],

    defaultStyle: {
      fontSize: 9,
    },

    content: [
      {
        margin: [0, 8, 0, 5],

        columns: [
          {
            width: 80,

            image: logoBase64,

            fit: [60, 60],

            alignment: 'center',
          },

          {
            width: '*',

            alignment: 'center',

            stack:
              data?.kop_surat?.pengaturan?.map((item: any) => ({
                text: item.isi,
                fontSize: item.ukuran_font,
                bold: item.gaya_font === 'bold',
                italics: item.gaya_font === 'italic',
              })) ?? [],
          },
        ],
      },

      {
        margin: [0, 5, 0, 12],

        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 545,
            y2: 0,
            lineWidth: 1.5,
          },
        ],
      },

      /**
       * NOMOR
       */
      {
        margin: [260, 0, 0, 10],

        table: {
          widths: [90, 10, '*'],

          body: [
            ['Lembar Ke', ':', '1'],
            ['Kode Nomor', ':', ''],
            ['Nomor', ':', data?.nomor_surat ?? '-'],
          ],
        },

        layout: 'noBorders',
      },

      {
        text: 'SURAT PERJALANAN DINAS (SPD)',

        bold: true,

        fontSize: 13,

        alignment: 'center',

        decoration: 'underline',

        margin: [0, 0, 0, 10],
      },

      /**
       * TABEL UTAMA
       */
      {
        table: {
          widths: [30, 280, '*'],
          heights: (rowIndex) => {
            if (rowIndex === 7) return 95
            return 'auto'
          },
          body: [
            ['1.', 'Pejabat Pembuat Komitmen', data?.nama_disahkan_oleh ?? '-'],

            [
              '2.',
              'Nama / NIP Pegawai',
              `${data?.nama_disahkan_oleh ?? '-'}\nNIP. ${data?.nip ?? '-'}`,
            ],

            [
              '3.',
              {
                stack: [
                  'a. Pangkat dan Golongan',
                  'b. Jabatan/Instansi',
                  'c. Tingkat Biaya Perjalanan Dinas',
                ],
              },

              {
                stack: ['a. -', `b. ${data?.nama_unit_kerja ?? '-'}`, 'c. -'],
              },
            ],

            ['4.', 'Maksud Perjalanan Dinas', data?.kegiatan?.join(', ') ?? '-'],

            ['5.', 'Alat angkut yang dipergunakan', sppd?.nama_jenis_transportasi ?? '-'],

            [
              '6.',
              {
                stack: ['a. Tempat Berangkat', 'b. Tujuan Berangkat'],
              },

              {
                stack: [`a. ${sppd?.tempat_asal ?? '-'}`, `b. ${sppd?.tempat_tujuan ?? '-'}`],
              },
            ],

            [
              '7.',
              {
                stack: [
                  'a. Lamanya Perjalanan Dinas',
                  'b. Tanggal Berangkat',
                  'c. Tanggal Harus Kembali / Tiba di tempat baru',
                ],
              },

              {
                stack: [
                  `a. ${lamaPerjalanan} hari`,
                  `b. ${formatTanggal(data?.tanggal_mulai)}`,
                  `c. ${formatTanggal(data?.tanggal_akhir)}`,
                ],
              },
            ],

            [
              '8.',
              {
                colSpan: 2,
                stack: [
                  {
                    columns: [
                      {
                        width: 170,
                        text: 'Pengikut: Nama',
                      },
                      {
                        width: 170,
                        text: 'Tanggal Lahir',
                        alignment: 'center',
                      },
                      {
                        width: '*',
                        text: 'Keterangan',
                        alignment: 'center',
                      },
                    ],
                  },
                  {
                    margin: [0, 2, 0, 0],
                    canvas: [
                      {
                        type: 'line',
                        x1: 170,
                        y1: -15,
                        x2: 170,
                        y2: 85,
                        lineWidth: 0.5,
                      },
                      {
                        type: 'line',
                        x1: 340,
                        y1: -15,
                        x2: 340,
                        y2: 85,
                        lineWidth: 0.5,
                      },
                    ],
                  },
                  {
                    margin: [4, -85, 0, 0],
                    text: 'a.\n\nb.\n\nc.\n\nd.',
                  },
                ],
              },
            ],
            [
              '9.',
              {
                stack: ['Pembebanan Anggaran', '', 'a. Instansi', 'b. Akun Rekening Anggaran'],
              },

              {
                stack: ['', '', `a. ${data?.nama_unit_kerja ?? '-'}`, `b. ${sppd?.akun ?? '-'}`],
              },
            ],

            ['10.', 'Keterangan Lain-lain', sppd?.lain_lain ?? '-'],
          ],
        },

        layout: {
          hLineWidth: () => 0.6,
          vLineWidth: () => 0.6,

          hLineColor: () => '#666',
          vLineColor: () => '#666',

          paddingLeft: () => 4,
          paddingRight: () => 4,

          paddingTop: () => 3,
          paddingBottom: () => 3,
        },
      },

      {
        text: '*) Coret yang tidak perlu',

        margin: [0, 5, 0, 30],
      },

      /**
       * TTD
       */
      {
        columns: [
          {
            width: '*',
            text: '',
          },

          {
            width: 220,

            stack: [
              {
                columns: [
                  {
                    width: 90,
                    text: 'Dikeluarkan di',
                  },
                  {
                    width: 10,
                    text: ':',
                  },
                  {
                    text: sppd?.tempat_asal ?? '-',
                  },
                ],
              },

              {
                columns: [
                  {
                    width: 90,
                    text: 'Pada Tanggal',
                  },
                  {
                    width: 10,
                    text: ':',
                  },
                  {
                    text: formatTanggal(sppd?.tanggal_surat),
                  },
                ],
              },

              {
                text: 'Pejabat Pembuat Komitmen',

                margin: [0, 5, 0, 70],
              },

              {
                text: sppd?.nama_disahkan_oleh ?? '-',

                bold: true,

                decoration: 'underline',
              },
            ],
          },
        ],
      },
    ],
  }
}
