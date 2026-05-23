import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverTypeService, type TResolverTypeService } from '../data/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormTypeServices } from './form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { ITypeService } from '../data/types'

interface props {
  data: ITypeService
}

const ButtonEditServiceType = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTypeService>({
    resolver: zodResolver(ResolverTypeService),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        nama: data?.nama,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTypeService) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/jenis-layanan/${data?.id_jenis_layanan}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['type-service'],
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

      <DialogBasic title={'Edit Waktu Pengingat Agenda'} open={open} setOpen={setOpen}>
        <FormTypeServices
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

export default ButtonEditServiceType
