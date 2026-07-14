import { z } from 'zod'

export const ResolverProfileHospital = z.object({
  nama: z.string({ error: 'Nama Rumah Sakit harus diisi' }).min(1, 'Nama Rumah Sakit harus diisi'),
  alamat: z.string({ error: 'Alamat harus diisi' }).min(1, 'Alamat harus diisi'),
  email: z.string({ error: 'Email harus diisi' }).email('Format Email tidak valid'),
  telepon: z.string({ error: 'Telepon harus diisi' }).min(1, 'Telepon harus diisi'),
  url_logo: z.string({ error: 'Logo harus diupload' }).min(1, 'Logo harus diupload'),
})

export type TResolverProfileHospital = z.infer<typeof ResolverProfileHospital>
