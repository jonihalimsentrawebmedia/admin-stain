export type TipePertanyaan =
  | 'TEXT_PENDEK'
  | 'TEXT_PANJANG'
  | 'PILIHAN_GANDA'
  | 'KONTAK_CENTANG'
  | 'SKALA_LINEAR'
  | 'DROPDOWN'
  | 'TANGGAL'
  | 'ANGKA'

export interface IPilihanSurvey {
  judul_pilihan: string
}

export interface IKonfigurasiPilihan {
  pilihan: IPilihanSurvey[]
  is_pilihan_lain?: boolean
}

export interface IKonfigurasiSkalaLinear {
  min: number
  max: number
  judul_min: string
  judul_max: string
}

export type TKonfigurasiPertanyaan = IKonfigurasiPilihan | IKonfigurasiSkalaLinear | null

export interface IPertanyaanSurvey {
  pertanyaan: string
  deskripsi: string
  type: TipePertanyaan
  required: boolean
  konfigurasi: TKonfigurasiPertanyaan
}

export interface IBagianSurvey {
  judul: string
  pertanyaan: IPertanyaanSurvey[]
}

export interface ISurveyDataPost {
  judul: string
  deskripsi: string
  bagian: IBagianSurvey[]
}


export type StatusSurvei = "DITERBITKAN" | "DRAFT" | "DIARSIPKAN";
export type StatusPublikasi = "BERLANGSUNG" | "SELESAI" | "MENDATANG";
export type KategoriResponden = "MITRA_KERJA" | "PENCARI_KERJA";

export interface ISurveyQuestion {
  id_survei_pertanyaan: string
  id_satuan_organisasi: string
  judul: string
  slug: string
  deskripsi: string
  status: StatusSurvei
  status_publikasi: StatusPublikasi
  is_mitra_kerja: boolean
  is_pencari_kerja: boolean
  tanggal_mulai: string // Bisa menggunakan Date jika dikonversi saat fetch
  tanggal_selesai: string
  tanggal_arsip: string | null
  arsip_user: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  name_user_created: string
  name_user_updated: string
  nama_user_arsip: string | null
  kategori_responden: KategoriResponden[]
  jumlah_responden: number
}