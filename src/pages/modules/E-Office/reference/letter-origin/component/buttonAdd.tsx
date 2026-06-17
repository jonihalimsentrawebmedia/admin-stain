import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverLetterOrigin, type TResolverLetterOrigin } from '../data/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormLetterOrigin } from './form.tsx'
import { BiPlus } from 'react-icons/bi'

const ButtonAddLetterOrigin = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLetterOrigin>({
    resolver: zodResolver(ResolverLetterOrigin),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverLetterOrigin) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/asal-surat', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-origin'],
          })
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
        <BiPlus />
        Tambah Asal Surat
      </Button>

      <DialogBasic title={'Tambah Asal Surat'} open={open} setOpen={setOpen}>
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

export default ButtonAddLetterOrigin
