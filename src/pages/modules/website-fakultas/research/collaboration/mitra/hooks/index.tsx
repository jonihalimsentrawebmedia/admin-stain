import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IPartnerMitra } from '../data/type.ts'

export const UseGetPartnerMitra = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [partnerMitra, setPartnerMitra] = useState<IPartnerMitra[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['mitra-partner', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/mitra-kerjasama?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data?.meta)
      setPartnerMitra(data?.data)
    }
  }, [data])

  return { loading, partnerMitra, meta }
}
