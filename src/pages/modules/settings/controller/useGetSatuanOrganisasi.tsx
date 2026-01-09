import { useEffect, useState } from 'react'
import type { SatuanOrganisasiList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination'

interface Props {
  kelompok?: string
  isFilter?: boolean
  isGetAll?: boolean
  idParent?: string
  searchFilter?:string
}

const useGetSatuanOrganisasi = (props: Props) => {
  const [searchParams] = useSearchParams()
  const { kelompok, isFilter, isGetAll, idParent,searchFilter } = props
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchFilter?searchFilter:searchParams.get('search') || ''
  
  const id_parent = isFilter ? '' : idParent ? idParent : (searchParams.get('id_parent') ?? '')
  const ParamsSearch = new URLSearchParams({ page, limit, search, id_parent })
  const ParamsSearchParent = new URLSearchParams({ id_parent })

  const [satuanOrganisasi, setSatuanOrganisasi] = useState<SatuanOrganisasiList[]>([])
  const [meta, setMeta] = useState<Meta>()
  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['satuan-organisasi-list', kelompok, { search, page, limit, id_parent }],
    queryFn: () =>
      AxiosClient.get(
        `/pengaturan/satuan-organisasi/${kelompok ?? ''}?${isGetAll ? ParamsSearchParent : ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSatuanOrganisasi(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    satuanOrganisasi,
    loading,
    meta,
  }
}

export default useGetSatuanOrganisasi
