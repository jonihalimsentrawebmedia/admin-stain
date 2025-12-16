import { useForm } from 'react-hook-form'
import type { ContentList } from '../model'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import { IconDelete } from '@/components/common/table/icon'
import { DialogCustom } from '@/components/common/dialog/DialogCustom'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { Trash2, X } from 'lucide-react'
import Cookies from 'js-cookie'

interface Props {
  data: ContentList
}
const ButtonDeleteContent = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'nama_menu',
      label: 'Nama Menu',
    },

    {
      name: 'urutan',
      label: 'urutan',
    },
    {
      name: 'judul',
      label: 'Judul',
    },
  ]
 const nameMenu = Cookies.get('nama_menu')
  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/konten/${data?.id_konten}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Konten')
          queryClient.invalidateQueries({
            queryKey: ['list-contents'],
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
        width="50%"
        open={open}
        className={'rounded'}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Konten - {nameMenu??""}?</p>}
        description={'Apakah anda yakin untuk menghapus konten yang ditulis?'}
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

export default ButtonDeleteContent
