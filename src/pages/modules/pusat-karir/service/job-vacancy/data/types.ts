export interface IJobVacancy {
  id_lowongan_pekerjaan: string
  id_satuan_organisasi: string
  id_mitra_kerja: string

  nama_pekerjaan: string
  slug: string

  lowongan_internal: boolean
  kouta_pekerjaan: number

  jenis_lokasi_kerja: JobLocationType
  jenis_pekerjaan: JobType

  id_provinsi: string
  id_kabupaten: string

  tgl_buka_pekerjaan: string
  tgl_tutup_pekerjaan: string

  deskripsi_pekerjaan: string
  tugas_dan_tanggung_jawab: string
  persyaratan: string

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string

  nama_mitra_kerja: string
  nama_provinsi: string
  nama_kabupaten: string

  jumlah_pelamar: number

  list_data_spesialisasi: ISpecializationData[] | null
  list_spesialisasi: string[] | null
}

export interface ISpecializationData {
  id_spesialisasi: string
  id_sub_spesialisasi: string
  nama_spesialisasi: string
}

export type JobLocationType = 'ONSITE' | 'REMOTE' | 'HYBRID'

export type JobType = 'FULLTIME' | 'PARTTIME' | 'INTERNSHIP' | 'CONTRACT' | 'MAGANG'
