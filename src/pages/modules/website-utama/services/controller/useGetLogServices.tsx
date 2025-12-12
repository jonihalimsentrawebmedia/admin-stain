import  { useEffect, useState } from 'react'
import type { LogActivity } from '../../calendar-academic/model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useParams } from 'react-router-dom'

const useGetLogServices = () => {
 const [log, setLog] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()
    const {id}=useParams()
 

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-services'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/layanan-log/${id}`).then(
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

export default useGetLogServices