import z from 'zod'

export interface SettingIdentity {
  nama: string
  logo: string
  background: string
  created_at: string | Date // Gunakan Date jika kamu melakukan transformasi setelah fetch
  created_user: string
  updated_at: string | Date
  updated_user: string
}

export const IdentityResolver = z.object({
  nama: z.string({ error: 'Nama  Wajib Diisi' }).min(1, { error: 'Nama  Wajib Diisi' }),
  logo: z.string({ error: 'Logo  Wajib Diisi' }).min(1, { error: 'Logo  Wajib Diisi' }),
  background: z
    .string({ error: 'Background  Wajib Diisi' })
    .min(1, { error: 'Background  Wajib Diisi' }),
})
export type IdentityType = z.infer<typeof IdentityResolver>
