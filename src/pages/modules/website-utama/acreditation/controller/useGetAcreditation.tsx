import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetAcreditation = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''
  const id_satuan_organisasi_akreditas = searchParams.get('id_satuan_organisasi_akreditas') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_satuan_organisasi_akreditas })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-acreditation', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/akreditas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { acreditationList: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetAcreditation
