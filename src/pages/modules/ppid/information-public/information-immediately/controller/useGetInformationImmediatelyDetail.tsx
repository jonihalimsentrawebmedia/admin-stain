import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { InformationImmediatelyList } from '../model'

const useGetInformationImmediatelyDetail = () => {
  const params = useParams()
  const { id } = params
  const [informationImmediately, setInformationImmediately] = useState<InformationImmediatelyList>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['information-immediately-unit-ppid-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/informasi-serta-merta-informasi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInformationImmediately(data)
    }
  }, [data])

  return {
    informationImmediately,
    loading,id
  }
}

export default useGetInformationImmediatelyDetail
