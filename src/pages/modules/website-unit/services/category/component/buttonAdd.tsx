import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button.tsx'
import { BiPlus } from 'react-icons/bi'
import { DialogCustom } from '@/components/common/dialog/DialogCustom.tsx'
import { FormCategoryService } from '@/pages/modules/website-unit/services/category/component/form.tsx'
import {
  CategoryServiceResolver,
  type CategoryServiceResolverType,
} from '@/pages/modules/website-unit/services/category/data/resolver.tsx'
import { zodResolver } from '@hookform/resolvers/zod'
import AxiosClient from '@/provider/axios.tsx'
import { toast } from 'react-toastify'
import { useQueryClient } from '@tanstack/react-query'
import type { ISessionUnit } from '@/pages/modules/website-unit/hooks'

interface Props {
  session?: ISessionUnit
}

export const ButtonAddCategoryService = (props: Props) => {
  const { session } = props
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CategoryServiceResolverType>({
    resolver: zodResolver(CategoryServiceResolver),
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    if (session) {
      form.reset({
        nama_unit: session?.nama_unit,
      })
    }
  }, [session])

  const HandleSave = async (value: CategoryServiceResolverType) => {
    setLoading(true)
    await AxiosClient.post('/unit/kategori-layanan', value)
      .then((res) => {
        if (res?.data?.status) {
          setOpen(false)
          setLoading(false)
          toast.success(res.data.message || 'Success Menambahkan Data Kategori Layanan')
          queryClient.invalidateQueries({
            queryKey: ['category-services'],
          })
          form.reset()
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
        Tambah Kategori
      </Button>

      <DialogCustom
        className={'lg:max-w-2xl rounded'}
        open={open}
        setOpen={setOpen}
        title={'Tambah Kategori Laynaan'}
      >
        <FormCategoryService
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
