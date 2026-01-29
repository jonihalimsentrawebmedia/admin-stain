import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiDetail } from '@/pages/modules/settings/model'

interface props {
  kelompok: 'UNIVERSITAS' | 'FAKULTAS' | 'PRODI' | 'UNIT'
  id_parent?: string
}

export const UseGetUniversityDomainExist = (group?: props) => {
  const { kelompok, id_parent } = group ?? {}

  const [satuanOrganisasi, setSatuanOrganisasi] = useState<SatuanOrganisasiDetail[]>([])

  const ParamsSearch = new URLSearchParams()
  if (id_parent) ParamsSearch.set('id_parent', id_parent)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['university-domain-exist', kelompok, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(
        `/pengaturan/satuan-organisasi-domain-exists/${kelompok}?${ParamsSearch}`
      ).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSatuanOrganisasi(data)
    }
  }, [data])

  return { satuanOrganisasi, loading }
}
