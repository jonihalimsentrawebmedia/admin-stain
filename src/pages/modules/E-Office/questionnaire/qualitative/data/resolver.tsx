import z from 'zod'

export const QuestionItem = z.object({
  pertanyaan: z.string({ error: 'Pertayaan Wajib Diisi' }),
})

export const QuestionnaireQualitative = z.object({
  judul: z.string({ error: 'Judul Kuisioner Wajib Diisi' }),
  jenis_survei: z.enum(['KUANTITATIF', 'KUALITATIF']),
  pertanyaan: z.array(QuestionItem).min(1, { message: 'Minimal 1 pertanyaan' }),
})

export type TQuestionnaireQualitative = z.infer<typeof QuestionnaireQualitative>
export type TQuestionItem = z.infer<typeof QuestionItem>
