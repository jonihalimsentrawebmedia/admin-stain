import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResolverLetterNature,
  type TResolverLetterNature,
} from '@/pages/modules/E-Office/reference/letter-nature/data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormLetterNature } from '@/pages/modules/E-Office/reference/letter-nature/component/form.tsx'
import { BiPlus } from 'react-icons/bi'

const ButtonAddLetterNature = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverLetterNature>({
    resolver: zodResolver(ResolverLetterNature),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverLetterNature) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/sifat-surat', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['letter-nature'],
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
        Tambah Sifat Surat
      </Button>

      <DialogBasic title={'Tambah Sifat Suret'} open={open} setOpen={setOpen}>
        <FormLetterNature
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

export default ButtonAddLetterNature
