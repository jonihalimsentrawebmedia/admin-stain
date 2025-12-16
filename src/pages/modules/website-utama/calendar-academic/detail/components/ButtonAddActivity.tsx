import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import ActivityForm from './ActivityForm'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ActivityResolver, type IActivityTypeForm } from '../../model/resolverActivity'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
interface Props {
  nama_tahun_akademik: string
}
const ButtonAddActivity = ({ nama_tahun_akademik }: Props) => {
  const form = useForm<IActivityTypeForm>({
    resolver: zodResolver(ActivityResolver),
  })
  const params = useParams()
  const { idAcademicYear } = params
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const handleSave = async (e: IActivityTypeForm) => {
    setLoading(true)
    await AxiosClient.post('/website-utama/tahun-akademik-kegiatan', {
      ...e,
      id_tahun_akademik: idAcademicYear,
    })
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['list-acedemic-year-activity'],
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
            nama_tahun_akademik: nama_tahun_akademik,
          })
        }}
        className="border border-primary hover:text-primay text-primary"
      >
        <Plus />
        Tambah
      </Button>

      <DialogCustom
        open={open}
        width="50%"
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        title={'Tambah Kegiatan Akademik'}
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

export default ButtonAddActivity
