export interface UnitFasilitasGambarTambahan {
  id_unit_fasilitas_gambar_tambahan: number;
  gambar: string;
  gambar_key: string;
  keterangan: string;
  id_unit_fasilitas: string;
}

export interface IUnitFacilities {
  id_unit_fasilitas: string;
  id_satuan_organisasi: string;
  gambar: string;
  gambar_key: string;
  keterangan_gambar: string;
  nama_fasilitas: string;
  slug: string;
  deskripsi: string;
  publish: "Y" | "N"; // Menggunakan literal type karena biasanya hanya Y/N
  status: "Y" | "N";
  status_publish: string; // Bisa diubah jadi Enum jika pilihannya terbatas (e.g., 'DIAJUKAN_EDITOR')
  
  // Tanggal menggunakan string (ISO 8601)
  diajukan_at: string | null;
  ditolak_at: string | null;
  disetujui_at: string | null;
  diterbitkan_at: string | null;
  proses_at: string | null;
  published_at: string | null;
  unpublished_at: string | null;
  created_at: string;
  updated_at: string;

  // ID User (UUID)
  diajukan_user: string | null;
  ditolak_user: string | null;
  disetujui_user: string | null;
  proses_user: string | null;
  published_user: string | null;
  unpublished_user: string | null;
  created_user: string;
  updated_user: string;

  // Nama User & Organisasi
  nama_user_created: string;
  nama_user_updated: string;
  nama_satuan_organisasi: string;
  nama_disetujui: string | null;
  nama_published: string | null;
  nama_diajukan: string | null;
  nama_ditolak: string | null;
  nama_proses: string | null;
  nama_unpublished: string | null;
  nama_user: string;
  nama_level: string;

  // Relasi
  alasan_ditolak: string;
  unit_fasilitas_gambar_tambahan: UnitFasilitasGambarTambahan[];
}

export interface IStatusFacilitiesUnit {
  DIAJUKAN_EDITOR: number;
  DISETUJUI_EDITOR: number;
  DRAFT: number;
  PROSES_EDITOR: number;
  PUBLISHED: number;
  TOLAK_EDITOR: number;
  UNPUBLISH: number;
}