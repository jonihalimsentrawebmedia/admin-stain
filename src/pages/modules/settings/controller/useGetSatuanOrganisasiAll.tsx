import { useEffect, useState } from 'react'
import type { SatuanOrganisasiList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetSatuanOrganisasiAll = () => {
  const [satuanOrganisasi, setSatuanOrganisasi] = useState<SatuanOrganisasiList[]>([])

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['satuan-organisasi-list'],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/satuan-organisasi?page=0&limit=0`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSatuanOrganisasi(data.data ?? [])
    }
  }, [data])

  return {
    satuanOrganisasi,
    loading,
  }
}

export default useGetSatuanOrganisasiAll
