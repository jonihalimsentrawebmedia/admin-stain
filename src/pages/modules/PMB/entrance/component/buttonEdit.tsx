import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ResolverEntrance,
  type TResolverEntrance,
} from '@/pages/modules/PMB/entrance/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { FormEntrance } from '@/pages/modules/PMB/entrance/component/form.tsx'
import { DialogBasic } from '@/components/common/dialog/dialogBasic.tsx'
import type { IEntrance } from '@/pages/modules/PMB/entrance/data/types.ts'
import { HiPencil } from 'react-icons/hi'
import { Button } from '@/components/ui/button.tsx'

interface props {
  data: IEntrance
  showIcon?: boolean
}

const ButtonEditEntrancePMB = (props: props) => {
  const { data, showIcon = true } = props

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<TResolverEntrance>({
    resolver: zodResolver(ResolverEntrance),
  })

  useEffect(() => {
    if (data) {
      form.reset({
        urutan: data?.urutan,
        is_status_tampil: data?.is_status_tampil,
        nama_jalur: data?.nama_jalur,
        url_pendaftaran: data?.url_pendaftaran,
      })
    }
  }, [data])

  const queryClient = useQueryClient()
  const HandleSave = async (value: TResolverEntrance) => {
    setLoading(true)
    await AxiosClient.put(`/pmb/jalur-masuk/${data?.id_jalur_masuk}`, value)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success Pengajuan update data universitas')
          queryClient.invalidateQueries({
            queryKey: ['entrance-pmb'],
          })
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal mengirim data')
      })
  }

  return (
    <>
      {showIcon ? (
        <button
          className={'bg-yellow-500 p-1.5 text-white hover:bg-yellow-600 rounded'}
          onClick={() => setOpen(!open)}
        >
          <HiPencil />
        </button>
      ) : (
        <Button
          variant={'outline'}
          onClick={() => setOpen(!open)}
          className={'border-primary text-primary hover:text-primary'}
        >
          <HiPencil />
          Edit Jalur Masuk
        </Button>
      )}

      <DialogBasic
        title={'Edit Jalur Masuk'}
        open={open}
        setOpen={setOpen}
        className={'max-w-3xl'}
      >
        <FormEntrance
          form={form}
          open={open}
          setOpen={setOpen}
          HandleSave={HandleSave}
          loading={loading}
        />
      </DialogBasic>
    </>
  )
}
export default ButtonEditEntrancePMB
