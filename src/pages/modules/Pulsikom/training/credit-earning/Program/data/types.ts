export interface IInformationProgram {
  id_program: string
  id_satuan_organisasi: string
  url_gambar: string
  key_gambar: string
  nama_program: string
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
  tgl_buka_pendaftaran: string
  tgl_tutup_pendaftaran: string
}

export interface ITopicSchedule {
  id_bahasan_dan_topik: string
  id_program: string
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
  id_program: string
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

export interface IContactProgram {
  id_program: string
  id_satuan_organisasi: string
  is_kontak_unit: boolean
  no_telepon: string
  email: string
  alamat: string
  catatan_tambahan: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IStatus {
  is_informasi_pendaftaran: boolean
  is_topik_bahasan_jadwal: boolean
  is_persyaratan: boolean
  is_biaya_pendaftaran: boolean
  is_rekening_penerimaan: boolean
  is_kontak_catatan_tambahan: boolean
}

interface AuditTrail {
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IProgramList extends AuditTrail {
  id_program: string
  id_satuan_organisasi: string
  nama_program: string
  slug: string
  status_pengisian: IStatus
  status: string
  tgl_buka_pendaftaran: string | null
  tgl_tutup_pendaftaran: string | null
  tanggal_mulai_pelatihan: string | null
  tanggal_selesai_pelatihan: string | null
  terbit_at: string | null
  terbit_user: string | null
  alasan_tutup: string | null
  tutup_at: string | null
  tutup_user: string | null
  minimal_pendaftar: number
  maksimal_pendaftar: number | null
  is_tidak_ada_batas: boolean | null
  pending: number
  terkonfirmasi: number
}
