import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverTypeService, type TResolverTypeService } from '../data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'
import { FormTypeServices } from './form.tsx'

const ButtonAddTypeService = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTypeService>({
    resolver: zodResolver(ResolverTypeService),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTypeService) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/jenis-layanan', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['type-service'],
          })
          form.reset()
          setLoading(false)
          toast.success(res.data.message || 'Success')
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.message || 'Error')
      })
  }

  return (
    <>
      <Button className={'rounded-full text-white hover:text-white'} onClick={() => setOpen(!open)}>
        <BiPlus />
        Tambah Jenis Layanan
      </Button>

      <DialogBasic title={'Tambah Jenis Layanan'} open={open} setOpen={setOpen}>
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

export default ButtonAddTypeService
