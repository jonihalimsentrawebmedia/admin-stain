import { useForm } from 'react-hook-form'
import { UseGetSessionUnit } from '@/pages/modules/website-unit/hooks'
import { useEffect, useState } from 'react'
import ButtonTitleGroup from '@/components/common/button/ButtonTitleGroup.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { UseGetUnitCollaborationDetail } from '@/pages/modules/website-unit/profile/collaboration/hooks'
import { formatDateTime } from '@/utils/date.tsx'
import CollaborationFormUnit from '@/pages/modules/website-unit/profile/collaboration/component/form'
import { Form } from '@/components/ui/form.tsx'

export const UpdatedCollaborationUnit = () => {
  const { id } = useParams()
  const { unitCollaboration: detail } = UseGetUnitCollaborationDetail(id ?? '')

  const form = useForm()
  const { session } = UseGetSessionUnit()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (session || detail) {
      form.reset({
        kelompok: 'UNIT',
        id_unit: session?.id_unit,
        ...detail,
        tanggal_mulai: formatDateTime(detail?.tanggal_mulai ?? '')
          .date.split('-')
          .reverse()
          .join('-'),
        tanggal_selesai: formatDateTime(detail?.tanggal_selesai ?? '')
          .date.split('-')
          .reverse()
          .join('-'),
      })
    }
  }, [session, detail])

  const queryClient = useQueryClient()

  const HandleSave = async (Value: any) => {
    setLoading(true)
    await AxiosClient.put(`/unit/profil/kerjasama/${detail?.id_kerjasama}`, Value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          toast.success(res.data.message || 'Success Menambahkan Data Kerjasama')
          queryClient.invalidateQueries({
            queryKey: ['unit-collaboration'],
          })
          navigate(-1)
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Form {...form}>
        <form className={'flex flex-col gap-5'} onSubmit={form.handleSubmit(HandleSave)}>
          <ButtonTitleGroup
            label={'Tambah Daftar Kerjasama'}
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => navigate(-1) },
              { type: 'save', label: 'Simpan', onClick: () => {}, isDisabled: loading },
            ]}
          />
          <CollaborationFormUnit form={form} />

          <ButtonTitleGroup
            label={''}
            buttonGroup={[
              { type: 'cancel', label: 'Batal', onClick: () => navigate(-1) },
              { type: 'save', label: 'Simpan', onClick: () => {}, isDisabled: loading },
            ]}
          />
        </form>
      </Form>
    </>
  )
}
