import z from 'zod'

export const ReportServiceResolver = z
  .object({
    jenis: z.string({ error: 'Jenis Wajib Diisi' }),
    nama_laporan: z
      .string({ error: 'Nama Laporan Wajib Diisi' })
      .min(1, { error: 'Nama Laporan Wajib Diisi' }),
    url: z.string().optional().nullable().or(z.literal('')),
    url_file: z.string().optional().nullable().or(z.literal('')),
    public: z.boolean({ error: 'Public Wajib Diisi' }),
    urutan: z.string({ error: 'Urutan Wajib Diisi' }).min(1, { error: 'Urutan Wajib Diisi' }),
    url_gambar: z.string({ error: 'Gambar Wajib Diisi' }),
  })
  .superRefine((data, ctx) => {
    // LOGIKA: Jika jenis == "URL" maka url WAJIB diisi
    if (data.jenis === 'URL') {
      if (!data.url || data.url.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'URL wajib diisi jika jenis adalah URL',
          path: ['url'], // Error akan muncul di field 'url'
        })
      }
    }

    // LOGIKA: Jika jenis == "DOKUMEN" maka url_dokumen WAJIB diisi
    if (data.jenis === 'DOKUMEN') {
      if (!data.url_file || data.url_file.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File dokumen wajib diisi jika jenis adalah DOKUMEN',
          path: ['url_dokumen'], // Error akan muncul di field 'url_dokumen'
        })
      }
    }
  })

export type ReportServiceType = z.infer<typeof ReportServiceResolver>
