import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import {
  type IAcademicResource,
  ResolverAcademicResource,
  type ResolverAcademicResourceType,
} from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormAcademicResource from '@/pages/modules/website-utama/services/academic-resource/component/form.tsx'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IAcademicResource
}

const ButtonEditAcademicResource = (props: Props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ResolverAcademicResourceType>({
    resolver: zodResolver(ResolverAcademicResource),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        urutan: data?.urutan,
        judul: data?.judul,
        icon_url: data?.icon_url,
        url_layanan: data?.url_layanan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const handleSave = async (value: ResolverAcademicResourceType) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/academic-resources/${data?.id_academic_resources}`, value)
      .then((res) => {
        if (res.data.status) {
          queryClient.invalidateQueries({
            queryKey: ['academic-resource'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          setOpen(false)
          setLoading(false)
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
      <button
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(true)}
      >
        <HiPencil />
      </button>

      <DialogBasic
        title={'Ubah Academic Resource'}
        open={open}
        setOpen={setOpen}
        className="min-w-2xl"
      >
        <FormAcademicResource
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandleSave={handleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditAcademicResource
