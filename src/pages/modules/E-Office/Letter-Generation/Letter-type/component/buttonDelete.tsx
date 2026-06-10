import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverTypeLetter, type TResolverTypeLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormLetterTpeCode from '@/pages/modules/E-Office/Letter-Generation/Letter-type/component/form.tsx'
import type { IMailTypeLetter } from '../data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IMailTypeLetter
}

const ButtonEditLetterType = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTypeLetter>({
    resolver: zodResolver(ResolverTypeLetter),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_jenis_surat: data.nama_jenis_surat,
        kode_surat: data.kode_surat,
        kategori_jenis_surat: data.kategori_jenis_surat,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTypeLetter) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/mail-jenis-surat/${data?.id_mail_jenis_surat}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['code-letter-type'],
          })
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <button
        className={'rounded bg-yellow-500 p-1.5 text-white hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Tambah Jenis Surat'} open={open} setOpen={setOpen}>
        <FormLetterTpeCode
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          open={open}
          setOpen={setOpen}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditLetterType
