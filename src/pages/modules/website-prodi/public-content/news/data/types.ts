export type IPropsData = {
  page?: string
  limit?: string
  status_publish: StatusPublish
}

export type StatusPublish =
  | 'DRAFT'
  | 'DIAJUKAN_EDITOR'
  | 'PROSES_EDITOR'
  | 'TOLAK_EDITOR'
  | 'DISETUJUI_EDITOR'
  | 'UNPUBLISH'
  | 'PUBLISHED'
