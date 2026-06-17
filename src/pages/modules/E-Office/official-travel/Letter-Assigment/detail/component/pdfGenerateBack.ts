import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import type { ILetterAssignment } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/data/types'
import type { IDetailSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types'

// ───────── Helper format tanggal ─────────
function fmt(date?: string): string {
  if (!date) return '-'
  return format(new Date(date), 'dd MMMM yyyy', { locale: id })
}

// ─────────────────────────────────────────────────────────
// PDF SPPD — Halaman Belakang (perjalanan dinas)
// 1 halaman per pegawai
// ─────────────────────────────────────────────────────────
export const GeneratePDFSPDBack = (
  detail: ILetterAssignment,
  detailSppd?: IDetailSPPD,
): TDocumentDefinitions => {
  const pegawaiList = detail.pegawai ?? []
  const sppdData = detailSppd ?? detail.sppd?.[0] ?? ({} as any)

  const tempatKedudukan = (sppdData as any)?.tempat_asal || detail.tempat_kegiatan || '-'
  const tempatTujuan = (sppdData as any)?.tempat_tujuan || '-'
  const penandatangan = detail.nama_disahkan_oleh || '-'
  const jabatanPenandatangan = detail.nama_jabatan_struktural || '-'
  const nipPenandatangan = detail.nip || ''

  // ─── content: 1 halaman per pegawai ───
  const pages: any[] = pegawaiList.map((peg, index) => {
    const tglBerangkat = peg.tanggal_berangkat ? fmt(peg.tanggal_berangkat) : '-'
    const tglPulang = peg.tanggal_pulang ? fmt(peg.tanggal_pulang) : '-'

    // ─── Helper untuk duplikasi layout kolom TTD di kiri ───
    const ttdKiri = () => ({
      columns: [
        { width: '33%', text: '' },
        {
          width: '67%',
          stack: [
            { text: jabatanPenandatangan, bold: true, alignment: 'left' },
            { text: '\n\n\n\n' },
            { text: penandatangan, bold: true, alignment: 'left' },
            nipPenandatangan.trim()
              ? { text: `NIP. ${nipPenandatangan}`, alignment: 'left' as const }
              : {},
          ],
        },
      ],
      columnGap: 0,
      margin: [0, 20, 0, 0] as [number, number, number, number],
    })

    // ─── Helper: tabel dengan 2 kolom (kiri/kanan) bergaris tengah ───
    const duaKolomBordered = (kiri: any, kanan: any) => ({
      table: {
        widths: ['50%', '50%'],
        body: [[kiri, kanan]],
      },
      layout: {
        hLineWidth: (i: number, node: any) =>
          i === 0 || i === node.table.body.length ? 0.5 : 0,
        vLineWidth: (i: number) => (i === 1 ? 0.5 : 0),
      } as any,
      margin: [0, 0, 0, 0] as [number, number, number, number],
    })

    // ─── Helper: tabel 2 kolom TANPA garis vertikal tengah ───
    const duaKolomNoBorder = (kiri: any, kanan: any) => ({
      table: {
        widths: ['50%', '50%'],
        body: [[kiri, kanan]],
      },
      layout: {
        hLineWidth: (i: number, node: any) =>
          i === 0 || i === node.table.body.length ? 0.5 : 0,
        vLineWidth: () => 0,
      } as any,
      fontSize: 8.5,
      margin: [0, 0, 0, 10] as [number, number, number, number],
    })

    // ─── TTD (text signature) ───
    const ttd = () => ({
      columns: [
        { width: '33%', text: '' },
        {
          width: '67%',
          stack: [
            { text: jabatanPenandatangan, bold: true },
            { text: '\n\n\n\n' },
            { text: penandatangan, bold: true },
            nipPenandatangan.trim()
              ? { text: `NIP. ${nipPenandatangan}`, alignment: 'left' as const }
              : {},
          ],
        },
      ],
      columnGap: 0,
    })

    return {
      stack: [
        // ════ ROW I — Berangkat Dari ════
        duaKolomBordered(
          // Kolom Kiri: kosong
          { text: '', fontSize: 8.5 },
          // Kolom Kanan: Berangkat Dari
          {
            stack: [
              { text: `Berangkat Dari : ${tempatKedudukan}` },
              { text: '(Tempat Kedudukan)', italics: true, margin: [0, 0, 0, 5] },
              {
                table: {
                  widths: ['30%', '70%'],
                  body: [
                    ['Ke', `: ${tempatTujuan}`],
                    ['Pada Tanggal', `: ${tglBerangkat}`],
                  ],
                },
                layout: 'noBorders' as const,
                margin: [0, 0, 0, 5] as [number, number, number, number],
              },
              ttd(),
            ],
            margin: [0, 0, 0, 0] as [number, number, number, number],
            fontSize: 8.5,
          },
        ),

        // ════ ROW II — Tiba di (tujuan) ════
        duaKolomBordered(
          // Kolom Kiri: Tiba di tujuan
          {
            stack: [
              {
                table: {
                  widths: ['7%', '40%', '53%'],
                  body: [
                    ['I.', 'Tiba di', `: ${tempatTujuan}`],
                    ['', 'Pada Tanggal', `: ${tglPulang}`],
                  ],
                  margin: [0, 0, 0, 20] as [number, number, number, number],
                },
                layout: 'noBorders' as const,
              },
              { text: '\nNIP. ', margin: [40, 40, 0, 0] as [number, number, number, number] },
            ],
            fontSize: 8.5,
          },
          // Kolom Kanan: Berangkat dari tujuan
          {
            stack: [
              {
                table: {
                  widths: ['30%', '70%'],
                  body: [
                    ['Berangkat dari', `: ${tempatTujuan}`],
                    ['ke', `: ${tempatKedudukan}`],
                    ['Pada Tanggal', ':'],
                  ],
                  margin: [0, 0, 0, 20] as [number, number, number, number],
                },
                layout: 'noBorders' as const,
              },
              { text: '\nNIP. ', margin: [40, 40, 0, 0] as [number, number, number, number] },
            ],
            fontSize: 8.5,
          },
        ),

        // ════ ROW III — Tiba di (istirahat) ════
        duaKolomBordered(
          {
            stack: [
              {
                table: {
                  widths: ['7%', '40%', '53%'],
                  body: [
                    ['II.', 'Tiba di', ':'],
                    ['', 'Pada Tanggal', ':'],
                  ],
                  margin: [0, 0, 0, 20] as [number, number, number, number],
                },
                layout: 'noBorders' as const,
              },
              { text: '\nNIP. ', margin: [40, 40, 0, 0] as [number, number, number, number] },
            ],
            fontSize: 8.5,
          },
          {
            stack: [
              {
                table: {
                  widths: ['30%', '70%'],
                  body: [
                    ['Berangkat dari', ':'],
                    ['ke', ':'],
                    ['Pada Tanggal', ':'],
                  ],
                  margin: [0, 0, 0, 20] as [number, number, number, number],
                },
                layout: 'noBorders' as const,
              },
              { text: '\nNIP. ', margin: [40, 40, 0, 0] as [number, number, number, number] },
            ],
            fontSize: 8.5,
          },
        ),

        // ════ ROW IV — Tiba di (istirahat) ════
        duaKolomBordered(
          {
            stack: [
              {
                table: {
                  widths: ['7%', '40%', '53%'],
                  body: [
                    ['III.', 'Tiba di', ':'],
                    ['', 'Pada Tanggal', ':'],
                  ],
                  margin: [0, 0, 0, 20] as [number, number, number, number],
                },
                layout: 'noBorders' as const,
              },
              { text: '\nNIP. ', margin: [40, 40, 0, 0] as [number, number, number, number] },
            ],
            fontSize: 8.5,
          },
          {
            stack: [
              {
                table: {
                  widths: ['30%', '70%'],
                  body: [
                    ['Berangkat dari', ':'],
                    ['ke', ':'],
                    ['Pada Tanggal', ':'],
                  ],
                  margin: [0, 0, 0, 20] as [number, number, number, number],
                },
                layout: 'noBorders' as const,
              },
              { text: '\nNIP. ', margin: [40, 40, 0, 0] as [number, number, number, number] },
            ],
            fontSize: 8.5,
          },
        ),

        // ════ ROW V — Kembali ke tempat kedudukan ════
        duaKolomBordered(
          // Kolom Kiri
          {
            stack: [
              {
                table: {
                  widths: ['7%', '93%'],
                  body: [
                    [
                      'IV.',
                      {
                        stack: [
                          { text: `Tiba di : ${tempatKedudukan}` },
                          { text: '(Tempat Kedudukan)', italics: true, margin: [0, 0, 0, 5] },
                          {
                            table: {
                              widths: ['30%', '70%'],
                              body: [['Pada Tanggal', `:`]],
                            },
                            layout: 'noBorders' as const,
                            margin: [0, 0, 0, 5] as [number, number, number, number],
                          },
                          ttdKiri(),
                        ],
                      },
                    ],
                  ],
                },
                layout: 'noBorders' as const,
                margin: [0, 0, 0, 20] as [number, number, number, number],
              },
            ],
            fontSize: 8.5,
          },
          // Kolom Kanan
          {
            stack: [
              {
                text: `Telah diperiksa dengan keterangan bahwa perjalanan tersebut atas perintahnya dan semata-mata untuk kepentingan jabatan dalam waktu yang sesingkat-singkatnya.`,
              },
              ttdKiri(),
            ],
            fontSize: 8.5,
          },
        ),

        // ════ ROW VI — Catatan Lain-lain ════
        duaKolomNoBorder(
          {
            stack: [
              {
                table: {
                  widths: ['7%', '93%'],
                  body: [['V.', 'Catatan Lain-lain']],
                },
                layout: 'noBorders' as const,
                margin: [0, 0, 0, 0] as [number, number, number, number],
              },
            ],
          },
          { text: '' },
        ),

        // ════ ROW VII — Perhatian (no border) ════
        {
          table: {
            widths: ['4.5%', '95.5%'],
            body: [
              [
                { text: 'VI.' },
                {
                  stack: [
                    { text: 'Perhatian', bold: true, margin: [0, 0, 0, 5] as [number, number, number, number] },
                    {
                      text: `Pejabat yang menerbitkan SPP, Pegawai yang melakukan perjalanan dinas, para pejabat yang mengesahkan tanggal berangkat/tiba, serta Bendahara Pengeluaran bertanggung jawab berdasarkan peraturan-peraturan keuangan negara apabila negara menderita rugi akibat kesalahan, kelalaian dan kealpaannya.`,
                    },
                  ],
                },
              ],
            ],
          },
          layout: 'noBorders' as const,
          fontSize: 8.5,
          margin: [0, 0, 0, 20] as [number, number, number, number],
        },
      ],
      ...(index > 0 ? { pageBreak: 'before' as const } : {}),
    }
  })

  return {
    content: pages,
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      fontSize: 9,
    },
  }
}
