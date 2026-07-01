export interface IEreceipt {
  id_kwitansi: string
  id_satuan_organisasi: string
  no_kwitansi: string
  tanggal: string
  nama_penerima: string
  nama_penyetor: string
  warna: string
  jumlah: string | number
  keterangan: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  nomor_serial: string
}
