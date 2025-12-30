type BaseCampusLife = {
  id_satuan_organisasi: string
  is_warna_background: boolean
  warna_background: string | null
  teks_pengantar: string // HTML string
  created_at: string // ISO Date
  created_user: string
  updated_at: string // ISO Date
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ICampusLifeIntroduction extends BaseCampusLife {
  id_kehidupan_kampus_pengantar: string
}

export interface ICampusLifeFacilities extends BaseCampusLife {
  id_kehidupan_kampus_fasilitas: string
}

export interface ICampusLifeUnitActivities extends BaseCampusLife {
  id_kehidupan_kampus_unit_kegiatan: string
}

export interface ICampusLifeAchievements extends BaseCampusLife {
  id_kehidupan_kampus_prestasi: string
}

export interface ITestimonialCampusLife {
  id_kehidupan_kampus_testimoni: string
  id_satuan_organisasi: string
  foto_url: string
  foto_key: string
  nama_lengkap: string
  pekerjaan: string
  komentar: string
  created_at: string // ISO Date
  created_user: string
  updated_at: string // ISO Date
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IGalleryVideoSearch {
  id_galeri_video: string
  id_satuan_organisasi: string
  thumbnail: string
  thumbnail_key: string
  judul: string
  slug: string
  link_video: string
  created_at: string // ISO Date
  created_user: string
  updated_at: string // ISO Date
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  id_kehidupan_kampus_galeri: string
  is_dipilih: boolean
}

export interface IUrlDirectionCampusLife extends BaseCampusLife {
  id_kehidupan_kampus_link_arahan: string
  teks_tombol: string
  link_tombol: string
}

export interface IGalleryPhotoSearch {
  id_galeri_foto: string
  id_kehidupan_kampus_galeri: string
  id_satuan_organisasi: string
  id_album: string
  judul: string
  slug: string
  link_foto: string
  created_at: string // ISO Date
  created_user: string
  updated_at: string // ISO Date
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  is_dipilih: boolean
}
