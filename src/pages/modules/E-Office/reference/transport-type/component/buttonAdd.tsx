import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResolverTransportType,
  type TResolverTransportType,
} from '@/pages/modules/E-Office/reference/transport-type/data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormTransportType } from '@/pages/modules/E-Office/reference/transport-type/component/form.tsx'
import { BiPlus } from 'react-icons/bi'

const ButtonAddTransportType = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTransportType>({
    resolver: zodResolver(ResolverTransportType),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTransportType) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/jenis-transportasi', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['transport-type'] })
          form.reset()
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
      <Button className={'rounded-full text-white hover:text-white'} onClick={() => setOpen(!open)}>
        <BiPlus /> Tambah Jenis Transportasi
      </Button>
      <DialogBasic title={'Tambah Jenis Transportasi'} open={open} setOpen={setOpen}>
        <FormTransportType
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
export default ButtonAddTransportType
