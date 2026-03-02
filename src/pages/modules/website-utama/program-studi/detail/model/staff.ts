export interface StaffProfile {
  gambar_url: string
  nama: string
  nip: string
  jabatan_struktural: string
  jenjang_pendidikan: string
  unit_kerja: string
  no_hp: string
  tampil_no_hp: boolean
  email: string
  tampil_email: boolean
}

export interface StaffProfileStatus {
  status: string
  pending: number
  completed: number
  running: number
  failed: number
  too_many_retries: number
  not_retry: number
  job_can_running: number
}
