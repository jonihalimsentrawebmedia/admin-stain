export interface LevelCost {
  id_ukt: string
  id_tingkatan: string
  nama_tingkatan: string
  biaya: string // bisa diubah ke number jika ingin di-parse
}

export interface EntranceUkt {
  id_ukt_jalur_masuk: string
  id_jalur_masuk: string
  nama_jalur_masuk: string
  publish: boolean
  biaya_tingkatan: LevelCost[]
}

export interface IDataCostUktProdi {
  id_prodi: string
  nama_fakultas: string
  nama_prodi: string
  kode_jenjang: string
  nama_jenjang: string
  data: EntranceUkt[] // array jalur masuk (Reguler, Ekstensi, dll)
}
