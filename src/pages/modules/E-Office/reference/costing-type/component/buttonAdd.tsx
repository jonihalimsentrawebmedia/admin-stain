import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
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
import { BiPlus } from 'react-icons/bi'

const ButtonAddBiayaType = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverBiayaType>({
    resolver: zodResolver(ResolverBiayaType),
    defaultValues: {
      tipe: 'UMUM',
    },
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverBiayaType) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/jenis-biaya', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['biaya-type'],
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
        Tambah Jenis Biaya
      </Button>

      <DialogBasic
        title={'Tambah Jenis Biaya'}
        className={'min-w-2xl'}
        open={open}
        setOpen={setOpen}
      >
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

export default ButtonAddBiayaType
