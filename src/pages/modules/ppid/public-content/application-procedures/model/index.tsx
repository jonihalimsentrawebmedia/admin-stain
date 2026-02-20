export interface IApplicationProcedures {
 id_tata_cara_permohonan: string; // UUID
  id_satuan_organisasi: string;    // UUID
  judul: string;
  url_gambar: string;              // URL gambar dari Linode
  key_gambar: string;              // Key/Filename di storage
  created_user: string;
  updated_user: string;
  created_at: string;              // ISO 8601 Timestamp
  updated_at: string;              // ISO 8601 Timestamp
  nama_created_user: string;
  nama_updated_user: string;
}