import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export interface IELHKPN {
  url_gambar: string // Image URL
  deskripsi: string // HTML content describing the partner
  url: string
}

export const UseGetDetailELHKPN = () => {
  const { data: ELHKPN, isFetching, isLoading } = useQuery<IELHKPN>({
    queryKey: ['e-lhkpn'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/elhkpn').then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  return { loading, ELHKPN }
}
