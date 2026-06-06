import { useMutation, useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISectionFieldsUpdatePayload } from './types'
import { toast } from 'react-toastify'

/**
 * Mutation hook untuk mengupdate section fields.
 *
 * Contoh penggunaan:
 * ```tsx
 * const { mutateAsync: updateSectionFields, isPending: loadingSectionFields } = UseUpdateSectionFields()
 *
 * await updateSectionFields([
 *   {
 *     id_section_field: "...",
 *     key_placeholder: "nama",
 *     label: "Nama",
 *     tipe_input: "TEXT",
 *     is_required: false,
 *     urutan: 1,
 *   },
 * ])
 * ```
 */
export const UseUpdateSectionFields = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      idTemplateSurat,
      payload,
    }: {
      idTemplateSurat: string
      payload: ISectionFieldsUpdatePayload
    }) =>
      AxiosClient.put(
        `/eoffice/template-surat/section-fields/${idTemplateSurat}`,
        payload,
      ).then((res) => res.data),
    onSuccess: (res) => {
      if (res?.status) {
        toast.success(res?.message || 'Section fields berhasil diupdate')
        queryClient.invalidateQueries({ queryKey: ['template-surat-detail'] })
      } else {
        toast.error(res?.message || 'Gagal mengupdate section fields')
      }
    },
    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || 'Terjadi kesalahan saat mengupdate section fields',
      )
    },
  })
}
