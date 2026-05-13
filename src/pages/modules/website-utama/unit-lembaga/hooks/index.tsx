import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IUnitInstitution } from '@/pages/modules/website-utama/unit-lembaga/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetUnitInstitution = (props: BasicProps) => {
  const { search, limit, page } = props
  const [unitInstitution, setUnitInstitution] = useState<IUnitInstitution[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')
  if (search) Params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-institution', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/unit-lembaga?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitInstitution(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { unitInstitution, loading, meta }
}

export const UseGetUnitInstitutionDetail = (id: string) => {
  const [unitInstitutionDetail, setUnitInstitutionDetail] = useState<IUnitInstitution>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-institution-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/unit-lembaga/${id}`).then(
        (res) => res.data.data
      ),
  })

  useEffect(() => {
    if (data) {
      setUnitInstitutionDetail(data)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { unitInstitutionDetail, loading }
}

export const UseGetUnitInstitutionBackground = () => {
  const [background, setBackground] = useState<[]>([])

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-institution-background'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/unit-lembaga-background`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data)
    }
  }, [data])

  return { background, loading }
}
