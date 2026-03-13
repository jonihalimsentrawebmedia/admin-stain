import { z } from 'zod'

export const ResolverCompanyInformation = z.object({
  nama_perusahaan: z.string(),
  lokasi: z.enum(['DALAM_NEGERI', 'LUAR_NEGERI']),
  id_negara: z.string().optional().nullable(),
  negara: z.string().optional().nullable(),
  id_provinsi: z.string().optional().nullable(),
  provinsi: z.string().optional().nullable(),
  id_kabupaten_kota: z.string().optional().nullable(),
  kabupaten_kota: z.string().optional().nullable(),
  kode_pos: z.string(),
  no_telepon: z.string(),
  url_website: z.string(),
  url_file_permohonan: z.string(),
  key_url_file_permohonan: z.string().optional().nullable(),
})

export const ResolverCompanyContact = z.object({
  nama_lengkap: z.string(),
  jabatan: z.string(),
  no_handphone: z.string(),
  email: z.string(),
  telepon_kerja: z.string(),
  username: z.string(),
})

export const ResolverCompanyBranding = z.object({
  url_foto_profil: z.string(),
  deskripsi_singkat: z.string(),
  tentang_perusahaan: z.string(),
  id_kategori_industri: z.string(),
  id_ukuran_perusahaan: z.string(),
})

export const ResolverCompanyLegal = z.object({
  npwp: z.string(),
  url_file_npwp: z.string(),
  key_url_file_npwp: z.string().optional().nullable(),
  nib: z.string(),
  url_file_nib: z.string(),
  key_url_file_nib: z.string().optional().nullable(),
  alamat_kantor: z.string(),
  link_google_maps: z.url(),
})

export const ResolverCompanySocialMedia = z.object({
  url_linkedin: z.url().optional().nullable(),
  url_instagram: z.url().optional().nullable(),
  email_recuitment: z.email(),
  url_website_karir: z.url().optional().nullable(),
})

export type TypeCompanyInformation = z.infer<typeof ResolverCompanyInformation>
export type TypeCompanyContact = z.infer<typeof ResolverCompanyContact>
export type TypeCompanyBranding = z.infer<typeof ResolverCompanyBranding>
export type TypeCompanyLegal = z.infer<typeof ResolverCompanyLegal>
export type TypeCompanySocialMedia = z.infer<typeof ResolverCompanySocialMedia>
