import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { ResolverContent, type TResolverContent } from '../data/resolver.tsx'
import { useParams } from 'react-router-dom'
import { FormContentEntrance } from './form.tsx'
import type { IContentEntrance } from '@/pages/modules/PMB/entrance/content/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IContentEntrance
}

const ButtonEditContentEntrance = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const form = useForm<TResolverContent>({
    resolver: zodResolver(ResolverContent),
    defaultValues: {
      id_jalur_masuk: id,
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        urutan: data?.urutan,
        id_jalur_masuk: data?.id_jalur_masuk,
        isi_konten: data?.isi_konten,
        judul_konten: data?.judul_konten,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverContent) => {
    setLoading(true)
    await AxiosClient.put(`/pmb/jalur-masuk-konten/${data?.id_jalur_masuk_konten}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['content-entrance-pmb'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      <button
        className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Hapus Konten'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <FormContentEntrance
          form={form}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
export default ButtonEditContentEntrance
