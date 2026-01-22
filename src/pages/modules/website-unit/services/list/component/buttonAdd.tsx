import { useEffect, useState } from 'react'
import AxiosClient from '@/provider/axios.tsx'
import {
  ListServiceResolver,
  type ListServiceResolverType,
} from '@/pages/modules/website-unit/services/list/data/resolver.tsx'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormListService } from '@/pages/modules/website-unit/services/list/component/form.tsx'
import type { ICategoryServices } from '@/pages/modules/website-unit/services/category/data/types.ts'

export const ButtonAddListCategory = (rootData?: ICategoryServices) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const form = useForm<ListServiceResolverType>({
    resolver: zodResolver(ListServiceResolver),
  })

  useEffect(() => {
    if (rootData) {
      form.reset({
        nama_category: rootData?.nama_layanan,
      })
    }
  }, [rootData])

  const queryClient = useQueryClient()

  const HandleSave = async (value: ListServiceResolverType) => {
    setLoading(true)
    await AxiosClient.post(`/unit/layanan/${rootData?.id_kategori_layanan}/layanan`, value)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          queryClient.invalidateQueries({
            queryKey: ['list-service'],
          })
          toast.success(res.data.message || 'Success Menambahkan Data Layanan')
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message || 'Terjadi kesalahan, silakan coba lagi.')
      })
  }

  return (
    <>
      <Button
        variant={'outline'}
        className={'border-primary'}
        onClick={() => setOpen(!open)}
        disabled={loading}
      >
        <BiPlus />
        Tambah Layanan
      </Button>

      <DialogCustom
        className={'rounded lg:max-w-3xl'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Layanan'}
      >
        <FormListService
          form={form}
          open={open}
          setOpen={setOpen}
          loading={loading}
          HandleSave={HandleSave}
        />
      </DialogCustom>
    </>
  )
}
