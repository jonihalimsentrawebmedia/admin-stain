import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetIdentity = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['identity-campus'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/identitas').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { identityCampus: data, loading }
}

export const UseGetIdentityBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-identity'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/identitas-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data, loading }
}
