import { z } from 'zod'

export const ResolverUser = z.object({
  nama: z.string({ error: 'Nama harus diisi' }).min(1, 'Nama harus diisi'),
  email: z.string({ error: 'Email harus diisi' }).email('Format Email tidak valid'),
  nomor_telepon: z.string({ error: 'Nomor Telepon harus diisi' }).min(1, 'Nomor Telepon harus diisi'),
  id_role: z.string({ error: 'Role harus dipilih' }).min(1, 'Role harus dipilih'),
})

export type TResolverUser = z.infer<typeof ResolverUser>
