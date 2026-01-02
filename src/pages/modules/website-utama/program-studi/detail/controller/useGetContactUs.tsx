import  { useEffect, useState } from 'react'
import type { ContactUs } from '../model/contact-us'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetContactUs = () => {
const [contactUsDetail, setContactUsDetail] =
    useState<ContactUs>()
  const { id} = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-contact-us'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/hubungi-kami`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContactUsDetail(data?.data)
    }
  }, [data])

  return { contactUsDetail, loading }
}

export default useGetContactUs