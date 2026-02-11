import { useEffect, useState } from 'react'
import type { SettingIdentity } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetIdentity = () => {
  const [identity, setIdentity] = useState<SettingIdentity>()

  const { data, isLoading, isFetching } = useQuery<{
    data: SettingIdentity
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-identity'],
    queryFn: () => AxiosClient.get(`/pengaturan/identitas`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setIdentity(data.data)
    }
  }, [data])

  return {
    loading,
    identity,
  }
}

export default useGetIdentity
