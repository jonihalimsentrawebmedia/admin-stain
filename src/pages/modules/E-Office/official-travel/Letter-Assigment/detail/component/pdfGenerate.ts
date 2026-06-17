import { differenceInDays, format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ILetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types'
import type { IDetailSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types'
import { buildKopSuratContent } from '@/pages/modules/E-Office/settings/letter-header/data/pdfContentConfig'

// ──────────────────────────────────────────
// Helper: format tanggal ke "dd MMMM yyyy"
// ──────────────────────────────────────────
function fmtTanggal(date?: string): string {
  if (!date) return '-'
  return format(new Date(date), 'dd MMMM yyyy', { locale: id })
}

// ─────────────────────────────────────────────────────
// Generate PDF SPPD — 1 halaman per pegawai (peserta)
// ─────────────────────────────────────────────────────
export const GeneratePDFSPD = (
  detail: ILetterAssignment,
  logoBase64: string,
  detailSppd?: IDetailSPPD,
): TDocumentDefinitions => {
  // ─── Data induk ───
  const pegawaiList = detail.pegawai ?? []
  const sppdData = detailSppd ?? detail.sppd?.[0] ?? ({} as any)

  // ─── HEADER: KOP SURAT (shared helper) ───
  const kopContent = buildKopSuratContent(detail.kop_surat as any, logoBase64)
  const header = kopContent
    ? { margin: [40, 20, 40, 20] as [number, number, number, number], stack: kopContent }
    : undefined

  // ─── CONTENT: 1 halaman per pegawai ───
  const pages: any[] = pegawaiList.map((peg, index) => {
    const page: any = {
      stack: [
        // ═══════ Nomor (kanan atas) ═══════
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

      // ═══════ JUDUL ═══════
      {
        text: 'SURAT PERINTAH PERJALANAN DINAS (SPPD)',
        alignment: 'center' as const,
        bold: true,
        fontSize: 13,
        decoration: 'underline',
        margin: [0, 0, 0, 10] as [number, number, number, number],
      },

      // ═══════ TABEL UTAMA (field 1–7) ═══════
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
              detail.nama_disahkan_oleh ?? '-',
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
                  { text: `${peg.nama_lengkap}\n`, bold: true },
                  peg.nip?.trim()
                    ? { text: `NIP. ${peg.nip}`, alignment: 'left' as const }
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
                    [`b. ${peg.jabatan_pegawai || '-'} / ${detail.nama_unit_kerja || '-'}`],
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
              (detail.kegiatan?.join(', ') || '-') as any,
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
              (sppdData as any)?.nama_jenis_transportasi ?? '-',
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
                  body: [
                    [`a. ${(sppdData as any)?.tempat_asal || '-'}`],
                    [`b. ${(sppdData as any)?.tempat_tujuan || '-'}`],
                  ],
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
                        peg.tanggal_berangkat && peg.tanggal_pulang
                          ? differenceInDays(
                              new Date(peg.tanggal_pulang),
                              new Date(peg.tanggal_berangkat),
                            ) + 1
                          : 0
                      } hari`,
                    ],
                    [`b. ${peg.tanggal_berangkat ? fmtTanggal(peg.tanggal_berangkat) : '-'}`],
                    [`c. ${peg.tanggal_pulang ? fmtTanggal(peg.tanggal_pulang) : '-'}`],
                  ],
                },
                layout: 'noBorders' as const,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
        },
        fontSize: 8.5,
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },

      // ═══════ TABLE 2: row 8 — Pengikut (3 kolom) ═══════
      {
        table: {
          widths: ['33%', '33%', '34%'],
          body: [
            [
              {
                table: {
                  widths: ['15%', '85%'],
                  body: [
                    [{ text: '8.', rowSpan: 5 }, 'Pengikut: Nama'],
                    ['', 'a.'],
                    ['', 'b.'],
                    ['', 'c.'],
                    ['', 'd.'],
                  ],
                },
                layout: 'noBorders' as const,
              },
              {
                table: {
                  widths: ['*'],
                  body: [['Tanggal Lahir'], [''], [''], [''], ['']],
                },
                layout: 'noBorders' as const,
              },
              {
                table: {
                  widths: ['*'],
                  body: [['Keterangan'], [''], [''], [''], ['']],
                },
                layout: 'noBorders' as const,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
        },
        fontSize: 8.5,
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },

      // ═══════ TABLE: row 9 — Pembebanan Anggaran ═══════
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
                  body: [
                    [''],
                    [`\na. ${detail.nama_unit_kerja || '-'}`],
                    [`b. ${(sppdData as any)?.akun || '-'}`],
                  ],
                },
                layout: 'noBorders' as const,
              },
            ],
          ],
        },
        layout: {
          hLineWidth: () => 0.5,
          vLineWidth: () => 0.5,
        },
        fontSize: 8.5,
        margin: [0, 0, 0, 0] as [number, number, number, number],
      },

      // ═══════ TABLE: row 10 — Keterangan Lain-lain ═══════
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
                  body: [[(sppdData as any)?.lain_lain || '']],
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

      // ═══════ Catatan kaki ═══════
      {
        text: '*) Coret yang tidak perlu',
        fontSize: 8.5,
        margin: [0, 0, 0, 20] as [number, number, number, number],
      },

      // ═══════ TTD ═══════
      {
        columns: [
          { width: '*', text: '' },
          {
            width: '50%',
            stack: [
              // Dikeluarkan di / Pada Tanggal
              {
                table: {
                  widths: ['40%', '60%'],
                  body: [
                    [
                      'Dikeluarkan di',
                      `: ${(sppdData as any)?.tempat_asal || detail.tempat_kegiatan || '-'}`,
                    ],
                    ['Pada Tanggal', `: ${fmtTanggal(detail.tanggal_surat)}`],
                  ],
                },
                layout: 'noBorders' as const,
                fontSize: 8.5,
                margin: [0, 0, 0, 0] as [number, number, number, number],
              },
              // an. Kepala ...
              detail.nama_jabatan_struktural && {
                text: `an. ${detail.nama_jabatan_struktural}`,
                bold: true,
                fontSize: 8.5,
                margin: [0, 0, 0, 0] as [number, number, number, number],
              },
              // Jabatan penandatangan
              {
                text: `${detail.nama_jabatan_struktural || 'Pejabat Pembuat Komitmen'},`,
                bold: true,
                margin: [0, 0, 0, 50] as [number, number, number, number],
              },
              // Nama
              { text: `${detail.nama_disahkan_oleh}`, bold: true },
              // NIP (jika ada)
              detail.nip?.trim()
                ? { text: `NIP. ${detail.nip}`, alignment: 'left' as const }
                : {},
            ],
            fontSize: 8.5,
          },
        ],
        columnGap: 0,
      },
    ]
    }

    if (index > 0) {
      page.pageBreak = 'before'
    }

    return page
  })

  // ─── Return document definition ───
  return {
    pageSize: 'A4',
    header: header,
    content: pages,
    pageMargins: [40, 120, 40, 40],
    defaultStyle: {
      fontSize: 9,
    },
  }
}
