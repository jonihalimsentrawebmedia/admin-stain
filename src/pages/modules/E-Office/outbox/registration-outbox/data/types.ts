export interface ISDMList {
  id_pejabat_surat_masuk: string
  id_surat_keluar: string
  id_sdm: string
  status: string
  dibaca_at: string | null
  dibaca_user: string | null
  direspon_at: string | null
  direspon_user: string | null
  komentar: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  // Relation
  nama_sdm: string
  gambar_sdm: string | null
  nama_dibaca_user?: string
  nama_direspon_user?: string
}

export interface IFileInbox {
  id_lampiran: string
  id_surat_keluar: string
  lampiran_url: string
  lampiran_key: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_lampiran: string
}

export interface IOutbox {
  /** Primary Key */
  id_surat_keluar: string

  /** Foreign Keys */
  id_satuan_organisasi: string
  id_unit: string
  id_asal_surat: string
  id_jenis_surat: string
  id_sifat_surat: string
  id_klasifikasi_surat: string
  id_waktu_pengingat_agenda?: string | null

  /** Main Data */
  nomor_surat: string
  nomor_agenda?: string | null
  tanggal_surat: string
  perihal: string
  ringkasan?: string | null
  penerima_surat?: string | null
  tembusan?: string | null

  /** Flags */
  is_otomatis: boolean
  is_agenda: boolean
  is_samakan_dengan_surat: boolean
  is_penting: boolean
  is_lampiran: boolean
  is_disposisi: boolean

  nama_kegiatan?: string | null
  keterangan_agenda?: string | null
  tanggal_mulai?: string | null
  tanggal_selesai?: string | null
  tempat?: string | null

  jenis_disposisi?: string | null
  status: string
  surat_kepada: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_penandatangan: string
  nama_jenis_surat: string
  nama_sifat_surat: string
  nama_klasifikasi_surat: string
  nama_waktu_pengingat_agenda?: string | null
  nama_satuan_organisasi: string
  nama_unit: string
  nama_dibaca_user?: string
  nama_dikirim_user?: string
  nama_direspon_user?: string

  pejabat: ISDMList[]
  lampiran: IFileInbox[]
}
