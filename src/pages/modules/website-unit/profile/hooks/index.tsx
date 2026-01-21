import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const UseGetProfileUnit = () => {
  const [profileUnit, setProfileUnit] = useState<SatuanOrganisasiList>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['profile-unit'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/profil').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setProfileUnit(data)
    }
  }, [data])

  return { profileUnit, loading }
}
