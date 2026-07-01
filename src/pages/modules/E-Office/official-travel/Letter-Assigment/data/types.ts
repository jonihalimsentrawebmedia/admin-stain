import type { IListSPPD } from '@/pages/modules/E-Office/official-travel/Letter-Assigment/detail/data/types.ts'

export interface ILetterAssignment {
  id_mail_surat_tugas: string
  id_satuan_organisasi: string
  id_kop_surat: string
  id_nomor_surat_otomatis: string

  nomor_surat: string
  nomor_urut_manual: string | null

  tanggal_surat: string // ISO format

  dasar_surat_tugas: string[]

  tanggal_mulai: string
  tanggal_akhir: string

  tempat_kegiatan: string

  kegiatan: string[]

  disahkan_oleh: string
  nama_disahkan_oleh: string
  nama_jabatan_struktural: string | null
  nip: string

  url_file_undangan: string | null
  key_file_undangan: string | null

  nama_user_created: string
  nama_unit_kerja: string

  kop_surat: KopSurat
  sppd: IListSPPD[]
  pegawai: ILetterAssignmentEmployee[]

  created_at?: string
  created_user?: string
  updated_at?: string
  updated_user?: string
}

// =============================================
// KOP SURAT (Reusable dari sebelumnya)
// =============================================
export interface KopSurat {
  id_kop_surat: string
  id_satuan_organisasi: string
  id_unit: string
  nama_unit: string
  url_logo: string
  key_logo: string
  pengaturan: PengaturanKop[]
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface PengaturanKop {
  isi: string
  jenis_font: string
  gaya_font: 'bold' | 'normal' | 'italic'
  ukuran_font: number
}

// =============================================
// PEGAWAI / PESERTA
// =============================================
export interface ILetterAssignmentEmployee {
  id_mail_surat_tugas_pegawai: string
  id_satuan_organisasi: string
  id_mail_surat_tugas: string
  id_sdm: string

  metode_tambah: string // contoh: "DOSEN_STAFF"

  nama_lengkap: string
  nama_sdm: string
  nik: string
  nip: string

  satuan_kerja: string
  jabatan_pegawai: string

  hp: string
  alamat: string

  tanggal_berangkat: string
  tanggal_pulang: string
  tanggal_lahir?: string
  no_spd: string | null
  urutan: number

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface ListLetterAssignment {
  id_mail_surat_tugas: string
  nomor_surat: string
  tanggal_surat: string
  tanggal_mulai: string
  tanggal_akhir: string
  kegiatan: string[]
  jumlah_pegawai: number
  nama_penandatangan: string
  nama_user_created: string
  created_at: string
}
