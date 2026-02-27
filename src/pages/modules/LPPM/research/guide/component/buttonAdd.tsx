import { Button } from '@/components/ui/button.tsx'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { type SchemaGuideCategory, CategoryGuideResolver } from '../data/resolver'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormResearchGuideCategory } from './form.tsx'

export const ButtonAddGuideCategory = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SchemaGuideCategory>({
    resolver: zodResolver(CategoryGuideResolver),
  })

  const queryClient = useQueryClient()

  const HandleAddPlanning = async (e: SchemaGuideCategory) => {
    setLoading(true)
    await AxiosClient.post('/lppm/buku-panduan-kategori', e)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message || 'Success tambah kategori')
          queryClient.invalidateQueries({
            queryKey: ['guide-category'],
          })
          setLoading(false)
          setOpen(false)
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Gagal tambah kategori')
        setLoading(false)
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={() => setOpen(!open)}
        className={'border-primary text-primary hover:text-primary'}
      >
        <PlusIcon />
        Tambah Kategori
      </Button>

      <DialogCustom
        open={open}
        setOpen={setOpen}
        title={'Tambah Kategori'}
        className={'rounded max-w-2xl'}
      >
        <FormResearchGuideCategory
          form={form}
          loading={loading}
          setOpen={setOpen}
          open={open}
          handleSubmit={HandleAddPlanning}
        />
      </DialogCustom>
    </>
  )
}
