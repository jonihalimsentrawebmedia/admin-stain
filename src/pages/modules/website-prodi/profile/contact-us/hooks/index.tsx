import type { ContactUs } from '@/pages/modules/website-utama/program-studi/detail/model/contact-us.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetProfileContactUs = () => {
  const { data, isLoading, isFetching } = useQuery<ContactUs>({
    queryKey: ['contact-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/hubungi-kami').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { contactUs: data, loading }
}
