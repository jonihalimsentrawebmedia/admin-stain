import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ILetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types'
import type { IDetailSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types'

// ───────── Helper format tanggal ─────────
function fmt(date?: string): string {
  if (!date) return '-'
  return format(new Date(date), 'dd MMMM yyyy', { locale: id })
}

// ───────── Map style kop surat ─────────
function mapStyle({ font, style, size }: { font?: string; style?: string; size?: number }) {
  const safeFont = font && font.trim() !== '' ? font : 'TimesNewRoman'
  const safeStyle = style?.toLowerCase()

  return {
    font: safeFont,
    bold: safeStyle === 'bold' || safeStyle === 'bold italic',
    italics: safeStyle === 'italic' || safeStyle === 'bold italic',
    fontSize: Math.max(Math.round((size || 10) * 0.85 * 10) / 10, 8),
  }
}

// ─────────────────────────────────────────────────────────
// PDF SPPD — Halaman Depan V2 (1 halaman, pengikut di row 8)
// ─────────────────────────────────────────────────────────
export const GeneratePDFFrontV2 = (
  detail: ILetterAssignment,
  logoBase64: string,
  detailSppd?: IDetailSPPD
): TDocumentDefinitions => {
  const pegawaiList = detail.pegawai ?? []
  const sppdData = detailSppd ?? detail.sppd?.[0] ?? ({} as any)
  const pegawaiUtama = pegawaiList[0]

  // ─── Data mapping ───
  const tempatAsal = (sppdData as any)?.tempat_asal || detail.tempat_kegiatan || '-'
  const tempatTujuan = (sppdData as any)?.tempat_tujuan || '-'
  const jenisTransportasi = (sppdData as any)?.nama_jenis_transportasi || '-'
  const maksudKegiatan = detail.kegiatan?.join(', ') || '-'
  const akun = (sppdData as any)?.akun || '-'
  const lainLain = (sppdData as any)?.lain_lain || ''
  const namaPenandatangan = detail.nama_disahkan_oleh || '-'
  const nipPenandatangan = detail.nip || ''
  const namaJabatanUtama = detail.nama_jabatan_struktural || ''
  const satuanKerja = detail.nama_unit_kerja || '-'
  const namaKabupaten = tempatAsal

  // ─── Kop Surat: content texts dari pengaturan ───
  const contentTexts =
    detail.kop_surat?.pengaturan?.map((item) => ({
      text: item.isi,
      alignment: 'center' as const,
      ...mapStyle({
        font: item.jenis_font,
        style: item.gaya_font,
        size: item.ukuran_font,
      }),
    })) ?? []

  // ─── Estimasi tinggi teks untuk middle logo vertikal ───
  const logoSize = 80
  const textColWidth = 595.28 - 40 - 40 - logoSize - 10
  const avgCharWidth = (fs: number) => fs * 0.55

  const estimatedTextHeight = contentTexts.reduce((total, item) => {
    const t = item as { text?: string; fontSize?: number }
    const text = t.text ?? ''
    const fontSize = t.fontSize ?? 12
    const explicitLines = text.split('\n').length
    const charsPerLine = Math.max(1, Math.floor(textColWidth / avgCharWidth(fontSize)))
    const wrappedLines = Math.max(explicitLines, Math.ceil(text.length / charsPerLine))
    return total + fontSize * 1.25 * wrappedLines
  }, 0)
  const logoTopMargin = Math.max((estimatedTextHeight - logoSize) / 2, 0)

  // ─── HEADER: KOP SURAT ───
  const header = {
    margin: [40, 20, 40, 20] as [number, number, number, number],
    stack: [
      {
        columns: logoBase64
          ? [
              {
                width: logoSize,
                stack: [
                  {
                    image: logoBase64,
                    width: logoSize,
                    height: logoSize,
                    alignment: 'center' as const,
                    margin: [0, logoTopMargin, 0, 0] as [number, number, number, number],
                  },
                ],
              },
              { width: '*', alignment: 'center' as const, stack: contentTexts },
            ]
          : [{ width: '*', alignment: 'center' as const, stack: contentTexts }],
        columnGap: 10,
      },
      {
        canvas: [{ type: 'line' as const, x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5 }],
        margin: [0, 5, 0, 0] as [number, number, number, number],
      },
    ],
  }

  // ─── Pengikut rows (row 8) ───
  const pengikutRows = pegawaiList
    .slice(1)
    .map((peg, i) => [
      '',
      `${String.fromCharCode(97 + i)}. ${peg.nama_lengkap}`,
      '-',
      peg.jabatan_pegawai || '',
    ])

  const hasPengikut = pengikutRows.length > 0

  // ─── Single page content ───
  const page: any = {
    stack: [
      // ════ Nomor (kanan atas) ════
      {
        columns: [
          { width: '*', text: '' },
          {
            width: '50%',
            table: {
              widths: ['30%', '70%'],
              body: [
                ['Lembar Ke', ':'],
                ['Kode Nomor', ':'],
                ['Nomor', `: ${detail.nomor_surat ?? '-'}`],
              ],
            },
            layout: 'noBorders' as const,
            fontSize: 8.5,
            margin: [0, 0, 0, 10] as [number, number, number, number],
          },
        ],
        columnGap: 0,
      },

      // ════ JUDUL ════
      {
        text: 'SURAT PERJALANAN DINAS (SPD)',
        alignment: 'center' as const,
        bold: true,
        fontSize: 13,
        decoration: 'underline',
        margin: [0, 0, 0, 10] as [number, number, number, number],
      },

      // ════ TABEL UTAMA (field 1–7) ════
      {
        table: {
          widths: ['48%', '52%'],
          body: [
            // 1. Pejabat Pembuat Komitmen
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [['1.', 'Pejabat Pembuat Komitmen']],
                },
                layout: 'noBorders' as const,
              },
              namaPenandatangan,
            ],

            // 2. Nama / NIP Pegawai
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [['2.', 'Nama / NIP Pegawai']],
                },
                layout: 'noBorders' as const,
              },
              {
                text: [
                  { text: `${pegawaiUtama?.nama_lengkap ?? '-'}\n`, bold: true },
                  pegawaiUtama?.nip?.trim()
                    ? { text: `NIP. ${pegawaiUtama.nip}`, alignment: 'left' as const }
                    : {},
                ],
              },
            ],

            // 3. Pangkat / Jabatan / Tingkat Biaya
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [
                    ['3.', 'a. Pangkat dan Golongan'],
                    ['', 'b. Jabatan/Instansi'],
                    ['', 'c. Tingkat Biaya Perjalanan Dinas'],
                  ],
                },
                layout: 'noBorders' as const,
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    ['a.'],
                    [`b. ${pegawaiUtama?.jabatan_pegawai || '-'} / ${satuanKerja}`],
                    ['c.'],
                  ],
                },
                layout: 'noBorders' as const,
              },
            ],

            // 4. Maksud Perjalanan Dinas
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [['4.', 'Maksud Perjalanan Dinas']],
                },
                layout: 'noBorders' as const,
              },
              maksudKegiatan as any,
            ],

            // 5. Alat angkut
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [['5.', 'Alat angkut yang dipergunakan']],
                },
                layout: 'noBorders' as const,
              },
              jenisTransportasi,
            ],

            // 6. Tempat Berangkat / Tujuan
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [
                    ['6.', 'a. Tempat Berangkat'],
                    ['', 'b. Tujuan Berangkat'],
                  ],
                },
                layout: 'noBorders' as const,
              },
              {
                table: {
                  widths: ['*'],
                  body: [[`a. ${tempatAsal}`], [`b. ${tempatTujuan}`]],
                },
                layout: 'noBorders' as const,
              },
            ],

            // 7. Lamanya / Tanggal Berangkat / Kembali
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [
                    ['7.', 'a. Lamanya Perjalanan Dinas'],
                    ['', 'b. Tanggal Berangkat'],
                    ['', 'c. Tanggal Harus Kembali / Tiba di tempat baru'],
                  ],
                },
                layout: 'noBorders' as const,
              },
              {
                table: {
                  widths: ['*'],
                  body: [
                    [
                      `a. ${
                        pegawaiUtama?.tanggal_berangkat && pegawaiUtama?.tanggal_pulang
                          ? differenceInDays(
                              new Date(pegawaiUtama.tanggal_pulang),
                              new Date(pegawaiUtama.tanggal_berangkat)
                            ) + 1
                          : '-'
                      } hari`,
                    ],
                    [
                      `b. ${
                        pegawaiUtama?.tanggal_berangkat ? fmt(pegawaiUtama.tanggal_berangkat) : '-'
                      }`,
                    ],
                    [`c. ${pegawaiUtama?.tanggal_pulang ? fmt(pegawaiUtama.tanggal_pulang) : '-'}`],
                  ],
                },
                layout: 'noBorders' as const,
              },
            ],
          ],
        },
        layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
        fontSize: 8.5,
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },

      // ════ Row 8 — Pengikut (dinamis berdasarkan pegawaiList) ════
      {
        table: {
          widths: ['6%', '*', '*', '*'],
          body: [
            [
              {
                text: '8.',
                rowSpan: hasPengikut ? pengikutRows.length + 1 : 1,
              },
              { text: 'Pengikut Nama', bold: true },
              { text: 'Tanggal Lahir', bold: true },
              { text: 'Keterangan', bold: true },
            ],
            ...(hasPengikut ? pengikutRows : [['', '', '', '']]),
          ],
        },
        layout: {
          hLineWidth: () => 0,
          vLineWidth: (i: number) => (i === 1 ? 0 : 0.5),
          hLineColor: () => 'black',
          vLineColor: () => 'black',
        },
        fontSize: 8.5,
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },

      // ════ Row 9 — Pembebanan Anggaran ════
      {
        table: {
          widths: ['48%', '52%'],
          body: [
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [
                    ['9.', 'Pembebanan Anggaran'],
                    ['', 'a. Instansi'],
                    ['', 'b. Akun Rekening Anggaran'],
                  ],
                },
                layout: 'noBorders' as const,
              },
              {
                table: {
                  widths: ['*'],
                  body: [[''], [`\na. ${satuanKerja}`], [`b. ${akun}`]],
                },
                layout: 'noBorders' as const,
              },
            ],
          ],
        },
        layout: { hLineWidth: () => 0.5, vLineWidth: () => 0.5 },
        fontSize: 8.5,
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },

      // ════ Row 10 — Keterangan Lain-lain ════
      {
        table: {
          widths: ['48%', '52%'],
          body: [
            [
              {
                table: {
                  widths: ['10%', '90%'],
                  body: [['10.', 'Keterangan Lain-lain']],
                },
                layout: 'noBorders' as const,
              },
              {
                table: {
                  widths: ['*'],
                  body: [[lainLain]],
                },
                layout: 'noBorders' as const,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: (i: number) => (i === 1 ? 0 : 0.5),
        },
        fontSize: 8.5,
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },

      // ════ Catatan kaki ════
      {
        text: '*) Coret yang tidak perlu',
        fontSize: 8.5,
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // ════ TTD ════
      {
        columns: [
          { width: '*', text: '' },
          {
            width: '50%',
            stack: [
              {
                table: {
                  widths: ['40%', '60%'],
                  body: [
                    ['Dikeluarkan di', `: ${namaKabupaten}`],
                    ['Pada Tanggal', `: ${fmt(detail.tanggal_surat)}`],
                  ],
                },
                layout: 'noBorders' as const,
                fontSize: 8.5,
                margin: [0, 0, 0, 0] as [number, number, number, number],
              },
              namaJabatanUtama
                ? {
                    text: `an. ${namaJabatanUtama}`,
                    bold: true,
                    fontSize: 8.5,
                    margin: [0, 0, 0, 0] as [number, number, number, number],
                  }
                : {},
              {
                text: `${namaJabatanUtama || 'Pejabat Pembuat Komitmen'},`,
                bold: true,
                margin: [0, 0, 0, 50] as [number, number, number, number],
              },
              { text: namaPenandatangan, bold: true },
              nipPenandatangan.trim()
                ? { text: `NIP. ${nipPenandatangan}`, alignment: 'left' as const }
                : {},
            ],
            fontSize: 8.5,
          },
        ],
        columnGap: 0,
      },
    ],
  }

  return {
    pageSize: 'A4',
    header,
    content: [page],
    pageMargins: [40, 120, 40, 40],
    defaultStyle: {
      fontSize: 9,
    },
  }
}
