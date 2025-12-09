import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { InovationList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'

const useGetImpactInnovation = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const [meta,setMeta]=useState<Meta>()
  const [impactInnovation, setImpactInnovation] = useState<InovationList[]>([])

  const { data, isLoading, isFetching } = useQuery<{
    data: InovationList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-impact-innovation', { page, limit, search }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/inovasi-berdampak?${searchParams.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setImpactInnovation(data.data??[])
      setMeta(data.meta)
    }
  }, [data])

  return {
    impactInnovation,
    loading,meta
  }
}

export default useGetImpactInnovation
