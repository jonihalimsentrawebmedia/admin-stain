import { useEffect, useState } from 'react'
import type { GuideList } from '../data/type'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import Cookies from 'js-cookie'

export const UseGetListGuide = () => {
  const [listGuide, setListGuide] = useState<GuideList[]>([])
  const [meta, setMeta] = useState<Meta>()
  const valueGuide = Cookies.get('guide')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`list-guide-${valueGuide}`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/panduan/${valueGuide}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListGuide(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listGuide, loading, meta }
}
