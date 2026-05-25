export interface IInboxAgenda {
  id: string

  tipe_surat: string
  nomor_surat: string
  perihal: string

  nama_kegiatan: string
  tanggal_mulai: string
  tanggal_selesai: string
  tempat: string
  is_penting: boolean
  jam_pengingat: string

  pengirim: string
  penerima: string

  nama_satuan_organisasi: string
  nama_unit: string

  created_at?: string
  updated_at?: string
}


export interface AgendaSummary {
  total_agenda: number
  agenda_besok: number
  agenda_minggu_ini: number
  agenda_minggu_depan: number
}