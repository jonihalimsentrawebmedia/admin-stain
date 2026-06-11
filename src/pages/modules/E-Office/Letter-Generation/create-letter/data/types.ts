export interface IMailInvitationLetter {
  id_mail_surat_undangan: string
  id_satuan_organisasi: string
  id_nomor_surat_otomatis: string
  nomor_surat: string
  nomor_urut_manual: string
  tempat_surat: string
  tanggal_surat: string
  id_kop_surat: string
  id_jenis_surat: string
  lampiran: number
  detail_lampiran: string[]
  perihal: string
  is_yth_lebih_dari_satu: boolean
  yang_terhormat: string
  di: string
  pembuka: string
  hari_mulai: string
  hari_akhir: string | null
  is_lebih_dari_satu_hari: boolean
  waktu: string
  tempat: string
  agenda: string[]
  penutup: string
  is_ada_tembusan: boolean
  tembusan: string[]
  id_disahkan_oleh: string | null
  nama_disahkan_oleh: string | null
  status: 'MENUNGGU' | 'DISETUJUI' | 'DITOLAK' | string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
  nama_jenis_surat: string
}
