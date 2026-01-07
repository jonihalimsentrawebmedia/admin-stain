import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const UseGetProfileProdi = () => {
  const [profileProdi, setProfileProdi] = useState<SatuanOrganisasiList>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['profile-prodi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProfileProdi(data)
    }
  }, [data])

  return { profileProdi, loading }
}
