import { useEffect, useState } from 'react'
import type { ContactUs } from '@/pages/modules/website-utama/program-studi/detail/model/contact-us.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProfileContactUs = () => {
  const [contactUs, setContactUs] = useState<ContactUs>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['contact-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/hubungi-kami').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setContactUs(data)
    }
  }, [data])

  return { contactUs, loading }
}
