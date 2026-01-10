export interface ISubjectDetail {
  id_kurikulum: string
  nama_mata_kuliah: string
  tahun: number
  semester: 'GANJIL' | 'GENAP'
  sks: number
  jenis_mata_kuliah: 'WAJIB' | 'PILIHAN'
  id_mata_kuliah: string
}
