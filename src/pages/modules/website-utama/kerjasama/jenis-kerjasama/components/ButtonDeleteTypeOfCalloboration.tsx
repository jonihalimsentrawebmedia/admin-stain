import { useForm } from 'react-hook-form'
import type { TypeOfCalloborationList } from '../model'
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
  data: TypeOfCalloborationList
}
const ButtonDeleteTypeOfCalloboration = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'nama_jenis_kerjasama',
      label: 'Nama Jenis Kerjasama*',
    },
    {
      name: 'jumlah_kerjasama',
      label: 'jumlah Kerjasama',
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/jenis-kerjasama/${data?.id_jenis_kerjasama}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data kategori kerjasama')
          queryClient.invalidateQueries({
            queryKey: ['list-type-of-calloboration'],
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
        className={'rounded min-w-xs lg:min-w-2xl'}
        setOpen={setOpen}
        width="50%"
        title={<p className="text-2xl text-red-500">Hapus Jenis Kerjasama</p>}
        description={'Apakah anda yakin untuk menghapus jenis kerjasama berikut?'}
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

export default ButtonDeleteTypeOfCalloboration
