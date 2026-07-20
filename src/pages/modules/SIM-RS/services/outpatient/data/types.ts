export interface IDaftarTagihan {
  komponen: string
  nama: string
  jumlah: number
  harga: number
  subtotal: number
}

export interface IDetailPembayaran {
  nama_sumber_biaya: string
  persentase: number
  jumlah: number
}

export interface IRingkasan {
  total_tagihan: number
  detail_pembayaran: IDetailPembayaran[]
}

export interface IInvoiceOutPatient {
  id_pendaftaran: string
  no_pendaftaran: string
  no_rekam_medis: string
  nama_pasien: string
  nama_poli: string
  nama_dokter: string
  tanggal_pendaftaran: string
  status: string
  jumlah_tagihan: number
  total_tagihan: number
  daftar_tagihan: IDaftarTagihan[]
  ringkasan: IRingkasan
}
