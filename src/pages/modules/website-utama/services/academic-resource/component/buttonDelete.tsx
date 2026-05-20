import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import AxiosClient from '@/provider/axios'
import { toast } from 'react-toastify'
import DetailField from '@/components/common/field/DetailField'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { FaTrash } from 'react-icons/fa'
import type { IAcademicResource } from '@/pages/modules/website-utama/services/academic-resource/data/resolver.tsx'
import { Link } from 'react-router-dom'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'

interface Props {
  data: IAcademicResource
}

const ButtonDeleteAcademicResource = ({ data }: Props) => {
  const form = useForm()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const field: any = [
    {
      name: 'icon_url',
      label: 'Icon',
      component: (
        <>
          <img src={data?.icon_url} alt="icon" className="w-20 h-20 rounded-full" />
        </>
      ),
    },
    {
      name: 'judul',
      label: 'Judul',
    },
    {
      name: 'url_layanan',
      label: 'URL',
      component: (
        <Link to={data?.url_layanan} target="_blank" className="underline text-blue-500">
          Buka Url
        </Link>
      ),
    },
    {
      name: 'urutan',
      label: 'Urutan',
    },
  ]

  const queryClient = useQueryClient()

  const handleDelete = async () => {
    setLoading(true)
    await AxiosClient.delete(`/website-utama/academic-resources/${data?.id_academic_resources}`)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success menghapus data Layanan')
          queryClient.invalidateQueries({
            queryKey: ['academic-resource'],
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
        title={<p className="text-2xl text-red-500">Hapus Academic Resources?</p>}
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

export default ButtonDeleteAcademicResource
