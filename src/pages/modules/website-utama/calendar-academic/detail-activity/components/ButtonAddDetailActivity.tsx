import { zodResolver } from '@hookform/resolvers/zod'
import type { AcademicActivity } from '../../model/academicActivity'
import {
  ActivityDetailResolver,
  type IActivityDetailTypeForm,
} from '../../model/resolverActivityDetail'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import ActivityDetailForm from './ActivityDetailForm'

interface Props {
  data?: AcademicActivity
}
const ButtonAddDetailActivity = ({ data }: Props) => {
  const form = useForm<IActivityDetailTypeForm>({
    resolver: zodResolver(ActivityDetailResolver),
  })
  const params = useParams()
  const { idActivity } = params
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IActivityDetailTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/tahun-akademik-uraian-kegiatan', {
      ...e,
      id_tahun_akademik_kegiatan: idActivity,
      tanggal_mulai: new Date(e.tanggal_mulai).toISOString(),
      tanggal_selesai: new Date(e.tanggal_selesai).toISOString(),
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-acedemic-year-activity-detail'],
          })
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          form.reset()
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => {
          setOpen(true)
          form.reset({
            nama_tahun_akademik: data?.nama_tahun_akademik,
            nama_kegiatan: data?.nama_kegiatan,
          })
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah
      </Button>

      <DialogCustom
        open={open}
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        width="50%"
        title={'Tambah Kegiatan Akademik'}
      >
        <ActivityDetailForm
          form={form}
          handleCancel={() => {
            setOpen(false)
          }}
          handleSave={handleSave}
          loading={loading}
        />
      </DialogCustom>
    </>
  )
}

export default ButtonAddDetailActivity
