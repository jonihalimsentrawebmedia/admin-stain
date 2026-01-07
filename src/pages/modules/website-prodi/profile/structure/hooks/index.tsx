import { useEffect, useState } from 'react'
import type { OrganizationalStructure } from '@/pages/modules/website-utama/program-studi/detail/model/organizational-structure.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStructureOrganization = () => {
  const [structure, setStructure] = useState<OrganizationalStructure>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['structure-organization'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/prodi/profil/struktur-organisasi').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStructure(data)
    }
  }, [data])

  return { structure, loading }
}
