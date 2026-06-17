import { z } from 'zod'

export const SettingLetterHeadItemSchema = z.object({
  isi: z.string().optional().nullable(),
  jenis_font: z.string().optional().nullable(),
  gaya_font: z.string().optional().nullable(),
  ukuran_font: z.number().optional().nullable(),
  warna: z.string().optional().nullable(),
})

export const SettingLetterHeadSchema = z.object({
  url_logo: z.string({ error: 'URL logo wajib diisi' }),
  key_logo: z.string().optional().nullable(),
  pengaturan: z.array(SettingLetterHeadItemSchema).min(1, 'Minimal 1 pengaturan'),
})

export type TSettingLetterHeadForm = z.infer<typeof SettingLetterHeadSchema>
