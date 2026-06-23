import { useQuery } from '@tanstack/react-query'
import type { SatuanOrganisasiList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'
import { useSearchParams } from 'react-router-dom'

interface Props {
  kelompok?: string
  isFilter?: boolean
  isGetAll?: boolean
  idParent?: string
  searchFilter?: string
}

const useGetSatuanOrganisasi = (props: Props) => {
  const [searchParams] = useSearchParams()
  const { kelompok, isFilter, isGetAll, idParent, searchFilter } = props
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchFilter ? searchFilter : searchParams.get('search') || ''

  const id_parent = isFilter ? '' : idParent ? idParent : (searchParams.get('id_parent') ?? '')
  const ParamsSearch = new URLSearchParams({ page, limit, search, id_parent })
  const ParamsSearchParent = new URLSearchParams({ id_parent })
  if (isGetAll) {
    ParamsSearchParent.append('limit', '0')
    ParamsSearchParent.append('page', '0')
  }

  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['satuan-organisasi-list', kelompok, { search, page, limit, id_parent }],
    enabled: !!kelompok,
    queryFn: () =>
      AxiosClient.get(
        `/pengaturan/satuan-organisasi/${kelompok ?? ''}?${isGetAll ? ParamsSearchParent : ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    satuanOrganisasi: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetSatuanOrganisasi
