import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResolverLetterNature,
  type TResolverLetterNature,
} from '@/pages/modules/E-Office/reference/letter-nature/data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormLetterNature } from '@/pages/modules/E-Office/reference/letter-nature/component/form.tsx'
import type { ILetterNature } from '@/pages/modules/E-Office/reference/letter-nature/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: ILetterNature
}

const ButtonEditLetterNature = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLetterNature>({
    resolver: zodResolver(ResolverLetterNature),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode: data?.kode,
        nama: data?.nama,
        urutan: data?.urutan,
        warna: data?.warna,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverLetterNature) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/sifat-surat/${data?.id_sifat_surat}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-nature'],
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

      <DialogBasic title={'Edit Sifat Suret'} open={open} setOpen={setOpen}>
        <FormLetterNature
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

export default ButtonEditLetterNature
