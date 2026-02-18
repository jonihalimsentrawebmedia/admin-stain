/**
 * Interface untuk data profil pejabat atau atasan
 */
interface IPejabat {
  url_gambar: string;
  key_gambar: string;
  nama: string;
  deskripsi: string;
}

/**
 * Interface utama untuk Struktur Organisasi
 */
export interface IStrukturOrganisasi {
  id_struktur_organisasi: string;
  id_satuan_organisasi: string;
  isi_profil: string;
  isi_struktur: string;
  atasan: IPejabat;
  pejabat: IPejabat;
  created_user: string;
  updated_user: string;
  created_at: string; // Bisa menggunakan Date jika ingin di-parsing nantinya
  updated_at: string;
  nama_created_user: string;
  nama_updated_user: string;
}