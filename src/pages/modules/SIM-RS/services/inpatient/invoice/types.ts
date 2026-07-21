export interface IRingkasanPerawatan {
  tanggal: string
  kode: string
  nama: string
  harga: number
}

export interface ITindakan {
  tanggal: string
  kode: string
  nama: string
  harga: number
}

export interface IObat {
  tanggal: string
  nama_obat: string
  satuan: string
  jumlah: number
  harga_satuan: number
  total: number
}

export interface IInformasiRuangan {
  nama_ruangan: string
  nomor_ruangan: string
  nama_jenis_ruangan: string
  tanggal_masuk: string
  tanggal_keluar: string | null
  status: string
  lama_dirawat: number | null
  harga_per_hari: number
  total_biaya: number
}

export interface IDetailPembayaranInap {
  nama_sumber_biaya: string
  persentase: number
  jumlah: number
}

export interface IRingkasanInap {
  total_tagihan: number
  detail_pembayaran: IDetailPembayaranInap[]
}

export interface IInvoiceInPatient {
  id_pendaftaran: string
  no_pendaftaran: string
  no_rekam_medis: string
  nama_pasien: string
  nama_poli: string
  nama_dokter: string
  tanggal_pendaftaran: string
  status: string
  tanggal_selesai: string | null
  catatan_kepulangan: string | null
  status_kondisi: string | null
  jumlah_tagihan: number
  total_tagihan: number
  ringkasan_perawatan: IRingkasanPerawatan[]
  daftar_tindakan: ITindakan[]
  daftar_obat: IObat[]
  informasi_ruangan: IInformasiRuangan[]
  ringkasan: IRingkasanInap
}
