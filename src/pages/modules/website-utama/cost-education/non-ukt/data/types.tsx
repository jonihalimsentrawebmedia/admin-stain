export interface NonUktEntranceList {
  id_non_ukt_jalur_masuk: string

  id_satuan_organisasi: string
  id_prodi: string
  id_fakultas: string
  id_jenjang_pendidikan: string
  id_jalur_masuk: string

  nama_prodi: string
  nama_fakultas: string
  nama_jenjang: string
  nama_jalur_masuk: string
  publish: boolean
  urutan: number

  created_at?: string
  created_user?: string
  updated_at?: string
  updated_user?: string
}

export interface BiayaNonUkt {
  id_non_ukt: string
  id_non_ukt_jalur_masuk: string
  id_jenis_tarif: string
  nama_jenis_tarif: string
  biaya: string | null
  aktif: boolean
}

export interface NonUktProdi {
  id_prodi: string
  nama_prodi: string
  nama_fakultas: string
  kode_jenjang: string
  nama_jenjang_pendidikan: string
  publish: boolean
  id_jalur_masuk: string
  nama_jalur_masuk: string

  biaya_list: BiayaNonUkt[]
}
