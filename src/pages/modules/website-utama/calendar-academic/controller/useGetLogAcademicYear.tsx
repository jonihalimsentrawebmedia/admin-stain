import { useEffect, useState } from 'react'
import type { LogActivity } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetLogAcademicYear = () => {
  const [log, setLog] = useState<LogActivity[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { idAcademicYear } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-list-acedemic-year'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/tahun-akademik-log/${idAcademicYear}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLog(data?.data??[])
      setMeta(data?.meta)
    }
  }, [data])

  return { log, loading, meta }
}

export default useGetLogAcademicYear
