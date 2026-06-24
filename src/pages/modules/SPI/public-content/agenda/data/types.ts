export type IPropsData = {
  page?: string
  limit?: string
  status_publish: StatusPublish
  id_satuan_organisasi?: string
  search?: string
  year?: string
}

export type StatusPublish =
  | 'DRAFT'
  | 'DIAJUKAN_EDITOR'
  | 'PROSES_EDITOR'
  | 'TOLAK_EDITOR'
  | 'DISETUJUI_EDITOR'
  | 'UNPUBLISH'
  | 'PUBLISHED'
