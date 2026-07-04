import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMailTypeLetter } from '@/pages/modules/E-Office/Letter-Generation/Letter-type/data/types.ts'

interface props extends BasicProps {
  category?: string
}

export const UseGetTypeLetters = (props?: props) => {
  const { page, search, limit, category } = props ?? {}

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')
  if (category) params.append('kategori_jenis_surat', category ?? '')

  const {
    data: queryData,
    isLoading,
    isFetching,
  } = useQuery<{ data: IMailTypeLetter[]; meta: Meta }>({
    queryKey: ['code-letter-type', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/eoffice/mail-jenis-surat?' + params).then((res) => res.data),
  })

  const loading = isLoading || isFetching
  return { loading, letterType: queryData?.data ?? [], meta: queryData?.meta }
}

export const UseGetDetailTypeLetter = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IMailTypeLetter>({
    queryKey: ['code-letter-type-detail', id],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/mail-jenis-surat/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching
  return { letter: data, loading }
}

interface propsCode {
  is_existing?: boolean
  type?: string
}

export const UseGetCodeAvailableLetter = (props?: propsCode) => {
  const { is_existing, type } = props ?? {}

  const Params = new URLSearchParams()
  if (is_existing) Params.append('is_existing', is_existing.toString())
  if (type) Params.append('kategori_jenis_surat', type ?? '')

  const { data, isLoading, isFetching } = useQuery<
    Array<{
      kode: string
      nama: string
      id_mail_jenis_template_surat: string
    }>
  >({
    queryKey: ['code-letter-available', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-jenis-template-surat/kode-template?${Params}`).then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { codeAvailable: data, loading }
}
