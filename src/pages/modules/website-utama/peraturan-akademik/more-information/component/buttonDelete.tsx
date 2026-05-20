import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { FaTrash } from 'react-icons/fa'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IMoreInformation } from '../data/resolver.tsx'
import RenderHTMLContent from '@/components/common/richtext/RenderHTMLContent.tsx'

interface Props {
  data: IMoreInformation
}

const ButtonDeleteMoreInformation = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'judul',
      label: 'Judul',
    },
    {
      name: 'urutan',
      label: 'Urutan',
    },
    {
      name: 'publish',
      label: 'Status Publish',
      component: <p>{data?.publish ? 'Publish' : 'Tidak Publish'}</p>,
    },
    {
      name: 'isi',
      label: 'Isi Informasi',
      component: <RenderHTMLContent content={data?.isi ?? ''} />,
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(
      `/website-utama/pengaturan-akademik-informasi-tambahan/${data?.id_pengaturan_akademik_informasi_tambahan}`
    )
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Layanan')
          queryClient.invalidateQueries({
            queryKey: ['more_information'],
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
        className={'p-1.5 bg-red-500 text-white hover:bg-red-600 rounded'}
        onClick={() => {
          setOpen(!open)
          form.reset({
            ...data,
          })
        }}
      >
        <FaTrash />
      </button>

      <DialogBasic
        open={open}
        className={'rounded lg:min-w-2xl'}
        setOpen={setOpen}
        title={<p className="text-2xl text-red-500">Hapus Informasi Tambahan?</p>}
        description={'Apakah anda yakin untuk menghapus data ini?'}
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
            <FaTrash />
            Hapus
          </Button>
        </div>
      </DialogBasic>
    </>
  )
}

export default ButtonDeleteMoreInformation
