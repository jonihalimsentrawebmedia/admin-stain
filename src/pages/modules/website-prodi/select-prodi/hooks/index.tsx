import { useEffect, useState } from 'react'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

interface Props {
  kelompok: string
  id_parent?: string
}

export const UseGetGroupOrganizationFlexible = (props: Props) => {
  const { kelompok, id_parent } = props
  const [dataSatuan, setDataSatuan] = useState<SatuanOrganisasiList[]>([])

  const ParamsSearch = new URLSearchParams({ page: '1', limit: '99999' })
  if (id_parent) ParamsSearch.append('id_parent', id_parent)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['satuan-organisasi-list', kelompok, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/satuan-organisasi/${kelompok}?${ParamsSearch}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDataSatuan(data)
    }
  }, [data])

  return { dataSatuan, loading }
}
