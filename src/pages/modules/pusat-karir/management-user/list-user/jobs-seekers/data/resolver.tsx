import { z } from 'zod'

export const JobSeekersResolver = z.object({
  nama_lengkap: z.string({ error: 'Nama Lengkap harus diisi' }),
  pendidikan_terakhir: z.enum(['UNDERGRADUATE', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3']),
  universitas_asal: z.enum(['DALAM_UNIVERSITAS', 'LUAR_UNIVERSITAS']),
  id_fakultas: z.string().optional().nullable(),
  fakultas: z.string().optional().nullable(),
  id_prodi: z.string().optional().nullable(),
  prodi: z.string().optional().nullable(),
  nim: z.string(),
  url_ktm: z.string(),
  key_url_ktm: z.string().optional().nullable(),
  status_mahasiswa: z.enum(['AKTIF', 'ALUMNI']),
  no_handphone: z.string(),
  email: z.email(),
  password: z.string().optional().nullable(),
})

const PersonalInfo = z.object({
  url_foto_profil: z.string(),
  nama_lengkap: z.string(),
  tanggal_lahir: z.string(),
  tempat_lahir: z.string(),
  usia: z.number().optional().nullable(),
  jenis_kelamin: z.enum(['L', 'P']),
  agama: z.enum(['ISLAM', 'KRISTEEN', 'KATOLIK', 'HINDU', 'BUDDHA', 'KONGHUCU', 'LAINNYA']),
  status_pernikahan: z.enum(['BELUM_MENIKAH', 'MENIKAH', 'JANDA', 'DUDA']),
  kewarganegaraan: z.string(),
  nik: z.string().length(16),
  no_handphone: z.string(),
  no_handphone_2: z.string().optional().nullable(),
  no_telepon: z.string().optional().nullable(),
  email: z.email(),
  email_alternatif: z.email().optional().nullable(),
  website: z.url().optional().nullable(),
})

const Address = z.object({
  alamat_lengkap: z.string(),
  id_provinsi: z.string().optional().nullable(),
  id_kabupaten_kota: z.string().optional().nullable(),
  provinsi: z.string().optional().nullable(),
  kabupaten_kota: z.string().optional().nullable(),
  kode_pos: z.string().max(5, { error: 'Kode Pos Maksimal 5 Karakter' }),
})

const Education = z.object({
  pendidikan_terakhir: z.enum(['UNDERGRADUATE', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3']),
  universitas_asal: z.enum(['DALAM_UNIVERSITAS', 'LUAR_UNIVERSITAS']),
  id_prodi: z.string().optional().nullable(),
  id_fakultas: z.string().optional().nullable(),
  nama_universitas: z.string().optional().nullable(),
  universitas_asal_luar_universitas: z.string().optional().nullable(),
  fakultas: z.string().optional().nullable(),
  prodi: z.string().optional().nullable(),
  nim: z.string().optional().nullable(),
  url_ktm: z.string().optional().nullable(),
  status_mahasiswa: z.enum(['AKTIF', 'ALUMNI']),
})

export const ResolverProfileUser = z.object({
  data_diri: PersonalInfo,
  alamat_ktp: Address,
  alamat: Address,
  pendidikan_terakhir: Education,
  sub_spesialis: z.array(z.string()),
  files: z.object({
    url_cv: z.url(),
    key_url_cv: z.string().optional().nullable(),
  }),
})

export type ResolverProfileUserType = z.infer<typeof ResolverProfileUser>
export type JobSeekersResolverType = z.infer<typeof JobSeekersResolver>
