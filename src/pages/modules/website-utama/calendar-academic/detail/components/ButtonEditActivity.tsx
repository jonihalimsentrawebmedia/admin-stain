import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import type { AcademicActivity } from '../../model/academicActivity'
import { ActivityResolver, type IActivityTypeForm } from '../../model/resolverActivity'
import ActivityForm from './ActivityForm'

interface Props {
  data: AcademicActivity
}
const ButtonEditActivity = ({ data }: Props) => {
  const form = useForm<IActivityTypeForm>({
    resolver: zodResolver(ActivityResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IActivityTypeForm) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/tahun-akademik-kegiatan/${data.id_tahun_akademik_kegiatan}`, {
      ...e,
      id_tahun_akademik:data.id_tahun_akademik
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-acedemic-year-activity'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen(true)

          form.reset({
            ...data,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        open={open}
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Edit Tahun Akademik'}
      >
        <ActivityForm
          form={form}
          loading={loading}
          handleSave={handleSave}
          handleCancel={() => {
            setOpen(false)
          }}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonEditActivity
