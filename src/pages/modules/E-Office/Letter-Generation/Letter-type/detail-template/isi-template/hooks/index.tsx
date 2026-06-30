import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IMailIsiTemplateSurat } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/isi-template/data/types.ts'

interface Props extends BasicProps {
  id_template_surat: string
}

export const UseGetIsiTemplateSurat = (props: Props) => {
  const { page, search, limit, id_template_surat } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (id_template_surat) params.append('id_template_surat', id_template_surat)

  const { data: queryData, isLoading, isFetching } = useQuery<{ data: IMailIsiTemplateSurat[]; meta: Meta }>({
    queryKey: ['isi-template-surat', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-isi-template-surat?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  return { isiTemplate: queryData?.data ?? [], meta: queryData?.meta, loading }
}
