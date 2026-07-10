import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import { FormStatus } from '@/pages/modules/E-Office/students/student-data/component/FormStatus.tsx'
import type { TResolverFormStatus } from '../data/resolver.tsx'
import { BiEdit } from 'react-icons/bi'

interface Props {
  list_id?: string[]
}

export const ButtonStatus = (props: Props) => {
  const { list_id } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const HandleSave = async (value: TResolverFormStatus & { list_mahasiswa: string[] }) => {
    setLoading(true)
    await AxiosClient.patch('/eoffice/mahasiswa/status', {
      ...value,
    })
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          queryClient.invalidateQueries({ queryKey: ['student-data'] })
          toast.success(res.data.message || 'Berhasil mengubah status mahasiswa')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err.response?.data?.message || 'Gagal mengubah status mahasiswa')
      })
  }

  return (
    <>
      <button
        className="p-1.5 bg-primary text-white rounded hover:bg-primary/80 flex items-center gap-1.5"
        onClick={() => setOpen(true)}
      >
        <BiEdit /> Update Status Mahasiswa
      </button>

      <DialogBasic title={'Ubah Status Mahasiswa'} open={open} setOpen={setOpen}>
        <FormStatus
          list_id={list_id}
          loading={loading}
          HandleSave={HandleSave}
          HandleCancel={() => setOpen(false)}
        />
      </DialogBasic>
    </>
  )
}
