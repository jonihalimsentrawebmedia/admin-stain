import z from 'zod'

export const TariffTypeResolver = z.object({
  id_jenjang_pendidikan: z.string({ error: 'Jenjang pendidikan wajib Dipilih' }),
  nama_jenis_tarif: z.string({ error: 'Nama jenis tarif wajib diisi' }),
  urutan: z.number({ error: 'Urutan minimal 1' }).min(1, { message: 'Urutan minimal 1' }),
})

export type TTariffTypeResolver = z.infer<typeof TariffTypeResolver>
