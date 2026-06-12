import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export interface IHumanResource {
  nama: string
  id_sdm: string
  jabatan: string[]
  nama_unit_kerja: string
  no_hp: string
  nip: string
  nik: string
  alamat: string
}

export const UseGetHumanResource = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}
  const [humanResource, setHumanResource] = useState<IHumanResource[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['human-resource', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/ref/sdm?${Params}`).then((res) => res?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setHumanResource(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { loading, humanResource, meta }
}
