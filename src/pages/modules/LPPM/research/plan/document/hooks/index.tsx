import { useEffect, useState } from 'react'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface props extends basicProps {
  id_kategori: string
}

export const UseGetPlanResearchDocument = (props: props) => {
  const { id_kategori, search, page, limit } = props
  const [document, setDocument] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (id_kategori) ParamsSearch.append('id-kategori', id_kategori ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['research-plan-document', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/rencana-induk-penelitian?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDocument(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { document, meta, loading }
}
