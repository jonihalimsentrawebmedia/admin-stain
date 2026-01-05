import { useEffect, useState } from 'react'
import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetListFAQ = () => {
  const [listFaq, setListFaq] = useState<IFAQList[]>([])
  const [metta, setMetta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-faq'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/faqs').then((res) => res.data),
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
