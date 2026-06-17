import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverLetterOrigin, type TResolverLetterOrigin } from '../data/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { ILetterOrigin } from '../data/types'
import { HiPencil } from 'react-icons/hi'
import { FormLetterOrigin } from '@/pages/modules/E-Office/reference/letter-origin/component/form.tsx'

interface props {
  data: ILetterOrigin
}

const ButtonEditLetterOrigin = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLetterOrigin>({
    resolver: zodResolver(ResolverLetterOrigin),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        instansi: data?.instansi,
        alamat: data?.alamat,
        telepon: data?.telepon ?? null,
        email: data?.email ?? null,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverLetterOrigin) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/asal-surat/${data?.id_asal_surat}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-origin'],
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

      <DialogBasic title={'Edit Asal Surat'} open={open} setOpen={setOpen}>
        <FormLetterOrigin
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

export default ButtonEditLetterOrigin
