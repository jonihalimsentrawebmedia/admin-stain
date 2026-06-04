import { useQuery, useMutation } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISumberDetail, IGenerateSuratBody } from './types'

export const UseGetSumberList = () => {
  return useQuery({
    queryKey: ['sumber-list'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/eoffice/ref/sumber').then((res) => res.data.data as string[]),
  })
}

export const UseGetSumberDetail = (sumber: string | null) => {
  return useQuery({
    queryKey: ['sumber-detail', sumber],
    refetchOnWindowFocus: false,
    enabled: !!sumber && sumber !== 'MANUAL',
    queryFn: () =>
      AxiosClient.get(`/eoffice/ref/sumber/${sumber}`).then(
        (res) => res.data.data as ISumberDetail
      ),
  })
}

export const UseGenerateSurat = () => {
  return useMutation({
    mutationFn: ({
      idTemplateSurat,
      body,
    }: {
      idTemplateSurat: string
      body: IGenerateSuratBody
    }) =>
      AxiosClient.post(`/eoffice/template-surat/${idTemplateSurat}/generate`, body).then(
        (res) => res.data
      ),
  })
}
