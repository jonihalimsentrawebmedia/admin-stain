import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

export const useGetInformationPublicRegister = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-ppid-daftar-informasi-public', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/daftar-informasi-public?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { information: data?.data ?? [], loading, meta: data?.meta }
}
export const useGetInformationPublicRegisterDetail = () => {
  const { id } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-ppid-daftar-informasi-public-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/daftar-informasi-public/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { information: data?.data, loading, id }
}
export const useGetPejabat = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-ppid-pejabat'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit-ppid/pejabat`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { pejabat: data?.data ?? [], loading }
}
export const useGetOrganizationGroup = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-ppid-kelompok-organisasi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit-ppid/kelompok-organisasi`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { organizationGroup: data?.data ?? [], loading }
}
