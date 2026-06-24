import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetEthicsCode = () => {
  const { data: codeEthics, isFetching, isLoading } = useQuery({
    queryKey: ['ethics-spi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/spi/kode-etik').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { codeEthics, loading }
}
