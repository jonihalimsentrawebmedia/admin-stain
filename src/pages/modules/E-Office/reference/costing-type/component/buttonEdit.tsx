import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResolverBiayaType,
  type TResolverBiayaType,
} from '@/pages/modules/E-Office/reference/costing-type/data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormBiayaType } from '@/pages/modules/E-Office/reference/costing-type/component/form.tsx'
import type { IBiayaType } from '@/pages/modules/E-Office/reference/costing-type/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props {
  data: IBiayaType
}

const ButtonEditBiayaType = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverBiayaType>({
    resolver: zodResolver(ResolverBiayaType),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode: data?.kode,
        nama: data?.nama,
        tipe: data?.tipe,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverBiayaType) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/jenis-biaya/${data?.id_jenis_biaya}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['biaya-type'],
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

      <DialogBasic title={'Edit Jenis Biaya'} className={'min-w-2xl'} open={open} setOpen={setOpen}>
        <FormBiayaType
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

export default ButtonEditBiayaType
