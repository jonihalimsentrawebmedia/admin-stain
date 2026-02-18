import { useQuery } from '@tanstack/react-query'
import type { IStrukturOrganisasi } from '../model'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios'

const useGetStructureOrganization = () => {
  const [structureOrganization, setStructureOrganization] = useState<IStrukturOrganisasi>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ppip-struktur-organisasi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit-ppid/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStructureOrganization(data)
    }
  }, [data])

  return { structureOrganization, loading }
}

export default useGetStructureOrganization
