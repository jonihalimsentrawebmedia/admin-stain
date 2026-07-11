import { useQueryClient } from '@tanstack/react-query'
import type { AcademicYearList } from '../model'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

interface Props {
  data: AcademicYearList
}

const ButtonDeleteAcademicYear = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'nama_tahun_akademik',
      label: 'Nama Tahun Akademik',
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/tahun-akademik/${data?.id_tahun_akademik}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Tahun Akademik')
          queryClient.invalidateQueries({
            queryKey: ['list-acedemic-year'],
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
        className={'bg-red-500 hover:bg-red-600 p-1.5 text-white rounded'}
      >
        <FaTrash />
      </button>

      <DialogBasic
        open={open}
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        title={<p className="lg:text-2xl text-red-500">Hapus Kalender Akademik</p>}
        description={'Anda yakin ingin menghapus kalender akademik ini?'}
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
      </DialogBasic>
    </>
  )
}

export default ButtonDeleteAcademicYear
