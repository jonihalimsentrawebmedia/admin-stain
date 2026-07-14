export interface IRoom {
  id_ruangan: string
  nama: string
  nomor: string
  id_jenis_ruangan: string
  jumlah_kasur: number
  lokasi: string
  nama_jenis_ruangan?: string
  is_status: boolean
  tanggal: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  tanggal_registrasi: string
}
