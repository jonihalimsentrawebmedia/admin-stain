import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IMailTypeLetterTemplate } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/detail-template/data/types.ts'

interface props extends BasicProps {
  id_jenis_template_surat: string
}

export const UseGetTemplateLetter = (props: props) => {
  const { page, search, limit, id_jenis_template_surat } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (id_jenis_template_surat) params.append('id_jenis_template_surat', id_jenis_template_surat)

  const { data: queryData, isLoading, isFetching } = useQuery<{ data: IMailTypeLetterTemplate[]; meta: Meta }>({
    queryKey: ['type-template-letter', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-template-surat?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  return { templateLetter: queryData?.data ?? [], meta: queryData?.meta, loading }
}
