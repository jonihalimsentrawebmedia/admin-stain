// eoffice/mail-jenis-template-surat/kode-template/{{kode_template}}

import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'


export interface ILetterTemplateType {
  id_mail_jenis_template_surat: string
  id_satuan_organisasi: string
  id_jenis_surat: string
  kode_template: string
  nama_kode_template: string
  nama_jenis_template: string
  nama_jenis_surat: string
  urutan: number
  is_existing_template: boolean
  created_at: string
  created_user: string
  nama_user_created: string
  updated_at: string
  updated_user: string
  nama_user_updated: string
}

export const UseGetTemplateByCodeLetter = (kode_template: string) => {
  const { data, isLoading, isFetching } = useQuery<ILetterTemplateType>({
    queryKey: ['template-by-code-letter', kode_template],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-jenis-template-surat/kode-template/${kode_template}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { template: data, loading }
}
