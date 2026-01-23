import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  FaqResolver,
  type IFAQResolver,
} from '@/pages/modules/website-utama/pertayaan/Faq/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FormFAQDataProdi } from './form'
import type { IFAQList } from '@/pages/modules/website-utama/pertayaan/Faq/data/type.ts'
import { HiPencil } from 'react-icons/hi'

interface Props {
  data: IFAQList
}

export const ButtonEditFAQUnit = (props: Props) => {
  const { data } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<IFAQResolver>({
    resolver: zodResolver(FaqResolver),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        id_kategori_faq: data.id_kategori_faq,
        pertanyaan: data.pertanyaan,
        jawaban: data.jawaban,
        dokumens: data.dokumens,
      })
    }
  }, [])

  const queryClient = useQueryClient()

  const HandleSave = async (value: IFAQResolver) => {
    setLoading(true)
    await AxiosClient.put(`/unit/faq/${data?.id_faq}`, value)
      .then((res) => {
        if (res.data.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-faq-unit'],
          })
          toast.success(res.data.message || 'Success Tambah F.A.Q')
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
        className={'p-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah F.A.Q'}
        className={'rounded lg:max-w-7xl'}
        disableOutsideDialog
      >
        <FormFAQDataProdi
          form={form}
          loading={loading}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}
