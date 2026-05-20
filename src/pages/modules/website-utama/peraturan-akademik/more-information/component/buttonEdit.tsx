import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormMoreInformation from '@/pages/modules/website-utama/peraturan-akademik/more-information/component/form.tsx'
import {
  type IMoreInformation,
  ResolverMoreInformation,
  type TResolverMoreInformation,
} from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IMoreInformation
}

const ButtonEditMoreInformation = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverMoreInformation>({
    resolver: zodResolver(ResolverMoreInformation),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        judul: data?.judul,
        urutan: data?.urutan,
        isi: data?.isi,
        publish: data?.publish,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (e: TResolverMoreInformation) => {
    setLoading(true)
    await AxiosClient.put(
      `/website-utama/pengaturan-akademik-informasi-tambahan/${data?.id_pengaturan_akademik_informasi_tambahan}`,
      e
    )
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['more_information'],
          })
          toast.success(res.data.message || 'Success Pengajuan tambah data berita')
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
        className={'p-1.5 bg-yellow-500 rounded text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Informasi'} open={open} setOpen={setOpen} className={'min-w-5xl'}>
        <FormMoreInformation
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

export default ButtonEditMoreInformation
