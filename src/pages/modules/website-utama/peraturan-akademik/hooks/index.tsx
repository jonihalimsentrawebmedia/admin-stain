import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetDetailAcademicRules = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['academic-rules'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/pengaturan-akademik').then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { academicRules: data, loading }
}

export const UseGetAcademicRulesBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['background-academic-rules'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pengaturan-akademik-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data ?? [], loading }
}
