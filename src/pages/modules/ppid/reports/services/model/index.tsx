export interface IReportService {
  id_laporan_layanan: string;
  id_satuan_organisasi: string;
  url_gambar: string;
  key_gambar: string;
  nama_laporan: string;
  slug: string;
  jenis: "DOKUMEN" | string; // bisa ditambahkan union lain jika ada tipe lain
  url: string | null;
  url_file: string;
  key_file: string;
  public: boolean;
  urutan: number;
  created_user: string;
  updated_user: string;
  created_at: string; // ISO Date string
  updated_at: string; // ISO Date string
  nama_created_user: string;
  nama_updated_user: string;
}