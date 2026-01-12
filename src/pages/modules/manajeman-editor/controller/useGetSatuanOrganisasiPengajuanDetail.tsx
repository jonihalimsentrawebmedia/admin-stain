import { useEffect, useState } from 'react'

import type { ISatuanOrganisasi } from './useGetSatuanOrganisasiPengajuan'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useParams } from 'react-router-dom'

const useGetSatuanOrganisasiPengajuanDetail = () => {
  const [limit, setLimit] = useState('1')
  const [page, setPage] = useState('1')
  const [search, setSearch] = useState('')
  const { id } = useParams()
  const ParamsSearch = new URLSearchParams({ page, limit, search })
  const [satuanOrganisasiHistory, setSatuanOrganisasiHistory] = useState<ISatuanOrganisasi[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['editor-profile-satuan-organisasi-list-detail-history', { search, page, limit }],
    queryFn: () =>
      AxiosClient.get(`/editor/profil-history/${id}?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSatuanOrganisasiHistory(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    satuanOrganisasiHistory,
    loading,
    meta,
    setLimit,
    setPage,
    setSearch,
    limit,
    search,
    page,
  }
}

export default useGetSatuanOrganisasiPengajuanDetail
