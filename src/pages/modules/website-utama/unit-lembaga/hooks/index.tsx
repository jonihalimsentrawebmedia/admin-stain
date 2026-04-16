import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IUnitInstitution } from '@/pages/modules/website-utama/unit-lembaga/data/types.ts'

export const UseGetUnitInstitution = () => {
  const [unitInstitution, setUnitInstitution] = useState<IUnitInstitution[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-institution'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/website-utama/satuan-organisasi/unit-lembaga').then((res) => res.data),
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
