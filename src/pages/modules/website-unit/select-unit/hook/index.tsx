import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { SatuanOrganisasiDetail } from '@/pages/modules/settings/model'

interface Props {
  kelompok: 'UNIVERSITAS' | 'FAKULTAS' | 'PRODI' | 'UNIT' | 'LEMBAGA'
  id_parent?: string
  id_module?: string
}

export const UseGetUnitList = (props: Props) => {
  const { kelompok, id_parent, id_module } = props
  const [unitList, setUnitList] = useState<SatuanOrganisasiDetail[]>([])

  const ParamsSearch = new URLSearchParams()
  if (kelompok) ParamsSearch.set('kelompok', kelompok)
  if (id_parent) ParamsSearch.set('id_parent', id_parent)
  if (id_module) ParamsSearch.set('id_module', id_module)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-list', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/profil/satuan-organisasi?${ParamsSearch}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitList(data)
    }
  }, [data])

  return { unitList, loading }
}
