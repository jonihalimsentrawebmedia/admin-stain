import z from 'zod'

export const SatuanOrganisasiResolver = z.object({
  // UUID (opsional karena mungkin di-generate oleh sistem, tetapi di data contoh ada)
  parent_id: z.string().uuid('parent_id harus berupa UUID yang valid').optional(),

  // Informasi Logo dan Favicon (Nama file atau URL)
  logo: z.string({ error: 'Logo wajib diisi' }),
  favicon: z.string({ error: 'Favicon wajib diisi' }),

  // Informasi Dasar Institusi
  nama: z.string({ error: 'Nama wajib diisi' }).min(3, 'Nama minimal 3 karakter'),
  singkatan: z.string().optional(),
  keyword: z.string().optional(), // Bisa berupa daftar kata kunci yang dipisahkan koma
  id_jenjang_pendidikan: z.string({ error: 'Jenjang Pendidikan wajib diisi' }).optional(),
  // Informasi Alamat

  alamat: z.string({ error: 'Alamat wajib diisi' }),
  provinsi: z.string({ error: 'Provinsi wajib diisi' }),
  kabupaten_kota: z.string({ error: 'Kabupaten/Kota wajib diisi' }),
  kecamatan: z.string({ error: 'Kecamatan wajib diisi' }).optional(),
  kelurahan: z.string({ error: 'Kelurahan wajib diisi' }).optional(),
  kode_pos: z
    .string()
    .regex(/^\d{5}$/, 'Kode Pos harus terdiri dari 5 digit angka')
    .optional(),

  // Informasi Kontak
  telepon: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email('Format email tidak valid').optional(),

  // Informasi Media Sosial
  facebook: z.string().url('URL Facebook tidak valid').optional(),
  twitter: z.string().url('URL Twitter tidak valid').optional(),
  instagram: z.string().url('URL Instagram tidak valid').optional(),
  youtube: z.string().url('URL YouTube tidak valid').optional(),
  is_alamat_sama_parent: z.boolean(),
})

/**
 * 🏷️ SatuanOrganisasiType
 * Tipe TypeScript yang disimpulkan dari SatuanOrganisasiResolver.
 */
export type SatuanOrganisasiType = z.infer<typeof SatuanOrganisasiResolver>

export interface SatuanOrganisasiList {
  id_satuan_organisasi: string // UUID
  kelompok: string // Contoh: "UNIVERSITAS", "FAKULTAS", "DEPARTEMEN"
  parent_id: string // UUID dari organisasi induk
  logo: string // Nama file atau URL logo
  favicon: string // Nama file atau URL favicon
  nama: string // Nama lengkap organisasi
  nama_parent: string
  singkatan: string // Singkatan atau akronim
  keyword: string // Kata kunci yang dipisahkan koma
  kode_jenjang: string
  nama_jenjang_pendidikan: string
  // Informasi Alamat
  alamat: string
  provinsi: string
  kabupaten_kota: string
  kecamatan: string
  kelurahan: string
  kode_pos: string

  // Informasi Kontak & Sosial Media
  telepon: string
  fax: string
  email: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string

  // Metadata Audit
  created_at: string // ISO 8601 string (Date/Time with timezone)
  created_user: string
  updated_at: string // ISO 8601 string (Date/Time with timezone)
  updated_user: string
}

export interface SatuanOrganisasiDetail {
  id_satuan_organisasi: string
  kelompok:
    | 'UNIVERSITAS'
    | 'FAKULTAS'
    | 'PRODI'
    | 'UNIT'
    | 'LEMBAGA'
    | 'UKK_UKM'
    | 'REKTORAT'
    | 'BIRO'
    | 'UPT'
  parent_id?: string | null
  logo: string
  favicon: string
  nama: string
  singkatan?: string
  keyword?: string
  alamat: string
  provinsi: string
  kabupaten_kota: string
  kecamatan?: string
  kelurahan?: string
  kode_pos?: string
  telepon?: string
  fax?: string
  email?: string
  facebook?: string
  twitter?: string
  instagram?: string
  youtube?: string
  created_at: Date
  created_user: string
  updated_at: Date
  updated_user: string
  id_parent_satuan_organisasi: string
}
