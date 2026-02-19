import { useEffect, useState } from 'react'
import type { OfficialProfile, OrganizationGroup, PublicInformationRegistry } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

export const useGetInformationPublicRegister = () => {
  const [information, setInformation] = useState<PublicInformationRegistry[]>([])
  const [meta, setMeta] = useState<Meta>()

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

  useEffect(() => {
    if (data) {
      setInformation(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { information, loading, meta }
}
export const useGetInformationPublicRegisterDetail = () => {
  const [information, setInformation] = useState<PublicInformationRegistry>()

  const { id } = useParams()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-ppid-daftar-informasi-public-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/unit-ppid/daftar-informasi-public/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInformation(data?.data)
    }
  }, [data])

  return { information, loading, id }
}
export const useGetPejabat = () => {
  const [pejabat, setPejabat] = useState<OfficialProfile[]>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-ppid-pejabat'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit-ppid/pejabat`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPejabat(data?.data??[])
    }
  }, [data])

  return { pejabat, loading }
}
export const useGetOrganizationGroup = () => {
  const [organizationGroup, setOrganizationGroup] = useState<OrganizationGroup[]>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-ppid-kelompok-organisasi'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/unit-ppid/kelompok-organisasi`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setOrganizationGroup(data?.data??[])
    }
  }, [data])

  return { organizationGroup, loading }
}
