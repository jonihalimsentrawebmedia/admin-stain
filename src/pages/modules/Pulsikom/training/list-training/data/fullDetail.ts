// ==================== TRAINING ====================
interface StatusPengisian {
  is_informasi_pendaftaran: boolean
  is_topik_bahasan_jadwal: boolean
  is_persyaratan: boolean
  is_biaya_pendaftaran: boolean
  is_rekening_penerimaan: boolean
  is_kontak_catatan_tambahan: boolean
}

interface Training {
  id_training: string
  id_satuan_organisasi: string
  nama_training: string
  slug: string
  status_pengisian: StatusPengisian
  status: string // misal "DITERBITKAN"
  tgl_buka_pendaftaran: string // ISO date
  tgl_tutup_pendaftaran: string
  created_at: string
  updated_at: string
  nama_user_created: string
  nama_user_updated: string
  minimal_pendaftar: number
  maksimal_pendaftar: number | null
  is_tidak_ada_batas: boolean
  pending: null | any // sesuai data: null, bisa disesuaikan
  terkonfirmasi: null | any
  url_gambar: string
}

// ==================== INFORMASI ====================
interface Informasi {
  id_training: string
  id_satuan_organisasi: string
  url_gambar: string
  key_gambar: string
  nama_training: string
  deskripsi: string // bisa berisi HTML
  minimal_pendaftar: number
  maksimal_pendaftar: number | null
  is_tidak_ada_batas: boolean
  nama_user_created: string
  nama_user_updated: string
}

// ==================== PERSYARATAN ====================
interface Persyaratan {
  id_training: string
  id_satuan_organisasi: string
  isi: string // HTML
  nama_user_created: string
  nama_user_updated: string
}

// ==================== BIAYA PENDAFTARAN ====================
interface BiayaPendaftaran {
  id_biaya_pendaftaran: string
  id_training: string
  id_satuan_organisasi: string
  nama_biaya: string
  urutan: number
  harga: number
  keuntungan: string
  nama_user_created: string
  nama_user_updated: string
}

// ==================== BAHASAN DAN TOPIK ====================
interface BahasanDanTopik {
  id_bahasan_dan_topik: string
  id_training: string
  id_satuan_organisasi: string
  judul_topik_bahasan: string
  deskripsi: string
  tanggal_mulai_bahasan: string // ISO date
  tanggal_selesai_bahasan: string
  nama_user_created: string
  nama_user_updated: string
}

// ==================== KONTAK DAN CATATAN TAMBAHAN ====================
interface KontakDanCatatanTambahan {
  id_training: string
  id_satuan_organisasi: string
  is_kontak_unit: boolean
  no_telepon: string
  email: string
  alamat: string
  catatan_tambahan: string // HTML
  nama_user_created: string
  nama_user_updated: string
}

// ==================== REKENING (yang dipakai di tabel) ====================
interface Rekening {
  id_training_rekening: string
  id_training: string
  id_satuan_organisasi: string
  id_rekening: string
  nama_user_created: string
  nama_user_updated: string
  nama_rekening: string
  no_rekening: string
  atas_nama: string
  nama_training: string
}

// ==================== ROOT DATA ====================

export interface TrainingDetailData {
  training: Training
  informasi: Informasi
  persyaratan: Persyaratan
  biaya_pendaftaran: BiayaPendaftaran[]
  bahasan_dan_topik: BahasanDanTopik[]
  kontak_dan_catatan_tambahan: KontakDanCatatanTambahan
  rekening: Rekening[]
}
