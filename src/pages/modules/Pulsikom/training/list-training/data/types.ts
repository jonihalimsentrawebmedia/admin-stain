export interface IInformationTraining {
  id_training: string
  id_satuan_organisasi: string
  url_gambar: string
  key_gambar: string
  nama_training: string
  deskripsi: string
  minimal_pendaftar: number
  maksimal_pendaftar: number | null
  is_tidak_ada_batas: boolean
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ITopicSchedule {
  id_bahasan_dan_topik: string
  id_training: string
  id_satuan_organisasi: string

  judul_topik_bahasan: string
  deskripsi: string

  tanggal_mulai_bahasan: string
  tanggal_selesai_bahasan: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}

export interface IRegisterPricing {
  id_biaya_pendaftaran: string
  id_training: string
  id_satuan_organisasi: string

  nama_biaya: string
  urutan: number

  harga: number

  keuntungan: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string
}
