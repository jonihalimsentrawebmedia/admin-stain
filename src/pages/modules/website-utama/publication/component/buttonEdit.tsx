import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { ResolverPublication, type TResolverPublication } from '../data/resolver.tsx'
import FormPublication from '@/pages/modules/website-utama/publication/component/form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IYearPublication } from '@/pages/modules/website-utama/publication/data/types.ts'

interface props {
  data: IYearPublication
}

const ButtonEditPublication = (props: props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPublication>({
    resolver: zodResolver(ResolverPublication),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        urutan: data?.urutan,
        nama_tahun_publikasi: data?.nama_tahun_publikasi,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPublication) => {
    setLoading(true)
    await AxiosClient.put(`/website-utama/tahun-publikasi/${data?.id_tahun_publikasi}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
          queryClient.invalidateQueries({
            queryKey: ['publication-year'],
          })
          form.reset()
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

      <DialogBasic title={'Tambah Tahun Publikasi'} open={open} setOpen={setOpen}>
        <FormPublication
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandlerSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditPublication
