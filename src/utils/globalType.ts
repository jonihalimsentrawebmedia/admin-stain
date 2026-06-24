export type BasicProps = {
  page?: string
  limit?: string
  search?: string
}

import type { Meta } from '@/components/common/table/TablePagination.tsx'

export interface IApiResponse<T> {
  status: boolean
  message: string
  data: T
  meta?: Meta
}
