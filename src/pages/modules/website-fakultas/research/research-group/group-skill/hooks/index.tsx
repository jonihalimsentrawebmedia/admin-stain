import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGroupSkill } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListGroupSkills = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [listGroupSkill, setListGroupSkill] = useState<IGroupSkill[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['group-skill', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/kelompok-keahlian?${Params}`).then((res) => res.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setListGroupSkill(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { listGroupSkill, meta, loading }
}

export const UseGetDetailGroupSkills = (id: string) => {
  const [groupSKill, setGroupSKill] = useState<IGroupSkill>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['group-skill', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/kelompok-keahlian/${id}`).then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  useEffect(() => {
    if (data) {
      setGroupSKill(data)
    }
  }, [data])

  return { groupSKill, loading }
}
