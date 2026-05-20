import { useEffect, useState } from 'react'
import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListFAQUnit = (props: BasicProps) => {
  const { page, limit, search } = props

  const [listFaq, setListFaq] = useState<IFAQList[]>([])
  const [metta, setMetta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  ParamsSearch.append('page', page ?? '1')
  ParamsSearch.append('limit', limit ?? '10')
  ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-faq-pmb', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pmb/faqs?${ParamsSearch}`).then((res) => res.data),
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
