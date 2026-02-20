export interface IInfografis {
  id_infografis: string;         // UUID
  id_satuan_organisasi: string;  // UUID
  url_gambar: string;            // URL lengkap ke Linode/Object Storage
  key_gambar: string;            // Filename/Key di storage
  status: boolean;               // Aktif/Tidak aktif
  created_user: string;
  updated_user: string;
  created_at: string;            // Format ISO 8601
  updated_at: string;            // Format ISO 8601
  nama_created_user: string;
  nama_updated_user: string;
}