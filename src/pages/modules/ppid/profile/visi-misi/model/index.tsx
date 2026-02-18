export interface VisiMisiUnitList {
  id_visi_misi: string;
  id_satuan_organisasi: string;
  slug: string;
  nama: string;
  isi: string;
  urutan: number;
  created_at: string; // atau Date jika Anda melakukan transformasi data
  created_user: string;
  updated_at: string;
  updated_user: string;
  nama_user_created: string;
  nama_user_updated: string;
}