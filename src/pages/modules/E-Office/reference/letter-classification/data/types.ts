export interface ILetterClassification {
  id_klasifikasi_surat: string
  id_parent_klasifikasi_surat: string
  kode_klasifikasi: string
  nama: string
  children: ILetterClassification[]
  nama_user_created: string
  nama_user_updated: string
}