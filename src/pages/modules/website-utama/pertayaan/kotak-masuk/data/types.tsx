export interface IMessage {
  id_pertanyaan: string
  id_satuan_organisasi: string
  nama: string
  email: string
  pesan: string
  otp: string
  jawaban: string
  dokumens: string | null
  status: 'BELUM_TERJAWAB' | 'TERJAWAB'
  dikirim_at: string | null
  dikirim_user: string | null
  dijawab_at: string | null
  dijawab_user: string | null
  created_at: string
  updated_at: string
  updated_user: string
  nama_satuan_organisasi: string
}
