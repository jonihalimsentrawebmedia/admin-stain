import { useEffect, useState } from 'react'
import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListFAQ = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const [listFaq, setListFaq] = useState<IFAQList[]>([])
  const [metta, setMetta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search)
  if (limit) Params.append('limit', limit)
  if (page) Params.append('page', page)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-faq', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/faqs?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListFaq(data?.data ?? [])
      setMetta(data?.meta)
    }
  }, [data])

  return { listFaq, loading, metta }
}
