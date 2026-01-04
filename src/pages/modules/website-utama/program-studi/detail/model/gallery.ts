export interface GaleriAlbum {
  id_galeri_album: string;
  id_satuan_organisasi: string;
  thumbnail: string;
  thumbnail_key: string;
  judul: string;
  slug: string;
  created_at: string; // Bisa menggunakan Date jika Anda melakukan parsing setelah fetch
  created_user: string;
  updated_at: string;
  updated_user: string;
  jumlah_foto: number;
  nama_user_created: string;
  nama_user_updated: string;
  link_video:string
}