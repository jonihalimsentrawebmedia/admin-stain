export interface IGuestBook {
  id_buku_tamu: string

  id_satuan_organisasi: string
  id_unit: string
  id_jenis_keperluan: string
  id_tujuan_bertamu: string

  tanggal_kunjungan: string
  nik: string
  nama_lengkap: string
  no_hp: string
  kota: string
  alamat_lengkap: string

  keterangan_bertamu: string

  url_foto: string | null
  key_foto: string | null

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_unit: string
  nama_jenis_keperluan: string
  nama_tujuan_bertamu: string
  nama_user_created: string
  nama_user_updated: string
}
