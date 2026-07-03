export interface IStudentDataStatus {
  id_mahasiswa: string
  nim: string
  nama_mahasiswa: string
  nama_jalur_masuk: string
  nama_prodi: string
  nama_fakultas: string
  kode_jenjang_pendidikan: string
  nama_jenjang_pendidikan: string
  semester_masuk: number
  nama_status_mahasiswa: string
  metode_input: string
  id_sumber: string | null
  is_available_kkn_magang: boolean
}
