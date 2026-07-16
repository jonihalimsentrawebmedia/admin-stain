export interface IBackupData {
  status: string
  backup_path: string
  backup_user: string
  backup_at: string
  download_user: string | null
  download_at: string | null
  nama_backup_user: string
  nama_download_user: string
  percentage: number
  error_message?: string | null
}

export interface IBackupHistory {
  id: number
  status: string
  backup_path: string
  backup_user: string
  backup_at: string
  download_user: string | null
  download_at: string | null
  error_message: string | null
  path_download: string | null
  percentage: number
  duration_seconds: number
  created_at: string
  updated_at: string
  nama_backup_user: string
  nama_download_user: string
}
