import z from 'zod'

export const AdmissionInformationPublicResolver = z
  .object({
    status_permohonan: z.string({ error: 'Status Permohonan Wajib Diisi' }),
    subjek: z.string({ error: 'Subjek Wajib Diisi' }),
    pesan: z.string({ error: 'Pesan Wajib Diisi' }),
    file_lampiran: z.array(z.string()).min(1, { message: 'File Lampiran Wajib Diisi' }),
    alasan_penolakan: z
      .string({ error: 'Alasan Penolakan Wajib Diisi' })
      .optional()
      .nullable()
      .or(z.literal('')),
  })
  .superRefine((data, ctx) => {
    // LOGIKA: Jika jenis == "URL" maka url WAJIB diisi
    if (data.status_permohonan === 'DITOLAK') {
      if (!data.alasan_penolakan || data.alasan_penolakan.trim() === '') {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Alasan Penolakan wajib diisi jika status permohonan adalah DITOLAK',
          path: ['alasan_penolakan'], // Error akan muncul di field 'alasan_penolakan'
        })
      }
    }
  })

export type AdmissionInformationPublicType = z.infer<typeof AdmissionInformationPublicResolver>
