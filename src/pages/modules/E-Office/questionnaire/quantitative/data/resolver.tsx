import z from 'zod'

export const QuestionnaireQuantitative = z.object({
  judul_kuisioner: z.string({ error: 'Judul Kuisioner Wajib Diisi' }),
  id_kategori: z.string({ error: 'Kategori Kategori' }),
  daftar_pertayaan: z.array(
    z.object({
      pertayaan: z.string({ error: 'Pertayaan' }),
      pilihan: z.array(
        z.object({
          opsi: z.string({ error: 'Pertayaan' }),
        })
      ),
    })
  ),
})

export type TQuestionnaireQuantitative = z.infer<typeof QuestionnaireQuantitative>
