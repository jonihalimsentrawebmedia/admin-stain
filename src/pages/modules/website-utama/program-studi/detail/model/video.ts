export interface GaleriVideo {
  id_galeri_video:      string;
  id_satuan_organisasi: string;
  thumbnail:            string;
  thumbnail_key:        string;
  judul:                string;
  slug:                 string;
  link_video:           string;
  
  // Metadata & Auditing
  created_at:           string; // Bisa menggunakan Date jika dikonversi saat fetch
  created_user:         string;
  updated_at:           string;
  updated_user:         string;
  nama_user_created:    string;
  nama_user_updated:    string;
}