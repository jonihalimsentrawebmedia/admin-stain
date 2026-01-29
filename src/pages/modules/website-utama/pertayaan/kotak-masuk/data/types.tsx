export interface IMessage extends MainMessage {
  id_satuan_organisasi?: string
  otp?: string
  dikirim_at?: string | null
  dikirim_user?: string | null
  dijawab_at?: string | null
  dijawab_user?: string | null
  created_at?: string
  updated_at?: string
  updated_user?: string
  jawaban?: string
  dokumens?: string[]
  nama_satuan_organisasi?: string
}

export interface MainMessage {
  id_pertanyaan: string
  nama: string
  email: string
  pesan: string
  status: string
}
