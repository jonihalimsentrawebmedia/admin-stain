import { z } from 'zod'

export const LetterStudentResolver = z.object({
  judul_surat: z.string(),
  keterangan: z.string(),
  link_google_form: z.string(),
})

export type ILetterStudentTypeForm = z.infer<typeof LetterStudentResolver>
