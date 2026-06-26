import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface props extends basicProps {
  id_kategori: string
}

interface PlanResearchDocumentResponse {
  data: unknown[]
  meta: Meta
}

export const UseGetPlanResearchDocument = (props: props) => {
  const { id_kategori, search, page, limit } = props

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (id_kategori) ParamsSearch.append('id-kategori', id_kategori ?? '')

  const { data, isLoading, isFetching } = useQuery<PlanResearchDocumentResponse>({
    queryKey: ['research-plan-document', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/rencana-induk-penelitian?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { document: data?.data ?? [], meta: data?.meta, loading }
}
