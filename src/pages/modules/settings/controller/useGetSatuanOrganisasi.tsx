import { useEffect, useState } from 'react'
import type { SatuanOrganisasiList } from '../model'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'
import type { Meta } from '@/components/common/table/TablePagination'

interface Props {
  kelompok?: string
}

const useGetSatuanOrganisasi = (props: Props) => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const { kelompok } = props
  const [satuanOrganisasi, setSatuanOrganisasi] = useState<SatuanOrganisasiList[]>([])
const [meta,setMeta]=useState<Meta>()
  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['satuan-organisasi-list', kelompok, { search, page, limit }],
    queryFn: () =>
      AxiosClient.get(
        `/pengaturan/satuan-organisasi/${kelompok ?? ''}?${searchParams.toString()}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setSatuanOrganisasi(data.data??[])
      setMeta(data.meta)
    }
  }, [data])

  return {
    satuanOrganisasi,
    loading,meta
  }
}

export default useGetSatuanOrganisasi
