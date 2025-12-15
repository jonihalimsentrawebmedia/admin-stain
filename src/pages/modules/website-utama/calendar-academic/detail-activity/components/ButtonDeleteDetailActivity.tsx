import { useForm } from 'react-hook-form'
import type { ActivityDetail } from '../../model/academicActivityDetail'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'

interface Props {
  data: ActivityDetail
}
const ButtonDeleteDetailActivity = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'nama_tahun_akademik',
      label: 'Nama Tahun Akademik',
    },
    {
      name: 'nama_tahun_akademik_kegiatan',
      label: 'Nama Utama Kegiatan',
    },
    {
      name: 'uraian_kegiatan',
      label: 'Uraian Kegiatan*',
    },
    {
      name: 'tanggal_mulai',
      label: 'Tanggal Mulai*',
      component: <div>{data.tanggal_mulai.split('T')[0].split('-').reverse().join('-')}</div>,
    },
    {
      name: 'tanggal_selesai',
      label: 'Tanggal Selesai*',
      component: <div>{data.tanggal_selesai.split('T')[0].split('-').reverse().join('-')}</div>,
    },
    {
      name: 'keterangan',
      label: 'keterangan',
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/tahun-akademik-uraian-kegiatan/${data?.id_tahun_akademik_uraian_kegiatan}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Tahun Akademik')
          queryClient.invalidateQueries({
            queryKey: ['list-acedemic-year-activity-detail'],
          })
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
          setOpen(!open)
          form.reset({
            ...data,
          })
        }}
      >
        <IconDelete />
      </button>

      <DialogCustom
        open={open}
                width='50%'
        className={'rounded min-w-sm sm:min-w-2xl'}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Kegiatan Akademik</p>}
        description={'Anda yakin ingin menghapus kegiatan akademik ini?'}
      >
        <DetailField data={field} form={form} />
        <div className="flex gap-4 items-center justify-end">
          <Button
            onClick={() => setOpen(false)}
            className="bg-white border border-primary hover:bg-white/90 text-primary"
          >
            <X />
            Batal
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500 hover:bg-red-500/90 text-white"
          >
            <Trash2 />
            Hapus
          </Button>
        </div>
      </DialogCustom>
    </>
  )
}

export default ButtonDeleteDetailActivity
