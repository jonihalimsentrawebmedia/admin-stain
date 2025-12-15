export interface AcreditationList {
  id_akreditas: string
  id_satuan_organisasi: string
  id_satuan_organisasi_akreditas: string
  uraian: string
  lembaga_penilaian: string
  no_surat_keputusan: string
  mulai_berlaku: string
  akhir_berlaku: string
  nilai_akreditas: string
  created_at: string
  gambar: string
  nama_satuan_organisasi_akreditas: string
  nama_satuan_organisasi: string
}

export interface AcreditationDetail {
  id_akreditas: string
  gambar: string
  gambar_key: string
  id_satuan_organisasi: string
  id_satuan_organisasi_akreditas: string
  uraian: string
  nilai_akreditas: string
  lembaga_penilaian: string
  no_surat_keputusan: string
  mulai_berlaku: string
  akhir_berlaku: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_satuan_organisasi_akreditas: string
  nama_user_created: string
  nama_user_updated: string
}
