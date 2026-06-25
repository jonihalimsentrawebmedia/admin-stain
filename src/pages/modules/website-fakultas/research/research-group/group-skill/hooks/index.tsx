import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGroupSkill } from '../data/types'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListGroupSkills = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search ?? '')
  if (page) Params.append('page', page ?? '0')
  if (limit) Params.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery<{ data: IGroupSkill[]; meta: Meta }>({
    queryKey: ['group-skill', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/kelompok-keahlian?${Params}`).then((res) => res.data),
  })

  const loading = isFetching || isLoading

  return { listGroupSkill: data?.data ?? [] as IGroupSkill[], meta: data?.meta ?? undefined, loading }
}

export const UseGetDetailGroupSkills = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IGroupSkill>({
    queryKey: ['group-skill', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/kelompok-keahlian/${id}`).then((res) => res.data.data),
  })

  const loading = isFetching || isLoading

  return { groupSKill: data ?? undefined, loading }
}
