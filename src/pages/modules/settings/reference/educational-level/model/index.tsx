export interface EducationalLevelList {
  id_jenjang: string
  kode_jenjang: string
  nama_jenjang: string
  slug: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
}

export interface EducationLevelLanguage {
  content_hash: string
  last_translated_at: string
  status_translate: string
  ref_jenjang_pendidikan_translate_id:number
  id_jenjang: string
  language: string
  nama_jenjang: string
}
