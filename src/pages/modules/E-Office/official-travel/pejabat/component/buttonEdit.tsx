import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResolverPejabat,
  type TResolverPejabat,
} from '@/pages/modules/E-Office/official-travel/pejabat/data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/component/form.tsx'
import type { IPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IPejabat
}

const ButtonEditPejabat = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPejabat>({
    resolver: zodResolver(ResolverPejabat),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nip: data?.nip,
        nama_lengkap: data?.nama_lengkap,
        golongan: data?.golongan,
        jabatan: data?.jabatan,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPejabat) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/pejabat/${data?.id_pejabat}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['pejabat'],
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

      <DialogBasic title={'Edit Pejabat'} open={open} setOpen={setOpen}>
        <FormPejabat
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

export default ButtonEditPejabat
