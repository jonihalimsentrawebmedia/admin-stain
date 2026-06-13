import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverTransportType, type TResolverTransportType } from '@/pages/modules/E-Office/reference/transport-type/data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormTransportType } from '@/pages/modules/E-Office/reference/transport-type/component/form.tsx'
import type { ITransportType } from '@/pages/modules/E-Office/reference/transport-type/data/types.ts'
import { HiPencil } from 'react-icons/hi'

interface props { data: ITransportType }

const ButtonEditTransportType = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTransportType>({
    resolver: zodResolver(ResolverTransportType),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode: data?.kode,
        nama: data?.nama,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTransportType) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/jenis-transportasi/${data?.id_jenis_transportasi}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['transport-type'] })
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
      <button className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'} onClick={() => setOpen(!open)}>
        <HiPencil />
      </button>
      <DialogBasic title={'Edit Jenis Transportasi'} open={open} setOpen={setOpen}>
        <FormTransportType loading={loading} open={open} setOpen={setOpen} form={form} HandleSave={HandleSave} />
      </DialogBasic>
    </>
  )
}
export default ButtonEditTransportType
