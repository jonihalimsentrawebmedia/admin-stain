export interface ServiceAccreditation {
  id_akreditas: string;
  id_satuan_organisasi: string;
  id_satuan_organisasi_akreditas: string;
  uraian: string;
  lembaga_penilaian: string;
  no_surat_keputusan: string;
  mulai_berlaku: string; // Format: YYYY-MM-DD
  akhir_berlaku: string; // Format: YYYY-MM-DD
  nilai_akreditas: 'BAIK' | 'BAIK_SEKALI' | 'UNGGUL' | string; 
  created_at: string;
  gambar: string; // URL string
  nama_satuan_organisasi_akreditas: string;
  nama_satuan_organisasi: string;
  dokumen_akreditas: string; // URL string (PDF)
}