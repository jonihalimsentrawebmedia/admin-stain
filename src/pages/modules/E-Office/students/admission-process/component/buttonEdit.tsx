import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverAdmissionProcess, type TResolverAdmissionProcess } from '../data/resolver'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormAdmissionProcess } from './form.tsx'
import { HiPencil } from 'react-icons/hi'
import type { IAdmissionProcess } from '../data/types'

interface props {
  data: IAdmissionProcess
}

const ButtonEditAdmissionProcess = (props: props) => {
  const { data } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverAdmissionProcess>({
    resolver: zodResolver(ResolverAdmissionProcess),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        kode: data?.kode,
        nama: data?.nama,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverAdmissionProcess) => {
    setLoading(true)
    await AxiosClient.put(`/eoffice/mahasiswa/jalur-masuk/${data?.id_mahasiswa_jalur_masuk}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({
            queryKey: ['admission-process'],
          })
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
      <button
        className={'p-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600'}
        onClick={() => setOpen(!open)}
      >
        <HiPencil />
      </button>

      <DialogBasic title={'Edit Jalur Masuk'} open={open} setOpen={setOpen}>
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

export default ButtonEditAdmissionProcess
