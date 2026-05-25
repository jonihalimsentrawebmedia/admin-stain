export interface IDisposition {
  id: string

  id_pejabat_surat_masuk: string

  dari_kotak_masuk: string
  tanggal_surat: string
  nomor_surat: string
  nomor_agenda: string | null

  nama_asal_surat: string
  nama_jenis_surat: string
  nama_sifat_surat: string
  warna_sifat_surat: string

  perihal: string
  penerima_surat: string

  status: string
  jenis_disposisi: string | null

  list_disposisi: string[] | null

  gambar_user_created: string | null
  gambar_user_updated: string | null

  created_at?: string
  updated_at?: string
  created_user?: string
  updated_user?: string
}

export interface IEmployeeInbox {
  id_pejabat_surat_masuk: string
  id_surat_masuk: string
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
  nama_dikirim_user?: string
  dikirim_at?: string | null
  dikirim_user?: string | null
  list_disposisi?: string[] | null
}

export interface FileInbox {
  id_lampiran: string
  id_surat_masuk: string
  lampiran_url: string
  lampiran_key: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}

export interface IDispositionInbox {
  /** Primary Key */
  id_surat_masuk: string

  /** Foreign Keys */
  id_satuan_organisasi: string
  id_unit: string
  id_asal_surat: string
  id_jenis_surat: string
  id_sifat_surat: string
  id_klasifikasi_surat: string
  id_waktu_pengingat_agenda?: string | null

  /** Surat Information */
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

  /** Agenda Fields */
  nama_kegiatan?: string | null
  keterangan_agenda?: string | null
  tanggal_mulai?: string | null
  tanggal_selesai?: string | null
  tempat?: string | null

  /** Status & Disposisi */
  status: string
  jenis_disposisi?: string | null

  /** Audit Trail */
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  /** Relation Names */
  nama_asal_surat: string
  nama_jenis_surat: string
  nama_sifat_surat: string
  warna_sifat_surat: string
  nama_klasifikasi_surat: string
  nama_waktu_pengingat_agenda?: string | null
  nama_satuan_organisasi: string
  nama_unit: string
  nama_dibaca_user?: string
  gambar_dibaca_user?: string | null
  nama_dikirim_user?: string
  gambar_dikirim_user?: string | null
  nama_direspon_user?: string
  gambar_direspon_user?: string | null

  dikirim_at: string
  dibaca_at: string
  direspon_at: string

  /** Nested Arrays */
  pejabat: IEmployeeInbox[]
  lampiran: FileInbox[]
}
