export interface IBiayaType {
  id_jenis_biaya: string
  kode: string
  nama: string
  tipe: 'UMUM' | 'TRANSPORTASI' | 'PERHARI'
  nama_user_created: string
  nama_user_updated: string
}
