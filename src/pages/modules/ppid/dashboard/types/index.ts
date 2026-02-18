export interface ITotalVisitor {
  total_pengunjung: number
  hari_ini: number
  kemaren: number
  minggu_ini: number
  bulan_ini: number
  tahun_ini: number
}

export interface IContent {
  id: string
  tanggal: string // ISO Date string
  jenis_konten: 'prestasi' | string
  judul: string
  penulis: string
  nama_user: string
  nama_level: string
}

export type Mode = 'harian' | 'mingguan' | 'bulanan' | 'tahunan'
