import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverAdmissionProcess, type TResolverAdmissionProcess } from '../data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'
import { FormAdmissionProcess } from './form.tsx'

const ButtonAddAdmissionProcess = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverAdmissionProcess>({
    resolver: zodResolver(ResolverAdmissionProcess),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverAdmissionProcess) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mahasiswa/jalur-masuk', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['admission-process'],
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
        Tambah Jalur Masuk
      </Button>

      <DialogBasic title={'Tambah Jalur Masuk'} open={open} setOpen={setOpen}>
        <FormAdmissionProcess
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

export default ButtonAddAdmissionProcess
