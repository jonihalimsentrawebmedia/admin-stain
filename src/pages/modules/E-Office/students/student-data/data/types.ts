export interface IStudentData {
  id_mahasiswa: string
  id_satuan_organisasi: string
  nim: string
  nama_mahasiswa: string
  id_mahasiswa_unit: string
  id_mahasiswa_status: string
  angkatan: string
  semester_masuk: number
  id_mahasiswa_jalur_masuk: string
  metode_input: 'MANUAL' | 'IMPORT' | string
  id_sumber: string | null
  nik: string
  jenis_kelamin: 'LAKI_LAKI' | 'PEREMPUAN' | string
  id_mahasiswa_agama: string
  nama_jenjang_pendidikan: string
  kode_jenjang_pendidikan: string
  tempat_lahir: string
  tanggal_lahir: string
  no_hp: string
  email: string
  alamat: string
  nama_ayah: string
  nama_ibu: string
  nama_wali: string
  url_foto_mahasiswa: string | null
  key_foto_mahasiswa: string | null
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
  nama_user_created: string
  nama_user_updated: string
  nama_prodi: string
  nama_status_mahasiswa: string
  nama_jalur_masuk: string
  nama_agama: string
  semester_masuk_label: string
  nama_fakultas: string
  semester: string
}
