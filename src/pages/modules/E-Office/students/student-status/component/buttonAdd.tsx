import { Button } from '@/components/ui/button.tsx'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverStudentStatus, type TResolverStudentStatus } from '../data/resolver.tsx'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { BiPlus } from 'react-icons/bi'
import { FormStudentStatus } from './form.tsx'

const ButtonAddStudentStatus = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverStudentStatus>({
    resolver: zodResolver(ResolverStudentStatus),
  })

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverStudentStatus) => {
    setLoading(true)
    await AxiosClient.post('/eoffice/mahasiswa/status-mahasiswa', value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['student-status'],
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
        Tambah Status Mahasiswa
      </Button>

      <DialogBasic title={'Tambah Status Mahasiswa'} open={open} setOpen={setOpen}>
        <FormStudentStatus
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

export default ButtonAddStudentStatus
