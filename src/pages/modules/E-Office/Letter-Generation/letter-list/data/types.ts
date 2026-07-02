export interface IMailInvitationLetterList {
  id: string
  jenis_surat: string
  nomor_surat: string
  tempat_surat: string
  tanggal_surat: string
  id_kop_surat: string
  id_jenis_template_surat: string
  status: TMailStatus
  nama_jenis_template: string
  kode_template: string
  kategori_jenis_surat: string
  nama_kode_template: string
  created_at: string
  nama_user_created: string
}

export type TMailStatus = 'MENUNGGU' | 'DIPROSES' | 'SELESAI' | 'DIBATALKAN' | 'DIHAPUS'
