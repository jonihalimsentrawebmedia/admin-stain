export interface IMailTypeLetter {
  id_mail_jenis_surat: string
  id_satuan_organisasi: string
  nama_jenis_surat: string
  kategori_jenis_surat: 'DOSEN' | 'PEGAWAI' | 'MAHASISWA' | 'UMUM' | 'LAINNYA'
  kode_surat: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_kategori_jenis_surat: string
}
