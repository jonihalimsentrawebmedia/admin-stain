import { useQuery } from '@tanstack/react-query'
import type { SettingIdentity } from '../model'
import AxiosClient from '@/provider/axios'

const useGetIdentity = () => {
  const { data, isLoading, isFetching } = useQuery<{
    data: SettingIdentity
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-identity'],
    queryFn: () => AxiosClient.get(`/pengaturan/identitas`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    loading,
    identity: data?.data,
  }
}

export default useGetIdentity
