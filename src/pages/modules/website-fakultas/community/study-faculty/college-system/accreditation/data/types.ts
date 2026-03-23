export interface IAccreditation {
  id_akreditas: string // UUID
  id_satuan_organisasi: string // UUID satuan organisasi
  id_satuan_organisasi_akreditas: string // UUID prodi/unit yang diakreditasi
  uraian: string // Deskripsi akreditasi
  lembaga_penilaian: string // Lembaga penilai (misal BAN-PT)
  no_surat_keputusan: string // Nomor SK
  mulai_berlaku: string // Tanggal mulai berlaku (YYYY-MM-DD)
  akhir_berlaku: string // Tanggal akhir berlaku (YYYY-MM-DD)
  nilai_akreditas: string // Nilai akreditasi (misal UNGGUL, B, dll)
  created_at: string // Timestamp dibuat (YYYY-MM-DD HH:MM:SS)
  gambar: string // URL gambar sertifikat
  nama_satuan_organisasi_akreditas: string // Nama prodi/unit yang diakreditasi
  nama_satuan_organisasi: string // Nama satuan organisasi (misal STAIN)
}
