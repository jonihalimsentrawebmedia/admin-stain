import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type {
  IMoreInformation
} from '@/pages/modules/website-utama/peraturan-akademik/more-information/data/resolver.tsx'

export const UseGetMoreInformation = (props: BasicProps) => {
  const { page, limit, search } = props

  const [information, setInformation] = useState<IMoreInformation[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['more_information', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pengaturan-akademik-informasi-tambahan?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInformation(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { information, meta, loading }
}
