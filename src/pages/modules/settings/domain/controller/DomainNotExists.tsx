// pengaturan/satuan-organisasi-domain-not-exists/:kelompok

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'

export const UseGetDomainNotExists = ({ group }: { group: string }) => {
  const [organizationUnit, setOrganizationUnit] = useState<SatuanOrganisasiList[]>([])
  const [meta, setMeta] = useState()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['satuan-organisasi-domain-not-exists', group],
    enabled: !!group,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient(`/pengaturan/satuan-organisasi-domain-not-exists/${group}?page=0&limit=0`).then(
        (res) => res?.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOrganizationUnit(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { loading, organizationUnit, meta }
}
