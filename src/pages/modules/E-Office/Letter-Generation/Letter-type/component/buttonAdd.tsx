import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ResolverTypeLetter, type TResolverTypeLetter } from '../data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button.tsx'
import { FaCirclePlus } from 'react-icons/fa6'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import FormLetterTpeCode from '@/pages/modules/E-Office/Letter-Generation/Letter-type/component/form.tsx'

const ButtonAddLetterType = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverTypeLetter>({
    resolver: zodResolver(ResolverTypeLetter),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverTypeLetter) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mail-jenis-surat', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          form.reset()
          queryClient.invalidateQueries({
            queryKey: ['code-letter-type'],
          })
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
      <Button className={'rounded-full text-white'} onClick={() => setOpen(!open)}>
        <FaCirclePlus />
        Tambah Kelompok Surat
      </Button>

      <DialogBasic title={'Tambah Kelompok Surat'} open={open} setOpen={setOpen}>
        <FormLetterTpeCode
          form={form}
          loading={loading}
          HandleSave={HandleSave}
          open={open}
          setOpen={setOpen}
        />
      </DialogBasic>
    </>
  )
}

export default ButtonAddLetterType
