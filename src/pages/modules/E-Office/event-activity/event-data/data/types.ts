export interface IEvent {
  id_acara: string
  id_satuan_organisasi: string
  nama_kegiatan: string
  tanggal_mulai: string
  tanggal_selesai: string
  waktu: string
  tempat: string
  penyelenggara: string
  created_at: string
  created_user: string
  updated_at: string
  updated_user: string
  nama_user_created: string
  nama_user_updated: string
}

export interface IEventAttendance {
  nama: string
  instansi: string
  hp: string
  email: string
  jabatan: string
}

export interface IDetailEventPrint {
  nama_kegiatan: string
  tanggal_kegiatan: string
  waktu: string
  tempat: string
  penyelenggara: string
  daftar_tamu: IEventAttendance[]
}