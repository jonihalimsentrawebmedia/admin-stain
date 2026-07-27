export interface IPrescriptionStatusCount {
  MENUNGGU: number
  SELESAI: number
}

export interface IResepItem {
  id_resep: string
  id_satuan_organisasi: string
  no_resep: string
  tanggal_resep: string
  status_resep: string
  id_pendaftaran: string
  no_pendaftaran: string
  id_pasien: string
  no_rekam_medis_pasien: string
  nama_pasien: string
  id_dokter: string
  nama_dokter: string
  nama_poli: string
  catatan: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IResepObatDetail {
  id_resep_obat: string
  nama_obat: string
  satuan: string
  frekuensi: number
  durasi: number
  jumlah: number
  harga: number
  harga_satuan: number
  status: string
  selesai_at: string | null
  sub_total: number
  nama_selesai_user: string
}

export interface IDetailPrescription {
  id_resep: string
  sumber_data: string
  tanggal_resep: string
  alasan_pembatalan: string | null
  status_resep: string
  jumlah_obat: number
  pasien: {
    id_pasien: string
    nama_pasien: string
    no_rekam_medis: string
  }
  dokter: {
    id_dokter: string
    nama_dokter: string
  }
  pendaftaran: {
    id_pendaftaran: string
    no_pendaftaran: string
    tanggal_pendaftaran: string
    nama_poli: string
  }
  daftar_obat: IResepObatDetail[]
  created_at: string
  updated_at: string
  nama_user_created: string
  nama_user_updated: string
}
