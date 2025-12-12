import{ useEffect, useState } from 'react'
import type { LogActivity } from '../../calendar-academic/model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { Meta } from '@/components/common/table/TablePagination'

const useGetLogStatistic = () => {
 const [log, setLog] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()

 

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-statistic'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/statistik-log`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLog(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { log, loading, meta }
}

export default useGetLogStatistic