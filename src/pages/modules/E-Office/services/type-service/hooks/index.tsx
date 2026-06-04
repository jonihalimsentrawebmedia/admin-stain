import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ITypeService } from '@/pages/modules/E-Office/services/type-service/data/types.ts'

export const UseGetTypeService = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [typeService, setTypeService] = useState<ITypeService[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-service', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/jenis-layanan?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTypeService(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, typeService, meta }
}
