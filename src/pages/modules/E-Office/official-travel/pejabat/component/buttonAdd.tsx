import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
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
import { BiPlus } from 'react-icons/bi'

const ButtonAddPejabat = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverPejabat>({
    resolver: zodResolver(ResolverPejabat),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverPejabat) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/pejabat', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['pejabat'],
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
        Tambah Pejabat
      </Button>

      <DialogBasic title={'Tambah Pejabat'} open={open} setOpen={setOpen}>
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

export default ButtonAddPejabat
