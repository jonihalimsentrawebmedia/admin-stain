export interface IPlacemanUser {
  id_pejabat: string;
  id_satuan_organisasi: string;
  id_kelompok_organisasi: string;
  id_pangkat_golongan: string;
  id_pangkat_akademik: string;
  
  nama_lengkap: string;
  jabatan: string;
  
  gambar: string;
  gambar_key: string;
  
  nip: string;
  no_hp: string;
  email: string;
  
  urutan: number;
  
  show_email_public: boolean;
  show_no_hp_public: boolean;
  
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user: string;
  
  nama_kelompok: string;
  nama_golongan: string;
  nama_akademik: string;
}
