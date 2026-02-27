import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResolverStandardOperational, type schemaStandardOperational } from '../data/resolver'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { PlusIcon } from 'lucide-react'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormDocumentStandardOperational } from './form'

export const ButtonAddStandardOperational = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<schemaStandardOperational>({
    resolver: zodResolver(ResolverStandardOperational),
  })

  const queryClient = useQueryClient()

  const HandleAddDocument = async (e: schemaStandardOperational) => {
    setLoading(true)
    await AxiosClient.post('/lppm/standard-operasional-pusat-studi', e)
      .then((res) => {
        if (res.data.status) {
          setLoading(false)
          setOpen(false)
          toast.success(res.data.message || 'Success tambah dokumen')
          queryClient.invalidateQueries({
            queryKey: ['standard-operational'],
          })
          form.reset()
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Gagal tambah dokumen')
      })
  }

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        variant={'outline'}
        className={'border-primary text-primary hover:text-primary'}
      >
        <PlusIcon />
        Tambah Dokumen
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Dokumen'}
        className={'rounded max-w-2xl'}
      >
        <FormDocumentStandardOperational
          form={form}
          loading={loading}
          setOpen={setOpen}
          open={open}
          handleSubmit={HandleAddDocument}
        />
      </DialogCustom>
    </>
  )
}
