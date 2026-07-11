import z from 'zod'

export const SatuanOrganisasiResolver = z.object({
  // UUID (opsional karena mungkin di-generate oleh sistem, tetapi di data contoh ada)
  parent_id: z.string().uuid('parent_id harus berupa UUID yang valid').optional(),

  // Informasi Logo dan Favicon (Nama file atau URL)
  logo: z.string({ error: 'Logo wajib diisi' }),
  favicon: z.string({ error: 'Favicon wajib diisi' }),

  // Informasi Dasar Institusi
  nama: z.string({ error: 'Nama wajib diisi' }).min(3, 'Nama minimal 3 karakter'),
  singkatan: z.string().optional().nullable(),
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
  link_google_map: z.url().optional().nullable(),

  // Informasi Kontak
  telepon: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email('Format email tidak valid').optional(),

  // Informasi Media Sosial
  facebook: z.url('URL Facebook tidak valid').optional(),
  twitter: z.url('URL Twitter tidak valid').optional(),
  instagram: z.url('URL Instagram tidak valid').optional(),
  youtube: z.url('URL YouTube tidak valid').optional(),
  is_alamat_sama_parent: z.boolean(),
  api_dikti_id_pengguna: z.string().optional().nullable(),
  api_dikti_username: z.string().optional().nullable(),
  api_dikti_password: z.string().optional().nullable(),
  id_unit_kerja_dikti: z.string().optional().nullable(),
  ukuran_singkatan: z.string().optional().nullable(),
  show_singkatan: z.boolean().optional().nullable(),
  ukuran_title: z.string().optional().nullable(),
  show_title: z.boolean().optional().nullable(),

  api_key_provider: z.enum(['CUSTOM', 'GEMINI', 'CHATGPT', 'DEEPSEEK']).optional().nullable(),
  ai_api_url: z.url().optional().nullable(),
  ai_api_key: z.string().optional().nullable(),
  ai_model: z.string().optional().nullable(),
})

/**
 * 🏷️ SatuanOrganisasiType
 * Tipe TypeScript yang disimpulkan dari SatuanOrganisasiResolver.
 */
export type SatuanOrganisasiType = z.infer<typeof SatuanOrganisasiResolver>

export interface SatuanOrganisasiList {
  id_satuan_organisasi: string // UUID
  id_jenjang_pendidikan: string
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
  link_google_map: string
  singkatan_fakultas: string
  singkatan_universitas: string

  // Informasi Kontak & Sosial Media
  telepon: string
  fax: string
  email: string
  facebook: string
  twitter: string
  instagram: string
  youtube: string

  // Metadata Audit
  tampil: boolean
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
  nama_parent: string
  nama_jenjang_pendidikan: string
  kode_jenjang: string
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

export interface SatuanOrganisasiLanguage {
  content_hash: string
  last_translated_at: string
  status_translate: string
  id_satuan_organisasi_translate: number
  id_satuan_organisasi: string
  language: string
  nama: string
  singkatan: null
}
