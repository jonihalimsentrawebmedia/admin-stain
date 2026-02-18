import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type {  WorkResponsibilitiesList } from '../model'

const useGetWorkResponsibilitiesDetail = () => {
  const params = useParams()
  const { id } = params
  const [workResponsibilities, setWorkResponsibilities] = useState<WorkResponsibilitiesList>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['work-responsibilities-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/tugas-fungsi-tanggung-jawab/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setWorkResponsibilities(data)
    }
  }, [data])

  return {
    workResponsibilities,
    loading,
  }
}

export default useGetWorkResponsibilitiesDetail
