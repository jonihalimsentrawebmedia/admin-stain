import type { TipePertanyaan } from '@/pages/modules/pusat-karir/survey/data/types.ts'

export interface SurveyDetail {
  id_survei: string
  judul: string
  deskripsi: string
  status: 'DRAFT' | 'DITERBITKAN' | 'DITUTUP'
  bagian: SurveyPart[]
  jumlah_responden: number
  kategori_responden: string[] | null
  status_publikasi: []
  tanggal_mulai: string | null
  tanggal_selesai: string | null
}

export interface SurveyPart {
  id_bagian: string
  judul: string
  pertanyaan: SurveyQuestion[]
}

export interface SurveyQuestion {
  id_pertanyaan: string
  pertanyaan: string
  deskripsi: string
  required: boolean
  type: TipePertanyaan
  konfigurasi: QuestionConfig
  hasil_jawaban: AnswerResult
}

export interface QuestionConfig {
  pilihan?: AnswerOption[]
  is_pilihan_lain?: boolean
}

export interface AnswerOption {
  judul_pilihan: string
  value: string
}

export interface AnswerResult {
  jawaban: string[] | null
  hasil_jawaban_persetage: ResultAnswerItem[]
  jawaban_lainnya: string | null
}

export interface ResultAnswerItem {
  id_item_jawaban: string
  judul_item_jawaban: string
  jumlah_jawaban: number
  persentase: number
}
