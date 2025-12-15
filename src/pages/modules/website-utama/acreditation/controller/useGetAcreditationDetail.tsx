import { useParams } from 'react-router-dom'
import type { AcreditationDetail } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useEffect, useState } from 'react'

const useGetAcreditationDetail = () => {
  const [acreditationDetail, setAcreditationDetail] = useState<AcreditationDetail>()
  const { idAcreditation } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['acreditation-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas/${idAcreditation}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcreditationDetail(data?.data)
    }
  }, [data])

  return { acreditationDetail, loading }
}

export default useGetAcreditationDetail
