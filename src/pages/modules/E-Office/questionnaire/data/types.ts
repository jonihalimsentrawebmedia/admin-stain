export interface ISurvey {
  id_survei: string
  judul: string
  diisi: number
  jenis_survei: 'KUANTITATIF' | 'KUALITATIF'
  is_publish: boolean
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  jumlah_pertanyaan: number
}

export interface IQuestionSurvey {
  id_survei_pertanyaan: string
  pertanyaan: string
  opsi: string[]
  diisi: number
}

export interface IDetailSurvey {
  id_survei: string
  judul: string
  diisi: number
  jenis_survei: 'KUANTITATIF' | 'KUALITATIF'
  is_publish: boolean

  created_at: string
  created_user: string
  updated_at: string
  updated_user: string

  nama_user_created: string
  nama_user_updated: string

  jumlah_pertanyaan: number

  pertanyaan: IQuestionSurvey[]
}

export interface ISurveyResult {
  opsi: string
  jumlah: number
  persentase: number
}

export interface ISurveyQuestionResult {
  id_pertanyaan: string
  pertanyaan: string
  opsi: string[]
  hasil: ISurveyResult[]
  diisi: number
}

export interface ISurveyDetailResult {
  id_survei: string
  judul: string
  jenis: 'KUANTITATIF' | 'KUALITATIF'
  is_publish: boolean
  jumlah_pengisi: number
  pertanyaan: ISurveyQuestionResult[]
}
