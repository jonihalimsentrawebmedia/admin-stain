import { useEffect, useState } from 'react'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormListPublication } from '@/pages/modules/website-utama/publication/List-data/component/form.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { ResolverPublication, type TResolverPublication } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import type { IPublication } from '@/pages/modules/website-utama/publication/List-data/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IPublication
}

export const ButtonEditPublication = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      form.reset({
        link: data.link,
        penulis: data?.penulis,
        nama_publikasi: data?.nama_publikasi,
        id_tahun_publikasi: data?.id_tahun_publikasi,
      })
    }
  }, [data])

  const form = useForm<TResolverPublication>({
    resolver: zodResolver(ResolverPublication),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPublication) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/publikasi/${data?.id_publikasi}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['publication'],
          })
          form.reset()
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={'p-1.5 bg-yellow-500 text-white hover:bg-yellow-600 rounded'}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Publikasi'} open={open} setOpen={setOpen}>
        <FormListPublication
          setOpen={setOpen}
          loading={loading}
          open={open}
          form={form}
          HandlerSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}
