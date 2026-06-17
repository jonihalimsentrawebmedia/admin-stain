import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { ILetterClassification } from '../data/types.ts'
import {
  ResolverLetterClassification,
  type TResolverLetterClassification,
} from '../data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { HiPencil } from 'react-icons/hi'
import { FormLetterClassification } from './form.tsx'

interface props {
  data?: ILetterClassification
  parentData?: ILetterClassification
}

const ButtonEditLetterClassification = (props?: props) => {
  const { data, parentData } = props ?? {}

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLetterClassification>({
    resolver: zodResolver(ResolverLetterClassification),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama_parent: parentData?.nama,
        nama: data?.nama,
        id_parent_klasifikasi_surat: data?.id_parent_klasifikasi_surat,
        kode_klasifikasi: data?.kode_klasifikasi,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverLetterClassification) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/klasifikasi-surat/${data?.id_klasifikasi_surat}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-classification'],
          })
          setLoading(false)
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
        className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Klasifikasi Surat'} open={open} setOpen={setOpen}>
        <FormLetterClassification
          loading={loading}
          open={open}
          setOpen={setOpen}
          form={form}
          HandleSave={HandleSave}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonEditLetterClassification
