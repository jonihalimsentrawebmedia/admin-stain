export interface IMailInvitationLetterList {
  id_mail_surat_undangan: string
  nomor_surat: string
  perihal: string
  tanggal_surat: string
  created_at: string
  status: TMailStatus
  id_jenis_surat: string
  nama_jenis_surat: string
  nama_user_created: string
}

export type TMailStatus = 'MENUNGGU' | 'DIPROSES' | 'SELESAI' | 'DIBATALKAN' | 'DIHAPUS'
