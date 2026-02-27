import { z } from 'zod'

export const UserManagementResolver = z.object({
  context: z.string().optional().nullable(),
  url_gambar: z.string().optional().nullable(),
  nama: z.string({ error: 'Nama harus diisi' }),
  nip: z.string({ error: 'NIP Harus diisi' }),
  nidn: z.string({ error: 'NIDN Harus diisi' }),
  pangkat: z.string({ error: 'Pangkat Harus diisi' }),
  golongan: z.string({ error: 'Golongan Harus diisi' }),
  jabatan: z.string({ error: 'Jabatan Harus diisi' }),
  email: z.email({ error: 'Email harus valid' }),
  publikasi: z.string({ error: 'Publikasi harus diisi' }),
  status: z.boolean({ error: 'Status harus diisi' }),
  urutan: z.number({ error: 'Urutan harus diisi' }),
})

export type SchemaUserManagement = z.infer<typeof UserManagementResolver>
