export interface IPublication {
  id_publikasi: string
  id_sdm: string
  id_sister: string
  nama_sdm: string
  judul_publikasi: string
  tanggal_terbit: string
  jenis_publikasi: string
  url_jurnal: string | null
  penulis: string[]
}
