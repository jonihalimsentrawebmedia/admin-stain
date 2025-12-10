export interface AcademicYearList {
  id_tahun_akademik: string
  id_satuan_organisasi: string
  tahun_akademik: number
  semester: 'GANJIL' | 'GENAP' | string
  nama_tahun_akademik: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}
