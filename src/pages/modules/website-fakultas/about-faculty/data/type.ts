export interface IFacultyAbout {
  id_satuan_organisasi: string;  // UUID
  id_unit: string;                // UUID
  isi_konten: string;             // HTML string
  gambar: string[];                // Array URL gambar
  created_at: string;              // ISO timestamp
  created_user: string;            // UUID user pembuat
  updated_at: string;              // ISO timestamp
  updated_user: string;            // UUID user pengubah
  nama_user_created: string;       // Nama user pembuat
  nama_user_updated: string;       // Nama user pengubah
}