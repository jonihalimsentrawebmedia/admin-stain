import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ILetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types'
import type { IDetailSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

// ───────── Helper format tanggal ─────────
function fmt(date?: string): string {
  if (!date) return '-'
  return format(new Date(date), 'dd MMMM yyyy', { locale: id })
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

  // ─── HEADER: KOP SURAT (shared helper) ───
  const kopContent = buildKopSuratContent(detail.kop_surat as any, logoBase64)
  const header = kopContent
    ? { margin: [40, 20, 40, 20] as [number, number, number, number], stack: kopContent }
    : undefined

  // ─── Pengikut rows (row 8) — maks 4 orang ───
  const pengikutRows = pegawaiList
    .slice(1, 5)
    .map((peg, i) => [
      '',
      `${String.fromCharCode(97 + i)}. ${peg.nama_lengkap}`,
      peg.tanggal_lahir ? fmt(peg.tanggal_lahir) : '-',
      peg.jabatan_pegawai || '',
    ])

  const hasPengikut = pengikutRows.length > 0
  const extraPengikut = pegawaiList.slice(5)
  const hasLampiran = extraPengikut.length > 0

  // ─── TTD Stack (reusable untuk halaman depan & lampiran) ───
  const ttdStack = [
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
    ...(namaJabatanUtama
      ? [
          {
            text: `an. ${namaJabatanUtama}`,
            bold: true,
            fontSize: 8.5,
            margin: [0, 0, 0, 0] as [number, number, number, number],
          },
        ]
      : []),
    {
      text: `${namaJabatanUtama || 'Pejabat Pembuat Komitmen'},`,
      bold: true,
      margin: [0, 0, 0, 40] as [number, number, number, number],
    },
    { text: namaPenandatangan, bold: true },
    ...(nipPenandatangan.trim()
      ? [{ text: `NIP. ${nipPenandatangan}`, alignment: 'left' as const }]
      : []),
  ]

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
            stack: ttdStack,
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

    // ─── content: halaman depan + lampiran (jika ada) ───
    content: hasLampiran
      ? [
          page,
          {
            stack: [
              {
                pageBreak: 'before' as const,
                table: {
                  widths: ['auto', '*'],
                  body: [
                    ['Lampiran SPPD Nomor', `: ${detail.nomor_surat ?? '-'}`],
                    ['Tanggal ', `: ${fmt(detail.tanggal_surat)}`],
                  ],
                },
                layout: 'noBorders' as const,
                bold: true,
                fontSize: 12,
                margin: [0, 0, 0, 20] as [number, number, number, number],
              },
              {
                table: {
                  widths: ['8%', '23%', '30%', '22%', '17%'],
                  body: [
                    [
                      { text: 'No', bold: true, alignment: 'center' as const },
                      { text: 'NIP', bold: true, alignment: 'center' as const },
                      { text: 'Nama', bold: true, alignment: 'center' as const },
                      { text: 'Tanggal Lahir', bold: true, alignment: 'center' as const },
                      { text: 'Jabatan', bold: true, alignment: 'center' as const },
                    ],
                    ...extraPengikut.map((peg, i) => [
                      { text: `${i + 1}`, alignment: 'center' as const },
                      peg.nip?.trim() || '-',
                      peg.nama_lengkap,
                      peg.tanggal_lahir ? fmt(peg.tanggal_lahir) : '-',
                      peg.jabatan_pegawai || '-',
                    ]),
                  ],
                },
                layout: {
                  hLineWidth: () => 0.5,
                  vLineWidth: () => 0.5,
                  hLineColor: () => 'black' as const,
                  vLineColor: () => 'black' as const,
                  paddingLeft: () => 4,
                  paddingRight: () => 4,
                  paddingTop: () => 3,
                  paddingBottom: () => 3,
                },
                fontSize: 8.5,
                margin: [0, 0, 0, 30] as [number, number, number, number],
              },
              {
                table: {
                  widths: ['*', '50%'],
                  body: [
                    [
                      '',
                      {
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
                          ...(namaJabatanUtama
                            ? [
                                {
                                  text: `an. ${namaJabatanUtama}`,
                                  bold: true,
                                  fontSize: 8.5,
                                  margin: [0, 0, 0, 0] as [number, number, number, number],
                                },
                              ]
                            : []),
                          {
                            text: `${namaJabatanUtama || 'Pejabat Pembuat Komitmen'},`,
                            bold: true,
                            margin: [0, 0, 0, 40] as [number, number, number, number],
                          },
                          { text: namaPenandatangan, bold: true },
                          ...(nipPenandatangan.trim()
                            ? [{ text: `NIP. ${nipPenandatangan}` }]
                            : []),
                        ],
                        fontSize: 8.5,
                      },
                    ],
                  ],
                },
                layout: 'noBorders' as const,
                margin: [0, 30, 0, 0] as [number, number, number, number],
              },
            ],
          },
        ]
      : [page],
    pageMargins: [40, 120, 40, 40],
    defaultStyle: {
      fontSize: 9,
    },
  }
}
