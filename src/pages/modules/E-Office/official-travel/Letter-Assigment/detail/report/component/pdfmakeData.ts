import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ILetterHeader, IResponseReportLetter } from '../data/types'

interface Props {
  data: IResponseReportLetter
  logoBase64?: string
  kop_surat: ILetterHeader
}

export const ReportLetterPdf = ({ data, logoBase64, kop_surat }: Props): TDocumentDefinitions => {
  const laporan = data.laporan

  const laporanPelaksana =
    laporan.laporan_pelaksana?.length > 0
      ? laporan.laporan_pelaksana.map((item: string, i: number) => [`${i + 1}.`, item])
      : [['-', '-']]

  const pegawaiText =
    data.pegawai?.length > 0
      ? data.pegawai.map((item, i) => `${i + 1}. ${item.nama_lengkap}`).join('\n')
      : '-'

  const tableRows: any[] = [
    [
      { text: '1', alignment: 'center' },
      'Dasar Pelaksanaan Perjalanan Dinas',
      laporan.dasar_perjalanan_dinas ?? '-',
    ],
    [{ text: '2', alignment: 'center' }, 'Nama Pegawai Yang Ditugaskan', pegawaiText],
    [
      { text: '3', alignment: 'center' },
      'Tempat Tujuan / Tanggal',
      [
        data.tempat_kegiatan,
        '\n',
        format(new Date(data.tanggal_mulai_kegiatan), 'dd MMMM yyyy', {
          locale: id,
        }),
      ],
    ],
    [
      { text: '4', alignment: 'center' },
      'Laporan Pelaksanaan',
      laporanPelaksana.map(([no, text]) => ({
        text: `${no} ${text}`,
        margin: [0, 0, 0, 3],
      })),
    ],
    [{ text: '5', alignment: 'center' }, 'Tindak Lanjut', laporan.tindak_lanjut ?? '-'],
    [{ text: '6', alignment: 'center' }, 'Saran', laporan.saran ?? '-'],
  ]

  const signatureRows: any[] = data.pegawai.map((item, index) => [
    `${index + 1}`,
    item.nama_lengkap,
    `${index + 1}.`,
  ])

  const kopSuratContent: any[] =
    kop_surat?.pengaturan?.map((item, index) => ({
      text: item.isi,
      fontSize: index === 0 ? Math.max(item.ukuran_font ?? 12, 16) : item.ukuran_font,
      bold: ['bold', 'bolditalic'].includes(item.gaya_font),
      italics: ['italic', 'bolditalic'].includes(item.gaya_font),
      alignment: 'center' as const,
      margin: [0, 1, 0, 1],
    })) ?? []

  return {
    pageSize: 'A4',
    pageMargins: [32, 24, 32, 32],

    defaultStyle: {
      fontSize: 10,
    },

    content: [
      // ==========================
      // KOP SURAT
      // ==========================
      {
        table: {
          widths: [75, '*'],
          body: [
            [
              {
                border: [false, false, false, false],
                alignment: 'center',
                verticalAlignment: 'middle',
                margin: [0, 0, 0, 0],
                stack: logoBase64
                  ? [
                      {
                        image: logoBase64,
                        width: 65,
                        alignment: 'center',
                      },
                    ]
                  : [],
              },

              {
                border: [false, false, false, false],
                stack: kopSuratContent,
              },
            ],
          ],
        },
        layout: 'noBorders',
      },

      // GARIS KOP SURAT
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 0,
            x2: 530,
            y2: 0,
            lineWidth: 1.5,
          },
        ],
        margin: [0, 8, 0, 18],
      },

      // ==========================
      // TUJUAN SURAT
      // ==========================
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 250,
            stack: [
              {
                text: `${laporan.tempat ?? 'Panyabungan'}, ${format(
                  new Date(laporan.tanggal ?? new Date()),
                  'dd MMMM yyyy',
                  {
                    locale: id,
                  }
                )}`,
                margin: [0, 0, 0, 8],
              },

              {
                text: 'Kepada',
              },

              {
                text: 'Yth. Ketua STAIN Mandailing Natal',
              },

              {
                text: `Di ${data?.laporan.tempat}`,
                margin: [0, 5, 0, 0],
              },
            ],
          },
        ],
      },

      // ==========================
      // PERIHAL
      // ==========================
      {
        margin: [0, 20, 0, 15],
        text: [
          {
            text: 'Perihal : ',
            bold: true,
          },
          {
            text: laporan.perihal ?? 'Laporan Perjalanan Dinas',
            bold: true,
          },
        ],
      },

      // ==========================
      // PEMBUKA
      // ==========================
      {
        text: [
          'Dengan hormat, bersama ini disampaikan laporan hasil perjalanan dinas terkait ',
          {
            text: data.maksud_perjalanan_dinas,
            bold: true,
          },
          ', dengan rincian sebagai berikut:',
        ],
        lineHeight: 1.5,
        margin: [0, 0, 0, 12],
      },

      // ==========================
      // TABEL LAPORAN
      // ==========================
      {
        table: {
          headerRows: 1,
          widths: [25, 160, '*'],
          body: [
            [
              {
                text: 'No',
                bold: true,
                alignment: 'center',
                fillColor: '#D9D4EA',
              },
              {
                text: 'Uraian',
                bold: true,
                fillColor: '#D9D4EA',
              },
              {
                text: 'Penjelasan',
                bold: true,
                fillColor: '#D9D4EA',
              },
            ],
            ...tableRows,
          ],
        },
        layout: {
          hLineColor: () => '#BDBDBD',
          vLineColor: () => '#BDBDBD',
          hLineWidth: () => 0.8,
          vLineWidth: () => 0.8,
        },
      },

      // ==========================
      // PENUTUP
      // ==========================
      {
        margin: [0, 15, 0, 15],
        text: 'Demikian laporan ini kami sampaikan, atas perhatian dan petunjuk Bapak kami ucapkan terima kasih.',
        lineHeight: 1.5,
      },

      // ==========================
      // TABEL TANDA TANGAN
      // ==========================
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 280,
            table: {
              headerRows: 1,
              widths: [25, '*', 90],
              body: [
                [
                  {
                    text: 'No',
                    bold: true,
                    fillColor: '#D9D4EA',
                  },
                  {
                    text: 'Nama',
                    bold: true,
                    fillColor: '#D9D4EA',
                  },
                  {
                    text: 'Tanda Tangan',
                    bold: true,
                    fillColor: '#D9D4EA',
                  },
                ],
                ...signatureRows,
              ],
            },
            layout: {
              hLineColor: () => '#BDBDBD',
              vLineColor: () => '#BDBDBD',
              hLineWidth: () => 0.8,
              vLineWidth: () => 0.8,
            },
          },
        ],
      },
    ],
  }
}
