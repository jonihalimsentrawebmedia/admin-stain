import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverReligion, type TResolverReligion } from '../data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'
import { FormReligion } from './form.tsx'

const ButtonAddReligion = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverReligion>({
    resolver: zodResolver(ResolverReligion),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverReligion) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mahasiswa/agama', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['religion'],
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
        Tambah Agama
      </Button>

      <DialogBasic title={'Tambah Agama'} open={open} setOpen={setOpen}>
        <FormReligion
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

export default ButtonAddReligion
