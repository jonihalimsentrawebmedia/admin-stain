import { useParams } from 'react-router-dom'
import type { FieldOfCooperationList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useEffect, useState } from 'react'

const useGetFieldOfCooperationDetail = () => {
  const [fieldOfCooperationDetail, setFieldOfCooperationDetail] = useState<FieldOfCooperationList>()
  const { idFieldOfCooperation } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['field-of-cooperation-detail'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/bidang-kerjasama/${idFieldOfCooperation}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFieldOfCooperationDetail(data?.data)
    }
  }, [data])

  return { fieldOfCooperationDetail, loading }
}

export default useGetFieldOfCooperationDetail
