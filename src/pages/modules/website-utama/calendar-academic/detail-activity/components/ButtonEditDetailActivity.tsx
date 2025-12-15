import { useForm } from 'react-hook-form'
import type { ActivityDetail } from '../../model/academicActivityDetail'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ActivityDetailResolver,
  type IActivityDetailTypeForm,
} from '../../model/resolverActivityDetail'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconEdit } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import ActivityDetailForm from './ActivityDetailForm'

interface Props {
  data: ActivityDetail
}
const ButtonEditDetailActivity = ({ data }: Props) => {
  const form = useForm<IActivityDetailTypeForm>({
    resolver: zodResolver(ActivityDetailResolver),
  })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IActivityDetailTypeForm) => {
    setLoading(true)
    await AxiosClient.put(
      `/website-utama/tahun-akademik-uraian-kegiatan/${data.id_tahun_akademik_uraian_kegiatan}`,
      {
        ...e,
        id_tahun_akademik_kegiatan: data.id_tahun_akademik_kegiatan,
        tanggal_mulai: new Date(e.tanggal_mulai).toISOString(),
        tanggal_selesai: new Date(e.tanggal_selesai).toISOString(),
      }
    )
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-acedemic-year-activity-detail'],
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
            tanggal_mulai: data.tanggal_mulai.split('T')[0],
            tanggal_selesai: data.tanggal_selesai.split('T')[0],
            nama_kegiatan: data.nama_tahun_akademik_kegiatan,
          })
        }}
      >
        <IconEdit />
      </button>

      <DialogCustom
        open={open}
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        width="50%"
        title={'Edit Kegiatan Akademik'}
      >
        <ActivityDetailForm
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

export default ButtonEditDetailActivity
