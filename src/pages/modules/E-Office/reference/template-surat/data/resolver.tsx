import { z } from 'zod'

export const SectionSchema = z.object({
  judul_section: z.string({ error: 'Judul section harus diisi' }),
  konten_section: z.string({ error: 'Konten section harus diisi' }),
})

export const TemplateSuratSchema = z.object({
  nama_template: z.string({ error: 'Nama template harus diisi' }),
  deskripsi: z.string({ error: 'Deskripsi harus diisi' }),
  section: z.array(SectionSchema).min(1, 'Minimal 1 section'),
})

export type TTemplateSuratForm = z.infer<typeof TemplateSuratSchema>
