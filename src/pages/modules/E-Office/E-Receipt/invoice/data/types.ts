export interface IReconciliation {
  kwitansi: IReceipt
  items: ItemInvoice[]
  total_item_harga: number
  total_faktur: number
  sisa: number
  is_status: boolean
  status_rekonsiliasi: string
}

export interface IReceipt {
  id_kwitansi: string
  id_satuan_organisasi: string
  no_kwitansi: string
  tanggal: string
  nama_penerima: string
  nama_penyetor: string
  warna: string
  jumlah: number
  keterangan: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nomor_serial:string
  nama_user_updated: string
}

export interface ItemInvoice {
  id_item_faktur: string
  id_satuan_organisasi: string
  id_kwitansi: string

  banyak: number
  satuan: string
  nama_barang: string
  harga_satuan: number
  total_harga: number

  created_at: string
  created_user: string

  updated_at: string
  updated_user: string
}